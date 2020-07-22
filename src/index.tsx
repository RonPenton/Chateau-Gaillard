import React from "react";
import * as ReactDOM from 'react-dom';
import { bind } from "decko";

import { OutputArea } from "./OutputArea";
import { InputArea } from "./InputArea";
import { OutputText } from "./OutputArea";

import './index.scss';
import { Room, getRooms } from "./data/room";
import Random from "ts-random";
import { randomize as randomizePlayer, Player } from './data/player';
import { Monster } from "./data/monster";
import cloneDeep from "clone-deep";
import { delay } from "./delay";
import _, { first } from 'lodash';
import { Weapon, Fists } from "./data/item";
import { Stats, statNames, isDead } from "./data/stats";


export interface ClientState {
    outputs: OutputText[];
    map: Room[];
    player: Player;
    inputter: (command: string) => void;
}

const random = new Random((new Date()).toISOString());

type Context = {
    player: Player,
    room: Room,
    map: Room[]
};

export class App extends React.Component<{}, ClientState> {
    inputArea: InputArea | null = null;

    constructor(props: {}) {
        super(props);

        this.state = {
            outputs: [],
            player: randomizePlayer(random),
            map: getRooms(random),
            inputter: this.handleInputDefault
        };

        setTimeout(async () => {
            await this.showReport();
        }, 1000);
    }

    @bind
    public async addOutput(text: string): Promise<void> {
        return new Promise((resolve) => {
            const val: OutputText = {
                id: this.state.outputs.length,
                text
            };
            this.setState({ outputs: [...this.state.outputs, val] }, () => {
                resolve();
            });
        });
    }

    public render() {
        return (
            <div className="game">
                <OutputArea outputs={this.state.outputs} onFocusClick={this.focusClick} />
                {this.getInputArea()}
            </div>
        );
    }

    private getInputArea() {
        return <InputArea ref={(input) => this.inputArea = input} newInput={this.state.inputter} />;
    }

    @bind
    private focusClick() {
        if (this.inputArea) {
            this.inputArea.focus();
        }
    }

    @bind
    private async handleInputDefault(command: string) {
        const text = command.trim();

        if (!text) {
            return;
        }

        await this.addOutput(text);
    }

    private async getInput(): Promise<string> {
        return new Promise(resolve => {
            this.setState({
                inputter: async (command) => {
                    const text = command.trim();
                    if (!text)
                        return;
                    await this.addOutput(text);
                    resolve(text);
                }
            });
        });
    }

    private async showReport() {
        const { map, player } = cloneDeep(this.state);
        const room = map.filter(x => x.id == player.room)[0];

        const context = { player, room, map };
        await this.showRoom(context);

        if (player.dead) {
            await this.addOutput("You died!");
            return; //TODO
        }
        if (player.win) {
            await this.addOutput("You win!");
            return;//TODO
        }

        await this.showItems(context);
        await this.showLocked(context);
        const stop = await this.showMonster(context);
        if (stop) {
            // TODO: read input loop.
            return;
        }

        this.calculateStatLoss(player);
        await this.showHint(room);
        await this.showStats(player.stats);

        if (isDead(player.stats)) {
            await this.addOutput("You are exhausted...");
            await this.addOutput("so this adventure must end");
            player.quitQuotient = 2;
            return;//TODO
        }

        await this.showInventory(player);
    }

    private async showInventory(player: Player): Promise<void> {
        if (player.items.length == 0)
            return;

        await this.addOutput("");
        await this.addOutput("You are carrying:");
        for (const item of player.items) {
            await this.addOutput(`    ${item.name}`);
        }

        const cash = _.sumBy(player.items, x => x.value);
        if (cash > 0) {
            await this.addOutput(`        TotalValue: \$${cash}`);
        }
    }

    private async showStats(stats: Stats): Promise<void> {
        await this.addOutput("");
        await this.addOutput("Your attributes are:");
        await this.addOutput(`    Strength - ${stats.strength}  Charisma - ${stats.charisma}`);
        await this.addOutput(`    Dexterity - ${stats.dexterity}  Intelligence - ${stats.intelligence}`);
        await this.addOutput(`    Wisdom - ${stats.wisdom}  Constitution - ${stats.constitution}`);
    }

    private async showHint(room: Room): Promise<void> {
        if (random.chance(16) && room.monster && room.monster.name == "Dwarf") {
            await this.addOutput("You hear a whispered voice warning you:");
            await this.addOutput("'You must do something about the dwarf'");
        }
    }

    private calculateStatLoss(player: Player) {
        for (const statName of statNames) {
            if (random.chance(16))
                player.stats[statName]--;
        }
    }

