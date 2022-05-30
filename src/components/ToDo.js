import React, { useEffect, useState } from "react";
// import { BarLoader, BeatLoader, BounceLoader, CircleLoader, ClimbingBoxLoader, ClockLoader, DotLoader, FadeLoader, GridLoader, HashLoader } from "react-spinners";
// import ContentLoader, { Facebook } from 'react-content-loader'








const ToDo = (props) => {
  const [tasks, setTasks] = useState(
    localStorage.getItem(`tasks`) == null
      ? []
      : JSON.parse(localStorage.getItem(`tasks`))
  );
  const [categoriesChange, setCategoriesChange] = useState([]);
  const [task, setTask] = useState({ id: "", title: "" });

  let massiv = [
    { id: 1, title: "title1" },
    { id: 2, title: "title2" },
    { id: 3, title: "title3" },
    { id: 4, title: "title4" },
    { id: 5, title: "title5" },
  ];

  let [one, two] = massiv;

  console.log(massiv);
  console.log("первый и второй элемент массива");
  console.log(one);
  console.log(one.id);
  console.log(one.title);
  console.log(two);

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const addNewPost = () => {
    let randomIndex = random(0, 100000000);
    setTasks([...tasks, { id: randomIndex, title: task.title }]);
    task.title = "";
  };

  const pinTheCategory = (itemIndex) => {
    var tasks2 = JSON.parse(localStorage.getItem("tasks"));

    const idList = tasks2.map((el) => el.id);
    var idPageIndex = idList.indexOf(Number(itemIndex));
    tasks2.splice(0, 0, tasks2.splice(idPageIndex, 1)[0]);

    localStorage.setItem("tasks", JSON.stringify(tasks2));
    setCategoriesChange([...categoriesChange, { text: "blabla" }]);
  };

  const removeTask = (itemIndex) => {
    setTasks(tasks.filter((p) => p.id !== itemIndex));
  };

  useEffect(() => {
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, [categoriesChange]);

  console.log(props);

  return (
    <div>
      <input
        value={task.title}
        onChange={(event) => setTask({ title: event.target.value })}
        type="text"
      />
      <button onClick={addNewPost}>Click me!</button>

      <div>
        {tasks.map((item) => (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
            key={item.id}
          >
            <p>{item.title}</p>
            <button onClick={() => removeTask(item.id)}>Удалить</button>
            <button onClick={() => pinTheCategory(item.id)}>Прикрепить</button>
          </div>
        ))}
      </div>

      {/* <ContentLoader viewBox="0 0 380 70">
        Only SVG shapes    
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
      </ContentLoader> */}
      {/* <AppLoader/> */}
      {/* <Spinner  color="rgb(30, 30, 30)"/> */}
      {/* <Example/> */}
      {/* <Oval
        height="50"
        width="50"
        color='rgb(0, 122, 204)'
        ariaLabel='loading'
        secondaryColor = 'rgba(240, 240, 250, 0)'
      /> */}
    </div>
  );
};
export default ToDo;
