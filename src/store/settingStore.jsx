import { create } from "zustand";
import { persist } from "zustand/middleware";

export const todoStore = create(
  persist(
    (set) => ({
      userSetting: {
        personalData: {},
        systemSetting: {},
      },
      //   : (taskData, editData) => {
      //     set((store) => {
      //       const editTaskColumn = taskData.state;
      //       return {
      //         todoData: {
      //           ...store.todoData,
      //           [editTaskColumn]: {
      //             ...store.todoData[editTaskColumn],
      //             data: [
      //               ...store.todoData[editTaskColumn].data.map((task) => {
      //                 if (task.id === taskData.id) {
      //                   return {
      //                     ...task,
      //                     title: editData.title, // 更改 title
      //                     content: editData.content, // 新增 content
      //                   };
      //                 } else {
      //                   return task;
      //                 }
      //               }),
      //             ],
      //           },
      //         },
      //       };
      //     });
      //   },
      //   deleteTask: (taskState, taskId) => {
      //     set((store) => {
      //       const deleteIndex = store.todoData[taskState].data.findIndex(
      //         (task) => task.id === taskId
      //       );
      //       return store.todoData[taskState].data.splice(deleteIndex, 1);
      //     });
      //   },
    }),
    { name: "ccwWeb" }
  )
);
