import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import QuizTable from './QuizTable.js'

import {isEqual} from './tools.js'

import './QuestionPanel.css';


function QuestionPanel(props) {
    const [labelStates, setLabelStates] = useState(new Map())
    const [nextButtonEnable, setNextButtonEnable] = useState(false)
    const [answers, setAnswers] = useState(new Set())
    const [ignoreAnswer, setIgnoreAnswer] = useState(false)

    useEffect(() => {
        setLabelStates(new Map());
        setAnswers(new Set());
        setIgnoreAnswer(false)
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

        setTimeout(() => {
            setNextButtonEnable(true);
            props.showAnswers();
        }, 500);
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
        <div className="question_panel_all" >
            <div className="question_panel_info">
            <span id="question_info">Вопрос {props.questionNumber} из {props.totalQuestions}</span>
            <span id="question_score">{props.selectedRandomQuery.score} баллов</span>
            </div>
        <div className="quizWrap">
        <div id ="quizQnCategory">{props.selectedRandomQuery.category}</div>
        <div id ="quizQn">{props.selectedRandomQuery.query}</div>
        <div id = "quizAns">
            {props.selectedRandomQuery.options.map((item, id) =>{
                return <label id={id} class={labelStates.has(id) ? labelStates.get(id) : "label_question"}
                        onClick={() =>{
                            const isCorrect = props.selectedRandomQuery.answers.has(id);
                            setState(id, isCorrect);
                            setNextButtonEnable(true);
                        }}
                >{item}</label>
            })}
        </div>
        <div id = "quizAnsButtons">
            <input className="submit" id="button_show_answer" type="button" value="Показать ответ" onClick={showAnswers}/>
            <input className={nextButtonEnable ? "submit" : "submit disable"} id="button_next" type="button" value="Далее" onClick={onQuestionResult}/>
        </div>
        </div>
        </div>
    );
}

export default QuestionPanel;