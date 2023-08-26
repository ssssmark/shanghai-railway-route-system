import React from 'react'
import linePath from '../../data/Linedata'
import { lineColor } from '../../data/Linedata'

class Line extends React.Component {
    render() {
        const linePaths = [];

        for (const key in linePath) {
            const path = linePath[key];
            const lineNum = key.match(/\d+/)[0];
            const color = lineColor[lineNum];
            linePaths.push(<path d={path} fill="none" strokeWidth="6" stroke={color} key={key}></path>);
        }

        return (
            <g>{linePaths}
                <animate attributeName="opacity" begin="search.click" dur="1s" values="1;0.5" fill="freeze"/>
            </g>
        )
    }
}

export default Line;
