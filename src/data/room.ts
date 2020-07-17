import cloneDeep from 'clone-deep';
import { Items, Item } from './item';

const directions = ['north', 'south', 'east', 'west', 'up', 'down'] as const;
const shortDirections = ['n', 's', 'e', 'w', 'u', 'd'] as const;

type Direction = typeof directions[number];

type exit = {
    direction: Direction;
    room: number;
}



export interface Room {
    id: number;
    name: string;
    description: string;
    exits: exit[];
    requiresKey?: Item;
    items: Item[];
    monster?: unknown;
    noItems?: true;
    noMonsters?: true;
}

export const getRooms = () => {
    const clone = cloneDeep(rooms);



    return clone;
}

const rooms: Room[] = [
    {
        id: 0,
        name: "dummy",
        description: "This room exists because BASIC indexes by 1 and not 0.",
        exits: [],
        items: []
    },
    {
        id: 1,
        name: "Battlements",
        description: "",
        items: [Items.SilverKey],
        exits: [{ direction: 'north', room: 1 }, { direction: 'south', room: 1 }, { direction: 'east', room: 2 }, { direction: 'west', room: 1 }, { direction: 'up', room: 1 }, { direction: 'down', room: 1 }]
    },
    {
        id: 2,
        name: "Magicians' Room",
        description: "",
        items: [],
        exits: [{ direction: 'south', room: 29 }, { direction: 'east', room: 3 }, { direction: 'west', room: 1 }]
    },
    {
        id: 3,
        name: "Straw Mattress",
        description: "",
        items: [],
        exits: [{ direction: 'south', room: 8 }, { direction: 'east', room: 4 }, { direction: 'west', room: 2 }]
    },
    {
        id: 4,
        name: "Wooden Panels",
        description: "",
        items: [],
        exits: [{ direction: 'south', room: 9 }, { direction: 'east', room: 5 }, { direction: 'west', room: 3 }]
    },
    {
        id: 5,
        name: "Living Stone Death Spell",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 5 }, { direction: 'south', room: 5 }, { direction: 'east', room: 5 }, { direction: 'west', room: 5 }, { direction: 'up', room: 5 }, { direction: 'down', room: 5 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 6,
        name: "L-Shaped Room",
        description: "",
        items: [],
        exits: [{ direction: 'south', room: 11 }, { direction: 'east', room: 7 }, { direction: 'west', room: 30 }]
    },
    {
        id: 7,
        name: "Archway",
        description: "",
        items: [],
        exits: [{ direction: 'east', room: 8 }, { direction: 'west', room: 6 }]
    },
    {
        id: 8,
        name: "Kitchen",
        description: "",
        items: [],
        requiresKey: Items.SilverKey,
        exits: [{ direction: 'north', room: 3 }, { direction: 'west', room: 7 }]
    },
    {
        id: 9,
        name: "Black Dragon Picture",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 4 }, { direction: 'south', room: 10 }]
    },
    {
        id: 10,
        name: "Landing",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 9 }, { direction: 'down', room: 39 }]
    },
    {
        id: 11,
        name: "Stone Archway",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 6 }, { direction: 'up', room: 28 }]
    },
    {
        id: 12,
        name: "Whirling Smoke",
        description: "",
        items: [],
        exits: [{ direction: 'south', room: 16 }, { direction: 'east', room: 13 }]
    },
    {
        id: 13,
        name: "Charisma Reduction Spell",
        description: "",
        items: [Items.ChestOfStone],
        exits: [{ direction: 'east', room: 14 }, { direction: 'west', room: 12 }]
    },
    {
        id: 14,
        name: "White Marble",
        description: "",
        items: [],
        exits: [{ direction: 'south', room: 18 }, { direction: 'west', room: 13 }]
    },
    {
        id: 15,
        name: "Red Drapes",
        description: "",
        items: [],
        exits: [{ direction: 'south', room: 21 }, { direction: 'east', room: 16 }]
    },
    {
        id: 16,
        name: "Bright Yellow",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 12 }, { direction: 'south', room: 20 }, { direction: 'east', room: 19 }, { direction: 'west', room: 15 }],
        noMonsters: true
    },
    {
        id: 17,
        name: "Fall From Ladder",
        description: "",
        items: [],
        exits: [{ direction: 'east', room: 18 }, { direction: 'up', room: 27 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 18,
        name: "Hall of Mirrors",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 14 }, { direction: 'south', room: 19 }, { direction: 'east', room: 31 }, { direction: 'west', room: 17 }]
    },
    {
        id: 19,
        name: "Long Corridor",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 18 }, { direction: 'south', room: 23 }, { direction: 'west', room: 16 }]
    },
    {
        id: 20,
        name: "Timbered Ceiling",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 16 }, { direction: 'south', room: 25 }]
    },
    {
        id: 21,
        name: "Alcove",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 15 }, { direction: 'south', room: 24 }, { direction: 'west', room: 32 }]
    },
    {
        id: 22,
        name: "Courtyard",
        description: "",
        items: [],
        exits: [{ direction: 'south', room: 26 }, { direction: 'east', room: 23 }]
    },
    {
        id: 23,
        name: "Dying Flowers",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 19 }, { direction: 'west', room: 22 }]
    },
    {
        id: 24,
        name: "Cavern",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 21 }]
    },
    {
        id: 25,
        name: "Games Room",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 20 }, { direction: 'south', room: 25 }, { direction: 'east', room: 25 }, { direction: 'west', room: 25 }, { direction: 'up', room: 25 }, { direction: 'down', room: 25 }]
    },
    {
        id: 26,
        name: "Potting Shed",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 22 }, { direction: 'down', room: 33 }]
    },
    {
        id: 27,
        name: "Ramshackle Shed",
        description: "",
        items: [],
        exits: [{ direction: 'down', room: 17 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 28,
        name: "End",
        description: "",
        items: [],
        exits: [{ direction: 'down', room: 11 }],
        noItems: true
    },
    {
        id: 29,
        name: "Death in a Trap",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 29 }, { direction: 'south', room: 29 }, { direction: 'east', room: 29 }, { direction: 'west', room: 29 }, { direction: 'up', room: 29 }, { direction: 'down', room: 29 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 30,
        name: "Pit of Flames",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 30 }, { direction: 'south', room: 30 }, { direction: 'east', room: 30 }, { direction: 'west', room: 30 }, { direction: 'up', room: 30 }, { direction: 'down', room: 30 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 31,
        name: "Pool of Acid",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 31 }, { direction: 'south', room: 31 }, { direction: 'east', room: 31 }, { direction: 'west', room: 31 }, { direction: 'up', room: 31 }, { direction: 'down', room: 31 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 32,
        name: "Funnel-Web Spider",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 32 }, { direction: 'south', room: 32 }, { direction: 'east', room: 32 }, { direction: 'west', room: 32 }, { direction: 'up', room: 32 }, { direction: 'down', room: 32 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 33,
        name: "Hovel",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 43 }, { direction: 'south', room: 42 }, { direction: 'east', room: 40 }, { direction: 'up', room: 26 }]
    },
    {
        id: 34,
        name: "Uneven Floor",
        description: "",
        items: [],
        requiresKey: Items.GoldenKey,
        exits: [{ direction: 'south', room: 38 }, { direction: 'east', room: 35 }]
    },
    {
        id: 35,
        name: "Torture Chamber",
        description: "",
        items: [],
        exits: [{ direction: 'south', room: 43 }, { direction: 'east', room: 36 }, { direction: 'west', room: 34 }]
    },
    {
        id: 36,
        name: "Dungeon",
        description: "",
        items: [],
        exits: [{ direction: 'south', room: 40 }, { direction: 'east', room: 37 }, { direction: 'west', room: 35 }]
    },
    {
        id: 37,
        name: "Gargoyle's Lair",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 37 }, { direction: 'south', room: 37 }, { direction: 'east', room: 37 }, { direction: 'west', room: 37 }, { direction: 'up', room: 37 }, { direction: 'down', room: 37 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 38,
        name: "Dancing Hall",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 34 }, { direction: 'east', room: 43 }, { direction: 'west', room: 39 }]
    },
    {
        id: 39,
        name: "Dingy Pit",
        description: "",
        items: [],
        exits: [{ direction: 'east', room: 38 }, { direction: 'up', room: 10 }]
    },
    {
        id: 40,
        name: "Trophy Room",
        description: "",
        items: [Items.ChestOfIron],
        exits: [{ direction: 'north', room: 36 }, { direction: 'south', room: 41 }, { direction: 'east', room: 44 }, { direction: 'west', room: 33 }]
    },
    {
        id: 41,
        name: "Secret Room",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 40 }, { direction: 'south', room: 41 }, { direction: 'east', room: 41 }, { direction: 'west', room: 42 }, { direction: 'up', room: 41 }, { direction: 'down', room: 41 }]
    },
    {
        id: 42,
        name: "Room of Shadows",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 33 }, { direction: 'south', room: 42 }, { direction: 'east', room: 41 }, { direction: 'west', room: 42 }, { direction: 'up', room: 42 }, { direction: 'down', room: 42 }]
    },
    {
        id: 43,
        name: "Gloomy Passage",
        description: "",
        items: [],
        exits: [{ direction: 'north', room: 35 }, { direction: 'south', room: 33 }, { direction: 'west', room: 38 }]
    },
    {
        id: 44,
        name: "Rear Turret",
        description: "",
        items: [Items.GoldenKey],
        exits: [{ direction: 'west', room: 40 }]
    }
]
