import React, { Component } from "react";
import Todo from "./Todo";
class TodoList extends Component {
  render() {
    const todos = this.props.tasks.map((todo, index) => {
      return (
        <li>
          <Todo
            content={todo}
            key={todo._id}
            id={todo._id}
            onUpdate={this.props.onUpdate}
            onDelete={this.props.onDelete}
          />
        </li>
      );
    });

    return (
      <div className="list-wrapper">
        <ul>{todos}</ul>
      </div>
    );
  }
}
export default TodoList;
