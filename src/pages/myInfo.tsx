import React, { useState, useContext, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthProvider";
import AlertModal from "@/components/common/AlertModal";
import EmailInput from "@/components/common/EmailInput";
import NicknameInput from "@/components/common/NicknameInput";
import PasswordInput from "@/components/common/PasswordInput";
import CheckPasswordInput from "@/components/common/CheckPasswordInput";
import Button from "@/components/common/Button";

type ResDataType = {
  message: string;
  isSuccessd: boolean;
};

type InspectionType = {
  email?: boolean;
  nickname?: boolean;
  profileImageUrl?: boolean;
  newPassword?: boolean;
  checkNewPassword?: boolean;
};

type EditInfoType = {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
  checkNewPassword: string;
};

export default function MyInfo() {
  const router = useRouter();
  const { userCookie, updateUserInfo } = useContext(AuthContext);
  const [resData, setResData] = useState<ResDataType>({
    message: "",
    isSuccessd: false
  });
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<EditInfoType>({
    nickname: "",
    profileImageUrl: "",
    newPassword: "",
    checkNewPassword: ""
  });
  const [inspection, setInspection] = useState<InspectionType>({
    email: false,
    nickname: false,
    profileImageUrl: false,
    newPassword: false,
    checkNewPassword: false
  });

  function handlerOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "email":
        setEditInfo((prev) => ({ ...prev, email: value }));
        break;

      case "nickname":
        setEditInfo((prev) => ({ ...prev, nickname: value }));
        break;

      case "password":
        setEditInfo((prev) => ({ ...prev, password: value }));
        break;

      case "checkPassword":
        setEditInfo((prev) => ({ ...prev, checkPassword: value }));
        break;
    }
  }

  let handlerAlertModal;

  resData.isSuccessd
    ? (handlerAlertModal = function () {
        router.push("signIn");
      })
    : (handlerAlertModal = function () {
        setAlertModal(false);
      });

  async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    editInfo.newPassword !== editInfo.checkNewPassword
      ? (setResData((prev: any) => ({
          ...prev,
          message: "비밀번호가 일치하지 않습니다"
        })),
        setAlertModal(true))
      : {};

    const res = await updateUserInfo(editInfo);

    if (res.status !== 201) {
      setResData((prev: any) => ({
        ...prev,
        message: res.response.data.message
      }));
      setAlertModal(true);
    } else if (res.status === 201) {
      router.push("/");
    }
  }

  return (
    <div>
      <AlertModal
        type="decide"
        size="decide"
        text={resData.message}
        handlerDicideNo={}
        handelerDicideYes={}
      />
      <div></div>
      <div>
        <p>내 정보</p>
      </div>
      <div>
        <form onSubmit={handlerSubmit}>
          <NicknameInput
            whatFor="updateUserInfo"
            nickname={editInfo.nickname}
            handlerOnChange={handlerOnChange}
            inspection={inspection.nickname}
            setInspection={setInspection}
          />
          <EmailInput
            whatFor="updateUserInfo"
            email=""
            handlerOnChange={handlerOnChange}
            inspection={inspection.email}
            setInspection={setInspection}
          />
          <PasswordInput
            whatFor="updateUserInfo"
            password={editInfo.newPassword}
            handlerOnChange={handlerOnChange}
            inspection={inspection.newPassword}
            setInspection={setInspection}
          />
          <CheckPasswordInput
            whatFor="updateUserInfo"
            password={editInfo.newPassword}
            checkPassword={editInfo.checkNewPassword}
            handlerOnChange={handlerOnChange}
            inspection={inspection.checkNewPassword}
            setInspection={setInspection}
          />
          <Button text="저장하기" size="lg" type="submit" />
        </form>
      </div>
    </div>
  );
}
