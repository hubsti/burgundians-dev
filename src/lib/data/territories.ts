// src/lib/data/territories.ts

import type { Territory } from '../types/territory';

export const burgundianTerritories: Territory[] = [
    // Core Burgundian Territories
    {
        id: "burgundy",
        name: "Duchy of Burgundy",
        acquisition: 1363,
        coordinates: [47.3220, 5.0415],
        ruler: "Philip the Bold",
        coatOfArms: "/coats-of-arms/duchy-of-burgundy.svg",
        properties: {
            capital: "Dijon",
            previousRuler: "John II of France",
            acquisitionMethod: "Royal grant as an apanage from King John II of France",
            category: "apanage"
        }
    },
    {
        id: "nevers",
        name: "County of Nevers",
        acquisition: 1384,
        coordinates: [47.0, 3.15],
        ruler: "Philip the Bold",
        coatOfArms: "/coats-of-arms/county-of-nevers.svg",
        properties: {
            capital: "Nevers",
            previousRuler: "Louis II of Male",
            acquisitionMethod: "Marriage inheritance through Margaret of Flanders",
            category: "philippe-le-hardi"
        }
    },

    // Northern French Territories
    {
        id: "flanders",
        name: "County of Flanders",
        acquisition: 1384,
        coordinates: [51.0543, 3.7174],
        ruler: "Philip the Bold",
        coatOfArms: "/coats-of-arms/county-of-flanders.svg",
        properties: {
            capital: "Ghent",
            previousRuler: "Louis II of Male",
            acquisitionMethod: "Marriage inheritance through Margaret of Flanders",
            category: "philippe-le-hardi"
        }
    },
    {
        id: "artois",
        name: "County of Artois",
        acquisition: 1384,
        coordinates: [50.2929, 2.7779],
        ruler: "Philip the Bold",
        coatOfArms: "/coats-of-arms/county-of-artois.svg",
        properties: {
            capital: "Arras",
            previousRuler: "Louis II of Male",
            acquisitionMethod: "Marriage inheritance through Margaret of Flanders",
            category: "philippe-le-hardi"
        }
    },
    {
        id: "franche-comte",
        name: "County of Burgundy",
        acquisition: 1384,
        coordinates: [47.2184, 6.0187],
        ruler: "Philip the Bold",
        coatOfArms: "/coats-of-arms/free-county-of-burgundy.svg",
        properties: {
            capital: "Besançon",
            previousRuler: "Margaret of Flanders",
            acquisitionMethod: "Marriage inheritance through Margaret of Flanders",
            category: "philippe-le-hardi"
        }
    },

    // Philip the Good's Acquisitions
    {
        id: "brabant",
        name: "Duchy of Brabant",
        acquisition: 1430,
        coordinates: [50.8503, 4.3517],
        ruler: "Philip the Good",
        coatOfArms: "/coats-of-arms/duchy-of-brabant.svg",
        properties: {
            capital: "Brussels",
            previousRuler: "Philip of Saint-Pol",
            acquisitionMethod: "Inheritance after death of Philip of Saint-Pol",
            category: "philippe-le-bon"
        }
    },
    {
        id: "limburg",
        name: "Duchy of Limburg",
        acquisition: 1430,
        coordinates: [50.8798, 5.7124],
        ruler: "Philip the Good",
        coatOfArms: "/coats-of-arms/duchy-of-limburg.svg",
        properties: {
            capital: "Limbourg",
            previousRuler: "Philip of Saint-Pol",
            acquisitionMethod: "Inherited with Brabant",
            category: "philippe-le-bon"
        }
    },
    {
        id: "namur",
        name: "County of Namur",
        acquisition: 1429,
        coordinates: [50.4650, 4.8650],
        ruler: "Philip the Good",
        coatOfArms: "/coats-of-arms/county-of-namur.svg",
        properties: {
            capital: "Namur",
            previousRuler: "John III of Namur",
            acquisitionMethod: "Purchase from John III of Namur",
            category: "philippe-le-bon"
        }
    },
    {
        id: "holland",
        name: "County of Holland",
        acquisition: 1433,
        coordinates: [52.3676, 4.9041],
        ruler: "Philip the Good",
        coatOfArms: "/coats-of-arms/county-of-holland.svg",
        properties: {
            capital: "Amsterdam",
            previousRuler: "Jacqueline of Bavaria",
            acquisitionMethod: "Treaty of Delft",
            category: "philippe-le-bon"
        }
    },
    {
        id: "zeeland",
        name: "County of Zeeland",
        acquisition: 1433,
        coordinates: [51.5142, 3.8497],
        ruler: "Philip the Good",
        coatOfArms: "/coats-of-arms/county-of-zeeland.svg",
        properties: {
            capital: "Middelburg",
            previousRuler: "Jacqueline of Bavaria",
            acquisitionMethod: "Treaty of Delft",
            category: "philippe-le-bon"
        }
    },
    {
        id: "hainaut",
        name: "County of Hainaut",
        acquisition: 1433,
        coordinates: [50.4541, 3.9563],
        ruler: "Philip the Good",
        coatOfArms: "/coats-of-arms/county-of-hainaut.svg",
        properties: {
            capital: "Mons",
            previousRuler: "Jacqueline of Bavaria",
            acquisitionMethod: "Treaty of Delft",
            category: "philippe-le-bon"
        }
    },
    {
        id: "luxembourg",
        name: "Duchy of Luxembourg",
        acquisition: 1443,
        coordinates: [49.8153, 6.1296],
        ruler: "Philip the Good",
        coatOfArms: "/coats-of-arms/duchy-of-luxembourg.svg",
        properties: {
            capital: "Luxembourg City",
            previousRuler: "Elizabeth of Görlitz",
            acquisitionMethod: "Purchase from Elizabeth of Görlitz",
            category: "philippe-le-bon"
        }
    },

    // Charles the Bold's Expansions
    {
        id: "guelders",
        name: "Duchy of Guelders",
        acquisition: 1473,
        coordinates: [51.9851, 5.8987],
        ruler: "Charles the Bold",
        coatOfArms: "/coats-of-arms/duchy-of-guelders.svg",
        properties: {
            capital: "Arnhem",
            previousRuler: "Arnold, Duke of Guelders",
            acquisitionMethod: "Purchase from Duke Arnold",
            category: "charles-le-temeraire"
        }
    },
    {
        id: "upper-alsace",
        name: "Upper Alsace",
        acquisition: 1469,
        coordinates: [47.9520, 7.4443],
        ruler: "Charles the Bold",
        coatOfArms: "/coats-of-arms/upper-alsace.svg",
        properties: {
            capital: "Colmar",
            previousRuler: "Sigismund of Habsburg",
            acquisitionMethod: "Pledged by Sigismund of Habsburg",
            category: "charles-le-temeraire"
        }
    },
    {
        id: "lorraine",
        name: "Duchy of Lorraine",
        acquisition: 1475,
        coordinates: [48.6921, 6.1844],
        ruler: "Charles the Bold",
        coatOfArms: "/coats-of-arms/duchy-of-lorraine.svg",
        properties: {
            capital: "Nancy",
            previousRuler: "René II of Lorraine",
            acquisitionMethod: "Military conquest",
            category: "charles-le-temeraire"
        }
    },

    // Additional Southern Territories
    {
        id: "charolais",
        name: "County of Charolais",
        acquisition: 1384,
        coordinates: [46.4352, 4.2777],
        ruler: "Philip the Bold",
        coatOfArms: "/coats-of-arms/county-of-charolais.svg",
        properties: {
            capital: "Charolles",
            previousRuler: "Louis II of Male",
            acquisitionMethod: "Marriage inheritance through Margaret of Flanders",
            category: "philippe-le-hardi"
        }
    },
    {
        id: "macon",
        name: "County of Mâcon",
        acquisition: 1384,
        coordinates: [46.3066, 4.8330],
        ruler: "Philip the Bold",
        coatOfArms: "/coats-of-arms/county-of-macon.svg",
        properties: {
            capital: "Mâcon",
            previousRuler: "Louis II of Male",
            acquisitionMethod: "Marriage inheritance through Margaret of Flanders",
            category: "philippe-le-hardi"
        }
    },
    {
        id: "auxerre",
        name: "County of Auxerre",
        acquisition: 1384,
        coordinates: [47.7979, 3.5714],
        ruler: "Philip the Bold",
        coatOfArms: "/coats-of-arms/county-of-auxerre.svg",
        properties: {
            capital: "Auxerre",
            previousRuler: "Louis II of Male",
            acquisitionMethod: "Marriage inheritance through Margaret of Flanders",
            category: "philippe-le-hardi"
        }
    },
    {
        id: "bar",
        name: "Duchy of Bar",
        acquisition: 1475,
        coordinates: [48.7744, 5.1581],
        ruler: "Charles the Bold",
        coatOfArms: "/coats-of-arms/duchy-of-bar.svg",
        properties: {
            capital: "Bar-le-Duc",
            previousRuler: "René of Anjou",
            acquisitionMethod: "Military conquest",
            category: "charles-le-temeraire"
        }
    }
];
// Helper function to get territories for a specific year
export function getTerritoriesForYear(year: number): Territory[] {
    return burgundianTerritories.filter(territory => territory.acquisition <= year);
}

// Helper function to get territories by ruler
export function getTerritoriesByRuler(ruler: string): Territory[] {
    return burgundianTerritories.filter(territory => territory.ruler === ruler);
}

// Helper function to get territory by ID
export function getTerritoryById(id: string): Territory | undefined {
    return burgundianTerritories.find(territory => territory.id === id);
}

// Helper function to get territories acquired in a specific year
export function getTerritoriesAcquiredInYear(year: number): Territory[] {
    return burgundianTerritories.filter(territory => territory.acquisition === year);
}

// Helper function to get territories by acquisition method
export function getTerritoriesByAcquisitionMethod(method: string): Territory[] {
    return burgundianTerritories.filter(territory =>
        territory.properties?.acquisitionMethod?.toLowerCase().includes(method.toLowerCase())
    );
}

// Helper function to group territories by category
export function getTerritoriesByCategory(): Record<string, Territory[]> {
    return burgundianTerritories.reduce((acc, territory) => {
        const category = territory.properties?.category || 'uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(territory);
        return acc;
    }, {} as Record<string, Territory[]>);
}