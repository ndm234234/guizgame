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
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog centered className="game-result-panel-width">
                <Modal.Header className="modal-header-custom modal-content-custom">
                    <Modal.Title>Итоги</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-content-custom"> 
                    <p><span id="info">{result.length > 0 ? result.map((item, index) => {
                                return (
                                    <p>{index + 1}. Команда '<b>{item.command}</b>' ответила на {item.correctAnswers} вопросов из {item.questions} на {item.score} баллов!</p>)}
                                ) : "Никто не играл:("}</span></p>
                </Modal.Body>
                <Modal.Footer centered className="modal-content-custom game-result-panel-centered">
                    <Button variant="outline-light" onClick={props.tryAgain}>Попробывать снова</Button>
                </Modal.Footer>
            </Modal.Dialog>
    
        </div>
        );
    }
}

export default GameResultPanel;