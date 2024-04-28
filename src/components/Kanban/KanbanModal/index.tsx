import React from "react";
import { Modal } from "antd";
// component
import KanbanModal from "./KanbanModal";
// init value
import { KANBAN_INIT_VALUE } from "@/util/initValue";

interface Iprops {
  isOpen: boolean;
  workspaceId: string;
  closeKanbanModal: () => void;
  kanbanData?: Ikanban;
}

const Index: React.FC<Iprops> = ({
  isOpen,
  closeKanbanModal,
  workspaceId,
  kanbanData = KANBAN_INIT_VALUE,
}) => {
  return (
    <Modal
      title={kanbanData._id.length === 0 ? "Create kanban" : "Edit kanban"}
      className="wsModal"
      open={isOpen}
      onCancel={closeKanbanModal}
      footer={null}
      destroyOnClose
    >
      <KanbanModal
        workspaceId={workspaceId}
        kanbanData={kanbanData}
        closeKanbanModal={closeKanbanModal}
      />
    </Modal>
  );
};

export default Index;
