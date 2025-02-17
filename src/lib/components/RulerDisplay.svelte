

<script lang="ts">
    import { burgundianRulers } from '$lib/data/rulers';
    import type { Ruler } from '$lib/data/rulers';

    export let selectedYear: number;

    $: currentRuler = burgundianRulers.find(
        ruler => selectedYear >= ruler.reignStart && selectedYear <= ruler.reignEnd
    );

    $: nextRuler = burgundianRulers.find(
        ruler => ruler.reignStart > selectedYear
    );

    $: previousRuler = [...burgundianRulers]
        .reverse()
        .find(ruler => ruler.reignEnd < selectedYear);
</script>

{#if currentRuler}
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-4 bg-red-900 text-white">
            <h2 class="text-xl font-semibold">{currentRuler.name}</h2>
            <p class="text-sm opacity-80">{currentRuler.reignStart}-{currentRuler.reignEnd}</p>
        </div>
        <div class="grid grid-cols-3 gap-4 p-4">
            <!-- Portrait -->
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                    src={currentRuler.image} 
                    alt={currentRuler.name}
                    class="w-full h-full object-cover"
                />
            </div>
            <!-- Information -->
            <div class="space-y-2">
                <p class="text-sm text-gray-600">{currentRuler.description}</p>
            </div>
            <!-- Coat of Arms -->
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden p-2">
                <img 
                    src={currentRuler.coatOfArms} 
                    alt="Coat of Arms of {currentRuler.name}"
                    class="w-full h-full object-contain"
                />
            </div>
        </div>

        <!-- Combined Timeline -->
        <div class="p-4 border-t border-gray-100">
            <!-- Years Scale -->
            <div class="flex justify-between text-xs text-gray-500 mb-4">
   
            </div>
            
            <!-- Main Timeline -->
            <div class="relative">
                <!-- Ruler Periods -->
                <div class="relative h-6 bg-gray-200 rounded-full mb-6">
                    {#each burgundianRulers as ruler}
                        <div 
                            class="absolute h-full transition-all duration-300 flex items-center justify-center border-l-2 border-r-2 border-white
                                   {ruler === currentRuler ? 'bg-red-900' : 'bg-gray-400'}"
                            style="left: {((ruler.reignStart - 1363) / (1477 - 1363)) * 100}%; 
                                   width: {((ruler.reignEnd - ruler.reignStart) / (1477 - 1363)) * 100}%;"
                        >
                            <img 
                                src={ruler.coatOfArms} 
                                alt="Coat of Arms"
                                class="h-4 w-4 object-contain"
                            />
                        </div>
                    {/each}
                </div>

                <!-- Year Marker -->
                <div 
                    class="absolute w-0.5 h-6 bg-red-900 top-0 transition-all duration-300"
                    style="left: calc({((selectedYear - 1363) / (1477 - 1363)) * 100}%);"
                >
                    <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span class="text-sm font-medium text-red-900 bg-white px-1 rounded shadow-sm border border-red-200">
                            {selectedYear}
                        </span>
                    </div>
                </div>

                <!-- Ruler Names and Years -->
                <!-- Ruler Names and Years -->
                <div class="flex text-xs mt-2 h-18">
                    {#each burgundianRulers as ruler}
                        <div 
                            class="absolute text-center transition-opacity duration-300"
                            class:text-red-900={ruler === currentRuler}
                            class:text-gray-600={ruler !== currentRuler}
                            style="left: {((ruler.reignStart - 1363) / (1477 - 1363)) * 100}%;
                                   width: {((ruler.reignEnd - ruler.reignStart) / (1477 - 1363)) * 100}%;"
                        >
                            <div class="font-medium">{ruler.name}</div>
                            <div class="text-xs opacity-75">{ruler.reignStart}-{ruler.reignEnd}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Succession -->

    </div>
{/if}