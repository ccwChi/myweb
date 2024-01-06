import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodoStore = create(
  persist(
    (set) => ({
      todoData: {
        plan: { id: "2222", label: "待辦", data: [] },
        ongoing: { id: "3333", label: "進行中", data: [] },
        completion: { id: "4444", label: "完成", data: [] },
      },
      addTask: (title, columnName, id) =>
        set((store) => {
          const newTask = { title, id };
          switch (columnName) {
            case "plan":
              return {
                todoData: {
                  ...store.todoData,
                  plan: {
                    ...store.todoData.plan,
                    data: [...store.todoData.plan.data, newTask],
                  },
                },
              };
            case "ongoing":
              return {
                todoData: {
                  ...store.todoData,
                  ongoing: {
                    ...store.todoData.ongoing,
                    data: [...store.todoData.ongoing.data, newTask],
                  },
                },
              };
            case "completion":
              return {
                todoData: {
                  ...store.todoData,
                  completion: {
                    ...store.todoData.completion,
                    data: [...store.todoData.completion.data, newTask],
                  },
                },
              };
          }
        }),
      moveTask: (result) =>
        set((store) => {
          const tasks = store.todoData;
          const { source, destination } = result;
          const sourceColumn = Object.keys(tasks).find(
            (key) => tasks[key].id.toString() === source.droppableId
          );
          const destColumn = Object.keys(tasks).find(
            (key) => tasks[key].id.toString() === destination.droppableId
          );
          const sourceTasks = tasks[sourceColumn].data;
          const destTasks = tasks[destColumn].data;
          const removed = sourceTasks.splice(source.index, 1);
          destTasks.splice(destination.index, 0, ...removed);
          return {
            todoData: {
              ...store.todoData,
              [sourceColumn]: {
                ...store.todoData[sourceColumn],
                data: sourceTasks,
              },
              [destColumn]: {
                ...store.todoData[destColumn],
                data: destTasks,
              },
            },
          };
        }),
    }),
    { name: "todoStore" }
  )
);
