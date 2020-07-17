import Random from 'ts-random';

const statNames = ['strength', 'charisma', 'dexterity', 'intelligence', 'wisdom', 'constitution'] as const;

type Stats = typeof statNames[number];

type PlayerStats = {
    [K in Stats]: number;
};

function generateStat(random: Random): number {
    return random.int(1, 6) + random.int(1, 6) + random.int(1, 6) + 3;
}

function generateStats(random: Random): PlayerStats {
    let stats: any = {};
    for (const stat of statNames) {
        stats[stat] = generateStat(random);
    }
    return stats;
}



export function randomize(random: Random) {
    return {
        stats: generateStats(random),
        cash: 0,
        room: 27,
        killed: 0,
        quitQuotient: 1,
        foundChest: false
    }
}

export type Player = ReturnType<typeof randomize>;
