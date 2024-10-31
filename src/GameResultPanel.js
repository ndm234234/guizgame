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
                    <p><span id="info">{result.length > 0 ? result.map((item, index) => {
                        return (
                            <p>{index + 1}. Команда '<b>{item.command}</b>' ответила на {item.correctAnswers} вопросов из {item.questions} на {item.score} баллов!</p>)}
                        ) : "Никто не играл:("}</span></p>
                        <Button variant="outline-light" onClick={props.tryAgain}>Попробывать снова</Button>
                </div>
            </div>
        );
    }
}

export default GameResultPanel;