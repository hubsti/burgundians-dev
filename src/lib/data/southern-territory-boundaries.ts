import type { Territory } from '../types/territory';

// GeoJSON feature ID to historical territory mapping
export const southernTerritoryMap: Record<string, {
    name: string;
    acquisition: number;
    ruler: string;
    category: 'apanage' | 'philippe-le-hardi' | 'philippe-le-bon' | 'charles-le-temeraire';
    capital?: string;
}> = {
    // Duchy of Burgundy Core Territories
    "10682f72040da05f39c3d797fbba62d5": {
        name: "County of Nevers",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi",
        capital: "Nevers"
    },
    "23f0c814001d0fd85ca47a7f0d23f147": {
        name: "Duchy of Burgundy",
        acquisition: 1363,
        ruler: "Philip the Bold",
        category: "apanage",
        capital: "Dijon"
    },
    "91f5d5ab7ef0fbb0a64510131569f8e5": {
        name: "County of Burgundy",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi",
        capital: "Besançon"
    },

    // Lorraine and Bar Territories
    "f715eda50d94b271cdf73a429ecf3ae6": {
        name: "Duchy of Bar",
        acquisition: 1475,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire"
    },
    "c65f5b868c497e7551605b2fb181ff72": {
        name: "Duchy of Lorraine",
        acquisition: 1475,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire",
        capital: "Nancy"
    },

    // Upper Alsace Region
    "997d3270378140858a93499d33922f7e": {
        name: "Upper Alsace",
        acquisition: 1469,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire",
        capital: "Mulhouse"
    },

    // Auxerre and Surrounding Areas
    "7eafa099ec1f9d75b92bdbc4c6a534aa": {
        name: "County of Auxerre",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi",
        capital: "Auxerre"
    },

    // Charolais and Mâcon
    "d734970cf353adc00cf727e0f0f6b880": {
        name: "County of Charolais",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi"
    },
    "e30ff1810a09f3e3c703857c59f474a2": {
        name: "County of Mâcon",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi",
        capital: "Mâcon"
    },

    // Eastern Territories
    "28f5a5bc5619c2a904a266c47bbe7194": {
        name: "Territories of Vôge",
        acquisition: 1475,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire"
    },

    // Additional administrative divisions
    "821f43709d3b8427959a92ea82fd6e3d": {
        name: "Northern Bar",
        acquisition: 1475,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire"
    },
    "7c0107899480558c9ce3d13f3beed1d3": {
        name: "Southern Bar",
        acquisition: 1475,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire"
    },
    
    // Territories near Lorraine
    "4c67280571fd718f6770cd6579aa2883": {
        name: "Territories of Metz",
        acquisition: 1475,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire"
    },
    "f0b179ea30aa17b6da7ddca45feca88b": {
        name: "Eastern Lorraine",
        acquisition: 1475,
        ruler: "Charles the Bold",
        category: "charles-le-temeraire"
    },

    // Burgundian Heartland Divisions
    "215fcd6a5d9347252cd3f042c6a592ce": {
        name: "Western Burgundy",
        acquisition: 1363,
        ruler: "Philip the Bold",
        category: "apanage"
    },
    "515feeb7886b06f829c620ef4a1aa3ca": {
        name: "Northern Burgundy",
        acquisition: 1363,
        ruler: "Philip the Bold",
        category: "apanage"
    },
    "2d340eb677adc0d192a464e68062e00a": {
        name: "Territories of Troyes",
        acquisition: 1384,
        ruler: "Philip the Bold",
        category: "philippe-le-hardi"
    }
};

// Color mapping (preserved from original)
export const territoryColorMap = {
    "apanage": "#8B4513",          // Dark brown - Apanage of Philip the Bold
    "philippe-le-hardi": "#CD853F", // Light brown - Possessions of Philip the Bold
    "philippe-le-bon": "#FFD700",   // Gold/Yellow - Acquisitions of Philip the Good
    "charles-le-temeraire": "#9ACD32" // Light green - Conquests of Charles the Bold
};

// Helper function to get styling for territories
export function getSouthernTerritoryStyle(category: keyof typeof territoryColorMap) {
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
export function getSouthernTerritoryInfo(featureId: string) {
    return southernTerritoryMap[featureId] || null;
}

// Function to filter features by year
export function filterSouthernTerritoriesByYear(geoJSON: any, selectedYear: number) {
    if (!geoJSON?.features) return null;
    
    return {
        type: "FeatureCollection",
        features: geoJSON.features.filter((feature: { id: string; }) => {
            const info = getSouthernTerritoryInfo(feature.id);
            return info && info.acquisition <= selectedYear;
        })
    };
}