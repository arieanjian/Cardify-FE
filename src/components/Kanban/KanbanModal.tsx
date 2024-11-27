import { Button, Divider, Flex, Input, Modal, Typography } from "antd";
import React, { useState } from "react";

// init value
import { KANBAN_INIT_VALUE } from "@/util/initValue";
// api
import { useAddKanban } from "@/hooks/Kanban";

const { Text } = Typography;

interface Iprops {
  isOpen: boolean;
  workspaceId: string;
  closeKanbanModal: () => void;
  kanbanData?: Ikanban;
}

const KanbanModal: React.FC<Iprops> = ({
  isOpen, // 是否開啟 Modal
  closeKanbanModal, // 關閉 Modal
  workspaceId, // workspace id
  kanbanData = KANBAN_INIT_VALUE, // 編輯的 kanban 資料(沒傳會有預設值)
}) => {
  const [kanbanName, setKanbanName] = useState(""); // 要建立 or 修改的看板名稱
  const addKanban_mutation = useAddKanban({
    onSuccess: closeKanbanModal,
  });

  // 判斷現在是新建 or 修改
  const isCreate = kanbanData._id.length === 0;

  const onSubmit = () => {
    if (isCreate) {
      addKanban_mutation.mutate({
        name: kanbanName,
        workspaceId,
      });
    }
  };
  return (
    <Modal
      title={kanbanData._id.length === 0 ? "Create kanban" : "Edit kanban"}
      className="wsModal"
      open={isOpen}
      onCancel={closeKanbanModal}
      footer={null}
      destroyOnClose
    >
      <section className="border-solid border-0 border-t border-[#F5F5F5]">
        <Flex vertical gap="middle" className="mt-5">
          <Flex vertical>
            <Text strong className="my-0">
              kanban name<span className="text-red-500">*</span>
            </Text>
            <Input
              placeholder="please type a name"
              value={kanbanName}
              onChange={(e) => setKanbanName(e.target.value)}
            />
          </Flex>

          <Divider className="m-0" />

          <Flex gap="small" justify="end">
            <Button onClick={closeKanbanModal}>Cancel</Button>
            <Button type="primary" onClick={onSubmit}>
              {isCreate ? "Create" : "Save"}
            </Button>
          </Flex>
        </Flex>
      </section>
    </Modal>
  );
};

export default KanbanModal;
