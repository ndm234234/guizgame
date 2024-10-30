import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import './TopPanel.css';

function TopPanel(props) {
    if (!props.visible) {
        return null;
    }
    else return (
        <div className="top_panel">
            <h1><span id="game_title"/>{props.title}</h1>
            <div className="top_commands">
                {props.commands.map((item, index) => {
                    return (
                        <div key={index} className = {"command_item " + (index == props.currentCommand ? "correct" : "disable")}>
                            <div>
                                <span className = "span_command_name">{item.name}</span>
                                <span className = "span_command_score">Счет: {item.score}</span>
                            </div>
                            {item.questions > 0 && 
                            <div>
                                <span className = "span_custom_info">{"Ответы: правильных " + item.correctAnswers + ", неправильных " + (item.questions - item.correctAnswers)}</span>
                            </div> 
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default TopPanel;