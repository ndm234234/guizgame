import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import {uuid, deepCopyArray} from './tools.js'

import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import './CommandsSplash.css';

function CommandsSplash(props) {
    const [commands, setCommands] = useState(new Array());
    const [commandCounter, setCommandCounter] = useState(0)

    const alertRef = useRef(null);

    const onCreateCommand = () => {
        flushSync(() =>{
            var array = commands.slice();
            if (array.length < 9) {
                let currentCommandCounter = Math.max(commandCounter + 1, array.length + 1);
                array.push({ name: "Команда " + currentCommandCounter.toString(), id : uuid()});
                setCommands(array);
                setCommandCounter(currentCommandCounter);
            }
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
        <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog centered className="modal-fixed_width">
        <Modal.Header className="modal-header-custom modal-content-custom">
          <Modal.Title>Введите названия команд</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-content-custom"> 
            <div className="containerCommands">
            <form action="" className="form-commands">
            <div className="fields" id="fields" ref={alertRef}>
                    {commands.map((item, index) => {
                        return (
                            <span key={item.id}> 
                                <input type="text" defaultValue={item.name}
                                onChange={(e) => setCommandName(index, e.target.value)}
                                ></input>
                                <div className="divCrossImageButton" >
                                <CloseButton className="crossImageButton"
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
        </Modal.Body>
        <Modal.Footer centered className="modal-content-custom">
            <Button variant="outline-light" onClick={onCreateCommand}>Добавить команду</Button>{' '}
            <Button variant="outline-light" onClick={() => {props.onStart(commands.map((item) => item.name))}}>Начать игру</Button>{' '}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default CommandsSplash;
