import React from 'react';

const cleanPercentage = (percentage) => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0;
    const tooHight = percentage > 100;
    return tooLow ? 0 : tooHight ? 100 : +percentage;
};

const Circle = ({ colour, pct }) => {
    const r = 40;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - pct) * circ) / 100;
    return (
        <circle r={r} cx={-50} cy={-50} fill='transparent' stroke={strokePct !== circ ? colour : ""}
            strokeWidth={"0.7rem"} strokeDasharray={circ} strokeDashoffset={pct ? strokePct : 0} strokeLinecap='round' ></circle>
    )
};

const Text = ({ percentage }) => {
    return (
        <text x={"50%"} y={"50%"} dominantBaseline={"central"} textAnchor='middle' fontSize={"18px"}>{percentage}% </text>
    )
};


export default function CircleP({ percentage, colour }) {
    const pct = cleanPercentage(percentage);
    return (
        <svg width={100} height={100}>
            <g transform='scale(-1,1) rotate(-90)'>
                <Circle colour="lightgrey" />
                {pct > 0 && <Circle colour={colour} pct={pct} />}
            </g>
            <Text percentage={pct} />
        </svg>
    )
}
