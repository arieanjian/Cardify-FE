import { Button, Checkbox, Divider } from "antd";
import React, { useContext } from "react";

import { EditOutlined } from "@ant-design/icons";
import { KanbanContext } from "@/pages/Kanban";
import Tag from "@/components/Tag";

interface IProps {
  setType: ISetStateFunction<"create" | "edit">; // 控制 Modal 顯示的狀態
  setTag: ISetStateFunction<Itag | undefined>; // 要被編輯的的 Tag
  initValue: string[]; // 目前卡片已經選擇的 Tag Id
  changeTags: (tagIds: string[]) => void; // 當 checkBox 選擇標籤時觸發
}

const SelectTagModal: React.FC<IProps> = ({
  setType,
  initValue,
  changeTags,
  setTag,
}) => {
  // 當前 kanban 的所有標籤
  const { tags } = useContext(KanbanContext);

  // 當 checkBox 選擇標籤時觸發
  const onChange = (tagIds: string[]) => {
    changeTags(tagIds);
  };

  // 開啟編輯 Tag 的畫面
  const onEdit = (tag: Itag) => {
    console.log("aaa = ", tag);
    setTag(tag);
    setType("create");
  };
  return (
    <section className="flex flex-col">
      <div className="flex mt-3 h-[300px] overflow-auto mx-2">
        <Checkbox.Group
          className="w-full flex flex-col flex-nowrap"
          defaultValue={initValue}
          onChange={(tagIds) => onChange(tagIds)}
        >
          {tags.array?.map((tag) => (
            <div key={tag.id} className="flex items-center gap-2 w-full">
              <Checkbox value={tag.id} />
              <Tag size="middle" tag={tag} className="flex-1" />
              <div
                className="w-10 h-10 flex-center rounded-md cursor-pointer hover:bg-[rgb(228,230,234)] transition-all"
                onClick={() => onEdit(tag)}
              >
                <EditOutlined className="text-xl" />
              </div>
            </div>
          ))}
        </Checkbox.Group>
      </div>
      <Divider className="my-2" />
      <Button
        className="my-3 mx-2"
        type="primary"
        onClick={() => setType("create")}
      >
        Create a new Tag
      </Button>
    </section>
  );
};

export default SelectTagModal;
