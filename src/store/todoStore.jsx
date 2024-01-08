import { create } from "zustand";
import { persist } from "zustand/middleware";

export const todoStore = create(
  persist(
    (set) => ({
      todoData: {
        plan: { id: "2222", label: "待辦", data: [] },
        ongoing: { id: "3333", label: "進行中", data: [] },
        completion: { id: "4444", label: "完成", data: [] },
      },
      addTask: (title, columnName) =>
        set((store) => {
          const newTask = {
            title,
            id: Date.now().toString(),
            createTime: new Date(),
            startTime: columnName === "ongoing" ? new Date() : "",
            completionTime: columnName === "completion" ? new Date() : "",
          };
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
      moveTask: (sourceColumn, sourceTasks, destColumn, destTasks) =>
        set((store) => {
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
      editTask: (taskData, editData) => {
        set((store) => {
          const editTaskColumn = taskData.state;
          return {
            todoData: {
              ...store.todoData,
              [editTaskColumn]: {
                ...store.todoData[editTaskColumn],
                data: [
                  ...store.todoData[editTaskColumn].data.map((task) => {
                    if (task.id === taskData.id) {
                      return {
                        ...task,
                        title: editData.title, // 更改 title
                        content: editData.content, // 新增 content
                      };
                    } else {
                      return task;
                    }
                  }),
                ],
              },
            },
          };
        });
      },
      deleteTask: (taskState, taskId) => {
        set((store) => {
          const deleteIndex = store.todoData[taskState].data.findIndex(
            (task) => task.id === taskId
          );
          return store.todoData[taskState].data.splice(deleteIndex, 1);
        });
      },
    }),
    { name: "ccwWeb" }
  )
);
