import React, { useState } from "react";
import axios from "axios";

import addSvg from "../../assets/img/add.svg";

const AddTaskForm = ({ list, onAddTask }) => {
  const [visiableForm, setVisiableForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const toggleVisiableForm = () => {
    setVisiableForm(!visiableForm);
    setInputValue("");
  };
  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        onAddTask(list.id, obj);
        toggleVisiableForm();
      })
      .catch(() => alert("Ошибка при добавление задачи!"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {!visiableForm ? (
        <div onClick={toggleVisiableForm} className="tasks__form-new">
          <img src={addSvg} alt="Add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          {}
          <input
            value={inputValue}
            className="field"
            type="text"
            placeholder="Текст задачи"
            onChange={(e) => setInputValue(e.target.value)}
          ></input>

          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? "Добавление" : "Добавить задачу"}
          </button>
          <button onClick={toggleVisiableForm} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
