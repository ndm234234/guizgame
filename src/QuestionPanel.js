import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import QuizTable from './QuizTable.js'

import {isEqual} from './tools.js'

import './QuestionPanel.css';


function QuestionPanel(props) {
    const [labelStates, setLabelStates] = useState(new Map())
    const [showAnswerButtonEnable, setShowAnswerButtonEnable] = useState(true)
    const [nextButtonEnable, setNextButtonEnable] = useState(false)
    const [answers, setAnswers] = useState(new Set())
    const [ignoreAnswer, setIgnoreAnswer] = useState(false)
    const [answerWasShown, setAnswerWasShown] = useState(false)

    useEffect(() => {
        setLabelStates(new Map());
        setAnswers(new Set());
        setIgnoreAnswer(false);
        setNextButtonEnable(false);
        setAnswerWasShown(false);
      }, [props.selectedRandomQuery]);
    
    function setState(id, isCorrect) {
        const newMap = new Map(labelStates);
        newMap.set(id, isCorrect ? "label_question correct" : "label_question wrong");
        setLabelStates(newMap);

        const newAnswers = new Set(answers);
        newAnswers.add(id);
        setAnswers(newAnswers);
    }

    function showAnswers() {

        if (!IsCorrectAnswers()) {
            setIgnoreAnswer(true);
        }
        const newMap = new Map();
        props.selectedRandomQuery.options.map((item, id) => {
            newMap.set(id, props.selectedRandomQuery.answers.has(id) ? "label_question correct" : "label_question wrong")

        })
        setLabelStates(newMap);
        setNextButtonEnable(false);
        setShowAnswerButtonEnable(false);

        function show() {
            setShowAnswerButtonEnable(true);
            setNextButtonEnable(true);
            props.showAnswers();
        }

        if (IsCorrectAnswers() || answerWasShown || answers.size == props.selectedRandomQuery.options.length) {
            show();
        } else {
            setTimeout(() => { show(); }, 2000);
        }

        setAnswerWasShown(true);
    }

    function onQuestionResult() {
        props.onQuestionResult(!ignoreAnswer && IsCorrectAnswers(), props.selectedRandomQuery.score);
    }

    function IsCorrectAnswers () {
        return isEqual(answers, props.selectedRandomQuery.answers);
    }

    if (!props.visible) {
        return null;
    }
    else 
    return (
        <div className="quizWrap">
        <div className="quizWrap_header">
            <span className="quizWrap_header_info">Вопрос {props.questionNumber} из {props.totalQuestions}</span>
            <span className="quizWrap_header_score">{props.selectedRandomQuery.score} баллов</span>
            </div>
        <div className="quizWrapBox">
                { props.selectedRandomQuery.questionImage != null &&
                    <img src={props.selectedRandomQuery.questionImage} alt="image" className="quizWrapBoxLefImage"/>}
            <div className="quizWrapBoxRight">
                <div className="quizWrap_category">{props.selectedRandomQuery.category}</div>
                <div className="quizWrap_question">{props.selectedRandomQuery.question}</div>
                <Form className="quizWrap_answers">
                    {props.selectedRandomQuery.options.map((item, id) =>{
                        
                        return (
                            <Form.Group className="mb-3">
                            <Form.Control readOnly id={id} type="text" className={labelStates.has(id) ? labelStates.get(id) : "label_question"}
                                        defaultValue={item}        
                                        onClick={() =>{
                                            if (!answerWasShown){
                                                const isCorrect = props.selectedRandomQuery.answers.has(id);
                                                setState(id, isCorrect);
                                                setNextButtonEnable(true);
                                            }
                                        }}
                            ></Form.Control>
                            </Form.Group>
                        )
                    })}
                </Form>
            </div>
        </div>
        <div className="quizAnsButtons">
            <Button variant="outline-light" disabled ={!showAnswerButtonEnable} onClick={showAnswers}>Показать ответ</Button>
            <Button variant="outline-light" disabled ={!nextButtonEnable} onClick={onQuestionResult}>Далее</Button>
        </div>
        </div>
    );
}

export default QuestionPanel;