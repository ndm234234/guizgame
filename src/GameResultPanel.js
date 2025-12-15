import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import QuizTable from './QuizTable.js'
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

import {sortedResult} from './tools.js'

import './GameResultPanel.css';

function GameResultPanel(props) {

    const info = (index, item) => {
    return `${index + 1}. Команда '${item.command}' правильно ответила на ${item.correctAnswers} вопросов из ${item.questions} на ${item.score} баллов!`;
    };

    if (!props.visible) {
        return null;
    }
    else {
        const result = sortedResult(props.commands);
        return (
        <Modal show centered className="modal-fixed_width" size="md">
            <Modal.Header className="modal-header-custom modal-content-custom">
                <Modal.Title className="w-100 text-center">{props.quizTitle}<br/>Итоги</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-content-custom"> 
                <span >{result.length > 0 ? result.map((item, index) => {
                            return (
                                    <div 
                                    key={index} 
                                    className="game-result-panel-centered d-flex align-items-center my-3"
                                    >
                                    <Image
                                        src={item.logo}
                                        alt="image"
                                        rounded
                                        className="flex-shrink-0 me-3"
                                       /* style={{ height: '50' }}*/
                                    />
                                    <span className="flex-grow-1">
                                        {info(index, item)}
                                    </span>
                                    </div>
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