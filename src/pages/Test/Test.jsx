import { Button, Label } from "flowbite-react";
import { useTodoStore } from "../../hooks/useTodoStore";
import { useState } from "react";
import { shallow } from "zustand/shallow";
import { useEffect, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const data = [
  {
    id: "1",
    Task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    // Assigned_To: 'Beltran',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    Due_Date: "25-May-2020",
  },
  {
    id: "2",
    Task: "Fix Styling",
    // Assigned_To: 'Dave',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    Due_Date: "26-May-2020",
  },
  {
    id: "3",
    Task: "Handle Door Specs",
    // Assigned_To: 'Roman',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    Due_Date: "27-May-2020",
  },
  {
    id: "4",
    Task: "morbi",
    // Assigned_To: 'Gawen',
    // Assignee: 'Kai',
    // Status: 'Done',
    // Priority: 'High',
    Due_Date: "23-Aug-2020",
  },
  {
    id: "5",
    Task: "proin",
    // Assigned_To: 'Bondon',
    // Assignee: 'Antoinette',
    // Status: 'In Progress',
    // Priority: 'Medium',
    Due_Date: "05-Jan-2021",
  },
];
const columnList = {
  "01020825": {
    title: "Plain",
    items: data,
  },
  "01020826": {
    title: "Ongoing",
    items: [],
  },
  "01020827": {
    title: "Done",
    items: [],
  },
};

export default function TodoList() {
  const [columns, setColumns] = useState(columnList);
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log("source", destination,"source", destination)
    console.log("result",result)
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <div className="flex flex-1 p-4 gap-4 overflow-x-auto">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  className="min-w-[180px] h-fit flex flex-col flex-1
                  rounded-lg border border-gray-200 bg-slate-200 shadow-md
                dark:border-gray-700 dark:bg-gray-600  w-full p-2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  onClick={()=>console.log(column)}
                >
                  <Label className="pb-2">{column.title}</Label>
                  {column.items.map((item, index) => (
                    <TaskCard key={item.id} item={item} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </div>
  );
}

const TaskCard = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className="mt-2 h-fit flex flex-col flex-1
          rounded-lg border border-gray-200 bg-slate-50 shadow-md
      dark:border-gray-700 dark:bg-gray-500  w-full p-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{item.Task}</p>
        </div>
      )}
    </Draggable>
  );
};


// const TodoList = () => {
//   return (
//     <div className="flex flex-1 p-4 gap-4 overflow-x-auto">
//       <Column state={"Plan"}></Column>
//       <Column state={"Ongoing"}></Column>
//       <Column state={"Completion"}></Column>
//     </div>
//   );
// };

// export default TodoList;

// const Column = ({ state }) => {
//   const [text, setText] = useState("");
//   const [open, setOpen] = useState(false);
//   const [drop, setDrop] = useState(false);
//   const [newCard, setNewCard] = useState(false);

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

//   // 下面是用zustand來進行localstorage儲存管理的部分
//   const tasks = useTodoStore((todoStore) => {
//     return todoStore.tasks.filter((task) => task.state === state);
//   }, shallow);
//   const addTask = useTodoStore((todoStore) => todoStore.addTask);
//   const setDraggedTask = useTodoStore((todoStore) => todoStore.setDraggedTask);
//   const draggedTask = useTodoStore((todoStore) => todoStore.draggedTask);
//   const moveTask = useTodoStore((todoStore) => todoStore.moveTask);

//   const inputRef = useRef(null);

//   const handleInputChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleInputBlur = () => {
//     // handleAddNewCard();
//     if (text.trim()) {
//       console.log("addtask");
//       addTask(text, state);
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
//         {tasks.map((task, i) => (
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
//         ))}
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
