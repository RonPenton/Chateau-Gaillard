import cloneDeep from 'clone-deep';
import { Items, Item } from './item';
import Random from 'ts-random';
import { monsterTemplates, randomize as randomizeMonster, Monster } from './monster';
import { Player } from './player';

export const directions = ['north', 'south', 'east', 'west', 'up', 'down'] as const;
export const shortDirections = ['n', 's', 'e', 'w', 'u', 'd'] as const;
import { delay } from '../delay';

type Direction = typeof directions[number];

type exit = {
    direction: Direction;
    room: number;
}

export type Print = (text: string) => Promise<void>;
export type PrinterArgs = {
    random: Random,
    print: Print
};
export type Printer = (args: PrinterArgs) => Promise<void>;

export interface Room {
    id: number;
    name: string;
    description: string | string[] | Printer;
    exits: exit[];
    requiresKey?: Item;
    items: Item[];
    monster?: Monster;
    noItems?: true;
    noMonsters?: true;
    event?: (player: Player) => void;
}

export const getRooms = (random: Random) => {
    const clone = cloneDeep(rooms);

    fillItems(clone, random);
    fillMonsters(clone, random);

    return clone;
}

const getRoom = (random: Random, map: Room[], condition: (room: Room) => boolean): Room => {
    const room = random.pick(map);
    if (condition(room))
        return room;
    return getRoom(random, map, condition);
}

const fillItems = (map: Room[], random: Random) => {
    const itemNames = Object.keys(Items);
    for (const itemName of itemNames) {
        const item = Items[itemName];

        // chests and keys are pre-placed.
        if (item.type == 'chest' || item.type == 'key')
            continue;

        const room = getRoom(random, map, room => !room.noItems && room.items.length == 0);
        room.items.push(item);
    }
}

const fillMonsters = (map: Room[], random: Random) => {
    const monsterNames = Object.keys(monsterTemplates)
    for (const monsterName of monsterNames) {
        const template = monsterTemplates[monsterName];
        const monster = randomizeMonster(template, random);
        if (monster.nonplaceable)
            continue;

        const room = getRoom(random, map, room => !room.noMonsters && !room.monster);
        room.monster = monster;
    }
}

