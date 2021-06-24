import React, { Component } from "react";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { v4 as uuidv4 } from 'uuid';
import { fromJS } from 'immutable'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import './style.scss';
import Column from '../../components/Column/';
import MatDialog from '../../components/AddMatModal/';
import Task from '../../components/Task/';
import axios from "axios";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayModal: false,
      editingColumnIndex: '',
      taskContent: '',
      editingTaskIndex: null,
      editedTaskId: null,
      columns: fromJS([
        { id: 'td', title: 'TO DO', tasks: [] },
        { id: 'ip', title: 'IN PROGRESS', tasks: [] },
        { id: 'de', title: 'DONE', tasks: [] }
      ])
    }
  }

  componentDidMount() {
    axios.get('/todo_items').then(result => {
      console.log(result);
      const columns = result;
      if (columns) {
        console.log(columns);        
        this.setState({
          columns: fromJS(columns.data),
        });
      }
    })
  }

  handleToggleModal = (choosenColumn = '') => () => {
    this.setState(prevState => ({
      displayModal: !prevState.displayModal,
      selectedColumn: choosenColumn,
      editingColumnIndex: choosenColumn
    }));
    if (!this.displayModal) {
      this.setState({ taskContent: '' });
    }
  }

  handleChangeTaskContent = (e) => this.setState({ taskContent: e.target.value })

  handleChangeeditingColumnIndex = (editingColumnIndex) => () => this.setState({ editingColumnIndex: editingColumnIndex })

  handleAddNewTask = () => {
    const { taskContent } = this.state
    if (taskContent.trim() === '') {
      toastr.warning('Please enter your task', 'Notice', { timeOut: 2000 });
    } else {
      const { editingColumnIndex, columns } = this.state;
      const newTask = fromJS({
        id: uuidv4(),
        content: taskContent,
        time: new Date().toLocaleString()
      });
      const columnIndex = columns.findIndex(column => column.get('id') === editingColumnIndex);
      const updatedColumn = columns.updateIn([columnIndex, 'tasks'], tasks => tasks.push(newTask));
      this.setState({
        displayModal: false,
        editingColumnIndex: '',
        taskContent: '',
        columns: fromJS(updatedColumn)
      }, () => {
        localStorage.setItem('columns', JSON.stringify(updatedColumn.toJS()));
      });
    }
  }

  handleDeleteTask = (columnIndex, taskIndex) => () => {
    const result = window.confirm('Are your sure to delete this task?');
    if (result) {
      const { columns } = this.state;
      const updatedColumn = columns.updateIn(
        [columnIndex, 'tasks'],
        tasks => tasks.remove(taskIndex));
      this.setState({ columns: fromJS(updatedColumn) }, () => {
        localStorage.setItem('columns', JSON.stringify(updatedColumn.toJS()));
        toastr.success('Delete task success', 'Notice', { timeOut: 2000 });
      });
    }
  }

  handleChooseEditTask = (columnIndex, taskIndex, taskId) => () => {
    this.setState({
      editingColumnIndex: columnIndex,
      editingTaskIndex: taskIndex,
      editedTaskId: taskId
    })
  }

  handleChangeSelectedColumn = (selectedColumn) => {
    this.setState({ selectedColumn: selectedColumn.target.value, editingColumnIndex: selectedColumn.target.value, })
  }

  handleEdit = () => {
    const { columns, editingColumnIndex, taskContent, editingTaskIndex } = this.state;
    const updatedColumn = columns.updateIn(
      [editingColumnIndex, 'tasks'],
      tasks => tasks.setIn([editingTaskIndex, 'content'], taskContent)
    );
    this.setState({
      editingColumnIndex: '',
      taskContent: '',
      editedTaskId: null,
      editingTaskIndex: null,
      columns: fromJS(updatedColumn)
    }, () => {
      localStorage.setItem('columns', JSON.stringify(updatedColumn.toJS()));
    });
  }

  handleCancelEdit = () => {
    this.setState({
      editingColumnIndex: '',
      taskContent: '',
      editedTaskId: null,
      editingTaskIndex: null
    });
  }

  handleSaveDrag = (result) => {
    const { source, destination, reason } = result;
    if (reason === 'DROP' && destination) {
      const { columns } = this.state;
      const sourceColumnIndex = columns.findIndex(column => column.get('id') === source.droppableId);
      const task = columns.getIn([sourceColumnIndex, 'tasks', source.index]);
      let updatedColumn = columns.updateIn(
        [sourceColumnIndex, 'tasks'],
        tasks => tasks.remove(source.index)
      );
      const destinationColumnIndex = columns.findIndex(column => column.get('id') === destination.droppableId);
      updatedColumn = updatedColumn.updateIn(
        [destinationColumnIndex, 'tasks'],
        tasks => tasks.insert(destination.index, task)
      );
      this.setState({
        columns: fromJS(updatedColumn)
      }, () => {
        localStorage.setItem('columns', JSON.stringify(updatedColumn.toJS()));
      });
    }
  }
  render() {
    const { columns, displayModal, editingColumnIndex, taskContent, editedTaskId } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">TO DO LIST</h1>
        <DragDropContext onDragEnd={this.handleSaveDrag}>
          <div className="App__content">
            {
              columns.map((column, columnIndex) => (
                <Column key={column.get('id')}
                  column={column}
                  handleAddNewTask={this.handleToggleModal}
                >
                  <Droppable droppableId={column.get('id')}>
                    {
                      provided => (
                        <div ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{ minHeight: '300px' }}
                        >
                          {
                            column.get('tasks').map((task, taskIndex) => (
                              <Task key={task.get('id')}
                                index={taskIndex}
                                isEditing={task.get('id') === editedTaskId}
                                handleChangeTaskContent={this.handleChangeTaskContent}
                                task={task}
                                handleEdit={this.handleEdit}
                                handleCancelEdit={this.handleCancelEdit}
                                handleChooseEditTask={this.handleChooseEditTask(columnIndex, taskIndex, task.get('id'))}
                                handleDeleteTask={this.handleDeleteTask(columnIndex, taskIndex)} />
                            ))
                          }
                          {provided.placeholder}
                        </div>
                      )
                    }
                  </Droppable>
                </Column>
              ))
            }
          </div>
        </DragDropContext>
        {
          displayModal && <MatDialog
            open={displayModal}
            editingColumnIndex={editingColumnIndex}
            taskContent={taskContent}
            handleChangeTaskContent={this.handleChangeTaskContent}
            handleChangeeditingColumnIndex={this.handleChangeeditingColumnIndex}
            handleAddNewTask={this.handleAddNewTask}
            handleToggleModal={this.handleToggleModal()}
            selectedColumn={this.state.selectedColumn}
            handleChangeSelectedColumn={this.handleChangeSelectedColumn}
          />
        }
      </div>
    );
  }
}
export default TodoList;