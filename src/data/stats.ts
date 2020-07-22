import Random from "ts-random";

export const statNames = ['strength', 'charisma', 'dexterity', 'intelligence', 'wisdom', 'constitution'] as const;

export type StatTypes = typeof statNames[number];

export type Stats = {
    [K in StatTypes]: number;
};

function generateStat(random: Random): number {
    return random.int(1, 6) + random.int(1, 6) + random.int(1, 6) + 3;
}

export function isDead(stats: Stats): boolean {
    return statNames.map(x => stats[x]).reduce((prev, cur) => prev * cur, 1) == 0
}

export function generateStats(random: Random): Stats {
    let stats: any = {};
    for (const stat of statNames) {
        stats[stat] = generateStat(random);
    }
    return stats;
}


