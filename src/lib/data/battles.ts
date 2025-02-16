// src/lib/data/battles.ts

export interface BattleLocation {
    name: string;
    year: number;
    coordinates: [number, number]; // [latitude, longitude]
    description: string;
}

export const battles: BattleLocation[] = [
    {
        name: "Battle of Westrozebeke",
        year: 1382,
        coordinates: [50.9169, 3.0186],
        description: "Victory over Ghent rebels"
    },
    {
        name: "Battle of Othée",
        year: 1408,
        coordinates: [50.7144, 5.5930],
        description: "Battle in the Prince-Bishopric of Liège"
    },
    {
        name: "Battle of Agincourt",
        year: 1415,
        coordinates: [50.4633, 2.1397],
        description: "Major English victory in the Hundred Years' War"
    },
    {
        name: "Battle of Brouwershaven",
        year: 1426,
        coordinates: [51.7262, 3.9467],
        description: "Philip the Good's victory"
    },
    {
        name: "Battle of Gavere",
        year: 1453,
        coordinates: [50.9271, 3.6371],
        description: "End of Ghent revolt"
    },
    {
        name: "Battle of Montlhéry",
        year: 1465,
        coordinates: [48.6389, 2.3027],
        description: "Indecisive battle between Louis XI and League of the Public Weal"
    },
    {
        name: "Battle of Grandson",
        year: 1476,
        coordinates: [46.8112, 6.6455],
        description: "Swiss Confederacy defeats Charles the Bold"
    },
    {
        name: "Battle of Murten",
        year: 1476,
        coordinates: [46.9167, 7.1167],
        description: "Second major defeat of Charles the Bold"
    },
    {
        name: "Battle of Nancy",
        year: 1477,
        coordinates: [48.6921, 6.1844],
        description: "Final battle and death of Charles the Bold"
    }
];