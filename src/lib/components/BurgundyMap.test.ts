// src/lib/components/BurgundyMap.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import BurgundyMap from './BurgundyMap.svelte';
import L from 'leaflet';

// Mock Leaflet
vi.mock('leaflet', () => {
    const removeLayerMock = vi.fn();
    const addLayerMock = vi.fn();
    const fitBoundsMock = vi.fn();

    return {
        default: {
            map: () => ({
                setView: () => ({
                    remove: vi.fn(),
                    removeLayer: removeLayerMock,
                    fitBounds: fitBoundsMock
                }),
            }),
            tileLayer: () => ({
                addTo: () => ({})
            }),
            geoJSON: () => ({
                addTo: addLayerMock,
                getBounds: () => ({
                    isValid: () => true
                })
            })
        }
    };
});

describe('BurgundyMap', () => {
    const sampleTerritory = {
        id: '1',
        name: 'Duchy of Burgundy',
        year: 1000,
        coordinates: {
            type: 'Polygon',
            coordinates: [[[4, 47], [5, 47], [5, 48], [4, 48], [4, 47]]]
        },
        properties: {
            ruler: 'Henry I',
            capital: 'Dijon'
        }
    };

    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();
    });

    it('renders map container', () => {
        const { container } = render(BurgundyMap, {
            props: {
                territories: [sampleTerritory],
                selectedYear: 1000
            }
        });

        const mapElement = container.querySelector('#map');
        expect(mapElement).toBeInTheDocument();
    });

    it('updates territory when year changes', async () => {
        const { rerender } = render(BurgundyMap, {
            props: {
                territories: [sampleTerritory],
                selectedYear: 900
            }
        });

        // Update the selected year
        await rerender({ territories: [sampleTerritory], selectedYear: 1000 });

        // Verify that the map was updated
        expect(L.geoJSON).toHaveBeenCalled();
    });
});