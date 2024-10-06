/* eslint-disable react-hooks/exhaustive-deps */
import * as AntdIcons from "@ant-design/icons";

import { Button, Col, Divider, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
// api
import { useAddTag, useUpdateTag } from "@/hooks/Tag";

import Tag from "@/components/Tag";
import allTagNameSet from "@/components/Tag/TagName";
import colors from "@/components/Tag/colors";
import { useParams } from "react-router-dom";

interface IProps {
  setType: ISetStateFunction<"create" | "edit">; // 控制 目前是選擇 tag 或是新增/修改 tag
  tag?: Itag; // 要被編輯的 tag
  setTag?: ISetStateFunction<Itag | undefined>; // 要被編輯的 tag
}
// const allIcon = Object.keys(AntdIcons);

const iconsOptions = allTagNameSet.map((icon) => {
  const AntdIcon = AntdIcons[icon as keyof typeof AntdIcons];
  const ValidAntdIcon = AntdIcon as React.ComponentType;
  return {
    label: <ValidAntdIcon />,
    // label: iconComponents[icon],
    value: icon,
  };
});

const CreateModal: React.FC<IProps> = (props) => {
  // URL 參數
  const { kanbanId = "" } = useParams();

  const INIT_TAG: Itag = {
    id: "",
    name: "",
    icon: "StepForwardOutlined",
    color: "bg-lime-200 text-slate-600",
    kanbanId: kanbanId,
  };
  const { setType, tag = INIT_TAG, setTag } = props;

  // 編輯的 tag
  const [editTag, setEditTag] = useState<Itag>(tag);
  // 新增 tag api
  const addTag_mutation = useAddTag({
    onSuccess: () => setType("edit"),
  });

  // 編輯 tag api
  const updateTag_mutation = useUpdateTag({
    onSuccess: () => setType("edit"),
  });

  // 新增 or 編輯 tag
  const handleSubmit = () => {
    const editType = tag.id ? "edit" : "create";
    if (editType === "edit") {
      updateTag_mutation.mutate(editTag);
      return;
    } else {
      addTag_mutation.mutate({
        ...editTag,
        kanbanId,
      });
    }
  };

  // component unmount 時, 如果是編輯狀態要清除當前編輯的 tag
  useEffect(() => {
    return () => {
      if (setTag) {
        setTag(undefined);
        setType("edit");
      }
    };
  }, []);

  return (
    <section className="flex flex-col">
      <div className="flex-center h-20 w-full bg-gray-200">
        <Tag size="large" tag={editTag} />
      </div>

      <Row gutter={[12, 12]}>
        <Col span={8}>
          <div className="mt-5 font-semibold text-gray-600">icon</div>
          <Select
            onChange={(value) =>
              setEditTag({
                ...editTag,
                icon: value,
              })
            }
            className="w-full"
            options={iconsOptions}
          />
        </Col>
        <Col span={16}>
          <div className="mt-5 font-semibold text-gray-600">Tag Name</div>
          <Input
            placeholder="type a tag name"
            value={editTag.name}
            onChange={(e) =>
              setEditTag({
                ...editTag,
                name: e.target.value,
              })
            }
          />
        </Col>
      </Row>
      <Divider />
      <section className="grid grid-cols-5 gap-1">
        {colors.map((color) => (
          <div
            key={color}
            // role="presentation"
            className={`${color} h-7 cursor-pointer rounded-sm transition-all hover:opacity-75`}
            onClick={() => setEditTag({ ...editTag, color })}
          />
        ))}
      </section>
      <Divider />
      <div className="flex justify-between gap-2">
        <Button
          // type="primary"
          onClick={() => setType("edit")}
        >
          Cancel
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          {tag.id ? "update a new tag" : "create a new tag"}
        </Button>
      </div>
    </section>
  );
};

export default CreateModal;
