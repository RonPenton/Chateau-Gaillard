import Random from 'ts-random';
import { generateStats, Stats } from './stats';


export function randomize(template: MonsterTemplate, random: Random): Monster {
    return {
        ...template,
        stats: generateStats(random),
    }
}

export type MonsterTemplate = {
    name: string;
    nonplaceable?: true;
    noncombat?: true;
}

export type Monster = MonsterTemplate & {
    stats: Stats;
}

export const monsterTemplates: { [key: string]: MonsterTemplate } = {
    Dwarf: { name: "Dwarf", noncombat: true, nonplaceable: true },
    Monoceros: { name: "Monoceros" },
    Paradrus: { name: "Paradrus" },
    Vampyre: { name: "Vampyre" },
    Wrnach: { name: "Wrnach" },
    GiollaDacker: { name: "Giolla Dacker" },
    Kraken: { name: "Kraken" },
    FenrisWolf: { name: "Fenris Wolf" },
    Calopus: { name: "Calopus" },
    Basilisk: { name: "Basilisk" },
    Grimoire: { name: "Grimoire" },
    FlyingBuffalo: { name: "Flying Buffalo" },
    Berserkoid: { name: "Berserkoid" },
    Wyrm: { name: "Wyrm" },
    Crowtherwood: { name: "Crowtherwood" },
    Gygax: { name: "Gygax" },
    Ragnarok: { name: "Ragnarok" },
    Fomorine: { name: "Fomorine" },
    Gafgygr: { name: "Gafgygr" },
    Grendel: { name: "Grendel" }
}
