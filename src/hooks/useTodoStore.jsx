import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodoStore = create(
  persist(
    (set) => ({
      tasks: [],
      draggedTask: null,
      tasksInOngoing: 0,
      addTask: (title, state, id) =>
        set((useTodoStore) => ({
          tasks: [...useTodoStore.tasks, { title, state, id }],
        })),
      deleteTask: (title) =>
        set((useTodoStore) => ({
          tasks: useTodoStore.tasks.filter((task) => task.title !== title),
        })),
      setDraggedTask: (title) => set({ draggedTask: title }),
      moveTask: (title, state) =>
        set((useTodoStore) => ({
          tasks: useTodoStore.tasks.map((task) =>
            task.title === title ? { title, state } : task
          ),
        })),
    }),
    { name: "todoStore" }
  )
);
