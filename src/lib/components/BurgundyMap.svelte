<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import type { Territory } from '$lib/types/territory';
    import type { Map, CircleMarker, Layer, LayerGroup, GeoJSON as GeoJSONLayer } from 'leaflet';
    import { battles } from '$lib/data/battles';
    import { 
        geoJSONTerritoryMap, 
        getGeoJSONTerritoryStyle, 
        getTerritoryInfoByFeatureId,
        filterGeoJSONByYear
    } from '$lib/data/geojson-territory-boundaries';
    
    let L: typeof import('leaflet');
    
    export let territories: Territory[] = [];
    export let selectedYear: number;

    let map: Map;
    let mapElement: HTMLDivElement;
    let territoryLayers: LayerGroup;
    let geojsonLayers: LayerGroup;
    let battleLayers: LayerGroup;
    let legendControl: any;
    let geoJSONData: any = null;

    onMount(async () => {
        if (browser) {
            L = (await import('leaflet')).default;
            await import('leaflet/dist/leaflet.css');
            
            initializeMap();
            addMapControls();
            await loadGeoJSONTerritories();
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
        updateGeoJSONLayers();
    }

    function initializeMap(): void {
        map = L.map(mapElement, {
            center: [49.5, 5.0], // Centered on Burgundian territories
            zoom: 6,
            minZoom: 5,
            maxZoom: 10,
            zoomControl: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors | Historical Burgundy Map',
            maxZoom: 18
        }).addTo(map);

        territoryLayers = L.layerGroup().addTo(map);
        geojsonLayers = L.layerGroup().addTo(map);
        battleLayers = L.layerGroup().addTo(map);
    }

    function addMapControls(): void {
        // Add zoom control
        L.control.zoom({
            position: 'topright'
        }).addTo(map);

        // Add scale
        L.control.scale({
            imperial: false,
            position: 'bottomright'
        }).addTo(map);

        // Add legend
        addLegend();
    }

    function addLegend(): void {
        if (legendControl) {
            map.removeControl(legendControl);
        }

        legendControl = new L.Control({ position: 'bottomleft' });
        legendControl.onAdd = () => {
            const div = L.DomUtil.create('div', 'legend bg-white p-3 rounded-lg shadow-lg');
            div.innerHTML = `
                <h4 class="font-bold mb-2">Burgundian Territories</h4>
                <div class="space-y-1 text-sm">
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 rounded" style="background: #8B4513"></div>
                        <span>Apanage of Philip the Bold (1363)</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 rounded" style="background: #CD853F"></div>
                        <span>Possessions of Philip the Bold</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 rounded" style="background: #FFD700"></div>
                        <span>Acquisitions of Philip the Good</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 rounded" style="background: #9ACD32"></div>
                        <span>Conquests of Charles the Bold</span>
                    </div>
                    <div class="flex items-center gap-2 mt-2">
                        <div class="w-4 h-4 rounded-full bg-red-600"></div>
                        <span>Battle site</span>
                    </div>
                </div>
            `;
            return div;
        };
        legendControl.addTo(map);
    }

    function getColor(acquisitionYear: number): string {
        const yearDiff = selectedYear - acquisitionYear;
        const opacity = Math.min(0.8, Math.max(0.3, yearDiff / 100));
        return `rgba(128, 0, 32, ${opacity})`;
    }

    function createTerritoryPopup(territory: Territory): string {
        return `
            <div class="px-4 py-3">
                <h3 class="text-lg font-bold mb-2">${territory.name}</h3>
                <div class="space-y-1">
                    <p><strong>Acquired:</strong> ${territory.acquisition}</p>
                    <p><strong>Ruler:</strong> ${territory.ruler}</p>
                    <p><strong>Years under control:</strong> ${selectedYear - territory.acquisition}</p>
                    ${territory.properties?.capital ? 
                        `<p><strong>Capital:</strong> ${territory.properties.capital}</p>` : ''}
                </div>
            </div>
        `;
    }

    async function loadGeoJSONTerritories(): Promise<void> {
        if (!browser || !map || !L) return;
        
        try {
            // Load GeoJSON data from your file location
            const response = await fetch('/data/burgundy-territories.geojson');
            geoJSONData = await response.json();
            
            // Initial rendering of GeoJSON layers
            updateGeoJSONLayers();
        } catch (error) {
            console.error('Error loading GeoJSON data:', error);
        }
    }

    function updateGeoJSONLayers(): void {
        if (!browser || !map || !L || !geojsonLayers || !geoJSONData) return;
        
        geojsonLayers.clearLayers();
        
        // Filter by year
        const filteredGeoJSON = filterGeoJSONByYear(geoJSONData, selectedYear);
        if (!filteredGeoJSON) return;
        
        // Create GeoJSON layer with styling and popups
        const layer = L.geoJSON(filteredGeoJSON, {
            style: (feature) => {
                const territoryInfo = getTerritoryInfoByFeatureId(feature.id);
                if (!territoryInfo) return {};
                return getGeoJSONTerritoryStyle(territoryInfo.category);
            },
            onEachFeature: (feature, layer) => {
                const territoryInfo = getTerritoryInfoByFeatureId(feature.id);
                if (territoryInfo) {
                    layer.bindPopup(`
                        <div class="px-3 py-2">
                            <h3 class="font-bold">${territoryInfo.name}</h3>
                            <p>Acquired in ${territoryInfo.acquisition}</p>
                            <p>Under ${territoryInfo.ruler}</p>
                            ${territoryInfo.capital ? 
                                `<p>Capital: ${territoryInfo.capital}</p>` : ''}
                            <p>Years under control: ${selectedYear - territoryInfo.acquisition}</p>
                        </div>
                    `);
                }
            }
        });
        
        layer.addTo(geojsonLayers);
    }

    function updateTerritories(): void {
        if (!browser || !map || !L || !territoryLayers) return;

        territoryLayers.clearLayers();

        const currentTerritories = territories.filter(t => t.acquisition <= selectedYear);

        // Add territory center markers (smaller, since we now have GeoJSON boundaries)
        currentTerritories.forEach(territory => {
            const marker = L.circleMarker(territory.coordinates, {
                radius: 4, // Smaller since we have boundaries now
                color: '#000',
                weight: 1,
                opacity: 0.7,
                fillColor: getColor(territory.acquisition),
                fillOpacity: 0.6
            });

            marker.bindPopup(createTerritoryPopup(territory));
            marker.addTo(territoryLayers);
        });
    }

    function updateBattles(): void {
        if (!browser || !map || !L || !battleLayers) return;

        battleLayers.clearLayers();

        const relevantBattles = battles.filter(battle => battle.year <= selectedYear);

        relevantBattles.forEach(battle => {
            const marker = L.marker(battle.coordinates, {
                icon: L.divIcon({
                    html: `<div class="flex items-center justify-center w-6 h-6 bg-red-600 rounded-full 
                                text-white text-xs border-2 border-white shadow-md">⚔️</div>`,
                    className: 'battle-icon',
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                })
            });

            marker.bindPopup(`
                <div class="px-3 py-2">
                    <h3 class="font-bold">${battle.name} (${battle.year})</h3>
                    <p>${battle.description}</p>
                </div>
            `);

            marker.addTo(battleLayers);
        });
    }
</script>

<div bind:this={mapElement} class="w-full h-[600px] rounded-lg shadow-lg"></div>

<!-- Import Leaflet CSS -->
<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin=""/>
</svelte:head>