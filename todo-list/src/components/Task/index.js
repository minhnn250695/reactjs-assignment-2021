import React, { Component, Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './style.scss';

class Task extends Component {
    constructor(props) {
        super(props);
    }


    shouldComponentUpdate(nextProp) {
        return (nextProp.index !== this.props.index) ||
            (nextProp.isEditing !== this.props.isEditing) ||
            (nextProp.task !== this.props.task);
    }

    render() {
        console.log('Task component render');
        return (
            <Draggable
                index={this.props.index}
                draggableId={this.props.task.get('id')}
                isDragDisabled={this.props.isEditing}
            >
                {
                    provided => (
                        <div className="Task"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            {
                                this.props.isEditing
                                    ? <div className="Task__editing">
                                        <input type="text"
                                            className="Task__editor"
                                            defaultValue={this.props.task.get('content')}
                                            onChange={this.props.handleChangeTaskContent} />
                                        <div className="Task__editing-action">
                                            <i className="fas fa-check" onClick={this.props.handleEdit}></i>
                                            <i className="fas fa-ban" onClick={this.props.handleCancelEdit}></i>
                                        </div>
                                        <div className="Task__editing-bgr" onClick={this.props.handleCancelEdit}></div>
                                    </div>
                                    : <Fragment>
                                        <div className="Task__time">
                                            <i className="far fa-calendar-alt"></i> {this.props.task.get('time')}
                                        </div>
                                        <div className="Task__main">
                                            <div className="Task__content">
                                                {this.props.task.get('content')}
                                            </div>
                                            <div className="Task__action">
                                                <div className="Task__btn" onClick={this.props.handleChooseEditTask}>
                                                    <i className="far fa-edit"></i>
                                                </div>
                                                <div className="Task__btn" onClick={this.props.handleDeleteTask}>
                                                    <i className="far fa-trash-alt"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                            }
                        </div>
                    )
                }
            </Draggable >
        )
    }
}

export default Task;
