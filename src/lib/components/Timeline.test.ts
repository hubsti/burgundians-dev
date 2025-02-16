// src/lib/components/Timeline.test.ts
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Timeline from './Timeline.svelte';

describe('Timeline', () => {
    it('renders with default props', () => {
        const { getByRole } = render(Timeline, {
            props: {
                events: [],
                selectedYear: 918,
                isPlaying: false,
                playbackSpeed: 1
            }
        });

        const slider = getByRole('slider');
        expect(slider).toBeInTheDocument();
        expect(slider).toHaveValue('918');
    });

    it('dispatches yearChange event when slider changes', async () => {
        const { getByRole, component } = render(Timeline, {
            props: {
                events: [],
                selectedYear: 918,
                isPlaying: false,
                playbackSpeed: 1
            }
        });

        const mockYearChange = vi.fn();
        component.$on('yearChange', mockYearChange);

        const slider = getByRole('slider');
        await fireEvent.input(slider, { target: { value: '1000' } });

        expect(mockYearChange).toHaveBeenCalledWith(
            expect.objectContaining({
                detail: { year: 1000 }
            })
        );
    });

    it('toggles playback state', async () => {
        const { getByText, component } = render(Timeline, {
            props: {
                events: [],
                selectedYear: 918,
                isPlaying: false,
                playbackSpeed: 1
            }
        });

        const mockPlaybackToggle = vi.fn();
        component.$on('playbackToggle', mockPlaybackToggle);

        const playButton = getByText('Play');
        await fireEvent.click(playButton);

        expect(mockPlaybackToggle).toHaveBeenCalledWith(
            expect.objectContaining({
                detail: { isPlaying: true }
            })
        );
    });

    it('changes playback speed', async () => {
        const { getByText, component } = render(Timeline, {
            props: {
                events: [],
                selectedYear: 918,
                isPlaying: false,
                playbackSpeed: 1
            }
        });

        const mockSpeedChange = vi.fn();
        component.$on('speedChange', mockSpeedChange);

        const speedButton = getByText('2x');
        await fireEvent.click(speedButton);

        expect(mockSpeedChange).toHaveBeenCalledWith(
            expect.objectContaining({
                detail: { speed: 2 }
            })
        );
    });
});// src/lib/components/Timeline.test.ts
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Timeline from './Timeline.svelte';

describe('Timeline', () => {
    it('renders with default props', () => {
        const { getByRole } = render(Timeline, {
            props: {
                events: [],
                selectedYear: 918,
                isPlaying: false,
                playbackSpeed: 1
            }
        });

        const slider = getByRole('slider');
        expect(slider).toBeInTheDocument();
        expect(slider).toHaveValue('918');
    });

    it('dispatches yearChange event when slider changes', async () => {
        const { getByRole, component } = render(Timeline, {
            props: {
                events: [],
                selectedYear: 918,
                isPlaying: false,
                playbackSpeed: 1
            }
        });

        const mockYearChange = vi.fn();
        component.$on('yearChange', mockYearChange);

        const slider = getByRole('slider');
        await fireEvent.input(slider, { target: { value: '1000' } });

        expect(mockYearChange).toHaveBeenCalledWith(
            expect.objectContaining({
                detail: { year: 1000 }
            })
        );
    });

    it('toggles playback state', async () => {
        const { getByText, component } = render(Timeline, {
            props: {
                events: [],
                selectedYear: 918,
                isPlaying: false,
                playbackSpeed: 1
            }
        });

        const mockPlaybackToggle = vi.fn();
        component.$on('playbackToggle', mockPlaybackToggle);

        const playButton = getByText('Play');
        await fireEvent.click(playButton);

        expect(mockPlaybackToggle).toHaveBeenCalledWith(
            expect.objectContaining({
                detail: { isPlaying: true }
            })
        );
    });

    it('changes playback speed', async () => {
        const { getByText, component } = render(Timeline, {
            props: {
                events: [],
                selectedYear: 918,
                isPlaying: false,
                playbackSpeed: 1
            }
        });

        const mockSpeedChange = vi.fn();
        component.$on('speedChange', mockSpeedChange);

        const speedButton = getByText('2x');
        await fireEvent.click(speedButton);

        expect(mockSpeedChange).toHaveBeenCalledWith(
            expect.objectContaining({
                detail: { speed: 2 }
            })
        );
    });
});



<script lang="ts" >
    import { onMount, onDestroy } from 'svelte';
import type { Territory } from '$lib/types/territory';
import { browser } from '$app/environment';
import type { Map, GeoJSON, LeafletEvent, TileLayer } from 'leaflet';

let L: typeof import('leaflet');

export let territories: Territory[] = [];
export let selectedYear: number;

let map: Map;
let geojsonLayer: GeoJSON;
let mapElement: HTMLDivElement;
