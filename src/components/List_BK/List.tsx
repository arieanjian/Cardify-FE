import { Card } from "@/components/Card";
// component
import { ListTitle } from "@/components/List";
import React from "react";

const List: React.FC = () => {
  return (
    <div className="w-[255px] shrink-0 flex flex-col max-h-full shadow-md p-3 bg-[#D9D9D9] rounded-md">
      <ListTitle />
      <section className="scrollbar-none overflow-y-auto grid grid-cols-1 gap-3 flex-1">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </div>
  );
};

export default List;
