import React from "react";
import { MdCheckCircle } from "react-icons/md";
import Button from "./Button";

import { useRouter } from "next/router";

type PopupProps = {
  type: "alert" | "decide";
  size: "md" | "sm" | "decide";
  text: string;
  handlerAlertModal?: any;
  handlerDicideNo?: any;
  handelerDicideYes?: any;
};

const AlertModal = ({
  type,
  size,
  text,
  handlerAlertModal,
  handlerDicideNo,
  handelerDicideYes
}: PopupProps) => {
  const sizeClass = {
    md: "flex flex-col gap-[60px] p-6 pt-[60px] border border-main rounded-lg mx-auto bg-white-ffffff h-[250px] w-[540px]",
    sm: "flex flex-col gap-[50px] p-6 pt-[35px] border border-main rounded-lg mx-auto bg-white-ffffff h-[220px] w-[327px]",
    decide:
      "flex flex-col gap-[30px] p-6 pt-[30px] border border-main rounded-lg mx-auto bg-white-ffffff w-[298px] h-[186px]"
  };

  const router = useRouter();

  const checkAlert = () => {
    handlerAlertModal();
  };

  const cancel = () => {
    handlerDicideNo();
  };

  const execute = () => {
    handelerDicideYes();
  };

  return (
    <div className={`${sizeClass[size]}`}>
      <div className="flex flex-col justify-center gap-1 text-center">
        <div className="flex justify-center h-[30px]">
          {type === "decide" && <MdCheckCircle size={25} color="#531" />}
        </div>
        <div className="pt-[10px] h-[25px]">{text}</div>
      </div>
      {(size === "md" || size === "sm") && (
        <div
          onClick={
            text === "가입이 완료되었습니다!" ? () => (router.push("signIn")) : checkAlert
          }
          className="text-center"
        >
          <Button text="확인" size="full" type="button" />
        </div>
      )}
      {size === "decide" && (
        <div className="flex felx-row gap-2 justify-center pt-[5px]">
          <div onClick={cancel}>
            <Button text="아니오" size="md" type="button" status="inactive" />
          </div>
          <div onClick={execute}>
            <Button text="취소하기" size="md" type="button" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertModal;
