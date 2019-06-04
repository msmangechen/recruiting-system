import React, {Component} from 'react';
import './CalendarView.css';
import 'antd/dist/antd.css';
import { Calendar } from 'antd';

class CalendarView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Calendar onSelect={this.onSelect}
                      dateCellRender={dateCellRender}
                      monthCellRender={monthCellRender}
                      onPanelChange={onPanelChange}/>
        )
    }
}

function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'normal', content: 'Interview: 2:00PM.' },
                { type: 'error', content: 'Event cancel.' },
            ]; break;
        case 10:
            listData = [
                { type: 'warning', content: 'Evaluation: 5PM.' },
                { type: 'normal', content: 'Interview: 10:30AM.' },
                { type: 'error', content: 'Event cancel.' },
            ]; break;
        case 15:
            listData = [
                { type: 'warning', content: 'Evaluation: 2PM.' },
                { type: 'normal', content: 'Interview: 9:30AM.' },
                { type: 'normal', content: 'Interview: 11:30AM.' },
                { type: 'normal', content: 'Interview: 4:30PM.' },
            ]; break;
        default:
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <ul className="events">
            {
                listData.map(item => (
                    <li key={item.content}>
                        <span className={`event-${item.type}`}>●</span>
                        {item.content}
                    </li>
                ))
            }
        </ul>
    );
}


function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}

function onPanelChange(value, mode) {
    console.log(value, mode);
}

export default CalendarView;