import  { useEffect, useLayoutEffect, useState, useCallback } from "react";
import { forwardRef, useImperativeHandle, useRef } from 'react';

import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";

import CommandsSplash from './CommandsSplash.js'
import TopPanel from './TopPanel.js'
import CenterPanel from './CenterPanel.js'
import BottomPanel from './BottomPanel.js'

import {toQueries, getRandomItem, shuffleArray, deepCopyArray} from './tools.js'

import testData from './start.json';

let initArray = [ {name : "Команда 1", questions : 0, score : 0, correctAnswers : 0 }, 
                  {name : "Команда 2", questions : 0, score : 0, correctAnswers : 0 }];

function App() {
  const [commands, setCommands] = useState(initArray)
  const [currentCommand, setCurrentCommand] = useState(0)
  const [commandsSplashVisible, setCommandsSplashVisible] = useState(true)
  const [quiz, setQuiz] = useState(testData)
  const [queries, setQueries] = useState(new Map())
  const [selectedRandomQuery, setSelectedRandomQuery] = useState(null)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showQuestion, setShowQuestion] = useState(false)
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false)
  const [isAnswerShown, setIsAnswerShown] = useState(false)
  const [isAnswerAllowClose, setIsAnswerAllowClose] = useState(false)
    
  const modalRef = useRef();

  function onStart(names) {
    setCommandsSplashVisible(false);
    const newCommands = shuffleArray(names).map((item) => { return { name : item, questions : 0, score : 0, correctAnswers : 0}});
    setCommands(newCommands)
    onLoad(quiz)
  }

  function onLoad(data) {
    setCurrentCommand(0);
    setQuiz(data);
    setQueries(toQueries(data))
    setQuestionNumber(0);
    setProgress(0);

    resetBottomNavigate();
    
    document.title = "Викторина (" + data.title + ")";
    modalRef.current.reload();
  }

  function selectQuestion(cat, scoreValue) {
    const copyQueries = new Map(queries);
    if (copyQueries.has(cat)) {
      if (copyQueries.get(cat).has(scoreValue)) {
  
        const selectedRandomQueryItem = getRandomItem(copyQueries.get(cat).get(scoreValue).values());
        copyQueries.get(cat).get(scoreValue).delete(selectedRandomQueryItem);

        // random answers order
        const options = shuffleArray(selectedRandomQueryItem.options.map((item, index) => {
            return { name: item, correct: selectedRandomQueryItem.answers.has(index) };
        }));

        const queryItem = 
        {
          category : selectedRandomQueryItem.category,
          score : selectedRandomQueryItem.score,
          question : selectedRandomQueryItem.question,
          questionImage : selectedRandomQueryItem.questionImage,
          options : options.map((item) => item.name),
          answers : new Set(options.map((item, index) => { return { item: item, index: index}}).filter((item) => item.item.correct).map((item) => item.index)),
          info : selectedRandomQueryItem.info,
          info_img : selectedRandomQueryItem.info_img
        };

        setSelectedRandomQuery(queryItem);
  
        if (copyQueries.get(cat).get(scoreValue).size == 0) {
            copyQueries.get(cat).delete(scoreValue);
        }
        if (copyQueries.get(cat).size == 0) {
          copyQueries.delete(cat);
        }
      }
    }
    setQueries(copyQueries);
    setQuestionNumber(questionNumber + 1);
    setNextButtonEnabled(false);
  }

  function resetBottomNavigate() {
    setShowQuestion(false);
    setIsAnswerShown(false);
    setIsAnswerAllowClose(false);
  }

  function tryAgain() {
    resetBottomNavigate();
    setCommandsSplashVisible(true);
  }

  function onQuestionResult(result, score) {
    const copyCommands =  deepCopyArray(commands);
    const command = copyCommands[currentCommand];
    command.questions ++;
    if (result) { 
      command.score += score;
      command.correctAnswers ++;
    }
    setCommands(copyCommands)

    const total = quiz != null ? quiz.items.length : 0;
    setProgress(total > 0 ? questionNumber * 100 / total : 0)

    if (queries.size == 0) {
      setCurrentCommand(-1);
      return;
    }

    let value = currentCommand + 1;
    if (value == commands.length) {
      value = 0;
    }
    setCurrentCommand(value);
  }

  function updateCenterPanelScrollBarState() {
    const scrollableDiv = document.getElementById('center_panel-div');
    if (scrollableDiv != null) {
        scrollableDiv.classList.remove('padded'); // Убираем класс, если скроллбара нет
      // Проверка, необходимо ли добавлять отступ
      if (scrollableDiv.scrollHeight > scrollableDiv.clientHeight) {
        scrollableDiv.classList.add('padded'); // Добавляем класс с паддингом
      }
      else {
        scrollableDiv.classList.remove('padded'); // Убираем класс, если скроллбара нет
      }
    }
  }

  useLayoutEffect(() => {
    updateCenterPanelScrollBarState();
  }, [commands, selectedRandomQuery, currentCommand]);

  window.onload = updateCenterPanelScrollBarState;
  window.onresize = updateCenterPanelScrollBarState;

  const commandNames = commands.map((item) =>  item.name);

  return (

    <div className="App" >
      <CommandsSplash visible={commandsSplashVisible} 
                      commands={commandNames} 
                      onStart={onStart}/>
      <TopPanel visible={!commandsSplashVisible} title={quiz != null ? quiz.title : ""} 
                progress={progress}
                commands={commands} 
                currentCommand={currentCommand} 
                onStart={onStart}/>
      <div className="center_panel" id = "center_panel-div">
      <CenterPanel ref={modalRef} 
                   visible={!commandsSplashVisible} 
                   commands={commands}
                   quiz={quiz} 
                   queries={queries} 
                   selectQuestion={selectQuestion}
                   selectedRandomQuery={selectedRandomQuery}
                   questionNumber={questionNumber}
                   totalQuestions={quiz != null ? quiz.items.length : 0}
                   onQuestionResult={onQuestionResult}
                   showNextButton = {(value) => {
                    setNextButtonEnabled(value)
                   }}
                   tryAgain={tryAgain}
                   onSelectQuestion = {(value) => {
                      setShowQuestion(value);
                   }}
                   onShowAnswers = { ()  => {
                      setIsAnswerAllowClose(true);
                   }}
                   />
      </div>             
      <BottomPanel visible={!commandsSplashVisible} 
                   showQuestion={showQuestion}
                   isAnswerShown={isAnswerShown}
                   isAnswerAllowClose={isAnswerAllowClose}
                   nextButtonEnabled={nextButtonEnabled}
                   onLoad={onLoad}
                   onShowAnswer={ (value) => {
                      setIsAnswerShown(value);
                      modalRef.current.forceShowAnswer(value)
                      if (!value) {
                        setIsAnswerAllowClose(false)
                      }
                    }
                  }
                   onNext={ () => {
                      modalRef.current.forceNext()
                    }
                  }
                   OnForceFinish={() => {
                     setCurrentCommand(-1)
                     modalRef.current.forceFinish()
                   }} 
                   tryAgain={tryAgain}/>
    </div>
  );
}

export default App;