    @bind
    private async showRoom({ room, player }: Context): Promise<void> {
        const desc = room.description;
        if (Array.isArray(desc)) {
            for (const output of desc) {
                await this.addOutput(output);
            }
        }
        else if (typeof desc === 'string') {
            await this.addOutput(desc);
        }
        else {
            await desc({
                random,
                print: this.addOutput
            });
        }

        if (room.event) {
            room.event(player);
        }
    }

    private async showItems({ room }: Context): Promise<void> {
        if (room.items.length == 0) return;
        await this.addOutput(`YOU CAN SEE ${room.items.map(x => x.name).join(', ')}`);
    }

    private async showLocked({ room }: Context) {
        if (!room.requiresKey) return [];
        await this.addOutput('One of the doors is locked, preventing you from exploring further');
    }

    private async showMonster(ctx: Context): Promise<boolean> {
        const { room } = ctx;
        const { monster } = room;
        if (!monster)
            return false;

        await this.addOutput(`LOOK OUT! THERE IS A ${monster.name.toUpperCase()} HERE!`);
        if (!monster.noncombat && random.chance(30)) {
            await this.addOutput(`THE ${monster.name.toUpperCase()} ATTACKS!`);
            await this.performAttack(ctx, monster);
        }
        return true;
    }

    private async performAttack({ player, room }: Context, monster: Monster): Promise<void> {
        if (monster.noncombat) {
            await this.addOutput(`The ${monster.name} refuses to fight and its magic protects it`);
            return;
        }

        await this.addOutput("------------------------------------------");
        await this.addOutput(`YOUR OPPONENT IS A ${monster.name.toUpperCase()}`);
        const initialDanger = monster.stats.strength * random.int(1, 6);
        await this.addOutput("---------------------------------------");
        await this.addOutput(`THE ${monster.name.toUpperCase()}'S DANGER LEVEL IS ${initialDanger}`);
        await delay(1500);

        for (const item of player.items) {
            if (item.type == 'weapon') {
                if (typeof item.description === 'string')
                    await this.addOutput(item.description)
                else
                    await (this.addOutput(item.description(monster)));
            }
        }

        const weapon = await this.chooseWeapon(player);
        await delay(1500);

        //const danger = (initialDanger * 2) / weapon.strength;

        await this.addOutput(`THE ${monster.name.toUpperCase()} HAS THE FOLLOWING ATTRIBUTES:`);
        await this.addOutput(`1 - Strength ${monster.stats.strength}  2 - Charisma ${monster.stats.charisma}`);
        await this.addOutput(`3 - Dexterity ${monster.stats.dexterity} 4 - Intelligence ${monster.stats.intelligence}`);
        await this.addOutput(`5 - Wisdom ${monster.stats.wisdom}   6 - Constitution ${monster.stats.constitution}`);
        await this.addOutput("");
        await this.addOutput("YOUR ATTRIBUTES ARE:");
        await this.addOutput(`1 - Strength ${player.stats.strength}  2 - Charisma ${player.stats.charisma}`);
        await this.addOutput(`3 - Dexterity ${player.stats.dexterity} 4 - Intelligence ${player.stats.intelligence}`);
        await this.addOutput(`5 - Wisdom ${player.stats.wisdom}   6 - Constitution ${player.stats.constitution}`);
        await this.addOutput("");

        await this.addOutput("Which attribute will you fight with (#1)?");
        const first = await this.readNumber(1, 6);
        await this.addOutput("Which attribute will you fight with (#2)?");
        const second = await this.readNumber(1, 6, x => x == first);

        const playerCombatValue = this.getCombatValue(player.stats, first, second);
        const monsterCombatValue = this.getCombatValue(monster.stats, first, second);

        await this.battle(player, monster, playerCombatValue, monsterCombatValue, first, second, room);
    }

