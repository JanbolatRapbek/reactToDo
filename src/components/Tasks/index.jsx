import React from "react";
import "./Tasks.scss";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

import editSvg from "../../assets/img/edit.svg";
import { Route } from "react-router-dom";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  lists,
  setLists,
  onRemoveTask,
  onEditTask,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Ведите называние", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, { name: newTitle })
        .catch(() => alert("Не удалось обновить список"));
    }
  };

  return (
    <div className="tasks">
      <h2 className="tasks__title" style={{ color: list.color.hex }}>
        {list?.name}
        <img onClick={editTitle} src={editSvg} alt="Edit icon"></img>
      </h2>
      <div className="tasks__items">
        {!withoutEmpty && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list &&
          list.tasks.map((task) => (
            <Task
              onRemove={onRemoveTask}
              key={task.id}
              onEdit={onEditTask}
              list={list}
              task={task}
            ></Task>
          ))}

        <AddTaskForm
          list={list}
          key={list.id}
          onAddTask={onAddTask}
        ></AddTaskForm>
      </div>
    </div>
  );
};

export default Tasks;
