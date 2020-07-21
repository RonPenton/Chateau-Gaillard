import Random from 'ts-random';
import { generateStats } from './stats';
import { Item } from './item';


export function randomize(random: Random) {
    return {
        stats: generateStats(random),
        cash: 0,
        room: 27,
        killed: 0,
        quitQuotient: 1,
        score: 0,
        dead: false,
        win: false,
        foundChest: false,
        items: [] as Item[]
    }
}

export type Player = ReturnType<typeof randomize>;
