import React, { useCallback, useEffect } from "react";
import axios from "axios";

import List from "../List";
import "./AddList.scss";
import Badge from "../Badge";
import closeSvg from "../../assets/img/close.svg";
import BD from "../../assets/db.json";

function AddList({ colors, onAdd }) {
  const [visiablePopup, setVisiablePopup] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(3);
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);
  const onClose = () => {
    setVisiablePopup(false);
    setInputValue("");
    setSelectedColor(colors[0].id);
  };
  const addList = () => {
    if (!inputValue) {
      alert("Введите называние");
      return;
    }
    setIsLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0];
        const listObj = { ...data, color: { name: color } };
        onAdd(listObj);
      })
      .finally(() => {
        setIsLoading(false);
        onClose();
      });
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiablePopup(!visiablePopup)}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить список",
          },
        ]}
      ></List>
      {visiablePopup && (
        <div className="add-list__popup">
          <img
            src={closeSvg}
            alt="close-popup"
            className="add-list__popup-close-btn"
            onClick={onClose}
          ></img>

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Называние списка"
          ></input>
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              ></Badge>
            ))}
          </div>

          <button onClick={addList} className="button">
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
}
export default AddList;
