import React, { useState } from "react";

// component
import CreateModal from "./CreateModal";
import { Modal } from "antd";
import SelectTagModal from "./SelectTagModal";

interface IProps {
  showTagModal: boolean;
  setShowTagModal: ISetStateFunction<boolean>;
  changeTags: (tagIds: string[]) => void; // 當 checkBox 選擇標籤時觸發
  initValue: string[];
  afterClose?: () => void;
}

const Index: React.FC<IProps> = ({
  showTagModal,
  setShowTagModal,
  changeTags, // 當 checkBox 選擇標籤時觸發
  initValue, // 目前卡片已經選擇的 Tag Id
  afterClose = () => {},
}) => {
  const [type, setType] = useState<"create" | "edit">("edit"); // 選擇 tag 或是新增 tag
  const [tag, setTag] = useState<Itag | undefined>(undefined);

  // 關閉 Modal
  const closeTagModal = () => {
    setShowTagModal(false);
  };

  return (
    <Modal
      title={<div className="flex-center text-xl">Tag</div>}
      width="300px"
      open={showTagModal}
      onCancel={closeTagModal}
      className="tagModal"
      footer={null}
      maskClosable={false}
      destroyOnClose
      afterClose={afterClose}
    >
      {type === "create" ? (
        <CreateModal setType={setType} tag={tag} setTag={setTag} />
      ) : (
        <SelectTagModal //  選擇卡片要哪些 Tag 的 Component
          setType={setType}
          setTag={setTag}
          changeTags={changeTags}
          initValue={initValue}
          // selectedTagIds={selectedTagIds}
        />
      )}
    </Modal>
  );
};

export default Index;
