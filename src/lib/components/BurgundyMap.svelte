
<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import type { Territory } from '$lib/types/territory';
    import type { Map, CircleMarker, Layer, LayerGroup, Icon } from 'leaflet';
    import { battles } from '$lib/data/battles';
    
    let L: typeof import('leaflet');
    
    export let territories: Territory[] = [];
    export let selectedYear: number;

    let map: Map;
    let mapElement: HTMLDivElement;
    let territoryLayers: LayerGroup;
    let battleLayers: LayerGroup;

    onMount(async () => {
        if (browser) {
            L = (await import('leaflet')).default;
            await import('leaflet/dist/leaflet.css');
            
            initializeMap();
            updateTerritories();
            updateBattles();
        }
    });

    onDestroy(() => {
        if (browser && map) {
            map.remove();
        }
    });

    $: if (browser && territories && selectedYear && map) {
        updateTerritories();
        updateBattles();
    }

    function initializeMap(): void {
        map = L.map(mapElement, {
            center: [48.5, 4.5],
            zoom: 6,
            minZoom: 5,
            maxZoom: 10
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        territoryLayers = L.layerGroup().addTo(map);
        battleLayers = L.layerGroup().addTo(map);
    }

    function getColor(acquisitionYear: number): string {
        const yearDiff = selectedYear - acquisitionYear;
        const opacity = Math.min(0.8, Math.max(0.3, yearDiff / 100));
        return `rgba(128, 0, 32, ${opacity})`;
    }

    function createBattleIcon(battle: typeof battles[0]): any {
        const isCurrentYear = battle.year === selectedYear;
        return L.divIcon({
            html: `<div class="w-6 h-6 flex items-center justify-center ${isCurrentYear ? 'text-red-600' : 'text-gray-700'}">⚔️</div>`,
            className: 'battle-icon',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
    }

    function createBattlePopup(battle: typeof battles[0]): string {
        return `
            <div class="px-4 py-3">
                <h3 class="text-lg font-bold mb-2">${battle.name} (${battle.year})</h3>
                <p class="text-gray-700">${battle.description}</p>
            </div>
        `;
    }

    function updateBattles(): void {
        if (!browser || !map || !L || !battleLayers) return;

        battleLayers.clearLayers();

        const relevantBattles = battles.filter(battle => battle.year <= selectedYear);

        relevantBattles.forEach(battle => {
            const marker = L.marker(battle.coordinates, {
                icon: createBattleIcon(battle)
            });

            marker.bindPopup(createBattlePopup(battle), {
                maxWidth: 300,
                className: 'battle-popup'
            });

            marker.addTo(battleLayers);
        });
    }

    function updateTerritories(): void {
        if (!browser || !map || !L || !territoryLayers) return;

        territoryLayers.clearLayers();

        const currentTerritories = territories.filter(t => t.acquisition <= selectedYear);

        currentTerritories.forEach(territory => {
            const marker = L.circleMarker(territory.coordinates, {
                radius: 8,
                color: '#000',
                weight: 2,
                opacity: 0.8,
                fillColor: getColor(territory.acquisition),
                fillOpacity: 0.6
            });

            const popupContent = `
                <div class="px-4 py-3">
                    <h3 class="text-lg font-bold mb-2">${territory.name}</h3>
                    <div class="space-y-1">
                        <p><strong>Acquired:</strong> ${territory.acquisition}</p>
                        <p><strong>Ruler:</strong> ${territory.ruler}</p>
                        ${territory.properties?.capital ? 
                            `<p><strong>Capital:</strong> ${territory.properties.capital}</p>` : ''}
                    </div>
                </div>
            `;

            marker.bindPopup(popupContent, {
                maxWidth: 300,
                className: 'territory-popup'
            });

            marker.addTo(territoryLayers);

            const influenceZone = L.circle(territory.coordinates, {
                radius: 50000,
                color: '#000',
                weight: 1,
                opacity: 0.3,
                fillColor: getColor(territory.acquisition),
                fillOpacity: 0.1
            }).addTo(territoryLayers);
        });

        // Adjust map bounds to show all territories and battles
        const allPoints = [
            ...currentTerritories.map(t => t.coordinates),
            ...battles.filter(b => b.year <= selectedYear).map(b => b.coordinates)
        ];

        if (allPoints.length > 0) {
            const bounds = L.latLngBounds(allPoints);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }
</script>

<div bind:this={mapElement} class="w-full h-[600px] rounded-lg shadow-lg"></div>

<style>
    :global(.battle-icon) {
        font-size: 24px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
</style>