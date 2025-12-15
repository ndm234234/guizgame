import { useEffect, useState, useCallback } from "react";
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { flushSync } from 'react-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import QuizTable from './QuizTable.js'
import QuestionPanel from './QuestionPanel.js'
import AnswerPanel from './AnswerPanel.js'
import GameResultPanel from './GameResultPanel.js'

import './CenterPanel.css';

const CenterPanel = forwardRef((props, ref)  => {
    const [showQuizTable, setShowQuizTable] = useState(true)
    const [showQuestion, setShowQuestion] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const [showGameResult, setShowGameResult] = useState(false)

    const modalRef = useRef();

    useImperativeHandle(ref, () => ({
        reload() {
            setShowQuizTable(true);
            setShowQuestion(false);
            setShowAnswer(false);
            setShowGameResult(false);
        },
        forceFinish() {
            setShowQuizTable(false);
            setShowQuestion(false);
            setShowAnswer(false);
            setShowGameResult(true);
        },
        forceShowAnswer(value) {
            modalRef.current.forceShowAnswers(value);
        }, 
        forceNext() {
            setShowAnswer(false);
            modalRef.current.forceNext();
        }
    }));

    function selectQuestion(cat, score ) {
        props.selectQuestion(cat, score);
        setShowQuestion(true);
        setShowQuizTable(false);
        props.onSelectQuestion(true);
    }

    function showAnswers() {
        setShowQuestion(false);
        setShowAnswer(true);
        props.onShowAnswers();
    }

    function onQuestionResult(result, score) {
        setShowQuestion(false);
        props.onQuestionResult(result, score);

        if (props.queries.size == 0) {
            setShowQuizTable(false);
            setShowGameResult(true);
        } else {
            setShowQuizTable(true);
        }
        props.onSelectQuestion(false);
    }

    if (!props.visible) {
        return null;
    }
    else 
    return (
        <>
        <QuizTable visible={showQuizTable} 
                   queries={props.queries}
                   selectQuestion={selectQuestion}/>
        <QuestionPanel 
                    ref={modalRef}
                    visible={showQuestion} 
                    selectedRandomQuery={props.selectedRandomQuery}
                    questionNumber={props.questionNumber}
                    totalQuestions={props.totalQuestions}
                    showAnswers={showAnswers}
                    onQuestionResult={onQuestionResult} 
                    showNextButton={props.showNextButton}
                    onCloseAnswerPanel={() => {
                        setShowAnswer(false);
                        setShowQuestion(true);
                        props.showNextButton(true);
                    }}/>
        {showAnswer && <AnswerPanel query={props.selectedRandomQuery}/>}
        <GameResultPanel visible={showGameResult}
                         commands={props.commands}
                         quizTitle={props.quizTitle}
                         tryAgain={props.tryAgain} />
        </>
    );
});

export default CenterPanel;