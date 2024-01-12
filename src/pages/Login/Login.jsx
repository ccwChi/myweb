import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userStore } from "../../store/userStore";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("register");
  const [isLoading, setIsLoading] = useState(false);
  const getSchema = (currentState) => {
    if (currentState === "register") {
      return yup.object().shape({
        email: yup
          .string()
          .email("請輸入有效的電子郵件地址")
          .test("unique-email", "已有重複帳號", async function (value) {
            // 在這裡執行你的檢查邏輯
            // 假設 loginInform 是包含已存在帳號的物件
            if (Object.prototype.hasOwnProperty.call(loginInform, value)) {
              return false; // 表示驗證失敗
            }
            return true; // 表示驗證成功
          }),
        registerPassword: yup.string().required("密碼不得為空"),
        checkPassword: yup
          .string()
          .required("再次輸入密碼不得為空")
          .oneOf([yup.ref("registerPassword")], "再次輸入密碼必須與密碼相同"),
      });
    } else if (currentState === "login") {
      return yup.object().shape({
        email: yup.string().email("請輸入有效的電子郵件地址"),
        loginPassword: yup
          .string()
          .required("密碼不得為空")
          .test("密碼錯誤", "密碼錯誤", async function (value, { parent }) {
            const emailValue = parent.loginEmail;

            // 使用 yup.oneOf 驗證 password 是否存在於 loginInform[emailValue]?.password 中
            const passwordValid = await yup
              .string()
              .oneOf([loginInform[emailValue]?.password], "密碼錯誤")
              .isValid(value);

            return passwordValid;
          }),
      });
    }
  };

  const schema = getSchema(state);

  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

  const loginInform = userStore((store) => store.loginInform);
  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(loginInform, "check")) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/`);
      }, 3000);
    }
  }, []);

  const createAccount = userStore((store) => store.createAccount);
  const keepLogin = userStore((store) => store.keepLoginState);
  const loginAccount = (email, pw) => {
    if (Object.prototype.hasOwnProperty.call(loginInform, email)) {
      // 檢查密碼是否相符
      if (loginInform[email].password === pw) {
        console.log("Login successful");
        return 0; // 密碼相符，登入成功
      } else {
        return 1;
      }
    } else {
      console.log("Account not found");
      return 2;
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    if (state === "register") {
      createAccount(data.email, data.registerPassword);
      reset();
      setState("login");
    } else if (state === "login") {
      loginAccount(data.loginEmail, data.loginPassword);
      if (data.keepLogin) {
        keepLogin(data.loginEmail, data.keepLogin);
      }
      navigate(`/`);
    }
  };
  useEffect(() => {
    console.log(errors);
  }, [errors]);
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
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password2" value="密碼" />
                  </div>
                  <input
                    {...register("registerPassword")}
                    autoComplete=""
                    type="password"
                    id="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500k w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                  {errors.registerPassword && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.registerPassword.message}
                    </p>
                  )}
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
                  {errors.checkPassword && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.checkPassword.message}
                    </p>
                  )}
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
                    {...register("loginEmail")}
                    type="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500k w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="name@flowbite.com"
                    required
                  />
                  {errors.loginEmail && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.loginEmail.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password2" value="密碼" />
                  </div>
                  <input
                    {...register("loginPassword")}
                    autoComplete=""
                    type="password"
                    id="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500k w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                  {errors.loginPassword && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.loginPassword.message}
                    </p>
                  )}
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
