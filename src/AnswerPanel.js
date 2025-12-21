
import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from 'react-dom';

import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';

import './AnswerPanel.css';

function AnswerPanel(props) {
  const [show, setShow] = useState(true);

  const imgUrl = props.query.info_img != null && props.query.info_img.length > 0
    ? props.query.info_img
    : props.query.questionImage;

  return (
    <Modal
      show={true}
      fullscreen={true}
      onHide={props.onCloseAnswerPanel}
      className="answer_panel_data"
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title>Правильный ответ</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex flex-column h-100">
          {imgUrl && (
            <div className="text-center mb-3">
              <Image
                src={imgUrl}
                alt="Изображение вопроса"
                className="answer_panel_data_image"
                fluid
              />
            </div>
          )}

          <div className="answer_panel_data_info flex-grow-1">
            <textarea
              className="answer_panel_data_info_text_area h-100"
              readOnly
              value={props.query.info != null
                ? props.query.info
                : "Внесите дополнительную информацию о вопросе."}
              placeholder="Дополнительная информация отсутствует"
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AnswerPanel;