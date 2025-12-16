import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useRef, useState } from 'react';

import MessageBoxModal from './MessageBoxModal.js'

// import FileLoader from './FileLoader.js'

import './BottomPanel.css';

function BottomPanel(props) {

  const [menuCommand, setMenuCommand] = useState(null)

  const onLoad = (e) => {
    if (e.target.value) {
      let file = e.target.files[0];
      var r = new FileReader();
      r.onload = function (item) {
        const data = JSON.parse(item.target.result);
        e.target.value = '';
        props.onLoad(data);
      };
      r.readAsText(file);
    }
  }

  const fileInputRef = useRef(null);

  return (
    <>
      {props.showQuestion &&
        <div className="navigate_panel">
          {props.visible && props.isAnswerShown && props.isAnswerAllowClose &&
            <Button variant="outline-light" onClick={() => { props.onShowAnswer(false) }}>Закрыть</Button>}
          {props.visible && !props.isAnswerShown &&
            <div className="navigate_panel">
              <Button variant="outline-light" onClick={() => { props.onShowAnswer(true) }}>Показать ответ</Button>
              <Button variant="outline-light" disabled={!props.nextButtonEnabled} onClick={props.onNext}>Далее</Button>
            </div>}
        </div>
      }
      <div className="bottom_panel">
        {props.visible && <div className="game_menu_group1">
          <DropdownButton variant="outline-light" id="dropdown-item-button" title="Игра">
            <Dropdown.Item as="button"
              onClick={() =>
                setMenuCommand(() => props.tryAgain)
              }>Новая</Dropdown.Item>
            <Dropdown.Divider />
            {/*
              <FileLoader ref={fileInputRef} onLoad={props.onLoad}/>
              <Dropdown.Item as="button" onClick={() => { fileInputRef.current.click(); }}>Загрузить</Dropdown.Item>
              */}
            <Dropdown.Item as="button"
              onClick={() =>
                setMenuCommand(() => () => props.OnForceFinish(true))
              }>Завершить</Dropdown.Item>
          </DropdownButton>
        </div>
        }
        <div className="bottom_panel_info">
          <h1>Братищев А.В.<br />Школа 1538 Класс 4Э<br />2025-2026г. Под руководством Давыдовой С.В.</h1>
        </div>

        <MessageBoxModal show={menuCommand != null}
          title="Внимание"
          query="Прервать текущую игру?"
          okButton="Прервать"
          cancelButton="Отмена"
          onCancel={() => {
            setMenuCommand(null);
          }}
          onOk={() => {
            menuCommand();
            setMenuCommand(null);
          }
          } />
      </div>
    </>

  );
}

export default BottomPanel;