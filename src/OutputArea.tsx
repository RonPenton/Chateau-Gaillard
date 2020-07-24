import React from 'react';
import { bind } from 'decko';


export interface OutputText {
    id: number;
    text: string;
}

export interface OutputAreaProps {
    outputs: OutputText[];
    onFocusClick: () => void;
}

export class OutputArea extends React.Component<OutputAreaProps> {

    private div: HTMLDivElement | null = null;
    private scrolledToBottom = true;
    private mouseDown = {
        x: 0,
        y: 0,
        down: false
    }

    render() {
        if (this.div) {
            const t = this.div;
            this.scrolledToBottom = Math.abs((t.scrollHeight - t.scrollTop) - t.offsetHeight) < 10;
        }

        return (
            <div className="output-area"
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                ref={(input) => this.div = input}>
                {this.props.outputs.map(x => this.renderItem(x))}
            </div>
        );
    }

    renderItem(text: OutputText) {
        if (text.text.length > 0)
            return <div key={text.id}>{text.text}</div>
        return <div dangerouslySetInnerHTML={{__html: '&nbsp;'}} key={text.id} />
    }

    @bind
    onMouseDown(evt: React.MouseEvent<HTMLDivElement>) {
        this.mouseDown = { x: evt.clientX, y: evt.clientY, down: true };
    }

    @bind
    onMouseUp(evt: React.MouseEvent<HTMLDivElement>) {
        if (this.mouseDown.x == evt.clientX && this.mouseDown.y == evt.clientY &&
            this.mouseDown.down == true && this.div) {
            this.props.onFocusClick();
        }
        this.mouseDown = { x: 0, y: 0, down: false };
    }

    componentDidMount() { this.fixScroll(); }

    componentDidUpdate() { this.fixScroll(); }

    private fixScroll() {
        if (this.div && this.scrolledToBottom) {
            this.div.scrollTop = this.div.scrollHeight;
        }
    }
}
