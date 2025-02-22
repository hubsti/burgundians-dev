// src/lib/data/geojson-territory-boundaries.ts

import type { Territory } from '../types/territory';

// Define the GeoJSON feature property type
interface TerritoryProperties {
    name: string;
    acquisition: number;
    ruler: string;
    category: 'apanage' | 'philippe-le-hardi' | 'philippe-le-bon' | 'charles-le-temeraire';
    id?: string;
    capital?: string;
}

// GeoJSON feature mapping to territory information
export const geoJSONTerritoryMap: Record<string, TerritoryProperties> = {
    // Flanders region (Philip the Bold, 1384)
    "339ebf897d68cef6f0352a517466781a": {
        name: "County of Flanders",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi",
        capital: "Ghent"
    },
    "9727158d1b6ad55e608cadb45db45cc4": {
        name: "Western Flanders",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi"
    },

    // Brabant region (Philip the Good, 1430)
    "6872b37e5d09d2d3c36084e4e345c51f": {
        name: "Duchy of Brabant",
        acquisition: 1430,
        ruler: "Philip the Good",
        category: "philippe-le-bon",
        capital: "Brussels"
    },
    "90d631817456692300156c5b80ca3aad": {
        name: "Southern Brabant",
        acquisition: 1430,
        ruler: "Philip the Good",
        category: "philippe-le-bon"
    },
    "169d3647083fb30e9130f619f1d0cc37": {
        name: "Eastern Brabant",
        acquisition: 1430,
        ruler: "Philip the Good",
        category: "philippe-le-bon"
    },

    // Artois region (Philip the Bold, 1384)
    "21a4983d7796f90a8f56c053764e0ebc": {
        name: "County of Artois",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi",
        capital: "Arras"
    },
    "7b6f6865cc47943e22c4098f81ae86ac": {
        name: "Western Artois",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi"
    },
    "1a3178fb2f5da36c0e3dfdff43429409": {
        name: "Southern Artois",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi"
    },
    "77a6bae59836248852df893a46ccec5a": {
        name: "Northern Artois",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi"
    },

    // Hainaut (Philip the Good, 1433)
    "bc1d276bc39243fea9e9a1a8a213f373": {
        name: "County of Hainaut",
        acquisition: 1433,
        ruler: "Philip the Good",
        category: "philippe-le-bon",
        capital: "Mons"
    },

    // Holland & Zeeland (Philip the Good, 1433)
    "cbbebe3645c8d871937caf6ba09a2fc0": {
        name: "County of Holland",
        acquisition: 1433,
        ruler: "Philip the Good",
        category: "philippe-le-bon",
        capital: "Amsterdam"
    },
    "b60df5a512af3bc01145c9c2a14310b8": {
        name: "Northern Holland",
        acquisition: 1433,
        ruler: "Philip the Good",
        category: "philippe-le-bon"
    },
    "2a33608b10cd4e970b56158b11d016a0": {
        name: "County of Zeeland",
        acquisition: 1433,
        ruler: "Philip the Good",
        category: "philippe-le-bon",
        capital: "Middelburg"
    },

    // Eastern territories
    "657cf0c84997413fe62521b00e77e0fb": {
        name: "County of Namur",
        acquisition: 1429,
        ruler: "Philip the Good",
        category: "philippe-le-bon",
        capital: "Namur"
    },
    "80806e3e74e424de54d0327abf0efbcf": {
        name: "Duchy of Limburg",
        acquisition: 1430,
        ruler: "Philip the Good",
        category: "philippe-le-bon",
        capital: "Limbourg"
    },
    "b2cc4792e6ba5617c3fcf414bcd92876": {
        name: "Lower Guelders",
        acquisition: 1473,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire"
    },
    "eb01de2ce44a9c0a68cf174c5026da60": {
        name: "Upper Guelders",
        acquisition: 1473,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire"
    },
    "efb76751738cb6b2c1635f0a0e23a1a5": {
        name: "Duchy of Guelders",
        acquisition: 1473,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire",
        capital: "Arnhem"
    },

    // Luxembourg region
    "1b460ed212c464b1082b3c9a1e65a808": {
        name: "Duchy of Luxembourg",
        acquisition: 1443,
        ruler: "Philip the Good",
        category: "philippe-le-bon",
        capital: "Luxembourg City"
    },
    "b164477028e330f99cb918c57b88bb61": {
        name: "Eastern Luxembourg",
        acquisition: 1443,
        ruler: "Philip the Good",
        category: "philippe-le-bon"
    },

    // Original Burgundy territories
    "b6552099383c46fb03a6dbc4f5e6401e": {
        name: "Northern Picardy",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi"
    },
    "a7fbb7e1abc34304009646295de94000": {
        name: "Duchy of Burgundy",
        acquisition: 1363,
        ruler: "Philip the Bold",
        category: "apanage",
        capital: "Dijon"
    },

    // Lorraine region (Charles the Bold)
    "b9835da567e72c5b2fa7dbd90df77805": {
        name: "Western Lorraine",
        acquisition: 1475,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire"
    },
    "f19fcb7b26f8e6a768971f46bc6b680c": {
        name: "Duchy of Lorraine",
        acquisition: 1475,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire",
        capital: "Nancy"
    },

    // Free County of Burgundy (Franche-Comté)
    "b56eb99efd7a9a37f7de8a87bb32e81c": {
        name: "Free County of Burgundy",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi",
        capital: "Besançon"
    },

    // Upper Alsace
    "c78de34ff5c68e7ad8c3bb439899b81d": {
        name: "Upper Alsace",
        acquisition: 1469,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire",
        capital: "Colmar"
    }
};

