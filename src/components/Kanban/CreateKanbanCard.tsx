import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
// component
import KanbanModal from "./KanbanModal";

interface Iprops {
  workspaceId: string;
}

const CreateKanbanCard: React.FC<Iprops> = ({ workspaceId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="cursor-pointer group flex-center h-[130px] border border-[#7D7D7D] border-dashed rounded-md shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <PlusOutlined className="text-3xl text-[#7D7D7D] group-hover:scale-125 duration-[400ms] group-hover:transition-all" />
      </div>
      <KanbanModal
        isOpen={isOpen}
        workspaceId={workspaceId}
        closeKanbanModal={() => setIsOpen(false)}
      />
    </>
  );
};

export default CreateKanbanCard;
