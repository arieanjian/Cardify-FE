import React from "react";
import { Modal } from "antd";
// component
import WsModal from "./WsModal";
// init value
import { WS_INIT_VALUE } from "@/util/initValue";

interface Iprops {
  isOpen: boolean;
  closeWsModal: () => void;
  wsData?: Iworkspace;
}

const Index: React.FC<Iprops> = ({
  isOpen,
  closeWsModal,
  wsData = WS_INIT_VALUE,
}) => {
  return (
    <Modal
      title={wsData._id.length === 0 ? "Create workspace" : "Edit workspace"}
      className="wsModal"
      open={isOpen}
      onCancel={closeWsModal}
      footer={null}
      destroyOnClose
    >
      <WsModal closeWsModal={closeWsModal} wsData={wsData} />
    </Modal>
  );
};

export default Index;
