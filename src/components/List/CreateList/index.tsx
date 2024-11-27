import React, {useState} from "react";
import { PlusOutlined } from "@ant-design/icons";
// component
import CreateModal from "./CreateModal";

export interface Iprops {
  kanbanId: string;
}

const CreateList: React.FC<Iprops> = (props) => {
  // 是否開啟 create list 的 Modal
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
      onClick={() => setIsOpen(true)}
      className={`
        h-[100px] w-[350px] 
        shrink-0 cursor-pointer rounded-md
        flex-center border border-[#7D7D7D] border-dashed shadow-md group
      `}
    >
      <PlusOutlined className="text-3xl text-[#7D7D7D] group-hover:scale-125 duration-[400ms] group-hover:transition-all" />
    </div>
    {/* Modal */}
    <CreateModal isOpen={isOpen} closeModal={() => setIsOpen(false)} {...props} />
    </>
  );
};

export default CreateList;
