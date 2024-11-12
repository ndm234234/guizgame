import { useRef, useEffect, useState, useLayoutEffect, useCallback } from "react";
import { flushSync } from 'react-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { queries } from "@testing-library/react";
import {toQueries, toTableColumns} from './tools.js'
import Table from 'react-bootstrap/Table';

import './QuizTable.css';

function sizeStr(value) {
    if (value > 1) {
        return " (" + value.toString() + ")";
    }
    else {
        return "";
    }
}

function QuizTable(props) {

    const tableColumns = props.queries != null ? toTableColumns(props.queries) : new Array();

    if (!props.visible || props.quiz == null) {
        return null;
    }
    else 
    return (
        <Table striped="columns" bordered hover size="lg" className="quiz_table">
        <tbody>
        {[...props.queries].map((key, index)  => {
            return <tr key={index}>
                        <td>{key[0]}</td>
                        {tableColumns.map((c) => {
                        if (key[1].has(c)) {
                            return <td key={key[0]}
                                    onClick={()=> {props.selectQuestion(key[0], c) }}
                                    >{c}{sizeStr(key[1].get(c).size)}</td>
                        } else 
                        {
                            return <td>-</td>
                        }
                        })}
                    </tr>;
        })}
        </tbody>
        </Table>
    );
}

export default QuizTable;