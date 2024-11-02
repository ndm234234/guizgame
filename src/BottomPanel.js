import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import './BottomPanel.css';

function BottomPanel(props) {

    const onLoad = (e) => {
      if (e.target.value) {
        let file = e.target.files[0];
        var r = new FileReader();
        r.onload = function(item) { 
            const data = JSON.parse(item.target.result);
            item.target.value = null;
            props.onLoad(data);
          };
        r.readAsText(file);
      }
    }

    return (
        <>
        <div className="bottom_panel">
        {props.visible && <div className="game_menu_group1">
            <input type="file" id="load_file"  accept=".txt,.json" style={{ display: 'none' }} onChange={onLoad}/>
            <DropdownButton variant="outline-light" id="dropdown-item-button" title="Игра">
              <Dropdown.Item as="button" onClick={props.tryAgain}>Новая</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="button" onClick={() => { document.getElementById('load_file').click(); }}>Загрузить</Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => { props.OnForceFinish(true)}}>Завершить</Dropdown.Item>
          </DropdownButton>
        </div>
        }
        <div className="bottom_panel_info">
              <h1>Школа 1538<br/>Класс 3Э 2024-2025г.<br/>Под руководством<br/>Давыдовой С.В.</h1>
        </div>
      </div>
      </>
 
    );
}

export default BottomPanel;