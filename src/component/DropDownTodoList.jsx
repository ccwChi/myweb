import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

const fakeTodoList = [
  { title: "task1", id: 1 },
  { title: "task2", id: 2 },
  { title: "task3", id: 3 },
];

function DropDownTodoList() {
  const [taskList, setTaskList] = useState([]);
  const [finishList, setFinishList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleCheckBox = (e) => {
    e.stopPropagation();
    if (e.target.checked) {
      setFinishList([
        ...finishList,
        ...taskList.filter((i) => i.title === e.target.name),
      ]);
    } else {
      setFinishList(finishList.filter((i) => i.title !== e.target.name));
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Dropdown
      label="待辦清單"
      dismissOnClick={false}
      renderTrigger={() => (
        <Button
          className=" shadow-gray-300 shadow-sm h-7 w-fit rounded-md"
          color="light"
        >
          清單
        </Button>
      )}
    >
      {taskList.map((task) => (
        <DropdownItem key={"task" + task.id} className="max-w-[180px]">
          <div className="flex items-center">
            <input
              id={`task-${task.id}`}
              name={task.title}
              type="checkbox"
              className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
          focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
          focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
              onChange={(e) => handleCheckBox(e, task)}
            />
            <label
              htmlFor={`task-${task.id}`}
              className={`${
                finishList.some((i) => i.title === task.title)
                  ? "line-through"
                  : ""
              } ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 break-words text-left`}
            >
              {task.title}
            </label>
          </div>
        </DropdownItem>
      ))}
      <DropdownDivider />
      <div className="flex justify-around items-center gap-2 p-2">
        <TextInput
          className=""
          type="text"
          sizing="sm"
          size={12}
          value={inputValue}
          onKeyDown={(e) => e.stopPropagation()}
          onInput={(e) => handleInputChange(e)}
        />
        <FaPlus
          className=" cursor-pointer "
          onClick={() => {
            setTaskList([
              ...taskList,
              { title: inputValue, id: inputValue + Math.random() * 100 },
            ]);
            setInputValue("");
          }}
        />
      </div>
    </Dropdown>
  );
}

export default DropDownTodoList;
