import { useState, useEffect, useRef } from "react";
import { Button, Label } from "flowbite-react";
import { useTodoStore } from "../../hooks/useTodoStore";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TodoListModal from "./TodoListModal";

const TodoList = () => {
  // 建立新卡片用
  const [text, setText] = useState("");
  const [newCard, setNewCard] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  // store裡面的函數
  const tasks = useTodoStore((store) => store.todoData);
  const addTask = useTodoStore((todoStore) => todoStore.addTask);
  const moveTask = useTodoStore((store) => store.moveTask);
  const onDragEnd = (result) => {
    if (!result.destination) return;
    moveTask(result);
  };

  // ↓↓處理遺失焦點後新建卡片的處理
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleInputBlur = (columnName) => {
    if (text.trim()) {
      const id = Date.now().toString();
      addTask(text, columnName, id);
      setText("");
    }
    setNewCard(false);
  };

  useEffect(() => {
    if (newCard) inputRef.current.focus();
  }, [newCard]);
  // ↑↑處理遺失焦點後新建卡片的處理

  return (
    <div className="flex flex-1 p-4 gap-4 overflow-x-auto">
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {Object.entries(tasks).map(([columnName, column]) => {
          return (
            <Droppable key={column.id} droppableId={column.id.toString()}>
              {(provided, snapshot) => (
                <div
                  className="min-w-[180px] h-fit flex flex-col flex-1
                  rounded-lg border border-gray-200 bg-slate-200 shadow-md
                dark:border-gray-700 dark:bg-gray-600  w-full p-2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  onClick={() => console.log(column)}
                >
                  <Label className="pb-2">{column.label}</Label>
                  {column.data.map((task, index) => (
                    <Draggable draggableId={task.id} index={index} key={index}>
                      {(provided) => (
                        <div
                          className="mt-2 h-fit flex flex-col flex-1
                            rounded-lg border border-gray-200 bg-slate-50 shadow-md
                          dark:border-gray-700 dark:bg-gray-500  w-full p-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenModal(true);
                            setDeliveryInfo(task);
                          }}
                        >
                          <p>{task.title}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {newCard === column.id && (
                    <div
                      className="mt-2 flex flex-col flex-1
          rounded-lg border border-gray-200 bg-white shadow-md
        dark:border-gray-700 dark:bg-gray-600  w-full p-2"
                    >
                      <div className="flex">
                        <input
                          ref={inputRef}
                          value={text}
                          onChange={handleInputChange}
                          onBlur={() => handleInputBlur(columnName)}
                          className="m-2 text-gray-900 dark:text-white border-0
          border-gray-400 w-full bg-transparent text-sm focus:outline-none
          focus:ring-0"
                        />
                      </div>
                    </div>
                  )}
                  <Button
                    className="my-2 p-0 h-8"
                    color="inherent"
                    onClick={() => {
                      setNewCard(column.id);
                    }}
                  >
                    + 新增
                  </Button>
                </div>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
      <TodoListModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        deliveryInfo={deliveryInfo}
      />
    </div>
  );
};

export default TodoList;

// const Column = ({ state }) => {
//   const [text, setText] = useState("");
//   const [open, setOpen] = useState(false);
//   const [drop, setDrop] = useState(false);
//   const [newCard, setNewCard] = useState(false);

//   const tasks = useTodoStore((todoStore) => todoStore.todoData);
//   const addTask = useTodoStore((todoStore) => todoStore.addTask);

//   console.log(tasks);
//   // 下面是拖曳專用
//   const [columns, setColumns] = useState(columnList);
//   const onDragEnd = (result, columns, setColumns) => {
//     if (!result.destination) return;
//     const { source, destination } = result;
//     if (source.droppableId !== destination.droppableId) {
//       const sourceColumn = columns[source.droppableId];
//       const destColumn = columns[destination.droppableId];
//       const sourceItems = [...sourceColumn.items];
//       const destItems = [...destColumn.items];
//       const [removed] = sourceItems.splice(source.index, 1);
//       destItems.splice(destination.index, 0, removed);
//       setColumns({
//         ...columns,
//         [source.droppableId]: {
//           ...sourceColumn,
//           items: sourceItems,
//         },
//         [destination.droppableId]: {
//           ...destColumn,
//           items: destItems,
//         },
//       });
//     } else {
//       const column = columns[source.droppableId];
//       const copiedItems = [...column.items];
//       const [removed] = copiedItems.splice(source.index, 1);
//       copiedItems.splice(destination.index, 0, removed);
//       setColumns({
//         ...columns,
//         [source.droppableId]: {
//           ...column,
//           items: copiedItems,
//         },
//       });
//     }
//   };
//   // const tasks = useTodoStore((todoStore)=> todoStore.)
//   // 下面是用zustand來進行localstorage儲存管理的部分

//   const inputRef = useRef(null);

//   const handleInputChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleInputBlur = () => {
//     // handleAddNewCard();
//     if (text.trim()) {
//       const id = Date.now();
//       // console.log(id)
//       addTask(text, state, id);
//       // newTask(text, state, id);
//       setText("");
//       setNewCard(false);
//     } else {
//       setNewCard(false);
//     }
//   };

//   useEffect(() => {
//     // 在元件裝載後自動 focus 到 input
//     if (newCard) inputRef.current.focus();
//   }, [newCard]);

//   return (
//     <div
//       className="min-w-[180px] h-fit flex flex-col flex-1
//     rounded-lg border border-gray-200 bg-slate-200 shadow-md
//   dark:border-gray-700 dark:bg-gray-600  w-full p-2"
//     >
//       <Label className="pb-2">{state}</Label>
//       <div>
//         {/* {console.log(tasks)} */}
//         {/* {tasks.map((task, i) => (
//           <div
//             key={i}
//             className="mt-2 h-fit flex flex-col flex-1
//           rounded-lg border border-gray-200 bg-slate-50 shadow-md
//         dark:border-gray-700 dark:bg-gray-500  w-full p-2"
//           >
//             <div className="flex">
//               <input
//                 ref={inputRef}
//                 value={task.title}
//                 onChange={handleInputChange}
//                 onBlur={handleInputBlur}
//                 className="m-2 text-gray-900 dark:text-white border-0
//           border-gray-400 w-full bg-transparent text-sm focus:outline-none
//           focus:ring-0"
//               />
//             </div>
//           </div>
//         ))} */}
//         {newCard && (
//           <div
//             className="mt-2 h-fit flex flex-col flex-1
//           rounded-lg border border-gray-200 bg-white shadow-md
//         dark:border-gray-700 dark:bg-gray-600  w-full p-2"
//           >
//             <div className="flex">
//               <input
//                 ref={inputRef}
//                 value={text}
//                 onChange={handleInputChange}
//                 onBlur={handleInputBlur}
//                 className="m-2 text-gray-900 dark:text-white border-0
//           border-gray-400 w-full bg-transparent text-sm focus:outline-none
//           focus:ring-0"
//               />
//             </div>
//           </div>
//         )}
//         <Button
//           className="my-2 p-0 h-8"
//           color="inherent"
//           onClick={() => setNewCard(true)}
//         >
//           + 新增
//         </Button>
//       </div>
//     </div>
//   );
// };

// {"state":{"todoData":{"plan":{"id":2222,"data":[{"title":"1-0","state":"Plan","id":1704533450758},{"title":"1-1","state":"Plan","id":1704533453930}]},"ongoing":{"id":3333,"data":[{"title":"2-0","state":"Ongoing","id":1704533456308},{"title":"2-1","state":"Ongoing","id":1704533459113},{"title":"2-2","state":"Ongoing","id":1704533461294},{"title":"2-3","state":"Ongoing","id":1704533463522}]},"completion":{"id":4444,"data":[{"title":"3-0","state":"Completion","id":1704533465685},{"title":".-.","state":"Completion","id":1704533468794}]}}},"version":0}
