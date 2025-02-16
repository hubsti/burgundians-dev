// src/lib/data/rulers.ts

export interface Ruler {
    name: string;
    reignStart: number;
    reignEnd: number;
    image: string;
    coatOfArms: string;
    description: string;
    titles: string[];
}

export const burgundianRulers: Ruler[] = [
    {
        name: "Philip the Bold",
        reignStart: 1363,
        reignEnd: 1404,
        image: "/rulers/philip-the-bold.jpg",
        coatOfArms: "/coats-of-arms/philip-the-bold.svg",
        description: "First Duke of Burgundy from the House of Valois, founder of the Burgundian state",
        titles: [
            "Duke of Burgundy",
            "Count of Flanders",
            "Count of Artois",
            "Count of Burgundy"
        ]
    },
    {
        name: "John the Fearless",
        reignStart: 1404,
        reignEnd: 1419,
        image: "/rulers/john-the-fearless.jpg",
        coatOfArms: "/coats-of-arms/john-the-fearless.svg",
        description: "Second Valois Duke of Burgundy, known for his conflict with Louis of Orléans",
        titles: [
            "Duke of Burgundy",
            "Count of Flanders",
            "Count of Artois",
            "Count of Burgundy",
            "Count of Nevers"
        ]
    },
    {
        name: "Philip the Good",
        reignStart: 1419,
        reignEnd: 1467,
        image: "/rulers/philip-the-good.jpg",
        coatOfArms: "/coats-of-arms/philip-the-good.svg",
        description: "Most powerful Duke of Burgundy, greatly expanded the territory",
        titles: [
            "Duke of Burgundy",
            "Count of Flanders",
            "Count of Artois",
            "Count of Burgundy",
            "Duke of Brabant",
            "Duke of Limbourg",
            "Count of Holland",
            "Count of Zeeland",
            "Count of Hainaut",
            "Count of Namur"
        ]
    },
    {
        name: "Charles the Bold",
        reignStart: 1467,
        reignEnd: 1477,
        image: "/rulers/charles-the-bold.jpg",
        coatOfArms: "/coats-of-arms/charles-the-bold.svg",
        description: "Last Duke of Burgundy, died at the Battle of Nancy",
        titles: [
            "Duke of Burgundy",
            "Count of Flanders",
            "Count of Artois",
            "Count of Burgundy",
            "Duke of Brabant",
            "Duke of Limbourg",
            "Count of Holland",
            "Count of Zeeland",
            "Count of Hainaut",
            "Duke of Guelders",
            "Duke of Luxembourg"
        ]
    }
];