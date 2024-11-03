import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Fade from 'react-bootstrap/Fade';

import './TopPanel.css';

function TopPanel(props) {
    if (!props.visible) {
        return null;
    }
    else return (
        <div className="top_panel">
            <h1><span id="game_title"/>{props.title}</h1>
            {props.progress > 0 && <Fade in>
                <ProgressBar now={props.progress}/>
                </Fade>
            }
            <div className="top_commands">
                {props.commands.map((item, index) => {
                    return (
                        <ScoreItem
                            selected={"command_item " + (index == props.currentCommand ? "correct" : "disable")}
                            index={index}
                            item={item}
                        />
                    )
                })}
            </div>
        </div>
    );
}

function ScoreItem(props) {
    return (
        <div key={props.index} className = {props.selected}>
            <div>
                <span className = "span_command_name">{props.item.name}</span>
                <span className = "span_command_score">Счет: {props.item.score}</span>
            </div>
            {props.item.questions > 0 && 
                <div>
                    <span className = "span_custom_info">{"Ответы: правильных " + props.item.correctAnswers + ", неправильных " + 
                                                        (props.item.questions - props.item.correctAnswers)}</span>
                </div> 
            }
        </div>
    )
}

export default TopPanel;