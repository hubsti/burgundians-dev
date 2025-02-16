

export type EventType = 'battle' | 'marriage' | 'death' | 'birth' | 'treaty' |
    'political' | 'cultural' | 'religious' | 'acquisition' |
    'loss' | 'natural' | 'foundation' | 'construction' | 'art';

export interface HistoricalEvent {
    year: number;
    description: string;
    type: EventType;
}

export const historicalEvents: HistoricalEvent[] = [
    // Initial territorial events
 
    {
        year: 1363,
        description: "Transfer of Burgundy to Philip the Bold, founder of the Burgundian branch of House of Valois, by John the Good",
        type: "acquisition"
    },
    {
        year: 1369,
        description: "Marriage of Philip the Bold to Margaret III of Flanders",
        type: "marriage"
    },
    {
        year: 1371,
        description: "Birth of John the Fearless",
        type: "birth"
    },
    {
        year: 1375,
        description: "Flood, storm surge floods Koudekerke and Elmare",
        type: "natural"
    },
    {
        year: 1377,
        description: "Philip the Bold purchases land in Champmol ",
        type: "acquisition"
    },
    {
        year: 1377,
        description: "Death of Edward III",
        type: "death"
    },
    {
        year: 1378,
        description: "Great Western Schism (Rome versus Avignon, two popes)",
        type: "religious"
    },
    {
        year: 1379,
        description: "French-Flemish crisis begins",
        type: "political"
    },
    {
        year: 1379,
        description: "Ghent prevents canal construction in Bruges",
        type: "political"
    },
    {
        year: 1380,
        description: "Death of Charles V",
        type: "death"
    },
    {
        year: 1382,
        description: "Battle of Westrozebeke ",
        type: "battle"
    },
    {
        year: 1382,
        description: "Death of Philip van Artevelde in Battle of Westrozebeke",
        type: "battle"
    },
    {
        year: 1383,
        description: "Siege of Ypres",
        type: "battle"
    },
    {
        year: 1383,
        description: "Cornerstone laid for Champmol monastery",
        type: "cultural"
    },
    {
        year: 1384,
        description: "Death of Louis II de Male - Philip the Bold becomes Count of Flanders",
        type: "acquisition"
    },
    {
        year: 1385,
        description: "Double wedding in Cambrai",
        type: "marriage"
    },
    {
        year: 1385,
        description: "Siege of Damme",
        type: "battle"
    },
    {
        year: 1385,
        description: "Peace of Tournai",
        type: "political"
    },
    {
        year: 1386,
        description: "Failed invasion of England from Sluis",
        type: "battle"
    },
    {
        year: 1388,
        description: "Campaign against the Duke of Guelders",
        type: "battle"
    },
    {
        year: 1389,
        description: "Joyous Entry of Isabella of Bavaria into Paris",
        type: "political"
    },
    {
        year: 1390,
        description: "Dijon Altarpiece, triptych by painter Melchior Broederlam and sculptor Jacques de Baerze",
        type: "art"
    },
    {
        year: 1392,
        description: "First bout of madness of Charles VI",
        type: "political"
    },
    {
        year: 1394,
        description: "Death of Clement VII, new Pope Benedict XIII",
        type: "religious"
    },
    {
        year: 1394,
        description: "Flood - Ostend moves inland",
        type: "natural"
    },
    {
        year: 1395,
        description: "Great Wine Law of Philip the Bold",
        type: "cultural"
    },
    {
        year: 1396,
        description: "Crusade of John the Fearless - Battle of Nicopolis",
        type: "battle"
    },
    {
        year: 1397,
        description: "Johan Maelwael becomes court painter to Philip the Bold",
        type: "art"
    },
    {
        year: 1400,
        description: "Philip the Bold establishes Cour amoureuse",
        type: "political"
    },
    {
        year: 1404,
        description: "Death of Philip the Bold and succession of John the Fearless",
        type: "political"
    },
    {
        year: 1405,
        description: "Alliance between Burgundy, Brabant, and Limburg with Holland, Zeeland, and Hainaut",
        type: "political"
    },
    {
        year: 1405,
        description:  "Joyous Entry of John the Fearless",
        type: "political"
    },
    {
        year: 1405,
        description: "Language accommodations for Flemings",
        type: "political"
    },
    {
        year: 1406,
        description: "Anthony of Burgundy becomes Duke of Brabant",
        type: "cultural"
    },
    {
        year: 1407,
        description: "Assassination of Louis of Orleans - Beginning of civil war between Burgundians and Armagnacs (peak 1407-1420)",
        type: "political"
    },
    {
        year: 1408,
        description: "Battle of Othée",
        type: "battle"
    },
    {
        year: 1410,
        description: "Foundation of John the Fearless Tower in Paris",
        type: "construction"
    },
    {
        year: 1411,
        description: "Philip the Good (then Count of Charolais) becomes permanent representative of his father in Ghent",
        type: "political"
    },
    {
        year: 1413,
        description: "Death of Henry IV",
        type: "political"
    },
    {
        year: 1414,
        description: "Council of Constance: end of Great Western Schism",
        type: "religious"
    },
    {
        year: 1414,
        description: "Jan Hus burned at stake",
        type: "religious"
    },
    {
        year: 1415,
        description: "Battle of Agincourt",
        type: "battle"
    },
    {
        year: 1416,
        description: "John IV (nephew of John the Fearless) becomes Duke of Brabant and Limburg",
        type: "political"
    },
    {
        year: 1417,
        description: "Death of William, Duke of Hainaut, Holland, and Zeeland - Jacqueline of Bavaria becomes Countess of Holland, Zeeland, and Hainaut",
        type: "political"
    },
    {
        year: 1418,
        description: "Marriage of John and Jacqueline - Holland, Zeeland, Hainaut, Brabant, Limburg increasingly connected to Burgundy",
        type: "political"
    },
    {
        year: 1419,
        description: "Assassination of John the Fearless, Philip the Good takes power",
        type: "political"
    },
    {
        year: 1420,
        description: "Treaty of Troyes, France in English hands",
        type: "treaty"
    },
    {
        year: 1421,
        description: "St. Elizabeth's Flood - Dozens of villages disappear under water",
        type: "natural"
    },
    {
        year: 1422,
        description: "Death of Henry V -  His son Henry VI becomes new King of England and France",
        type: "political"
    },
    {
        year: 1422,
        description: "Death of Charles VI, unsuccessful claims of heir Charles VII to the throne",
        type: "political"
    },
    {
        year: 1425,
        description: "University of Leuven founded",
        type: "foundation"
    },
    {
        year: 1426,
        description: "Battle of Brouwershaven (victory of Philip the Good)",
        type: "battle"
    },
    {
        year: 1426,
        description: "Multiple battles between Jacqueline of Bavaria and Philip the Good",
        type: "battle"
    },
    {
        year: 1427,
        description: "Siege of Zevenbergen",
        type: "battle"
    },
    {
        year: 1427,
        description: "Battle of Wieringen",
        type: "battle"
    },
    {
        year: 1427,
        description: "Death of John IV of Brabant",
        type: "battle"
    },
    {
        year: 1428,
        description: "Pope annuls marriage of Jacqueline of Bavaria to Humphrey of Gloucester",
        type: "political"
    },
    {
        year: 1428,
        description: "Siege of Gouda",
        type: "political"
    },
    {
        year: 1428,
        description: "Kiss of Delft",
        type: "political"
    },
    {
        year: 1429,
        description: "Battle of the Herrings",
        type: "acquisition"
    },
    {
        year: 1429,
        description: "Joan of Arc liberates Orleans, Charles VII crowned in Reims",
        type: "acquisition"
    },
    {
        year: 1429,
        description: "County of Namur acquired by Burgundians",
        type: "acquisition"
    },
    {
        year: 1430,
        description: "Marriage of Philip the Good to Isabella of Portugal",
        type: "marriage"
    },
    {
        year: 1430,
        description: "Foundation of Order of the Golden Fleece",
        type: "marriage"
    },
    {
        year: 1430,
        description: "Joan of Arc captured by Burgundians, then imprisoned by English",
        type: "marriage"
    },
    {
        year: 1431,
        description: "Joan of Arc burned at stake (Rouen)",
        type: "death"
    },
    {
        year: 1432,
        description: "Inauguration of the Ghent Altarpiece (Adoration of the Mystic Lamb by van Eyck brothers)",
        type: "art"
    },
    {
        year: 1433,
        description: "Birth of Charles the Bold",
        type: "birth"
    },
    {
        year: 1434,
        description: "First common currency of Burgundy, 'vierlander', in general use from 1443",
        type: "art"
    },
    {
        year: 1435,
        description: "Peace of Arras (France and Burgundy)",
        type: "treaty"
    },
    {
        year: 1436,
        description: "Death of Jacqueline of Bavaria",
        type: "political"
    },
    {
        year: 1436,
        description: "Revolt in Bruges begins",
        type: "political"
    },
    {
        year: 1439,
        description: "Flemish-English and Dutch-English trade pacts",
        type: "treaty"
    },
    {
        year: 1440,
        description: "Construction of Bladelin Court (Pieter de Leestmaker) on Naaldenstraat in Bruges",
        type: "construction"
    },
    {
        year: 1441,
        description: "Luxembourg comes under Burgundian control (hereditary from 1451)",
        type: "acquisition"
    },
    {
        year: 1443,
        description: "Truce between Burgundy and England",
        type: "treaty"
    },
    {
        year: 1443,
        description: "Cornerstone laid for Hôtel-Dieu in Beaune",
        type: "treaty"
    },
    {
        year: 1445,
        description: "Nativity Triptych (Bladelin Triptych) by Rogier van der Weyden",
        type: "art"
    },
    {
        year: 1447,
        description: "Salt affair in Ghent, beginning of great Ghent revolt",
        type: "political"
    },
    {
        year: 1452,
        description: "Opening of Hôtel-Dieu in Beaune",
        type: "art"
    },
    {
        year: 1453,
        description: "Battle of Castillon, end of Hundred Years' War (May 29) ",
        type: "battle"
    },
    {
        year: 1453,
        description: "Fall of Constantinople (July 17)",
        type: "battle"
    },
    {
        year: 1453,
        description: "Battle of Gavere, end of Ghent revolt (July 23)",
        type: "battle"
    },
    {
        year: 1454,
        description: "Feast of the Pheasant in Lille (February 17)",
        type: "marriage"
    },
    {
        year: 1454,
        description: "Marriage of Charles the Bold to Isabella of Bourbon",
        type: "marriage"
    },
    {
        year: 1456,
        description: "Siege of Utrecht and Deventer",
        type: "political"
    },
    {
        year: 1456,
        description: "Louis, French heir, granted political asylum in Burgundy",
        type: "political"
    },
    {
        year: 1457,
        description: "Birth of Mary of Burgundy",
        type: "birth"
    },
    {
        year: 1461,
        description: "Death of Charles VII - Louis XI becomes new King of France",
        type: "political"
    },
    {
        year: 1461,
        description: " Henry VI deposed - Edward IV becomes new King of England ",
        type: "political"
    },
    {
        year: 1462,
        description: "Death of Nicolas Rolin",
        type: "death"
    },
    {
        year: 1463,
        description: "François Villon's Ballad of the Hanged",
        type: "cultural"
    },
    {
        year: 1464,
        description: "First assembly of States General of Holland",
        type: "political"
    },
    {
        year: 1465,
        description: "Battle of Montlhéry",
        type: "battle"
    },
    {
        year: 1466,
        description: "Destruction of Dinant",
        type: "battle"
    },
    {
        year: 1467,
        description: "Death of Philip the Good",
        type: "political"
    },
    {
        year: 1467,
        description: "Joyous Entry of Charles the Bold into Ghent (rebellion)",
        type: "political"
    },
    {
        year: 1468,
        description: "Marriage of Charles the Bold to Margaret of York",
        type: "marriage"
    },
    {
        year: 1468,
        description: "Treaty of Péronne",
        type: "marriage"
    },
    {
        year: 1468,
        description: "Destruction of Liège",
        type: "marriage"
    },
    {
        year: 1469,
        description: "Charles the Bold purchases Upper Alsace",
        type: "acquisition"
    },
    {
        year: 1470,
        description: "Henry VI briefly regains English throne",
        type: "political"
    },
    {
        year: 1471,
        description: "Death of Henry VI, Edward IV returns to throne",
        type: "death"
    },
    {
        year: 1473,
        description: "Charles the Bold acquires the Duchy of Guelders (and County of Zutphen)",
        type: "acquisition"
    },
    {
        year: 1473,
        description: "Ordinances of Thionville, financial, military and legal reforms, parliament established in Mechelen (which becomes capital of northern regions)",
        type: "political"
    },
    {
        year: 1473,
        description: "Hugo van der Goes begins work on the Portinari Triptych (Adoration of the Shepherds)",
        type: "art"
    },
    {
        year: 1474,
        description: "Charles the Bold's speech in Dijon",
        type: "political"
    },
    {
        year: 1474,
        description: "Siege of Neuss, Frederick III sends relief army - Peter von Hagenbach executed",
        type: "battle"
    },
    {
        year: 1474,
        description: "René II of Lorraine declares war. Swiss and Alsatian cities declare war",
        type: "battle"
    },
    {
        year: 1475,
        description: "Successful siege of Nancy - Lorraine under Burgundian control ",
        type: "acquisition"
    },
    {
        year: 1475,
        description: "States General of the Netherlands refuse further financial support for Charles's wars",
        type: "acquisition"
    },
    {
        year: 1476,
        description: "Battle of Grandson (March)",
        type: "battle"
    },
    {
        year: 1476,
        description: "Battle of Murten (June)",
        type: "battle"
    },
    {
        year: 1476,
        description: "Beginning of the Siege of Nancy (October)",
        type: "battle"
    },
    {
        year: 1477,
        description: "Battle of Nancy (January 5) ",
        type: "political"
    },
    {
        year: 1477,
        description: "Death of Charles the Bold",
        type: "political"
    },
    {
        year: 1477,
        description: "Great Privilege",
        type: "political"
    },
    {
        year: 1477,
        description: "Marriage of Mary of Burgundy to Maximilian I Habsburg (of Austria)",
        type: "political"
    },
];


