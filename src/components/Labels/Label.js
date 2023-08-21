import React from 'react'
import labels from '../../data/labels.json'


export default function asyncLabel(importComponent) {
    class Label extends React.Component {
        constructor() {
            super();
            this.state = {
                component: null
            }
        }

        componentDidMount() {
            const { default: component } = importComponent();
            this.setState({
                component: component
            })
        }

        render() {
            const labelElements = [];
            for (let i = 0; i < labels.length; i++) {
                const label = labels[i];
                if (label.text.lastIndexOf('号线') !== -1) {
                    labelElements.push(<text x={label.x} y={label.y} fill={label.fill} key={label.text + i}>{label.text}</text>);
                } else {
                    labelElements.push(<text x={label.x} y={label.y} key={label.text + i}>{label.text}</text>);
                }
            }
            return (
                <g>{labelElements}</g>
            )
        }
    }
    return Label;
}