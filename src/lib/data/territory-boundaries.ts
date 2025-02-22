// src/lib/data/territory-boundaries.ts

import type { Territory } from '../types/territory';

export const territoryBoundaries = {
    // Core Territories - Apanage of Philip the Bold (1363)
    'burgundy': {
        type: "Feature",
        properties: {
            name: "Duchy of Burgundy",
            acquisition: 1363,
            ruler: "Philip the Bold",
            category: "apanage"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [4.3, 47.0], [4.8, 47.2], [5.2, 47.1], [5.3, 46.5],
                [5.1, 46.2], [4.8, 46.0], [4.2, 46.2], [4.0, 46.5], [4.3, 47.0]
            ]]
        }
    },

    // Territories from Philip the Bold's Marriage to Margaret of Flanders (1384)
    'flanders': {
        type: "Feature",
        properties: {
            name: "County of Flanders",
            acquisition: 1384,
            ruler: "Philip the Bold",
            category: "philippe-le-hardi"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [2.7, 51.3], [3.2, 51.4], [3.8, 51.3], [3.9, 51.0],
                [3.7, 50.7], [3.5, 50.8], [3.2, 50.9], [2.8, 51.0], [2.7, 51.3]
            ]]
        }
    },
    'artois': {
        type: "Feature",
        properties: {
            name: "County of Artois",
            acquisition: 1384,
            ruler: "Philip the Bold",
            category: "philippe-le-hardi"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [2.2, 50.6], [2.7, 50.8], [3.0, 50.7], [3.1, 50.4],
                [2.8, 50.2], [2.3, 50.2], [2.0, 50.4], [2.2, 50.6]
            ]]
        }
    },
    'franche-comte': {
        type: "Feature",
        properties: {
            name: "Free County of Burgundy",
            acquisition: 1384,
            ruler: "Philip the Bold",
            category: "philippe-le-hardi"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [5.7, 47.5], [6.8, 47.6], [7.0, 47.2], [6.8, 46.8],
                [6.2, 46.5], [5.8, 46.7], [5.6, 47.0], [5.7, 47.5]
            ]]
        }
    },
    'nevers': {
        type: "Feature",
        properties: {
            name: "County of Nevers",
            acquisition: 1384,
            ruler: "Philip the Bold",
            category: "philippe-le-hardi"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [3.0, 47.2], [3.6, 47.3], [3.8, 47.0], [3.6, 46.7],
                [3.2, 46.8], [3.0, 47.0], [3.0, 47.2]
            ]]
        }
    },

    // Territories acquired by Philip the Good (1419-1467)
    'brabant': {
        type: "Feature",
        properties: {
            name: "Duchy of Brabant",
            acquisition: 1430,
            ruler: "Philip the Good",
            category: "philippe-le-bon"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [4.2, 51.2], [5.0, 51.3], [5.3, 51.1], [5.2, 50.7],
                [4.8, 50.6], [4.3, 50.5], [4.0, 50.7], [4.0, 51.0], [4.2, 51.2]
            ]]
        }
    },
    'hainaut': {
        type: "Feature",
        properties: {
            name: "County of Hainaut",
            acquisition: 1433,
            ruler: "Philip the Good",
            category: "philippe-le-bon"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [3.2, 50.6], [4.0, 50.6], [4.1, 50.3], [3.9, 50.1],
                [3.5, 50.0], [3.2, 50.2], [3.2, 50.6]
            ]]
        }
    },
    'holland': {
        type: "Feature",
        properties: {
            name: "County of Holland",
            acquisition: 1433,
            ruler: "Philip the Good",
            category: "philippe-le-bon"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [4.0, 52.6], [4.8, 52.7], [5.0, 52.4], [4.9, 52.1],
                [4.6, 51.9], [4.2, 52.0], [4.0, 52.3], [4.0, 52.6]
            ]]
        }
    },
    'zeeland': {
        type: "Feature",
        properties: {
            name: "County of Zeeland",
            acquisition: 1433,
            ruler: "Philip the Good",
            category: "philippe-le-bon"
        },
        geometry: {
            type: "MultiPolygon",
            coordinates: [
                [[[3.4, 51.6], [3.8, 51.7], [4.0, 51.5], [3.7, 51.4], [3.4, 51.5], [3.4, 51.6]]],
                [[[3.9, 51.8], [4.2, 51.7], [4.1, 51.5], [3.8, 51.6], [3.9, 51.8]]]
            ]
        }
    },
    'luxembourg': {
        type: "Feature",
        properties: {
            name: "Duchy of Luxembourg",
            acquisition: 1443,
            ruler: "Philip the Good",
            category: "philippe-le-bon"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [5.7, 50.0], [6.4, 50.2], [6.5, 49.8], [6.2, 49.5],
                [5.8, 49.4], [5.6, 49.6], [5.7, 50.0]
            ]]
        }
    },
    'namur': {
        type: "Feature",
        properties: {
            name: "County of Namur",
            acquisition: 1429,
            ruler: "Philip the Good",
            category: "philippe-le-bon"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [4.7, 50.5], [5.0, 50.5], [5.0, 50.2], [4.8, 50.0],
                [4.5, 50.1], [4.5, 50.4], [4.7, 50.5]
            ]]
        }
    },

    // Territories acquired by Charles the Bold (1467-1477)
    'guelders': {
        type: "Feature",
        properties: {
            name: "Duchy of Guelders",
            acquisition: 1473,
            ruler: "Charles the Bold",
            category: "charles-le-temeraire"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [5.2, 52.1], [6.0, 52.2], [6.2, 51.9], [6.0, 51.6],
                [5.8, 51.3], [5.3, 51.4], [5.0, 51.6], [5.0, 51.9], [5.2, 52.1]
            ]]
        }
    },
    'lorraine': {
        type: "Feature",
        properties: {
            name: "Duchy of Lorraine",
            acquisition: 1475,
            ruler: "Charles the Bold",
            category: "charles-le-temeraire"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [5.5, 49.2], [6.2, 49.3], [7.1, 49.2], [7.2, 48.9],
                [7.0, 48.4], [6.0, 48.2], [5.5, 48.5], [5.4, 49.0], [5.5, 49.2]
            ]]
        }
    },
    'alsace': {
        type: "Feature",
        properties: {
            name: "Upper Alsace",
            acquisition: 1469,
            ruler: "Charles the Bold",
            category: "charles-le-temeraire"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [7.2, 48.0], [7.6, 48.1], [7.7, 47.8], [7.6, 47.4],
                [7.2, 47.3], [7.0, 47.5], [7.0, 47.8], [7.2, 48.0]
            ]]
        }
    }
};

// Color mapping based on the map legend
export const territoryColorMap = {
    "apanage": "#8B4513",          // Dark brown - Apanage of Philip the Bold
    "philippe-le-hardi": "#CD853F", // Light brown - Possessions of Philip the Bold
    "philippe-le-bon": "#FFD700",   // Gold/Yellow - Acquisitions of Philip the Good
    "charles-le-temeraire": "#9ACD32" // Light green - Conquests of Charles the Bold
};

// Helper function to get styling for territories
export function getTerritoryStyle(category: keyof typeof territoryColorMap) {
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