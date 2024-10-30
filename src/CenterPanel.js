import { useEffect, useState, useCallback } from "react";
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { flushSync } from 'react-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Fade from 'react-bootstrap/Fade';

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
        }
    }));

    function selectQuestion(cat, score ) {
        props.selectQuestion(cat, score);
        setShowQuestion(true);
        setShowQuizTable(false);
    }

    function showAnswers() {
        setShowQuestion(false);
        setShowAnswer(true);
    }

    function onQuestionResult(result, score) {
        setShowQuestion(false);
        props.onQuestionResult(result, score);

        if (props.queries.size == 0) {
            setShowGameResult(true);
        } else {
            setShowQuizTable(true);
        }
    }

    if (!props.visible) {
        return null;
    }
    else 
    return (
        <><div ref={modalRef}> 
        <Fade in={showQuizTable}>
            <div>
            <QuizTable visible={showQuizTable}  quiz={props.quiz} queries={props.queries} 
                                selectQuestion={selectQuestion}></QuizTable>
            </div>
        </Fade>
        <Fade in={showQuestion}>
            <div>
            <QuestionPanel visible={showQuestion} selectedRandomQuery={props.selectedRandomQuery}
                        questionNumber={props.questionNumber}
                        totalQuestions={props.totalQuestions}
                        showAnswers={showAnswers}
                        onQuestionResult = {onQuestionResult}/>
            </div>
        </Fade>
        <Fade in={showAnswer}>
            <div>
                <AnswerPanel visible={showAnswer} 
                            selectedRandomQuery={props.selectedRandomQuery} onClose={() => {
                            setShowAnswer(false);
                            setShowQuestion(true);
                } }/>
            </div>
        </Fade>
        <Fade in={showGameResult}>
            <div>
            <GameResultPanel visible={showGameResult} 
                            commands={props.commands}
                            tryAgain={props.tryAgain}/>
            </div>
        </Fade>
        </div>
        </>
    );
});

export default CenterPanel;