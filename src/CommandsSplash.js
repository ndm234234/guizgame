import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import {uuid, deepCopyArray} from './tools.js'

import './CommandsSplash.css';

function CommandsSplash(props) {
    const [commands, setCommands] = useState(new Array());
    const [commandCounter, setCommandCounter] = useState(0)

    const alertRef = useRef(null);

    const onCreateCommand = () => {
        flushSync(() =>{
            var array = commands.slice();
            let currentCommandCounter = Math.max(commandCounter + 1, array.length + 1);
            array.push({ name: "Команда " + currentCommandCounter.toString(), id : uuid()});
            setCommands(array);
            setCommandCounter(currentCommandCounter);
        });
        if (alertRef && alertRef.current) {
            alertRef.current.scrollTop = alertRef.current.scrollHeight;
        }
    }

    function onRemoveCommand(id) {
        const index = commands.findIndex(i => i.id == id);
        if (index != -1) {
            const newArray = [...commands.slice(0, index), ...commands.slice(index + 1)];
            setCommands(newArray.slice());
        }
      }

    useEffect(() => {
        setCommands(props.commands.map((item) => { return { name : item, id : uuid()}}));
    }, []);

    useEffect(() => {
        if (props.visible) {
            if (alertRef && alertRef.current) {
                alertRef.current.scrollTop = alertRef.current.scrollHeight;
            }
        }
    }, [props.visible] );

    function setCommandName(index, name) {
        const copyCommands =  deepCopyArray(commands);
        const command = copyCommands[index];
        command.name = name;
        setCommands(copyCommands);
      }

    if (!props.visible) {
            return null;
    }
    else return(
        <div className="containerCommands">
        <h1>Введите названия команд</h1>
        <div className="containerCommands_commands">
        <form action="" id="join-us">
            <div className="fields" id="fields" ref={alertRef}>
                {commands.map((item, index) => {
                    return (
                        <span key={item.id}> 
                            <input type="text" defaultValue={item.name}
                            onChange={(e) => setCommandName(index, e.target.value)}
                            ></input>
                            <div className="divCrossImageButton" >
                                <img src="cross.jpg" className="crossImageButton" alt="icon"
                                onClick={() => {
                                if (commands.length > 1){ 
                                    onRemoveCommand(item.id);
                                }}}/>
                            </div>
                    </span>
                    )
                })}
            </div>
        </form>
        </div>
        <div className="containerCommands_buttons">
        <input className="submit" id="add_command" value="Добавить команду" type="button" onClick={onCreateCommand}/>
        <input className="submit" id="start_command"value="Начать" type="button" 
               onClick={() => {props.onStart(commands.map((item) => item.name))}}/>
        </div>
    </div>
  );
}

export default CommandsSplash;
