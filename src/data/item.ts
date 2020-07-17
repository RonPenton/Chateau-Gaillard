export type ItemType = "weapon" | "treasure" | "heals" | "special" | "key" | "chest";

export type Item = {
    name: string;
    value: number;
    type: ItemType;
}

export const Items: { [key: string]: Item } = {
    Axe: { name: "Axe", value: 0, type: "weapon" },
    Sword: { name: "Sword", value: 0, type: "weapon" },
    Dagger: { name: "Dagger", value: 0, type: "weapon" },
    Mace: { name: "Mace", value: 0, type: "weapon" },
    Quarterstaff: { name: "Quarterstaff", value: 0, type: "weapon" },
    MorningStar: { name: "Morning Star", value: 0, type: "weapon" },
    Falchion: { name: "Falchion", value: 0, type: "weapon" },
    CrystalBall: { name: "Crystal Ball", value: 99, type: "treasure" },
    Amulet: { name: "Amulet", value: 247, type: "treasure"},
    EbonyRing: { name: "Ebony Ring", value: 166, type: "treasure"},
    Gems: { name: "Gems", value: 462, type: "treasure"},
    MysticScroll: { name: "Mystic Scroll", value: 195, type: "special"},
    HealingPotion: { name: "Healing Potion", value: 231, type: "heals"},
    DilithiumCrystals: { name: "Dilithium Crystals", value: 162, type: "treasure"},
    CopperPieces: { name: "Copper Pieces", value: 27, type: "treasure"},
    Diadem: { name: "Diadem", value: 141, type: "treasure"},
    SilverKey: { name: "Silver Key", value: 0, type: "key"},
    GoldenKey: { name: "Golden Key", value: 0, type: "key"},
    ChestOfStone: { name: "Chest of Stone", value: 0, type: "chest"},
    ChestOfIron: { name: "Chest of Iron", value: 0, type: "chest"}
};