    private async battle(
        player: Player,
        monster: Monster,
        playerCombatValue: number,
        monsterCombatValue: number,
        first: number,
        second: number,
        room: Room
    ): Promise<void> {
        if (playerCombatValue == monsterCombatValue) {
            await this.addOutput("You are evenly matched");
        }
        else if (playerCombatValue > monsterCombatValue) {
            await this.addOutput("IT LOOKS LIKE THE ODDS ARE IN FAVOR OF YOU");
        }
        else {
            await this.addOutput(`IT LOOKS LIKE THE ODDS ARE IN FAVOR OF THE ${monster.name.toUpperCase()}`);
        }

        const outcome = random.int(0, 6);
        switch (outcome) {
            case 0:
                await this.addOutput("You struck a splendid blow!");
                return await this.nextRound(player, monster, playerCombatValue, monsterCombatValue - 1, first, second, room);
            case 1:
                await this.addOutput(`THE ${monster.name.toUpperCase()} STRIKES OUT`);
                player.stats.strength--;
                player.stats.charisma--;
                return await this.nextRound(player, monster, playerCombatValue - 3, monsterCombatValue, first, second, room);
            case 2:
                await this.addOutput(`YOU DRAW THE ${monster.name.toUpperCase()}'S BLOOD`);
                return await this.nextRound(player, monster, playerCombatValue, monsterCombatValue - 1, first, second, room);
            case 3:
                await this.addOutput("You are wounded!!");
                player.stats.dexterity--;
                return await this.nextRound(player, monster, playerCombatValue - random.int(2, 4), monsterCombatValue, first, second, room);
            case 4:
                await this.addOutput(`THE ${monster.name.toUpperCase()} IS TIRING`);
                return await this.nextRound(player, monster, playerCombatValue, monsterCombatValue - 1, first, second, room);
            case 5:
                await this.addOutput("You are bleeding...");
                player.stats.wisdom--;
                player.stats.dexterity--;
                return await this.nextRound(player, monster, playerCombatValue - random.int(2, 4), monsterCombatValue, first, second, room);
            case 6:
                await this.addOutput(`YOU WOUND THE ${monster.name.toUpperCase()}`);
                return await this.nextRound(player, monster, playerCombatValue, monsterCombatValue - 1, first, second, room);
        }
    }

    private async nextRound(
        player: Player,
        monster: Monster,
        playerCombatValue: number,
        monsterCombatValue: number,
        first: number,
        second: number,
        room: Room
    ): Promise<void> {
        if (random.chance(75) && playerCombatValue > 0 && monsterCombatValue > 0) {
            return await this.battle(player, monster, playerCombatValue, monsterCombatValue, first, second, room);
        }

        if (playerCombatValue > monsterCombatValue) {
            await this.addOutput(`YOU HAVE SLAIN THE ${monster.name.toUpperCase()}`);
            player.killed++;
            room.monster = undefined;
            return;
        }

        await this.addOutput(`THE ${monster.name.toUpperCase()} GOT THE BETTER OF YOU THAT TIME...`);
        this.calculateCombatStatLoss(player.stats, first);
        this.calculateCombatStatLoss(player.stats, second);
        room.monster = undefined;
    }

    private calculateCombatStatLoss(stats: Stats, statIndex: number) {
        const stat = statNames[statIndex];
        switch (stat) {
            case 'strength': stats.strength = 4 * Math.floor(stats.strength / 5); break;
            case 'charisma': stats.charisma = 3 * Math.floor(stats.charisma / 4); break;
            case 'dexterity': stats.dexterity = 6 * Math.floor(stats.dexterity / 7); break;
            case 'intelligence': stats.intelligence = 2 * Math.floor(stats.intelligence / 3); break;
            case 'wisdom': stats.wisdom = 5 * Math.floor(stats.wisdom / 6); break;
            case 'constitution': stats.constitution = Math.floor(stats.constitution / 2); break;
        }
    }

    private getCombatValue(stats: Stats, firstStat: number, secondStat: number): number {
        return this.getStatFromIndex(stats, firstStat) + this.getStatFromIndex(stats, secondStat);
    }

    private getStatFromIndex(stats: Stats, index: number): number {
        const name = statNames[index - 1];
        return stats[name];
    }

    private async chooseWeapon(player: Player): Promise<Weapon> {
        const weapons = _.filter(player.items, x => x.type == 'weapon') as Weapon[];
        if (weapons.length == 0) {
            return Fists;
        }
        if (weapons.length == 1) {
            await this.addOutput(`YOU MUST FIGHT WITH YOUR ${weapons[0].name.toUpperCase()}`);
            return weapons[0];
        }

        await this.addOutput("CHOOSE YOUR WEAPON:");
        let i = 1;
        for (const weapon of weapons) {
            await this.addOutput(`${i} - ${weapon.name}`);
            i++;
        }

        const choice = await this.readNumber(1, weapons.length);
        const weapon = weapons[choice - 1];
        await this.addOutput(`RIGHT, SO YOU CHOOSE TO FIGHT WITH THE ${weapon.name.toUpperCase()}`);
        return weapon;
    }

    private async readNumber(min: number, max: number, condition?: (x: number) => boolean): Promise<number> {
        condition = condition ?? ((x) => false);
        let input = parseInt(await this.getInput());
        while (!isNaN(input) || input < min || input > max || condition(input)) {
            await this.addOutput(`Please enter a number between ${min} and ${max}`);
            input = parseInt(await this.getInput());
        }

        return input;
    }
}




ReactDOM.render(React.createElement(App), document.getElementById("react"));
