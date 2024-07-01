import { Modal } from "antd";
import React from "react";
// component
import TagModal from "./TagModal";

interface IProps {
  tag?: Itag;
  kanbanId: string;
  showTagModal: boolean;
  setShowTagModal: ISetStateFunction<boolean>;
}

const Index: React.FC<IProps> = ({
  showTagModal,
  setShowTagModal,
  tag,
  kanbanId,
}) => {
  // 目前是否為編輯模式
  const type = tag === undefined ? "Create" : "Edit";

  const closeTagModal = () => {
    setShowTagModal(false);
  };
  return (
    <Modal
      title={type === "Create" ? "Create Tag" : "Edit Tag"}
      width="300px"
      open={showTagModal}
      onCancel={closeTagModal}
      footer={null}
      maskClosable={false}
      destroyOnClose
    >
      <TagModal
        kanbanId={kanbanId}
        closeTagModal={closeTagModal}
        tag={type === "Edit" ? tag : undefined}
      />
    </Modal>
  );
};

export default Index;