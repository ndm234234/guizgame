import  { useEffect, useState, useCallback } from "react";
import { forwardRef, useImperativeHandle, useRef } from 'react';

import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";

import CommandsSplash from './CommandsSplash.js'
import TopPanel from './TopPanel.js'
import CenterPanel from './CenterPanel.js'
import BottomPanel from './BottomPanel.js'

import {toQueries, getRandomItem, shuffleArray, deepCopyArray} from './tools.js'

import testData from './test.json';

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

  const modalRef = useRef();

  function onStart(names) {
    setCommandsSplashVisible(false)
    const newCommands = shuffleArray(names).map((item) => { return { name : item, questions : 0, score : 0, correctAnswers : 0}});
    setCommands(newCommands)
    onLoad(quiz)
  }

  function onLoad(data) {
    setCurrentCommand(0);
    setQuiz(data);
    setQueries(toQueries(data))
    document.title = "Викторина (" + data.title + ")";
    modalRef.current.reload();
  }

  function deepCopyArray(array) {
    return JSON.parse(JSON.stringify(array));
}

  function selectQuestion(cat, scoreValue) {
    const copyQueries = new Map(queries);
    if (copyQueries.has(cat)) {
      if (copyQueries.get(cat).has(scoreValue)) {
  
 
        const selectedRandomQueryItem = getRandomItem(copyQueries.get(cat).get(scoreValue).values());
        copyQueries.get(cat).get(scoreValue).delete(selectedRandomQueryItem);
        setSelectedRandomQuery(selectedRandomQueryItem);
  
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
  }

  function tryAgain() {
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

  const commandNames = commands.map((item) =>  item.name);

  return (

    <div className="App" >
      <CommandsSplash visible={commandsSplashVisible} 
                      commands={commandNames} 
                      onStart={onStart}/>
      <TopPanel visible={!commandsSplashVisible} title={quiz != null ? quiz.title : ""} commands={commands} currentCommand={currentCommand} onStart={onStart}/>
      <div className="center_panel">
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
                   tryAgain={tryAgain}
                   />
      </div>
      <BottomPanel visible={!commandsSplashVisible} onLoad={onLoad}
                   OnForceFinish={() => {
                     setCurrentCommand(-1)
                     modalRef.current.forceFinish()
                   }} 
                   tryAgain={tryAgain}/>
    </div>
  );
}

export default App;
