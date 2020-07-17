import Random from 'ts-random';
import { generateStats } from './stats';


export function randomize(name: string, random: Random) {
    return {
        name,
        stats: generateStats(random),
    }
}

export type Monster = ReturnType<typeof randomize>;


export const monsterNames = [
    "Dwarf",
    "Monoceros",
    "Paradrus",
    "Vampyre",
    "Wrnach",
    "Giolla Dacker",
    "Kraken",
    "Fenris Wolf",
    "Calopus",
    "Basilisk",
    "Grimoire",
    "Flying Buffalo",
    "Berserkoid",
    "Wyrm",
    "Crowtherwood",
    "Gygax",
    "Ragnarok",
    "Fomorine",
    "Gafgygr",
    "Grendel"
]
