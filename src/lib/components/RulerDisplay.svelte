<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { burgundianRulers } from '$lib/data/rulers';
    import { eventTypeColors, eventTypeIcons } from '$lib/data/events';
    import type { Ruler } from '$lib/data/rulers';
    import type { HistoricalEvent } from '$lib/data/events';
    import { fly } from 'svelte/transition';

    export let selectedYear: number;
    export let isPlaying: boolean = false;
    export let playbackSpeed: number = 1;
    export let currentEvents: HistoricalEvent[] = [];

    let selectedEventType: 'all' | string = 'all';
    const SPEED_OPTIONS = [0.5, 1, 2, 4];
    
    const dispatch = createEventDispatcher<{
        yearChange: { year: number };
        playbackToggle: { isPlaying: boolean };
        speedChange: { speed: number };
    }>();

    $: currentRuler = burgundianRulers.find(
        ruler => selectedYear >= ruler.reignStart && selectedYear <= ruler.reignEnd
    );

    $: filteredEvents = selectedEventType === 'all' 
        ? currentEvents 
        : currentEvents.filter(e => e.type === selectedEventType);

    function handleYearChange(event: Event): void {
        const year = parseInt((event.target as HTMLInputElement).value);
        dispatch('yearChange', { year });
    }

    function togglePlayback(): void {
        dispatch('playbackToggle', { isPlaying: !isPlaying });
    }

    function adjustSpeed(speed: number): void {
        dispatch('speedChange', { speed });
    }

    function getEventTypeColor(type: keyof typeof eventTypeColors): string {
        return eventTypeColors[type] || 'bg-gray-500';
    }

    function getEventTypeIcon(type: keyof typeof eventTypeIcons): string {
        return eventTypeIcons[type] || '📅';
    }

    // Helper function to get event-specific image
    function getEventImage(event: HistoricalEvent): string | null {
        const eventKey = event.description
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        
        return `/events/${event.year}-${eventKey}.jpg`;
    }

    // Helper function to identify significant events
    function isSignificantEvent(event: HistoricalEvent): boolean {
        const significantTypes = ['acquisition', 'battle', 'political', 'treaty'];
        const significantKeywords = [
            'succession', 
            'marriage', 
            'death', 
            'became duke',
            'acquired',
            'battle',
            'siege',
            'treaty'
        ];
        
        return significantTypes.includes(event.type) ||
               significantKeywords.some(keyword => 
                   event.description.toLowerCase().includes(keyword));
    }

    // Helper function to provide impact context for significant events
    function getEventImpact(event: HistoricalEvent): string {
        const impactMap: Record<string, string> = {
            "Transfer of Burgundy to Philip the Bold": 
                "Founded the Burgundian branch of House of Valois",
            "County of Namur acquired by Burgundians":
                "Strengthened Burgundian control in the Low Countries",
            "Luxembourg comes under Burgundian control":
                "Extended Burgundian influence eastward",
            "Charles the Bold acquires the Duchy of Guelders":
                "Further expanded Burgundian territory in the Low Countries",
            "Battle of Nancy":
                "Led to the end of Burgundian independence",
            "Death of Charles the Bold":
                "Marked the end of the independent Duchy of Burgundy",
            "Marriage of Philip the Bold to Margaret III of Flanders":
                "Set the stage for Burgundian expansion into the Low Countries",
            "Death of Philip the Bold and succession of John the Fearless":
                "Marked the beginning of a more aggressive Burgundian policy",
            "Assassination of John the Fearless, Philip the Good takes power":
                "Led to closer alliance with England and expansion in the Low Countries"
        };

        return impactMap[event.description];
    }
</script>

