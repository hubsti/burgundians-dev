// src/lib/types/territory.ts

import type { GeoJSON } from 'geojson';

export interface Territory {
    id: string;
    name: string;
    acquisition: number;
    coordinates: [number, number]; // [latitude, longitude]
    ruler: string;
    boundaries?: GeoJSON.Polygon | GeoJSON.MultiPolygon;
    properties?: {
        capital?: string;
        population?: number;
        language?: string;
        previousRuler?: string;
    };
}

export interface TimelineEvent {
    year: number;
    description: string;
    territories?: string[]; // Reference to territory IDs
    type?: 'acquisition' | 'loss' | 'battle' | 'treaty' | 'political' | 'cultural';
    location?: [number, number]; // [latitude, longitude]
}

export interface MapState {
    selectedYear: number;
    territories: Territory[];
    isPlaying: boolean;
    playbackSpeed: number;
}