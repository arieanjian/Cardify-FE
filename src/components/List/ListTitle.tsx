import React, { useEffect, useState } from "react";

import { MoreOutlined } from "@ant-design/icons";
import { Typography } from "antd";
// API
import { useChangeListName } from "@/hooks/List";

const { Title, Text } = Typography;

interface IProps {
  list: Ilist;
  cardLength: number;
  setIsDndDisabled: ISetStateFunction<boolean>;
}
type InputEvent =
  | React.KeyboardEvent<HTMLInputElement>
  | React.FocusEvent<HTMLInputElement>;

type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

const ListTitle: React.FC<IProps> = ({
  list,
  setIsDndDisabled,
  cardLength,
}) => {
  // 改變 list 名稱
  const { mutate } = useChangeListName();
  // 是否編輯 list 名稱
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // list 名稱
  const [listName, setListName] = useState<string>("");
  // 編輯 list 名稱
  const handleEditListName = (event: InputEvent) => {
    // 如果不是 blur 事件且不是按下 Enter 鍵，則不處理
    if (event.type !== "blur" && (event as KeyboardEvent).key !== "Enter") {
      return;
    }
    // 結束編輯
    setIsEdit(false);
    setIsDndDisabled(false);
    // 如果 list 名稱不一樣，則更新名稱
    if (listName !== list.name) {
      mutate({ id: list.id, name: listName });
    }
  };
  // 初始化 list 名稱, 並在 list 被 drag or drop 改變時更新
  useEffect(() => {
    setListName(list.name);
  }, [list]);

  return (
    <section className="flex flex-col">
      <div className="flex justify-between cursor-pointer">
        {isEdit && (
          <input
            autoFocus
            defaultValue={list.name}
            className={`w-full h-6 rounded-md 
              border-2 border-solid border-[#FF4D4F]
              outline-none
            `}
            onBlur={handleEditListName}
            onKeyDown={handleEditListName}
            onChange={(e) => setListName(e.target.value)}
          />
        )}

        {!isEdit && (
          <Title
            level={5}
            className="flex-1 cursor-pointer"
            onClick={() => {
              setIsEdit(true);
              setIsDndDisabled(true);
            }}
          >
            {listName}
          </Title>
        )}

        <MoreOutlined
          rotate={90}
          className="text-xl transition-all duration-[400ms] hover:scale-125"
        />
      </div>
      <Text type="secondary">{cardLength} cards</Text>
    </section>
  );
};

export default ListTitle;
