import { BellFilled, BellOutlined, MoreOutlined } from "@ant-design/icons";
import {
  CalendarOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useContext, useState } from "react";

import { CSS } from "@dnd-kit/utilities";
import CardModal from "./CardModal";
import { KanbanContext } from "@/pages/Kanban";
import Tag from "@/components/Tag";
import dayjs from "dayjs";
import { useSortable } from "@dnd-kit/sortable";

interface IProps {
  task: Icard;
  setIsDndDisabled?: ISetStateFunction<boolean>;
}

const Card: React.FC<IProps> = (props) => {
  const { task, setIsDndDisabled = () => {} } = props;
  // console.log("props.id = ", task.id);
  const { tags, narrowMold, setNarrowMold } = useContext(KanbanContext);

  // 是否顯示新增 Card 的 Modal
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Card",
      card: task,
    },
    // disabled: editMode,
  });
  // const {setNodeRef} = useDraggable({
  //   id: props.id,
  // });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    // transform: CSS.Translate.toString(transform),
  };
  // 切換是否 pinned
  const switchPinned = (e: React.MouseEvent, card: Icard) => {
    alert("card.id = " + card.id);
    e.stopPropagation();
  };

  // const tagMap
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-full h-[160px] max-h-[245px] bg-white shadow-md rounded-sm opacity-50"
      />
    );
  }

  // console.log("task = ", task);
  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => {
          setIsShowModal(true);
          setIsDndDisabled(true);
        }}
        className="w-full h-[160px] max-h-[245px] bg-white shadow-md rounded-sm p-2 flex flex-col"
      >
        <section className="flex gap-1">
          <span className="text-[#191919] font-semibold text-lg flex-1">
            {task.title}
          </span>

          <span
            className={`flex items-center cursor-pointer transition-all duration-[400ms] hover:scale-125 text-lg text-[#FF4D4F]`}
            onClick={(e) => switchPinned(e, task)}
          >
            {!task.isPinned ? <BellOutlined /> : <BellFilled />}
          </span>

          <MoreOutlined
            rotate={90}
            className="text-xl transition-all duration-[400ms] hover:scale-125"
          />
        </section>

        <section className="flex-1 flex flex-wrap content-start gap-2">
          {tags.array.length > 0 &&
            task.tagIds?.map((tagId) => {
              return (
                <Tag
                  key={tagId}
                  size="small"
                  className="h-6"
                  tag={tags?.map[tagId]}
                  narrowMold={narrowMold}
                  onClick={(event: React.MouseEvent) => {
                    setNarrowMold(!narrowMold);
                    event.stopPropagation();
                  }}
                />
              );
            })}
        </section>

        {task.targetStartTime && (
          <section className="text-gray-400">
            <CalendarOutlined className="mr-1" />
            {dayjs(task.targetStartTime).format("YYYY/MM/DD")}
            <span className="mx-1">~</span>
            {dayjs(task.targetEndTime).format("YYYY/MM/DD")}
          </section>
        )}

        <section className="flex justify-end gap-2 text-xs">
          <UserOutlined />
          <span className="">{task.memberIds.length}</span>
          <MessageOutlined />
          <span className="">0</span>
        </section>
      </div>

      {/* 新增、修改卡片的 Modal */}
      <CardModal
        card={task}
        listId={task.listId}
        setIsDndDisabled={setIsDndDisabled}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
    </>
  );
};

export default Card;
