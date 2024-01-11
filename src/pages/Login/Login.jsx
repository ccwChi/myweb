import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userStore } from "../../store/userStore";

const Login = () => {
  const [state, setState] = useState("register");
  const defaultValues = {};

  // const schema = yup.object().shape({
  //   checkTerm: yup.string().required("部門不得為空白!"),
  // });

  const methods = useForm({
    defaultValues,
    // resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;
  const loginInform = userStore((store) => store.loginInform);
  const createAccount = userStore((store) => store.createAccount);
  const loginAccount = (email, pw) => {
    if (Object.prototype.hasOwnProperty.call(loginInform, email)) {
      // 檢查密碼是否相符
      if (loginInform[email].password === pw) {
        console.log("Login successful");
        return true; // 密碼相符，登入成功
      } else {
        console.log("Incorrect password");
      }
    } else {
      console.log("Account not found");
    }
    return false; // 登入失敗
  };
  const onSubmit = (data) => {
    if (state === "register" && data.password === data.checkPassword) {
      if (Object.prototype.hasOwnProperty.call(loginInform, data.email)) {
        console.log("已有重複帳號");
      } else {
        createAccount(data.email, data.password);
        reset();
        setState("login");
      }
    } else if (state === "login") {
      loginAccount(data.email, data.password);
    }
  };

  return (
    <div className="area flex justify-center items-center bg-gray-300 dark:bg-slate-800">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="flex flex-col items-center justify-center md:h-screen opacity-80">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-6 w-[320px]">
              <div
                className={`${
                  state === "register" && "border-b-2"
                } cursor-pointer`}
                onClick={() => {
                  setState("register");
                  reset();
                }}
              >
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white cursor-pointer">
                  創建帳戶
                </h1>
              </div>
              <div
                className={`${
                  state === "login" && "border-b-2 "
                } cursor-pointer`}
                onClick={() => {
                  setState("login");
                  reset();
                }}
              >
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  登入
                </h1>
              </div>
            </div>
            {state === "register" ? (
              <form
                className=" flex max-w-md flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email2" value="使用 email 作為帳戶" />
                  </div>{" "}
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500k w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password2" value="密碼" />
                  </div>
                  <input
                    {...register("password")}
                    autoComplete=""
                    type="password"
                    id="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500k w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="repeat-password" value="再次輸入密碼" />
                  </div>
                  <input
                    {...register("checkPassword")}
                    autoComplete=""
                    type="password"
                    id="checkpassword"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500k w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div className="flex items-center mb-4">
                  <input
                    {...register("checkTerm")}
                    id="checkbox-1"
                    type="checkbox"
                    required
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="checkbox-1"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    我已經知道
                    <a
                      href="#"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      注意事項
                    </a>
                    .
                  </label>
                </div>
                <Button type="submit">註冊</Button>
              </form>
            ) : (
              <form
                className=" flex max-w-md flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email2" value="使用 email 作為帳戶" />
                  </div>{" "}
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500k w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password2" value="密碼" />
                  </div>
                  <input
                    {...register("password")}
                    autoComplete=""
                    type="password"
                    id="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500k w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>

                <div className="flex items-center mb-4">
                  <input
                    {...register("keepLogin")}
                    id="checkbox-1"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="checkbox-1"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    保持登入狀態
                  </label>
                </div>
                <Button type="submit">登入</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
