

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

        <!-- Timeline -->
        <div class="p-4 border-t border-gray-100">
            <div class="relative h-2 bg-gray-200 rounded-full">
                {#each burgundianRulers as ruler}
                    <div 
                        class="absolute h-full rounded-full transition-all duration-300"
                        class:bg-red-900={ruler === currentRuler}
                        class:bg-gray-400={ruler !== currentRuler}
                        style="left: {((ruler.reignStart - 1363) / (1477 - 1363)) * 100}%; 
                               width: {((ruler.reignEnd - ruler.reignStart) / (1477 - 1363)) * 100}%;"
                    >
                        <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                            <img 
                                src={ruler.coatOfArms} 
                                alt="Coat of Arms"
                                class="w-4 h-4 object-contain"
                            />
                        </div>
                    </div>
                {/each}
                <div 
                    class="absolute w-2 h-2 bg-white border-2 border-red-900 rounded-full -top-1 transition-all duration-300"
                    style="left: calc({((selectedYear - 1363) / (1477 - 1363)) * 100}% - 4px);"
                ></div>
            </div>
        </div>

        <!-- Succession -->
        <div class="p-4 bg-gray-50 border-t border-gray-100">
            <h4 class="font-semibold text-sm text-gray-700 mb-2">Succession</h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
                {#if previousRuler}
                    <div class="flex items-center gap-2">
                        <img 
                            src={previousRuler.coatOfArms} 
                            alt="Previous ruler's coat of arms"
                            class="w-6 h-6 object-contain"
                        />
                        <div class="text-gray-600">
                            <span class="block text-xs">Previous</span>
                            {previousRuler.name}
                        </div>
                    </div>
                {/if}
                {#if nextRuler}
                    <div class="flex items-center justify-end gap-2">
                        <div class="text-gray-600 text-right">
                            <span class="block text-xs">Next</span>
                            {nextRuler.name}
                        </div>
                        <img 
                            src={nextRuler.coatOfArms} 
                            alt="Next ruler's coat of arms"
                            class="w-6 h-6 object-contain"
                        />
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}