// Color mapping based on the map legend (preserved from original)
export const territoryColorMap = {
    "apanage": "#8B4513",          // Dark brown - Apanage of Philip the Bold
    "philippe-le-hardi": "#CD853F", // Light brown - Possessions of Philip the Bold
    "philippe-le-bon": "#FFD700",   // Gold/Yellow - Acquisitions of Philip the Good
    "charles-le-temeraire": "#9ACD32" // Light green - Conquests of Charles the Bold
};

// Helper function to get styling for GeoJSON territories
export function getGeoJSONTerritoryStyle(category: keyof typeof territoryColorMap) {
    const color = territoryColorMap[category] || "#808080";
    return {
        color: "#555",
        weight: 1.5,
        opacity: 0.8,
        fillColor: color,
        fillOpacity: 0.5,
        dashArray: '3'
    };
}

// Function to get territory info by GeoJSON feature ID
export function getTerritoryInfoByFeatureId(featureId: string): TerritoryProperties | null {
    return geoJSONTerritoryMap[featureId] || null;
}

// Function to filter GeoJSON features based on selected year
export function filterGeoJSONByYear(geoJSON: any, selectedYear: number) {
    if (!geoJSON || !geoJSON.features) return null;

    // Create a new GeoJSON object with filtered features
    const filteredFeatures = geoJSON.features.filter((feature: { id: string; }) => {
        const territoryInfo = getTerritoryInfoByFeatureId(feature.id);
        return territoryInfo && territoryInfo.acquisition <= selectedYear;
    });

    return {
        type: "FeatureCollection",
        features: filteredFeatures
    };
}

// Convert a GeoJSON feature to a standard Territory object
export function geoJSONFeatureToTerritory(feature: any): Territory | null {
    const territoryInfo = getTerritoryInfoByFeatureId(feature.id);
    if (!territoryInfo) return null;

    // Calculate centroid of polygon for coordinates
    const coordinates = calculateCentroid(feature.geometry.coordinates);
    if (!coordinates) return null;

    return {
        id: feature.id,
        name: territoryInfo.name,
        acquisition: territoryInfo.acquisition,
        coordinates: coordinates,
        ruler: territoryInfo.ruler,
        properties: {
            capital: territoryInfo.capital,
            category: territoryInfo.category
        }
    };
}

// Helper function to calculate centroid of a polygon
function calculateCentroid(coordinates: number[][][]): [number, number] | null {
    // Handle polygon type
    if (coordinates && coordinates.length > 0 && coordinates[0].length > 0) {
        let sumLat = 0;
        let sumLon = 0;
        const points = coordinates[0];

        points.forEach(point => {
            sumLon += point[0];
            sumLat += point[1];
        });

        return [sumLat / points.length, sumLon / points.length];
    }

    return null;
}