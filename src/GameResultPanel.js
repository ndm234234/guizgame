import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import QuizTable from './QuizTable.js'
import Modal from 'react-bootstrap/Modal';

import {sortedResult} from './tools.js'

import './GameResultPanel.css';

function GameResultPanel(props) {

    if (!props.visible) {
        return null;
    }
    else {
        const result = sortedResult(props.commands);
        return (
        <Modal show centered className="modal-fixed_width" size="md">
            <Modal.Header className="modal-header-custom modal-content-custom">
                <Modal.Title>Итоги</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-content-custom"> 
                <span >{result.length > 0 ? result.map((item, index) => {
                            return (
                                <div className="game-result-panel-centered" key={index}>{index + 1}. Команда '<b>{item.command}</b>' правильно ответила на {item.correctAnswers} вопросов из {item.questions} на {item.score} баллов !</div>
                )}) : <div className="game-result-panel-centered">Никто не играл:(</div>}</span>
            </Modal.Body>
            <Modal.Footer centered className="modal-content-custom game-result-panel-centered">
                <Button variant="outline-light" onClick={props.tryAgain}>Попробовать снова</Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default GameResultPanel;