import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import QuizTable from './QuizTable.js'

import {sortedResult} from './tools.js'

import './GameResultPanel.css';

function GameResultPanel(props) {

    if (!props.visible) {
        return null;
    }
    else {
        const result = sortedResult(props.commands);
        return (
            <div class="quiz-over-modal">
                <div class="content">
                    <h1>Итоги</h1>
                    <p><span id="info">{result.map((item) => {
                        return (
                            <p>{item}</p>)}
                        )}</span></p>
                    <button id="btn-try-again" onClick={props.tryAgain}>Попробывать снова</button>
                </div>
            </div>
        );
    }
}

export default GameResultPanel;