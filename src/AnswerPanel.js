import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import Button from 'react-bootstrap/Button';

import './AnswerPanel.css';

function AnswerPanel(props) {
    return (
     <div class="answer_panel_data">
        {props.query.info_img != null ? <img src={props.query.info_img} alt="image" class="answer_panel_data_image"/> : null}
            <div class="answer_panel_data_info">
            <textarea class="answer_panel_data_info_text_area" readonly="">
                {props.query.info != null ? props.query.info : "Внесите дополнительную информацию о вопросе."}</textarea>
            <div class="answer_panel_data_info_bottom_panel">
            <Button variant="outline-light" onClick={props.onClose}>Закрыть</Button>
                </div>
            </div>
      </div>
    );
}

export default AnswerPanel;