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
        category?: string;
    };
}

export interface TimelineEvent {
    year: number;
    description: string;
    type?: string;
    territories?: string[]; // Reference to territory IDs
    location?: [number, number]; // [latitude, longitude]
}

export interface MapState {
    selectedYear: number;
    territories: Territory[];
    isPlaying: boolean;
    playbackSpeed: number;
}