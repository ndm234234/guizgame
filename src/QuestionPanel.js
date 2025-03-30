import { useRef, useEffect, useState, useCallback } from 'react';
import { flushSync } from 'react-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

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

    const [isFullScreen, setIsFullScreen] = useState(new Map());

    const toggleFullScreen = (key) => {
        var map = new Map(isFullScreen); 
        map.set(key, !isFullScreen.get(key));
        setIsFullScreen(map);
    };

    useEffect(() => {
        setLabelStates(new Map());
        setAnswers(new Set());
        setIgnoreAnswer(false);
        setNextButtonEnable(false);
        setAnswerWasShown(false);
      }, [props.selectedRandomQuery]);
    
    function setState(img, id, isCorrect) {
        const newMap = new Map(labelStates);
        if (img) {
            newMap.set(id, isCorrect ? "label_question correct" : "label_question wrong");
        }
        else {
            newMap.set(id, isCorrect ? "label_question_no_img correct" : "label_question_no_img wrong");
        }
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
            const imgExist = item.img != null && item.img.length > 0;
            const isCorrect = props.selectedRandomQuery.answers.has(id);
            if (imgExist) {
                newMap.set(id,  isCorrect ? "label_question correct" : "label_question wrong");
            }
            else {
                newMap.set(id, isCorrect ? "label_question_no_img correct" : "label_question_no_img wrong");
            }
        });
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
            {props.selectedRandomQuery.questionImage != null && props.selectedRandomQuery.questionImage.length > 0 && 
                    <img src={props.selectedRandomQuery.questionImage} alt="image" className="quizWrapBoxLefImage"/>}
            <div className="quizWrapBoxRight">
                <div className="quizWrap_category">{props.selectedRandomQuery.category}</div>
                <div className="quizWrap_question">{props.selectedRandomQuery.question}</div>
                <div className="quizWrap_answers_parent">
                <div className="quizWrap_answers" >
                    {props.selectedRandomQuery.options.map((item, id) =>{
                        const imgExist = item.img != null && item.img.length > 0;
                        return (
                            <div className="quizQuestionItem">
                            {isFullScreen.get(item.img) && (
                                <div className="fullScreenImage"
                                    onClick={() => {
                                        toggleFullScreen(item.img);
                                    }}
                                    >
                                    <img
                                        src={item.img}
                                        alt={item.img}
                                        style={{
                                            maxWidth: "90vw",
                                            maxHeight: "90vh",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                            )}
                            {imgExist &&
                            <Image className="quizQuestionItemImage" src={item.img} 
                            onClick={(e) => {
                                toggleFullScreen(item.img);
                                /*
                                if (!document.fullscreenElement) {
                                    e.currentTarget.requestFullscreen();
                                }
                                else {
                                    document.exitFullscreen();
                                }*/
                            }}
                            />}
                            <Form.Control readOnly id={id} type="text" className={labelStates.has(id) ? labelStates.get(id) : ("label_question" + (imgExist ? "" : "_no_img"))} 
                                        defaultValue={item.name}        
                                        onClick={() =>{
                                            if (!answerWasShown){
                                                const isCorrect = props.selectedRandomQuery.answers.has(id);
                                                setState(imgExist, id, isCorrect);
                                                setNextButtonEnable(true);
                                            }
                                        }}
                            ></Form.Control>
                            </div>
                        )
                    })}
                </div>
                </div>
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