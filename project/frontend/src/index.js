import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const todo_items = [
  {
    id: 0,
    task: 'Buy groceries',
    completed: false
  },
  {
    id: 1,
    task: 'Wash clothes',
    completed: false
  },
  {
    id: 2,
    task: 'Clean litter box',
    completed: false
  }
]

class TodoList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      todos: todo_items,
      show_modal: false,
      view_completed: false,
      current_item: {
        task: '',
        completed: false,
      },
    };
  }

  async componentDidMount(){
    this.refresh_todos();
  }

  refresh_todos(){
    axios
      .get("/todo/")
      .then((res) => this.setState({todos: res.data}))
      .catch((err) => console.log(err));
  }

  delete_todo(item){
    axios
      .delete(`/todo/${item.id}/`)
      .then(() => this.refresh_todos())
      .catch((err) => console.log(err));
  }

  save_todo(item){
    if(item.id){
      axios
        .put(`/todo/${item.id}/`, item)
        .then(() => this.refresh_todos())
        .catch((err) => console.log(err));
    }
    else{
      axios
        .post("/todo/", item)
        .then(() => this.refresh_todos())
        .catch((err) => console.log(err));
    }

    this.hide_modal();
  }     

  new_todo(){
    const item = {task: '', completed: false};
    this.setState({current_item: item, show_modal: true});
  }

  edit_todo(item){
    this.setState({current_item: item, show_modal: true});
  }

  hide_modal(){
    this.setState({show_modal: false});
  }

  show_modal(){
    this.setState({show_modal: true});
  }

  handle_modal_change(e){
    if(e.target.type === 'checkbox'){
      const new_item = {id: this.state.current_item.id, task: this.state.current_item.task, completed: !this.state.current_item.completed};
      this.setState({current_item: new_item});
    }
    else{
      const new_item = {id: this.state.current_item.id, task: e.target.value, completed: this.state.current_item.completed}
      this.setState({current_item: new_item});
    }
  }

  toggle_todos(check){
    if(check){
      this.setState({view_completed: true});
    }
    else{
      this.setState({view_completed: false});
    }
  }

  render(){

    const items = this.state.todos.slice().filter((todo) => todo.completed === this.state.view_completed);

    const view_items = items.map((item) =>
      <ListGroupItem key={item.id}>
        <Row className='align-items-center'>
          <Col>{item.task}</Col>
          <Button as={Col} xs="auto" variant='secondary' onClick={() => this.edit_todo(item)}>Edit</Button>
          <Button as={Col} xs="auto" className='mx-2' variant='danger' onClick={() => this.delete_todo(item)}>Delete</Button>
        </Row>
      </ListGroupItem>
    );

    return(
      <main>
        <div>
          <h1 className='text-center text-white'>Todo List</h1>
          <Container className='p-3 bg-white rounded'>
            <Button onClick={this.new_todo.bind(this)}>Add Todo</Button>
            <div className='mt-4'>
              <Button onClick={() => this.toggle_todos(false)} variant={this.state.view_completed ? 'light' : 'info'}>Incomplete</Button>
              <Button className='mx-2' onClick={() => this.toggle_todos(true)} variant={this.state.view_completed ? 'info' : 'light'}>Complete</Button>
            </div>
            {this.state.view_completed
              ? (<h3 className='mt-4'>Completed Todo's</h3>)
              : (<h3 className='mt-4'>Incomplete Todo's</h3>)
            }
            <ListGroup className='mt-1'>{view_items}</ListGroup>
          </Container>
        </div>
        <TodoModal show={this.state.show_modal} handle_close={this.hide_modal.bind(this)} save_todo={this.save_todo.bind(this)} handle_change={this.handle_modal_change.bind(this)} current_item={this.state.current_item} />
      </main>
    );
  }
}

class TodoModal extends React.Component{

  render(){
    return(
      <Modal className='fade' show={this.props.show}>
        <Modal.Header closeButton onClick={this.props.handle_close}>
          <Modal.Title>Todo Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={event => event.preventDefault()}>
            <Form.Group className='mb-3'>
              <Form.Label>Task</Form.Label>
              <Form.Control type='text' name='task' value={this.props.current_item.task} placeholder='Enter task' onChange={this.props.handle_change}/>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Check type='checkbox' label='Completed' checked={this.props.current_item.completed} onChange={this.props.handle_change}/>
            </Form.Group>
            <Button variant='success' onClick={() => this.props.save_todo(this.props.current_item)} disabled={/\S/.test(this.props.current_item.task) === false ? true : false}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);