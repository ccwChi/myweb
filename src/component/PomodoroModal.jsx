/* eslint-disable react/prop-types */
import { Button, Checkbox, Label, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";

const PomodoroModal = ({
  openModal,
  onSettingCheck,
  settingData,
  setSettingData,
  resetTimer,
  onClose,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    const converData = {
      time: data.time * 60,
      shortBreak: data.shortBreak * 60,
      longBreak: data.longBreak * 60,
      loopTime: 4,
      autoBreakSwitch: false,
    };
    setSettingData(converData);
    resetTimer();
    onSettingCheck(converData);
  };
  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal show={openModal} size="md" popup onClose={onClose}>
        <Modal.Header className=""></Modal.Header>
        <Modal.Body>
          <div>
            <h3 className="text-xl ps-6 font-medium text-gray-900 dark:text-white">
              番茄鐘設定
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-6 p-6 "
            >
              <div className="inline-flex items-center justify-between">
                <Label>計時</Label>
                <input
                  {...register("time", {
                    require: true,
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                  className=" text-gray-900 dark:text-white border-0 border-b-[1px]
                     border-gray-400 w-36 bg-transparent text-sm focus:outline-none 
                     focus:ring-0 text-center"
                  defaultValue={settingData?.time / 60}
                  placeholder="分"
                />
              </div>
              <div className="inline-flex items-center justify-between">
                <Label>短休息</Label>
                <input
                  {...register("shortBreak", {
                    require: true,
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                  className=" text-gray-900 dark:text-white border-0 border-b-[1px]
                     border-gray-400 w-36 bg-transparent text-sm focus:outline-none 
                     focus:ring-0 text-center"
                  defaultValue={settingData?.shortBreak / 60}
                />
              </div>
              <div className="inline-flex items-center justify-between">
                <Label>長休息</Label>
                <input
                  {...register("longBreak", {
                    require: true,
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                  className=" text-gray-900 dark:text-white border-0 border-b-[1px]
                     border-gray-400 w-36 bg-transparent text-sm focus:outline-none 
                     focus:ring-0 text-center"
                  defaultValue={settingData?.longBreak / 60}
                />
              </div>
              <div className="inline-flex items-center justify-between">
                <Label>長休息週期</Label>
                <input
                  {...register("loopTime", {
                    require: true,
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                  className=" text-gray-900 dark:text-white border-0 border-b-[1px]
                     border-gray-400 w-36 bg-transparent text-sm focus:outline-none 
                     focus:ring-0 text-center"
                  defaultValue={settingData?.loopTime}
                />
              </div>
              <div className="flex justify-between">
                <Label>自動下一階段計時</Label>
                <Checkbox
                  {...register("autoBreakSwitch")}
                  defaultChecked={settingData?.autoBreakSwitch}
                  className="dark:bg-gray-600 dar"
                />
              </div>

              <Button type="submit">確定</Button>
            </form>
          </div>

          <div className="w-full "></div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PomodoroModal;

// const timerSettingList = [
//   {
//     label: "計時",
//     name: "time",
//     formSet: { require: true, min: 0 },
//     component: "input",
//   },
//   {
//     label: "計時",
//     name: "time",
//     formSet: { require: true, min: 0 },
//     component: "input",
//   },
//   {
//     label: "計時",
//     name: "time",
//     formSet: { require: true, min: 0 },
//     component: "input",
//   },
//   {
//     label: "計時",
//     name: "time",
//     formSet: { require: true, min: 0 },
//     component: "input",
//   },
// ];
