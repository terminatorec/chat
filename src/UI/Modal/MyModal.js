import React, {useRef, useContext, useState, useEffect } from "react";

const MyModal = ({ props, setText, active, setActive }) => {
  const [task, setTask] = useState({ id: "", title: "" });
  const refInput = useRef(0);

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const submitForm = async () => {
      if(refInput.current.value){
          setText(task.title);
          task.title = "";
          setActive(false);
    }
    else{
        // setTexts([...texts, {id: }])
        refInput.current.style.background = 'rgb(254, 45, 0)'
        await timeout(500);
        refInput.current.style.background = 'rgb(255, 2555, 255)'
        console.log('ошибка')
    }
  };

  return (
    <div
      className={active ? `myModal active` : `myModal`}
      onClick={() => setActive(false)}
    >
      <h1>Ты попал в модальное окно</h1>
      <div className="myModalContent" onClick={(e) => e.stopPropagation()}>
        <input
            ref={refInput}
            value={task.title}
            onChange={(event) => setTask({ title: event.target.value })}
            type="text"
        />
        <button
          onClick={() => submitForm()}
        >
          Click
        </button>
      </div>
    </div>
  );
};

export default MyModal;
