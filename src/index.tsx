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
import _ from 'lodash';


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
                    if(!text)
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
            return;
        }
        if (player.win) {
            await this.addOutput("You win!");
            return;
        }

        await this.showItems(context);
        await this.showLocked(context);
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
        const { player, room } = ctx;
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
        const ff = monster.stats.strength * random.int(1, 6);
        await this.addOutput("---------------------------------------");
        await this.addOutput(`THE ${monster.name.toUpperCase()}'S DANGER LEVEL IS ${ff}`);
        await delay(1500);

        for (const item of player.items) {
            if (item.type == 'weapon') {
                if (typeof item.description === 'string')
                    await this.addOutput(item.description)
                else
                    await (this.addOutput(item.description(monster)));
            }
        }

        const weapons = _.filter(player.items, x => x.type == 'weapon')
        const max = _.maxBy(weapons, x => x.value);
        if (!max || max.type != 'weapon') {
            await this.addOutput(`YOU MUST FIGHT THE ${monster.name.toUpperCase()} WITH YOUR BARE HANDS`);
        }
    }
}


ReactDOM.render(React.createElement(App), document.getElementById("react"));
