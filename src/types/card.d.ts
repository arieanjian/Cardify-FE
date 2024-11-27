type ItimeString = string;
interface Icard {
  id: string;
  title: string;
  description: string;
  kanbanId: string;
  listId: string;
  isPinned: boolean;
  order: number;
  ownerId: string;
  tagIds: string[];
  memberIds: string[];
  actualStartTime: ItimeString;
  actualEndTime: ItimeString;
  targetStartTime: ItimeString;
  targetEndTime: ItimeString;
}

// 新增/編輯表單的值，因為時間是用 range picker 所以是陣列
type IformCardBasic = Omit<
  Icard,
  | "id" // 新增時不會有 id, id 在偏及模式時由 Icard 提供
  | "order"
  | "isPinned"
  | "actualStartTime"
  | "actualEndTime"
  | "targetStartTime"
  | "targetEndTime"
>;

// 這邊的 IcardFormValue 是新增/編輯表單的值，因為時間是用 range picker 所以是陣列
interface IcardFormValue extends IformCardBasic {
  actual: [ItimeString, ItimeString];
  target: [ItimeString, ItimeString];
}

type IaddCard = Omit<Icard, "id" | "order" | "isPinned">;
