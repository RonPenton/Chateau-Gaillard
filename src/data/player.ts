import Random from 'ts-random';
import { generateStats } from './stats';


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
