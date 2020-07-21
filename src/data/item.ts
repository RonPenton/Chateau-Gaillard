import { Monster } from "./monster";

export type ItemType = "weapon" | "treasure" | "heals" | "special" | "key" | "chest";

export type BaseItem = {
    name: string;
    value: number;
}

export type Weapon = BaseItem & {
    type: 'weapon';
    description: string | ((monster: Monster) => string),
    strength: number;
}

export type GenericItem = BaseItem & {
    type: "treasure" | "heals" | "special" | "key" | "chest";
}

export type Item = Weapon | GenericItem;

export const Items: { [key: string]: Item } = {
    Axe: { name: "Axe", value: 0, type: "weapon", description: "YOUR AXE COULD BE HANDY", strength: 1 },
    Sword: { name: "Sword", value: 0, type: "weapon", description: "YOUR SKILL WITH THE SWORD MAY STAND YOU IN GOOD STEAD", strength: 2 },
    Dagger: { name: "Dagger", value: 0, type: "weapon", description: (m) => `YOUR DAGGER IS USEFUL AGAINST ${m.name.toUpperCase()}`, strength: 3 },
    Mace: { name: "Mace", value: 0, type: "weapon", description: "THE MACE WILL MAKE SHORT WORK OF IT", strength: 4 },
    Quarterstaff: { name: "Quarterstaff", value: 0, type: "weapon", description: "YOUR QUARTERSTAFF WILL GIVE IT NO QUARTER...", strength: 5 },
    MorningStar: { name: "Morning Star", value: 0, type: "weapon", description: (m) => `SWINGING YOUR MORNING STAR MAY INFLICT HEAVY WOUNDS ON THE ${m.name.toUpperCase()}`, strength: 6 },
    Falchion: { name: "Falchion", value: 0, type: "weapon", description: "A FALCHION IS A USEFUL WEAPON", strength: 7 },
    CrystalBall: { name: "Crystal Ball", value: 99, type: "treasure" },
    Amulet: { name: "Amulet", value: 247, type: "treasure" },
    EbonyRing: { name: "Ebony Ring", value: 166, type: "treasure" },
    Gems: { name: "Gems", value: 462, type: "treasure" },
    MysticScroll: { name: "Mystic Scroll", value: 195, type: "special" },
    HealingPotion: { name: "Healing Potion", value: 231, type: "heals" },
    DilithiumCrystals: { name: "Dilithium Crystals", value: 162, type: "treasure" },
    CopperPieces: { name: "Copper Pieces", value: 27, type: "treasure" },
    Diadem: { name: "Diadem", value: 141, type: "treasure" },
    SilverKey: { name: "Silver Key", value: 0, type: "key" },
    GoldenKey: { name: "Golden Key", value: 0, type: "key" },
    ChestOfStone: { name: "Chest of Stone", value: 0, type: "chest" },
    ChestOfIron: { name: "Chest of Iron", value: 0, type: "chest" }
};
