import Table from 'react-bootstrap/Table';
import './QuizTable.css';

function sizeStr(value) {
    if (value > 1) {
        return " (" + value.toString() + ")";
    }
    return "";
}

function toTableColumns(queries) {

    if (!queries) return [];

    const mapColumns = new Set();
    
    for (let entry of queries) {
        const columns = entry[1];
        for (let columnItem of columns) {
            mapColumns.add(columnItem[0]);
        }
    }

    const sortedColumns = Array.from(mapColumns);
    sortedColumns.sort((a, b) => {
        return a - b;
    });
    return sortedColumns;
}

function QuizTable(props) {
    const { visible, queries, selectQuestion } = props;

    if (!visible) {
        return null;
    }

    const tableColumns = toTableColumns(queries);
    const queriesArray = [...queries];

    return (
        <div className="quiz-table-container">
            <Table striped="columns" bordered hover className="quiz-table">
                <tbody>
                    {queriesArray.map(([rowKey, rowDataMap]) => {
                        return (
                            <tr key={rowKey}>
                                {/* Первый столбец - занимает оставшееся пространство */}
                                <td className="quiz-table-first-col text-center">
                                    <div className="cell-content">
                                        {rowKey}
                                    </div>
                                </td>
                                
                                {/* Остальные столбцы - одинаковой ширины */}
                                {tableColumns.map((column) => {
                                    const cellKey = `${rowKey}_${column}`;
                                    
                                    if (rowDataMap.has(column)) {
                                        const cellData = rowDataMap.get(column);
                                        const questionScore = sizeStr(cellData.size);
                                        
                                        return (
                                            <td 
                                                key={cellKey}
                                                onClick={() => selectQuestion(rowKey, column)}
                                                className="quiz-table-other-col text-center clickable-cell"
                                                title={`${column}${questionScore}`}
                                            >
                                                <div className="cell-content">
                                                    {column}{questionScore}
                                                </div>
                                            </td>
                                        );
                                    } else {
                                        return (
                                            <td 
                                                key={cellKey}
                                                className="quiz-table-other-col text-center"
                                            >
                                                <div className="cell-content">
                                                    -
                                                </div>
                                            </td>
                                        );
                                    }
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default QuizTable;