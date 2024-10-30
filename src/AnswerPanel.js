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
     <div class="question_panel_data_information_div">
        {props.selectedRandomQuery.info_img != null ? <img src={props.selectedRandomQuery.info_img} alt="image" class="image_src" id="image_src"/> : null}
            <div class="question_panel_data_button1">
            <textarea class="question_panel_text_area" id="question_panel_data_area" readonly="">
                {props.selectedRandomQuery.info != null ? props.selectedRandomQuery.info : "Внесите дополнительную информацию о вопросе."}</textarea>
            <div class="question_panel_data_button_area">
                <input class="submit" id="question_panel_data_information_button" value="Закрыть" type="button" onClick={props.onClose}/>
                </div>
            </div>
      </div>
    );
}

export default AnswerPanel;