import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import Image from 'react-bootstrap/Image';

import './AnswerPanel.css';

function AnswerPanel(props) {
    const imgUrl = props.query.info_img != null && props.query.info_img.length > 0 ? props.query.info_img : props.query.questionImage;
    return (
     <div className="answer_panel_data">
            {imgUrl && <Image src={imgUrl} alt="image" className="answer_panel_data_image" rounded/>}
            <div className="answer_panel_data_info">
                <textarea className="answer_panel_data_info_text_area" readOnly
                value={props.query.info != null ? props.query.info : "Внесите дополнительную информацию о вопросе."}
                />
            </div>
      </div>
    );
}

export default AnswerPanel;