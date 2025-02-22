// src/lib/data/geojson-integration.ts
import type { Territory } from '../types/territory';

// GeoJSON ID to region mapping based on analysis of geographical coordinates
export const geoJSONRegionMap: { [key: string]: string } = {
    // Flanders region (Northern Belgium)
    "339ebf897d68cef6f0352a517466781a": "flanders",
    "9727158d1b6ad55e608cadb45db45cc4": "western-flanders",

    // Brabant region (Central Belgium)
    "6872b37e5d09d2d3c36084e4e345c51f": "brabant",
    "90d631817456692300156c5b80ca3aad": "lower-brabant",
    "169d3647083fb30e9130f619f1d0cc37": "eastern-brabant",

    // Artois region (Northern France)
    "21a4983d7796f90a8f56c053764e0ebc": "artois",
    "7b6f6865cc47943e22c4098f81ae86ac": "western-artois",
    "1a3178fb2f5da36c0e3dfdff43429409": "southern-artois",
    "77a6bae59836248852df893a46ccec5a": "central-artois",

    // Hainaut region (Southern Belgium)
    "bc1d276bc39243fea9e9a1a8a213f373": "hainaut",

    // Holland & Zeeland regions (Netherlands)
    "cbbebe3645c8d871937caf6ba09a2fc0": "holland",
    "b60df5a512af3bc01145c9c2a14310b8": "upper-holland",
    "2a33608b10cd4e970b56158b11d016a0": "zeeland",

    // Eastern territories
    "657cf0c84997413fe62521b00e77e0fb": "namur",
    "80806e3e74e424de54d0327abf0efbcf": "limburg",
    "b2cc4792e6ba5617c3fcf414bcd92876": "lower-guelders",
    "eb01de2ce44a9c0a68cf174c5026da60": "upper-guelders",
    "efb76751738cb6b2c1635f0a0e23a1a5": "guelders",

    // Luxembourg region
    "1b460ed212c464b1082b3c9a1e65a808": "luxembourg",
    "b164477028e330f99cb918c57b88bb61": "eastern-luxembourg",

    // French territories
    "b6552099383c46fb03a6dbc4f5e6401e": "northern-picardy",
    "a7fbb7e1abc34304009646295de94000": "northern-burgundy",

    // Lorraine region (Eastern France)
    "b9835da567e72c5b2fa7dbd90df77805": "lorraine-border",
    "f19fcb7b26f8e6a768971f46bc6b680c": "upper-lorraine"
};

// Maps regions to their historical acquisition data
type RegionAcquisitionData = {
    [key: string]: {
        year: number;
        ruler: string;
        category: string;
    };
};

export const regionAcquisitionData: RegionAcquisitionData = {
    // Core territories - Apanage of Philip the Bold
    "northern-burgundy": { year: 1363, ruler: "Philip the Bold", category: "apanage" },

    // Territories from Philip the Bold's Marriage to Margaret of Flanders (1384)
    "flanders": { year: 1384, ruler: "Philip the Bold", category: "philippe-le-hardi" },
    "western-flanders": { year: 1384, ruler: "Philip the Bold", category: "philippe-le-hardi" },
    "artois": { year: 1384, ruler: "Philip the Bold", category: "philippe-le-hardi" },
    "western-artois": { year: 1384, ruler: "Philip the Bold", category: "philippe-le-hardi" },
    "southern-artois": { year: 1384, ruler: "Philip the Bold", category: "philippe-le-hardi" },
    "central-artois": { year: 1384, ruler: "Philip the Bold", category: "philippe-le-hardi" },
    "northern-picardy": { year: 1384, ruler: "Philip the Bold", category: "philippe-le-hardi" },

    // Territories acquired by Philip the Good (1419-1467)
    "brabant": { year: 1430, ruler: "Philip the Good", category: "philippe-le-bon" },
    "lower-brabant": { year: 1430, ruler: "Philip the Good", category: "philippe-le-bon" },
    "eastern-brabant": { year: 1430, ruler: "Philip the Good", category: "philippe-le-bon" },
    "limburg": { year: 1430, ruler: "Philip the Good", category: "philippe-le-bon" },
    "namur": { year: 1429, ruler: "Philip the Good", category: "philippe-le-bon" },
    "hainaut": { year: 1433, ruler: "Philip the Good", category: "philippe-le-bon" },
    "holland": { year: 1433, ruler: "Philip the Good", category: "philippe-le-bon" },
    "upper-holland": { year: 1433, ruler: "Philip the Good", category: "philippe-le-bon" },
    "zeeland": { year: 1433, ruler: "Philip the Good", category: "philippe-le-bon" },
    "luxembourg": { year: 1443, ruler: "Philip the Good", category: "philippe-le-bon" },
    "eastern-luxembourg": { year: 1443, ruler: "Philip the Good", category: "philippe-le-bon" },

    // Territories acquired by Charles the Bold (1467-1477)
    "guelders": { year: 1473, ruler: "Charles the Bold", category: "charles-le-temeraire" },
    "upper-guelders": { year: 1473, ruler: "Charles the Bold", category: "charles-le-temeraire" },
    "lower-guelders": { year: 1473, ruler: "Charles the Bold", category: "charles-le-temeraire" },
    "lorraine-border": { year: 1475, ruler: "Charles the Bold", category: "charles-le-temeraire" },
    "upper-lorraine": { year: 1475, ruler: "Charles the Bold", category: "charles-le-temeraire" }
};

