// src/lib/data/territories.ts

import type { Territory } from '../types/territory';

export const burgundianTerritories: Territory[] = [
    {
        id: "holland",
        name: "County of Holland",
        acquisition: 1433,
        coordinates: [52.3676, 4.9041], // Amsterdam area
        ruler: "Philip the Good",
        properties: {
            capital: "Amsterdam",
            previousRuler: "Jacqueline of Bavaria"
        }
    },
    {
        id: "zeeland",
        name: "County of Zeeland",
        acquisition: 1433,
        coordinates: [51.5142, 3.8497], // Middelburg area
        ruler: "Philip the Good",
        properties: {
            capital: "Middelburg",
            previousRuler: "Jacqueline of Bavaria"
        }
    },
    {
        id: "flanders",
        name: "County of Flanders",
        acquisition: 1384,
        coordinates: [51.0543, 3.7174], // Ghent area
        ruler: "Philip the Bold",
        properties: {
            capital: "Ghent",
            previousRuler: "Louis II of Male"
        }
    },
    {
        id: "artois",
        name: "County of Artois",
        acquisition: 1384,
        coordinates: [50.2929, 2.7779], // Arras area
        ruler: "Philip the Bold",
        properties: {
            capital: "Arras"
        }
    },
    {
        id: "brabant",
        name: "Duchy of Brabant",
        acquisition: 1430,
        coordinates: [50.8503, 4.3517], // Brussels area
        ruler: "Philip the Good",
        properties: {
            capital: "Brussels",
            previousRuler: "Philip of Saint-Pol"
        }
    },
    {
        id: "limburg",
        name: "Duchy of Limburg",
        acquisition: 1430,
        coordinates: [50.8798, 5.7124], // Maastricht area
        ruler: "Philip the Good",
        properties: {
            capital: "Limbourg"
        }
    },
    {
        id: "luxembourg",
        name: "Duchy of Luxembourg",
        acquisition: 1443,
        coordinates: [49.8153, 6.1296], // Luxembourg city area
        ruler: "Philip the Good",
        properties: {
            capital: "Luxembourg City"
        }
    },
    {
        id: "burgundy",
        name: "Duchy of Burgundy",
        acquisition: 1363,
        coordinates: [47.3220, 5.0415], // Dijon area
        ruler: "Philip the Bold",
        properties: {
            capital: "Dijon",
            previousRuler: "John II of France"
        }
    },
    {
        id: "franche-comte",
        name: "Free County of Burgundy",
        acquisition: 1384,
        coordinates: [47.2184, 6.0187], // Besançon area
        ruler: "Philip the Bold",
        properties: {
            capital: "Besançon"
        }
    },
    {
        id: "namur",
        name: "County of Namur",
        acquisition: 1429,
        coordinates: [50.4650, 4.8650], // Namur area
        ruler: "Philip the Good",
        properties: {
            capital: "Namur"
        }
    },
    {
        id: "hainaut",
        name: "County of Hainaut",
        acquisition: 1433,
        coordinates: [50.4541, 3.9563], // Mons area
        ruler: "Philip the Good",
        properties: {
            capital: "Mons",
            previousRuler: "Jacqueline of Bavaria"
        }
    },
    {
        id: "guelders",
        name: "Duchy of Guelders",
        acquisition: 1473,
        coordinates: [51.9851, 5.8987], // Arnhem area
        ruler: "Charles the Bold",
        properties: {
            capital: "Arnhem"
        }
    },
    {
        id: "upper-alsace",
        name: "Upper Alsace",
        acquisition: 1469,
        coordinates: [47.9520, 7.4443], // Colmar area
        ruler: "Charles the Bold",
        properties: {
            capital: "Colmar"
        }
    },
    {
        id: "lorraine",
        name: "Duchy of Lorraine",
        acquisition: 1475,
        coordinates: [48.6921, 6.1844], // Nancy area
        ruler: "Charles the Bold",
        properties: {
            capital: "Nancy",
            previousRuler: "René II of Lorraine"
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