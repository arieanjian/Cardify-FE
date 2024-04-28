import React, { useState } from "react";
import { Typography, Flex, Input, Divider, Button } from "antd";
// api
import { useAddKanban } from "@/hooks/Kanban";

const { Text } = Typography;

interface Iprops {
  closeKanbanModal: () => void; // 關閉 Modal
  kanbanData: Ikanban; // 編輯的資料
  workspaceId: string;
}

const KanbanModal: React.FC<Iprops> = (props) => {
  const { kanbanData, workspaceId, closeKanbanModal } = props;
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
  );
};

export default KanbanModal;
