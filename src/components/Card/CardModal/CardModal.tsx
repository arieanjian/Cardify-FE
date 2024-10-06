import { Button, Divider, Form, Input, Select, Typography } from "antd";
// api
import { useAddCard, useModifyCard } from "@/hooks/Card";

// component
// import Content from "./Content";
import Members from "./Members";
import React from "react";
import Setting from "./Setting";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;
interface IProps {
  card: Icard | undefined;
  listId: string;
  closeCardModal: () => void;
  setIsShowModal: ISetStateFunction<boolean>;
}

const CardModal: React.FC<IProps> = ({
  card,
  listId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsShowModal,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  closeCardModal,
}) => {
  const [form] = Form.useForm();
  console.log("card = ", card);
  const { kanbanId = "" } = useParams();

  // 新增 Card 的 api
  const addCard_mutation = useAddCard({
    onSuccess: () => {
      setIsShowModal(false);
    },
  });

  // 修改 Card 的 api
  const modifyCard_mutation = useModifyCard({
    onSuccess: () => {
      setIsShowModal(false);
    },
  });

  const onSubmit = (values: IcardFormValue) => {
    if (card === undefined) {
      addCard_mutation.mutate({
        title: values.title,
        description: values.description,
        listId: values.listId,
        kanbanId: values.kanbanId,
        ownerId: values.ownerId,
        tagIds: values.tagIds,
        memberIds: values.memberIds,
        actualStartTime: values.actual
          ? dayjs(values.actual[0]).format("YYYY-MM-DD")
          : "",
        actualEndTime: values.actual
          ? dayjs(values.actual[1]).format("YYYY-MM-DD")
          : "",
        targetStartTime: values.target
          ? dayjs(values.target[0]).format("YYYY-MM-DD")
          : "",
        targetEndTime: values.target
          ? dayjs(values.target[1]).format("YYYY-MM-DD")
          : "",
      });
    } else {
      modifyCard_mutation.mutate({
        id: card.id,
        title: values.title,
        description: values.description,
        kanbanId: values.kanbanId,
        listId: values.listId,
        isPinned: card.isPinned,
        order: card.order,
        ownerId: values.ownerId,
        tagIds: values.tagIds,
        memberIds: values.memberIds,
        actualStartTime: values.actual
          ? dayjs(values.actual[0]).format("YYYY-MM-DD")
          : "",
        actualEndTime: values.actual
          ? dayjs(values.actual[1]).format("YYYY-MM-DD")
          : "",
        targetStartTime: values.target
          ? dayjs(values.target[0]).format("YYYY-MM-DD")
          : "",
        targetEndTime: values.target
          ? dayjs(values.target[1]).format("YYYY-MM-DD")
          : "",
      });
    }

    console.log("values = ", values);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        isvalid: true,
        listId,
        kanbanId,
        ...card,
        target: [
          card?.targetStartTime ? dayjs(card.targetStartTime) : "",
          card?.targetEndTime ? dayjs(card.targetEndTime) : "",
        ],
        actual: [
          card?.actualStartTime ? dayjs(card.actualStartTime) : "",
          card?.actualEndTime ? dayjs(card.actualEndTime) : "",
        ],
      }}
    >
      {/* 影藏欄位 */}
      <Form.Item name="kanbanId" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="listId" hidden>
        <Input />
      </Form.Item>
      <Form.Item hidden name="tagIds">
        <Select mode="multiple" />
      </Form.Item>

      <Divider className="py-1" />

      <section className="flex flex-col">
        <Title level={3} className="text-[rgb(125,125,125)] mb-2">
          Content
        </Title>

        <Form.Item
          label={<Text strong>Title</Text>}
          name="title"
          rules={[{ required: true, message: "Please input card title!" }]}
        >
          <Input placeholder="place input title" />
        </Form.Item>

        <Form.Item label={<Text strong>Description</Text>} name="description">
          <Input.TextArea rows={3} placeholder="place input description" />
        </Form.Item>
      </section>

      <Members card={card} form={form} />

      <Divider className="py-1" />

      <Setting card={card} form={form} />

      <Divider className="py-1" />

      <div className="flex justify-end gap-2">
        <Button onClick={() => setIsShowModal(false)}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default CardModal;
