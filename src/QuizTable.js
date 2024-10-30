import { useRef, useEffect, useState, useLayoutEffect, useCallback } from "react";
import { flushSync } from 'react-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { queries } from "@testing-library/react";
import {toQueries, toTableColumns} from './tools.js'

import './QuizTable.css';

function QuizTable(props) {

    const tableColumns = props.queries != null ? toTableColumns(props.queries) : new Array();

    if (!props.visible || props.quiz == null) {
        return null;
    }
    else 
    return (
    <table id = "quizTable">
        <tbody>
        {[...props.queries].map((key, index)  => {
            return <tr key={index}>
                        <td>{key[0]}</td>
                        {tableColumns.map((c) => {
                        if (key[1].has(c)) {
                            return <td key={key[0]}
                                    onClick={()=> {props.selectQuestion(key[0], c) }}
                                    >{c} ({key[1].get(c).size.toString()})</td>
                        } else 
                        {
                            return <td>-</td>
                        }
                        })}
                    </tr>;
        })}
        </tbody>
    </table>
    );
}

export default QuizTable;