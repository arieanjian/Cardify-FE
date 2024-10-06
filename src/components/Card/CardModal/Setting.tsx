import { DatePicker, Form, FormInstance, Typography } from "antd";
import React, { useContext, useState } from "react";

import { KanbanContext } from "@/pages/Kanban";
import { PlusCircleOutlined } from "@ant-design/icons";
import Tag from "@/components/Tag";
// component
import TagModal from "@/components/TagModal";

// import Tags from "./Tags";

export interface IProps {
  card: Icard | undefined;
  form: FormInstance<Icard>;
}

const { Title, Text } = Typography;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Setting: React.FC<IProps> = ({ card, form }) => {
  const f_tagIds = Form.useWatch("tagIds", form);
  // 當前 kanban 的所有標籤
  const { tags } = useContext(KanbanContext);
  // 是否顯示新增、修改、增加 Tag 的 Modal
  const [showTagModal, setShowTagModal] = useState<boolean>(false);

  // 當 TagModal 內的 checkBox 選擇標籤時觸發
  const changeTags = (tagIds: string[]) => {
    form.setFieldsValue({ tagIds: tagIds });
  };

  return (
    <section className="flex flex-col">
      <Title level={3} className="text-[rgb(125,125,125)] mb-2">
        Setting
      </Title>
      {/* Tag */}
      <section className="flex flex-col w-full">
        <Typography.Title level={5} className="text-[rgb(0,0,0,0.88)] mb-2">
          Tags
        </Typography.Title>

        <div className="flex gap-1 w-full">
          {f_tagIds?.map((tagId: string) => {
            const tag = tags.map?.[tagId];
            return tag ? <Tag key={tag.id} size="small" tag={tag} /> : null;
          })}
          <PlusCircleOutlined
            className="text-2xl mb-1 cursor-pointer"
            onClick={() => setShowTagModal(true)}
          />
        </div>

        <TagModal
          showTagModal={showTagModal}
          setShowTagModal={setShowTagModal}
          initValue={f_tagIds || []}
          changeTags={changeTags}
        />
      </section>

      {/* Period 日期選擇器 */}
      <section className="mt-2 w-full flex gap-2 ">
        <Form.Item
          label={<Text strong>Target Period</Text>}
          name="target"
          className="flex-1"
        >
          <DatePicker.RangePicker className="w-full" />
        </Form.Item>
        <Form.Item
          label={<Text strong>Actual Period</Text>}
          name="actual"
          className="flex-1"
        >
          <DatePicker.RangePicker className="w-full" />
        </Form.Item>
      </section>
    </section>
  );
};

export default Setting;
