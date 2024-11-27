interface Itag {
  id: string;
  name: string;
  color: string;
  icon: string;
  kanbanId: string;
}

type IaddTag = Pick<Ilist, "name" | "color" | "icon" | "kanbanId">;

type IupdateTag = Pick<Ilist, "id" | "name" | "icon" | "color">;

type IdeleteTag = Pick<Ilist, "id">;