// Helper functions for event filtering
export function getEventsByType(events: HistoricalEvent[], type: EventType): HistoricalEvent[] {
    return events.filter(event => event.type === type);
}

export function getEventsByYear(events: HistoricalEvent[], year: number): HistoricalEvent[] {
    return events.filter(event => event.year === year);
}

export function getEventsByYearRange(events: HistoricalEvent[], startYear: number, endYear: number): HistoricalEvent[] {
    return events.filter(event => event.year >= startYear && event.year <= endYear);
}

// Event type colors for UI
export const eventTypeColors = {
    battle: 'bg-red-500',
    marriage: 'bg-pink-500',
    death: 'bg-gray-800',
    birth: 'bg-green-500',
    treaty: 'bg-blue-500',
    political: 'bg-purple-500',
    cultural: 'bg-yellow-500',
    religious: 'bg-indigo-500',
    acquisition: 'bg-emerald-500',
    loss: 'bg-orange-500',
    natural: 'bg-cyan-500',
    foundation: 'bg-amber-500',
    construction: 'bg-lime-500',
    art: 'bg-violet-500'
} as const;

// Event type icons (you can use these with a UI icon library)
export const eventTypeIcons = {
    battle: '⚔️',
    marriage: '💍',
    death: '†',
    birth: '👶',
    treaty: '📜',
    political: '👑',
    cultural: '🎭',
    religious: '⛪',
    acquisition: '➕',
    loss: '➖',
    natural: '🌊',
    foundation: '🏛️',
    construction: '🏗️',
    art: '🎨'
} as const;


// Optional enhanced type if you want to add more metadata later
export type EnhancedHistoricalEvent = {
    year: number;
    description: string;
    type?: 'battle' | 'marriage' | 'death' | 'treaty' | 'political' | 'cultural' | 'religious';
    location?: {
        lat: number;
        lng: number;
    };
    rulers?: string[];
    territories?: string[];
};