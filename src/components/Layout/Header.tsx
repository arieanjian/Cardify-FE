import React, { useState } from "react";
import { Button } from "antd";
// component
import Login from "../Login";
import Avatar from "../Avatar";
// image
import Logo from "@/assets/imgs/Logo.svg";

interface IProps {
  user: IUser;
}

const Header: React.FC<IProps> = ({ user }) => {
  const [s_openLoginModal, set_s_openLoginModal] = useState(false);
  // 判斷現在是[登入]還是[註冊]
  const [s_accountType, set_s_accountType] = useState<IaccountType>("login");

  // 開啟 Login Modal
  const openLoginModal = (accountType: IaccountType = "login"): void => {
    set_s_openLoginModal(true);
    set_s_accountType(accountType);
  };

  // 關閉 Login Modal
  const closeLoginModal = (): void => {
    set_s_openLoginModal(false);
  };

  const userContent = () => (
    <>
      <Avatar user={user} />
    </>
  );

  const loginContent = () => (
    <>
      <Button type="primary" onClick={() => openLoginModal("login")}>
        Log in
      </Button>
      <Button type="text" onClick={() => openLoginModal("register")}>
        Sign up
      </Button>
    </>
  );

  return (
    <section className="h-[70px] 2xl:h-[80px] px-2 lg:px-4 xl:px-6 2xl:px-8 3xl:px-10 bg-neutral-100 flex items-center">
      <img src={Logo} alt="Cardify" />

      <div className="flex-1 flex justify-end items-center gap-5">
        {/* user._id長度>0代表目前是登入狀態，有資料就顯示使用者資訊 */}
        {user._id.length > 0 ? userContent() : loginContent()}
      </div>

      <Login
        isOpen={s_openLoginModal}
        s_accountType={s_accountType}
        set_s_accountType={set_s_accountType}
        closeLoginModal={closeLoginModal}
      />
    </section>
  );
};

export default Header;
