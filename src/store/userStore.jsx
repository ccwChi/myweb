import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      loginInform: {},
      createAccount: (account, pw) =>
        set((store) => {
          return {
            loginInform: {
              ...store.loginInform,
              [account]: { password: pw }, // 存儲密碼的方式改成物件
            },
          };
        }),
      loginAccount: (account, pw) =>
        set((store) => {
          if (
            Object.prototype.hasOwnProperty.call(store.loginInform, account)
          ) {
            // 檢查密碼是否相符
            if (store.loginInform[account].password === pw) {
              console.log("Login successful");
              return true; // 密碼相符，登入成功
            } else {
              console.log("Incorrect password");
            }
          } else {
            console.log("Account not found");
          }
          return false; // 登入失敗
        }),
    }),
    { name: "ccwWeb" }
  )
);