const rooms: Room[] = [
    {
        id: 1,
        name: "Battlements",
        description: "You are out on the battlements of the chateau. There is only one way back",
        items: [Items.SilverKey],
        exits: [{ direction: 'north', room: 1 }, { direction: 'south', room: 1 }, { direction: 'east', room: 2 }, { direction: 'west', room: 1 }, { direction: 'up', room: 1 }, { direction: 'down', room: 1 }]
    },
    {
        id: 2,
        name: "Magicians' Room",
        description: "This is an eerie room, where once magicians convorted with evil sprites and werebeasts... Exits lead in three directions An evil smell comes from the south",
        items: [],
        exits: [{ direction: 'south', room: 29 }, { direction: 'east', room: 3 }, { direction: 'west', room: 1 }]
    },
    {
        id: 3,
        name: "Straw Mattress",
        description: "An old straw mattress lies in one corner...it has been ripped apart to find any treasure which was hidden in it Light comes fitfully from a window to the north, and around the doors to south, east and west",
        items: [],
        exits: [{ direction: 'south', room: 8 }, { direction: 'east', room: 4 }, { direction: 'west', room: 2 }]
    },
    {
        id: 4,
        name: "Wooden Panels",
        description: async ({ random, print }) => {
            await print("This wooden-panelled room makes you feel damp and uncomfortable");
            random.chance(50)
                ? await print("A mouse scampers across the floor")
                : await print("A bat flits across the ceiling");
            await print("There are three doors leading from this room, one made of iron Your sixth sense warns you to choose carefully...");
        },
        items: [],
        exits: [{ direction: 'south', room: 9 }, { direction: 'east', room: 5 }, { direction: 'west', room: 3 }]
    },
    {
        id: 5,
        name: "Living Stone Death Spell",
        description: "You ignore your intuition... A Spell of Living Stone, primed to trap the first intruder has been set on you...with your last seconds of life you have time only to feel profound regret...",
        event: (player) => {
            player.score = 50;
            player.dead = true;
        },
        items: [],
        exits: [{ direction: 'north', room: 5 }, { direction: 'south', room: 5 }, { direction: 'east', room: 5 }, { direction: 'west', room: 5 }, { direction: 'up', room: 5 }, { direction: 'down', room: 5 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 6,
        name: "L-Shaped Room",
        description: "You are in an L-shaped room Heavy parchment lines the walls You can see through an archway to the east...but that is not the only exit from this room",
        items: [],
        exits: [{ direction: 'south', room: 11 }, { direction: 'east', room: 7 }, { direction: 'west', room: 30 }]
    },
    {
        id: 7,
        name: "Archway",
        description: "There is an archway to the west, leading to an L-shaped room a door leads in the opposite direction",
        items: [],
        exits: [{ direction: 'east', room: 8 }, { direction: 'west', room: 6 }]
    },
    {
        id: 8,
        name: "Kitchen",
        description: ["This must be the Chateau's main kitchen but any food left here has long rotted away...",
            "A door leads to the north, and there is one to the west"],
        items: [],
        requiresKey: Items.SilverKey,
        exits: [{ direction: 'north', room: 3 }, { direction: 'west', room: 7 }]
    },
    {
        id: 9,
        name: "Black Dragon Picture",
        description: ["You find yourself in a small, room...which makes you feel claustrophobic...",
            "There is a picture of a black dragon painted on the north wall, above the door..."],
        items: [],
        exits: [{ direction: 'north', room: 4 }, { direction: 'south', room: 10 }]
    },
    {
        id: 10,
        name: "Landing",
        description: "A stairwell ends in this room, which more of a landing than a real room. The door to the north is made of iron, which has rusted over the centuries...",
        items: [],
        exits: [{ direction: 'north', room: 9 }, { direction: 'down', room: 39 }]
    },
    {
        id: 11,
        name: "Stone Archway",
        description: ["There is a stone archway to the north, You are in a very long room.",
            "Fresh air blows down some stairs and rich red drapes cover the walls...You can see doors to the south and east"],
        items: [],
        exits: [{ direction: 'north', room: 6 }, { direction: 'up', room: 28 }]
    },
    {
        id: 12,
        name: "Whirling Smoke",
        description: ["You have entered a room filled with swirling, choking smoke.",
            "you must leave quickly to remain healthy enough to continue your chosen quest..."],
        items: [],
        exits: [{ direction: 'south', room: 16 }, { direction: 'east', room: 13 }]
    },
    {
        id: 13,
        name: "Charisma Reduction Spell",
        description: ["There is a mirror in the corner you glance at it, and feel suddenly very ill.",
            "You realise the looking-glass has been enfused with a Spell of Charisma Reduction...",
            "oh dear..."],
        event: (player) => {
            player.stats.charisma--;
        },
        items: [Items.ChestOfStone],
        exits: [{ direction: 'east', room: 14 }, { direction: 'west', room: 12 }]
    },
    {
        id: 14,
        name: "White Marble",
        description: "This room is richly finished, with a white marble floor. Strange footprints lead to the two doors from this room...Dare you follow them?",
        items: [],
        exits: [{ direction: 'south', room: 18 }, { direction: 'west', room: 13 }]
    },
    {
        id: 15,
        name: "Red Drapes",
        description: ["You are in a long, long hallway, lined on each side with rich, red drapes...",
            "They are parted halfway down the east wall where there is a door"],
        items: [],
        exits: [{ direction: 'south', room: 21 }, { direction: 'east', room: 16 }]
    },
    {
        id: 16,
        name: "Bright Yellow",
        description: ["Someone has spent a long time painting this room a bright yellow...",
            "You remember reading that yellow Is the Ancient Oracle's Color of Warning..."],
        items: [],
        exits: [{ direction: 'north', room: 12 }, { direction: 'south', room: 20 }, { direction: 'east', room: 19 }, { direction: 'west', room: 15 }],
        noMonsters: true,
        monster: { ...monsterTemplates.Dwarf, stats: { strength: 1000, charisma: 1000, dexterity: 1000, intelligence: 1000, wisdom: 1000, constitution: 1000 } }
    },
    {
        id: 17,
        name: "Fall From Ladder",
        description: ["As you stumble down the ladder you fall into the room. The ladder crashes down behind you...there is now no way back...",
            "A small door leads east from this very cramped room..."],
        items: [],
        exits: [{ direction: 'east', room: 18 }, { direction: 'up', room: 27 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 18,
        name: "Hall of Mirrors",
        description: ["You find yourself in a Hall of Mirrors... and see yourself reflected a hundred times or more...",
            "Through the bright glare you can make out doors in all directions...",
            "You notice the mirrors around the east door are heavily tarnished..."],
        items: [],
        exits: [{ direction: 'north', room: 14 }, { direction: 'south', room: 19 }, { direction: 'east', room: 31 }, { direction: 'west', room: 17 }]
    },
    {
        id: 19,
        name: "Long Corridor",
        description: async ({ print }) => {
            await print("You find yourself in a long corridor");
            await delay(1000);
            await print("Your footsteps echo as you walk");
        },
        items: [],
        exits: [{ direction: 'north', room: 18 }, { direction: 'south', room: 23 }, { direction: 'west', room: 16 }]
    },
    {
        id: 20,
        name: "Timbered Ceiling",
        description: async ({ print }) => {
            await print("You feel as you've been wandering around this chateau for ever... and you begin to despair of ever escaping...");
            await print("Still, you can't get too depressed, but must struggle on. Looking around, you see you are in a room which has a heavy timbered ceiling, and white roughly-finished walls...");
            await print("There are two doors...");
            await delay(1000);
        },
        items: [],
        exits: [{ direction: 'north', room: 16 }, { direction: 'south', room: 25 }]
    },
    {
        id: 21,
        name: "Alcove",
        description: async ({ print }) => {
            await print("You are in a small alcove. You look around...");
            await print("but can see nothing in gloom...");
            await print("perhaps if you wait a while your eyes will adjust to the murky dark of this alcove...");
            await delay(2000);
        },
        items: [],
        exits: [{ direction: 'north', room: 15 }, { direction: 'south', room: 24 }, { direction: 'west', room: 32 }]
    },
    {
        id: 22,
        name: "Courtyard",
        description: "A dried-up fountain stands in the center of this courtyard, which once held beautiful flowers...but have long-since died...",
        items: [],
        exits: [{ direction: 'south', room: 26 }, { direction: 'east', room: 23 }]
    },
    {
        id: 23,
        name: "Dying Flowers",
        description: ["The scent of dying flowers fills this brightly-lit room...",
            "There are two exits from it.."],
        items: [],
        exits: [{ direction: 'north', room: 19 }, { direction: 'west', room: 22 }]
    },
    {
        id: 24,
        name: "Cavern",
        description: "This is a round stone cavern off the side of the alcove to your north...",
        items: [],
        exits: [{ direction: 'north', room: 21 }]
    },
    {
        id: 25,
        name: "Games Room",
        description: "You are in an enormous circular room, which looks as if it was used as a games room. Rubble covers the floor, partially blocking the only exit...",
        items: [],
        exits: [{ direction: 'north', room: 20 }, { direction: 'south', room: 25 }, { direction: 'east', room: 25 }, { direction: 'west', room: 25 }, { direction: 'up', room: 25 }, { direction: 'down', room: 25 }]
    },
    {
        id: 26,
        name: "Potting Shed",
        description: "Through the dim mustiness of this small potting shed you can see a stairwell...",
        items: [],
        exits: [{ direction: 'north', room: 22 }, { direction: 'down', room: 33 }]
    },
    {
        id: 27,
        name: "Ramshackle Shed",
        description: async ({ print }) => {
            await print("You begin this Adventure in a small wood outside the Chateau...");
            await delay(1000);
            await print("While out walking one day, you come across a small, ramshackle shed in the woods. Entering it, you see a hole in one corner...an old ladder leads down from the hole...");
        },
        items: [],
        exits: [{ direction: 'down', room: 17 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 28,
        name: "End",
        description: async ({ print }) => {
            await print("How wonderful! Fresh air, sunlight...");
            await delay(1000);
            await print("Birds are singing...you are free at last....");
        },
        event: (player) => {
            player.win = true;
        },
        items: [],
        exits: [{ direction: 'down', room: 11 }],
        noItems: true
    },
    {
        id: 29,
        name: "Death in a Trap",
        description: async ({ print }) => {
            await print("The smell came from bodies rotting in huge traps...");
            await delay(1000);
            await print("One springs shut on you, trapping you forever");
        },
        event: (player) => {
            player.score = 100;
            player.quitQuotient = 3.5;
            player.dead = true;
        },
        items: [],
        exits: [{ direction: 'north', room: 29 }, { direction: 'south', room: 29 }, { direction: 'east', room: 29 }, { direction: 'west', room: 29 }, { direction: 'up', room: 29 }, { direction: 'down', room: 29 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 30,
        name: "Pit of Flames",
        description: async ({ random, print }) => {
            await print("You fall into a pit of flames...");
            while (random.chance(30)) {
                await print("You fall into a pit of flames...");
            }
        },
        event: (player) => {
            player.score = 10;
            player.quitQuotient = 3.4;
            player.dead = true;
        },
        items: [],
        exits: [{ direction: 'north', room: 30 }, { direction: 'south', room: 30 }, { direction: 'east', room: 30 }, { direction: 'west', room: 30 }, { direction: 'up', room: 30 }, { direction: 'down', room: 30 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 31,
        name: "Pool of Acid",
        description: async ({ print }) => {
            await print("Aaaaahhh...you have fallen into");
            await delay(3000);
            await print("a pool of acid...now you know - too late - why the mirrors were so badly tarnished");
        },
        event: (player) => {
            player.score = 20;
            player.quitQuotient = 3;
            player.dead = true;
        },
        items: [],
        exits: [{ direction: 'north', room: 31 }, { direction: 'south', room: 31 }, { direction: 'east', room: 31 }, { direction: 'west', room: 31 }, { direction: 'up', room: 31 }, { direction: 'down', room: 31 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 32,
        name: "Funnel-Web Spider",
        description: async ({ print }) => {
            await print("It's too bad you chose that exit from the alcove...");
            await delay(1000);
            await print("A giant Funnel-Web Spider leaps on you...");
            await print("and before you can react bites you on the neck...");
            await print("you have 10 seconds to live...");
            for (let t = 10; t > 0; t--) {
                await print(t.toString());
                await delay(1000);
            }
        },
        event: (player) => {
            player.score = 3;
            player.quitQuotient = 5;
            player.dead = true;
        },
        items: [],
        exits: [{ direction: 'north', room: 32 }, { direction: 'south', room: 32 }, { direction: 'east', room: 32 }, { direction: 'west', room: 32 }, { direction: 'up', room: 32 }, { direction: 'down', room: 32 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 33,
        name: "Hovel",
        description: "A stairwell leads into this room, a poor and common hovel with many doors and exits...",
        items: [],
        exits: [{ direction: 'north', room: 43 }, { direction: 'south', room: 42 }, { direction: 'east', room: 40 }, { direction: 'up', room: 26 }]
    },
    {
        id: 34,
        name: "Uneven Floor",
        description: "It is hard to see in this room, and you slip slightly on the uneven, rocky floor...",
        items: [],
        requiresKey: Items.GoldenKey,
        exits: [{ direction: 'south', room: 38 }, { direction: 'east', room: 35 }]
    },
    {
        id: 35,
        name: "Torture Chamber",
        description: ["Horrors! This room was once the torture chamber of the Chateau..",
            "Skeletons lie on the floor, still with chains around the bones..."],
        items: [],
        exits: [{ direction: 'south', room: 43 }, { direction: 'east', room: 36 }, { direction: 'west', room: 34 }]
    },
    {
        id: 36,
        name: "Dungeon",
        description: async ({ print }) => {
            await print("Another room with very unpleasant memories...");
            await delay(1000);
            await print("This foul hole was used as the Chateau dungeon....");
        },
        items: [],
        exits: [{ direction: 'south', room: 40 }, { direction: 'east', room: 37 }, { direction: 'west', room: 35 }]
    },
    {
        id: 37,
        name: "Gargoyle's Lair",
        description: async ({ print }) => {
            await print("Oh no, this is a Gargoyle's lair...");
            await delay(1000);
            await print("It has been held prisoner here for three hundred years...");
            await delay(1000);
            await print("In his frenzy he thrashes out at you...");
            await delay(1000);
            await print("and...");
            await delay(1000);
            await print("...breaks your neck!!");
        },
        event: (player) => {
            player.score = 0;
            player.quitQuotient = 3;
            player.dead = true;
        },
        items: [],
        exits: [{ direction: 'north', room: 37 }, { direction: 'south', room: 37 }, { direction: 'east', room: 37 }, { direction: 'west', room: 37 }, { direction: 'up', room: 37 }, { direction: 'down', room: 37 }],
        noItems: true,
        noMonsters: true
    },
    {
        id: 38,
        name: "Dancing Hall",
        description: async ({ print }) => {
            await print("This was the Lower Dancing Hall... With doors to the north, the east and to the west, you would seem to be able to flee any danger...");
            await delay(1000);
        },
        items: [],
        exits: [{ direction: 'north', room: 34 }, { direction: 'east', room: 43 }, { direction: 'west', room: 39 }]
    },
    {
        id: 39,
        name: "Dingy Pit",
        description: "This is a dingy pit at the foot of some extremely dubious-looking stairs. A door leads to the east...",
        items: [],
        exits: [{ direction: 'east', room: 38 }, { direction: 'up', room: 10 }]
    },
    {
        id: 40,
        name: "Trophy Room",
        description: ["Doors open to each compass point from the Trophy Room of the Chateau...",
            "The heads of strange creatures shot by the ancestral owners are mounted high up on each wall..."],
        items: [Items.ChestOfIron],
        exits: [{ direction: 'north', room: 36 }, { direction: 'south', room: 41 }, { direction: 'east', room: 44 }, { direction: 'west', room: 33 }]
    },
    {
        id: 41,
        name: "Secret Room",
        description: async ({ print }) => {
            await print("You have stumbled on a secret room...");
            await delay(1300);
            await print("Down here, eons ago, the ancient Necromancers of Thorin plied their evil craft...and the remnant of their spells hangs heavy on the air...");
        },
        items: [],
        exits: [{ direction: 'north', room: 40 }, { direction: 'south', room: 41 }, { direction: 'east', room: 41 }, { direction: 'west', room: 42 }, { direction: 'up', room: 41 }, { direction: 'down', room: 41 }]
    },
    {
        id: 42,
        name: "Room of Shadows",
        description: "Cobwebs brush your face as you make your way through the gloom of this room of shadows...",
        items: [],
        exits: [{ direction: 'north', room: 33 }, { direction: 'south', room: 42 }, { direction: 'east', room: 41 }, { direction: 'west', room: 42 }, { direction: 'up', room: 42 }, { direction: 'down', room: 42 }]
    },
    {
        id: 43,
        name: "Gloomy Passage",
        description: "This gloomy passage lies at the intersection of three rooms...",
        items: [],
        exits: [{ direction: 'north', room: 35 }, { direction: 'south', room: 33 }, { direction: 'west', room: 38 }]
    },
    {
        id: 44,
        name: "Rear Turret",
        description: "You are in the rear turret room, below the extreme western wall of the ancient chateau...",
        items: [Items.GoldenKey],
        exits: [{ direction: 'west', room: 40 }]
    }
]