// Readable names for GeoJSON regions
export const regionDisplayNames: { [key: string]: string } = {
    "flanders": "County of Flanders",
    "western-flanders": "Western Flanders",
    "brabant": "Duchy of Brabant",
    "lower-brabant": "Lower Brabant",
    "eastern-brabant": "Eastern Brabant",
    "artois": "County of Artois",
    "western-artois": "Western Artois",
    "southern-artois": "Southern Artois",
    "central-artois": "Central Artois",
    "hainaut": "County of Hainaut",
    "holland": "County of Holland",
    "upper-holland": "Northern Holland",
    "zeeland": "County of Zeeland",
    "namur": "County of Namur",
    "limburg": "Duchy of Limburg",
    "luxembourg": "Duchy of Luxembourg",
    "eastern-luxembourg": "Eastern Luxembourg",
    "guelders": "Duchy of Guelders",
    "upper-guelders": "Upper Guelders",
    "lower-guelders": "Lower Guelders",
    "northern-burgundy": "Northern Burgundy",
    "northern-picardy": "Northern Picardy",
    "lorraine-border": "Western Lorraine",
    "upper-lorraine": "Upper Lorraine"
};

// Get style for a territory based on its category
export function getGeoJSONTerritoryStyle(category: 'apanage' | 'philippe-le-hardi' | 'philippe-le-bon' | 'charles-le-temeraire') {
    const colorMap = {
        "apanage": "#8B4513",          // Dark brown - Apanage of Philip the Bold
        "philippe-le-hardi": "#CD853F", // Light brown - Possessions of Philip the Bold
        "philippe-le-bon": "#FFD700",   // Gold/Yellow - Acquisitions of Philip the Good
        "charles-le-temeraire": "#9ACD32" // Light green - Conquests of Charles the Bold
    };

    return {
        color: '#333',
        weight: 1,
        opacity: 0.8,
        fillColor: colorMap[category] || "#808080",
        fillOpacity: 0.5,
        dashArray: '3'
    };
}

// Function to filter GeoJSON features based on selected year
export function filterGeoJSONByYear(geoJSON: any, selectedYear: number) {
    if (!geoJSON || !geoJSON.features) return { type: "FeatureCollection", features: [] };

    const filteredFeatures = geoJSON.features.filter((feature: { id: string | number; }) => {
        const regionId = geoJSONRegionMap[feature.id as string];
        const regionData = regionAcquisitionData[regionId];

        return regionData && regionData.year <= selectedYear;
    });

    return {
        type: "FeatureCollection",
        features: filteredFeatures
    };
}

// Get region info by GeoJSON feature ID
export function getRegionInfoByFeatureId(featureId: string) {
    const regionId = geoJSONRegionMap[featureId];
    if (!regionId) return null;

    const acquisitionData = regionAcquisitionData[regionId];
    if (!acquisitionData) return null;

    return {
        id: regionId,
        name: regionDisplayNames[regionId] || regionId,
        year: acquisitionData.year,
        ruler: acquisitionData.ruler,
        category: acquisitionData.category
    };
}