interface Ilist {
  id: string;
  name: string;
  order: number;
  kanbanId: string;
}

type IchangeListName = Pick<Ilist, "id" | "name">;

type IaddList = Pick<Ilist, "name" | "kanbanId">;

interface IchangeListOrder {
  activeList: Ilist;
  newOrder: number;
}
