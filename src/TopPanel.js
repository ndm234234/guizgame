import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Fade from 'react-bootstrap/Fade';
import Image from 'react-bootstrap/Image';

import './TopPanel.css';

function TopPanel(props) {
    if (!props.visible) {
        return null;
    }
    else return (
        <div className="top_panel">
            <h1><span id="game_title"/>{props.title}</h1>
            <ProgressBar now={props.progress}/>
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
            <div className="command_name_info">
                <Image src={props.item.logo} alt="image" className="answer_panel_data_image" rounded/>
                <span className = "span_command_name">{props.item.name}</span>
            </div>
                <div className="command_name_info_status">
                    <span className = "span_command_score">Счет: {props.item.score}</span>
                    <span className = "span_custom_info"
                                    >{props.item.questions == 0 ? 
                                    "Нет ответов" :
                                    `Отвечено ${props.item.correctAnswers} из ${props.item.questions}` 
                                    }</span>
                </div> 
        </div>
    )
}

export default TopPanel;