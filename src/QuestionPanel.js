import { useRef, useEffect, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { flushSync } from 'react-dom';

import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import QuizTable from './QuizTable.js'

import { isEqual } from './tools.js'

import './QuestionPanel.css';

const QuestionPanel = forwardRef((props, ref) => {
    const [labelStates, setLabelStates] = useState(new Map())
    const [answers, setAnswers] = useState(new Set())
    const [ignoreAnswer, setIgnoreAnswer] = useState(false)
    const [answerWasShown, setAnswerWasShown] = useState(false)

    const [isFullScreen, setIsFullScreen] = useState(new Map());

    const toggleFullScreen = (key) => {
        var map = new Map(isFullScreen);
        map.set(key, !isFullScreen.get(key));
        setIsFullScreen(map);
    };

    useImperativeHandle(ref, () => ({
        forceShowAnswers(value) {
            if (value) {
                showAnswers();
            }
            else {
                props.onCloseAnswerPanel();
            }
        },
        forceNext() {
            onQuestionResult();
        }
    }));

    useEffect(() => {
        setLabelStates(new Map());
        setAnswers(new Set());
        setIgnoreAnswer(false);
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

        props.selectedRandomQuery.options.map((item, index) => {

            setTimeout(() => {
                setLabelStates(prevMap => {
                    const nextMap = new Map(prevMap);

                    const hasImg = item.img != null && item.img.length > 0;
                    const isCorrect = props.selectedRandomQuery.answers.has(index);

                    const className = hasImg
                        ? (isCorrect ? 'label_question correct' : 'label_question wrong')
                        : (isCorrect ? 'label_question_no_img correct' : 'label_question_no_img wrong');

                    nextMap.set(index, className);
                    return nextMap;
                });
            },
            50 * (index + 1));
        });

        props.showNextButton(false);

        function show() {
            props.showAnswers();
        }

        if (IsCorrectAnswers() || answerWasShown || answers.size == props.selectedRandomQuery.options.length) {
            show();
        } else {
            setTimeout(() => {
                show();
            },
            200 * (props.selectedRandomQuery.options.length + 1));
        }

        setAnswerWasShown(true);
    }

    function onQuestionResult() {
        props.onQuestionResult(!ignoreAnswer && IsCorrectAnswers(), props.selectedRandomQuery.score);
    }

    function IsCorrectAnswers() {
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
                        <Image src={props.selectedRandomQuery.questionImage} alt="image" rounded className="quizWrapBoxLefImage" />}
                    <div className="quizWrapBoxRight">
                        <div className="quizWrap_category">{props.selectedRandomQuery.category}</div>
                        <div className="quizWrap_question">{props.selectedRandomQuery.question}</div>
                        <div className="quizWrap_answers_parent">
                            <div className="quizWrap_answers" >
                                {props.selectedRandomQuery.options.map((item, id) => {
                                    const imgExist = item.img != null && item.img.length > 0;
                                    return (
                                        <div className="quizQuestionItem">
                                            {isFullScreen.get(item.img) && (
                                                <div className="fullScreenImage"
                                                    onClick={() => {
                                                        toggleFullScreen(item.img);
                                                    }}
                                                >
                                                    <Image
                                                        src={item.img}
                                                        alt={item.img}
                                                        style={{
                                                            width: '80vw',
                                                            height: '80vh',
                                                            objectFit: 'contain',
                                                            display: 'block'
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
                                            <Form.Control readOnly id={id} type="text"
                                                className={labelStates.has(id) ? labelStates.get(id) : ("label_question" + (imgExist ? "" : "_no_img"))}
                                                defaultValue={item.name}
                                                onClick={() => {
                                                    if (!answerWasShown) {
                                                        const isCorrect = props.selectedRandomQuery.answers.has(id);
                                                        setState(imgExist, id, isCorrect);
                                                        props.showNextButton(true);
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
            </div>
        );
});

export default QuestionPanel;