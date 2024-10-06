import { Grid, Modal } from "antd";

// component
import CardModal from "./CardModal";
import React from "react";

interface IProps {
  listId: string;
  card?: Icard;
  isShowModal: boolean;
  setIsShowModal: ISetStateFunction<boolean>;
  setIsDndDisabled: ISetStateFunction<boolean>;
}

const Index: React.FC<IProps> = ({
  isShowModal,
  setIsShowModal,
  card,
  listId,
  setIsDndDisabled,
}) => {
  // antd 用來監聽畫面寬度變化
  const screens: Record<string, boolean> = Grid.useBreakpoint();
  // 目前是否為編輯模式
  const type = card === undefined ? "Create" : "Edit";

  const closeCardModal = () => {
    setIsShowModal(false);
  };

  // 取得彈窗寬度，每一個size都寫是方便之後改寬度
  const width = () => {
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
      title={type === "Create" ? "Create Card" : "Edit Card"}
      width={width()}
      className="cardModal"
      open={isShowModal}
      onCancel={closeCardModal}
      footer={null}
      maskClosable={false}
      destroyOnClose
      afterClose={() => setIsDndDisabled(false)}
    >
      <CardModal
        closeCardModal={closeCardModal}
        listId={listId}
        card={type === "Edit" ? card : undefined}
        setIsShowModal={setIsShowModal}
      />
    </Modal>
  );
};

export default Index;
