import React, { Component } from 'react';

import './style.scss';

class Column extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProp) {
        return (nextProp.column !== this.props.column) || (nextProp.children !== this.props.children);
    }

    render() {
        return (

            <div className="Column">
                <div className="Column__header">
                    <h2 className="Column__title">
                        <span className="Column__item-count">{this.props.column.get('tasks').size}</span>
                        <span className="Column__text">{this.props.column.get('title')}</span>
                    </h2>
                    <p className="Column__btn" onClick={this.props.handleAddNewTask(this.props.column.get('id'))}>
                        <i className="fas fa-plus"></i> New task
                    </p>
                </div>
                <div className="Column__content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default Column;
