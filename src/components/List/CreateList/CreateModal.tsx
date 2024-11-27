import React, {useState} from "react";
import { Modal, Flex, Divider, Button, Typography,Input } from "antd";
// interface
import { Iprops as createListProps } from "./index";
// API
import { useAddList } from "@/hooks/List";

const { Title } = Typography;

interface Iprops extends createListProps {
    isOpen: boolean;
    closeModal: () => void;
}

const CreateModal: React.FC<Iprops> = (props) => {

  const addList_mudation = useAddList({
    onSuccess: props.closeModal,
    });

  const { isOpen, kanbanId, closeModal } = props;
  // 要建立的 list 名稱
  const [listName, setListName] = useState("");

  const onSubmit = async () => {
    addList_mudation.mutate({
        kanbanId,
        name: listName,
    })
  }
  return (
    <Modal
      title={<Title level={4}>Create list</Title>}
      className="wsModal"
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      destroyOnClose
    >
        <section className="border-solid border-0 border-t border-[#F5F5F5]">
            <Flex vertical gap="middle" className="mt-5">
            <Flex vertical>
                <Title level={4} className="my-0">
                list name<span className="text-red-500">*</span>
                </Title>
                <Input
                placeholder="please type a name"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                />
            </Flex>
            <Divider className="my-1" />
            <Flex justify="end" gap="middle">
                <Button onClick={closeModal}>Cancel</Button>
                <Button type="primary" onClick={onSubmit}>
                Create
                </Button>
            </Flex>
            </Flex>
        </section>
    </Modal>
  );
};

export default CreateModal;