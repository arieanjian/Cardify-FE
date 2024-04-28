import React from "react";
import { Modal, Grid } from "antd";
// Login
import Login from "./Login";

interface Iprops {
  isOpen: boolean;
  s_accountType: IaccountType;
  set_s_accountType: React.Dispatch<React.SetStateAction<IaccountType>>;
  closeLoginModal: () => void;
}

const Index: React.FC<Iprops> = ({
  isOpen,
  closeLoginModal,
  s_accountType,
  set_s_accountType,
}) => {
  // antd 用來監聽畫面寬度變化
  const screens: Record<string, boolean> = Grid.useBreakpoint();

  // 取得彈窗寬度，每一個size都寫是方便之後改寬度
  const getWidth = () => {
    // window width >= 1600
    if (screens.xxl) {
      return 565;
    }

    // window width >= 1200
    if (screens.xl) {
      return 565;
    }
    // window width >= 992
    if (screens.lg) {
      return "60%";
    }
    // window width >= 768
    if (screens.md) {
      return "80%";
    }

    // window width >= 576
    if (screens.sm) {
      return "90%";
    }

    // window width < 576
    if (screens.sm) {
      return "90%";
    }

    return "90%";
  };

  return (
    <Modal
      width={getWidth()}
      className="login-modal"
      destroyOnClose
      open={isOpen}
      onCancel={closeLoginModal}
      maskClosable={false}
      closeIcon={null}
      footer={null}
    >
      <Login
        closeLoginModal={closeLoginModal}
        s_accountType={s_accountType}
        set_s_accountType={set_s_accountType}
      />
    </Modal>
  );
};

export default Index;
