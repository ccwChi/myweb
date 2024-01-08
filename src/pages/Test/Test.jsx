import { Button } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { todoStore } from "../../store/todoStore";
import { FaPlus } from "react-icons/fa";
const DropdownTodoList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const { handleSubmit, register, reset } = useForm();

  const tasks = todoStore((store) => store.todoData.ongoing.data);
  const addTask = todoStore((store) => store.addTask);
  const moveTask = todoStore((store) => store.moveTask);

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      reset;
    }
  };
  const handleClickOutSide = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      reset();
    }
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="relative" ref={dropdownRef}>
        <Button
          onClick={toggleDropdown}
          type="button"
          color="light"
          className=" shadow-gray-300 shadow-sm h-7 w-fit rounded-md"
        >
          進行中任務{" "}
        </Button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="z-10 absolute mt-2 w-48 bg-white rounded-lg shadow dark:bg-gray-700">
            <ul
              className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 "
              aria-labelledby="dropdownBgHoverButton"
            >
              {tasks.map((task, index) => {
                return (
                  <React.Fragment key={task.id}>
                    <li>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          id="checkbox-item-5"
                          type="checkbox"
                          value=""
                          onChange={() => {}}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="checkbox-item-5"
                          className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                        >
                          {task.title}
                        </label>
                      </div>
                    </li>
                  </React.Fragment>
                );
              })}{" "}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-around items-center">
                  <input
                    className="w-[120px] text-gray-900 ps-2 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                    {...register("title")}
                  />
                  <Button type="submit" className=" !bg-transparent">
                    <FaPlus className=" cursor-pointer " size={8} />
                    {/* <span className="text-sm">新增</span> */}
                  </Button>
                </div>
              </form>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownTodoList;
