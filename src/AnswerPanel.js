import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import QuizTable from './QuizTable.js'

import './AnswerPanel.css';

function AnswerPanel(props) {
     if (!props.visible) {
        return null;
    }
    else 
    return (
     <div class="answer_panel_data">
        {props.selectedRandomQuery.info_img != null ? <img src={props.selectedRandomQuery.info_img} alt="image" class="answer_panel_data_image"/> : null}
            <div class="answer_panel_data_info">
            <textarea class="answer_panel_data_info_text_area" readonly="">
                {props.selectedRandomQuery.info != null ? props.selectedRandomQuery.info : "Внесите дополнительную информацию о вопросе."}</textarea>
            <div class="answer_panel_data_info_bottom_panel">
            <Button variant="outline-light" onClick={props.onClose}>Закрыть</Button>
                </div>
            </div>
      </div>
    );
}

export default AnswerPanel;