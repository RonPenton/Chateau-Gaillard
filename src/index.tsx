import React from "react";
import * as ReactDOM from 'react-dom';
import { bind } from "decko";

import { OutputArea } from "./OutputArea";
import { InputArea } from "./InputArea";
import { OutputText } from "./OutputArea";

import './index.scss';


export interface ClientState {
    outputs: OutputText[];
}

export interface GameContext {
    addOutput: (output: string) => void;
}

export class App extends React.Component<{}, ClientState> implements GameContext {
    inputArea: InputArea | null = null;

    constructor(props: {}) {
        super(props);
        this.state = { outputs: [] };
    }

    public addOutput(output: string) {
        const val: OutputText = {
            id: this.state.outputs.length,
            text: output
        };
        this.setState({ outputs: [...this.state.outputs, val] });
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
        return <InputArea ref={(input) => this.inputArea = input} newInput={this.handleInput} />;
    }
    
    @bind
    private focusClick() {
        if (this.inputArea) {
            this.inputArea.focus();
        }
    }

    @bind
    private handleInput(command: string) {
        const text = command.trim();

        if (!text) {
            return;
        }

        this.addOutput(text);
    }
}

ReactDOM.render(React.createElement(App), document.getElementById("react"));
