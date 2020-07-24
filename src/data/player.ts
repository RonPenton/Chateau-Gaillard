import Random from 'ts-random';
import { generateStats } from './stats';
import { Item } from './item';
import _ from 'lodash';

export function randomize(random: Random) {
    return {
        stats: generateStats(random),
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

export function getCash(player: Player): number {
    return _.sumBy(player.items, x => x.value);
}

export type Player = ReturnType<typeof randomize>;