{#if currentRuler}
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Ruler Header -->
        <div class="p-4 bg-red-900 text-white">
            <h2 class="text-xl font-semibold">{currentRuler.name}</h2>
            <p class="text-sm opacity-80">{currentRuler.reignStart}-{currentRuler.reignEnd}</p>
        </div>

        <!-- Ruler Info -->
        <div class="grid grid-cols-3 gap-4 p-4">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img src={currentRuler.image} alt={currentRuler.name} class="w-full h-full object-cover"/>
            </div>
            <div class="col-span-2">
                <p class="text-sm text-gray-600">{currentRuler.description}</p>
            </div>
        </div>

        <!-- Playback Controls -->
        <div class="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <div class="flex items-center justify-between">
                <button
                    class="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 
                           focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-opacity-50 
                           transition-colors duration-200 ease-in-out flex items-center gap-2"
                    on:click={togglePlayback}
                >
                    {#if isPlaying}
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="6" y="4" width="4" height="16"/>
                            <rect x="14" y="4" width="4" height="16"/>
                        </svg>
                        <span>Pause</span>
                    {:else}
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <polygon points="5,3 19,12 5,21"/>
                        </svg>
                        <span>Play</span>
                    {/if}
                </button>

                <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-gray-700">Speed:</span>
                    {#each SPEED_OPTIONS as speed}
                        <button
                            class="px-3 py-1 rounded-md text-sm transition-colors duration-200 ease-in-out
                                {playbackSpeed === speed ? 'bg-red-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
                            on:click={() => adjustSpeed(speed)}
                        >
                            {speed}x
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Timeline -->
        <div class="p-4 border-t border-gray-100">
            <div class="relative">
                <input
                    type="range"
                    min={1363}
                    max={1477}
                    value={selectedYear}
                    on:input={handleYearChange}
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-opacity-50"
                />
                
                <!-- Ruler Period Indicators -->
                <div class="absolute top-0 left-0 w-full h-2">
                    {#each burgundianRulers as ruler}
                        <div 
                            class="absolute h-full transition-all duration-300 border-l-2 border-r-2 border-white
                                   {ruler === currentRuler ? 'bg-red-900' : 'bg-gray-400'}"
                            style="left: {((ruler.reignStart - 1363) / (1477 - 1363)) * 100}%; 
                                   width: {((ruler.reignEnd - ruler.reignStart) / (1477 - 1363)) * 100}%;"
                        >
                            <img 
                                src={ruler.coatOfArms} 
                                alt="Coat of Arms"
                                class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 h-4 w-4 object-contain"
                            />
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Event Type Filter -->
        <div class="p-4 border-t border-gray-100">
            <div class="flex flex-wrap gap-2">
                <button
                    class="px-3 py-1 rounded-full text-sm transition-colors
                           {selectedEventType === 'all' ? 'bg-red-900 text-white' : 'bg-gray-100 hover:bg-gray-200'}"
                    on:click={() => selectedEventType = 'all'}
                >
                    All Events
                </button>
                {#each Object.keys(eventTypeColors) as type}
                    <button
                        class="px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors
                               {selectedEventType === type ? getEventTypeColor(type as keyof typeof eventTypeColors) + ' text-white' : 'bg-gray-100 hover:bg-gray-200'}"
                        on:click={() => selectedEventType = type}
                    >
                        <span>{getEventTypeIcon(type as keyof typeof eventTypeIcons)}</span>
                        <span>{type}</span>
                    </button>
                {/each}
            </div>
        </div>

        <!-- Historical Timeline -->
        <div class="border-t border-gray-100">
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Historical Timeline</h3>
                <div class="max-h-[500px] overflow-y-auto space-y-4 pr-2 
                           scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-gray-100">
                    {#each filteredEvents.slice().reverse() as event (event.year + event.description)}
                        <div 
                            class="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden transition-all duration-300 transform"
                            in:fly={{ y: 20, duration: 400 }}
                            out:fly={{ y: -20, duration: 300 }}
                        >
                            <!-- Event Header -->
                            <div class="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-100">
                                <div class="flex items-center gap-2">
                                    <span class="text-xl font-semibold text-red-900">{event.year}</span>
                                    <span class="px-2 py-1 text-xs rounded-full {getEventTypeColor(event.type)} text-white 
                                               flex items-center gap-1">
                                        {getEventTypeIcon(event.type)}
                                        {event.type}
                                    </span>
                                </div>
                            </div>

                            <!-- Event Content -->
                            <div class="flex gap-4 p-3">
                                <div class="flex-grow">
                                    <p class="text-sm text-gray-700">{event.description}</p>
                                    {#if isSignificantEvent(event) && getEventImpact(event)}
                                        <div class="mt-2 p-2 bg-red-50 rounded-md text-sm text-red-800">
                                            <strong>Impact:</strong> {getEventImpact(event)}
                                        </div>
                                    {/if}
                                </div>
                                {#if getEventImage(event)}
                                    <div class="w-32 h-24 flex-shrink-0">
                                        <img 
                                            src={getEventImage(event)}
                                            alt={event.description}
                                            class="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
{/if}

