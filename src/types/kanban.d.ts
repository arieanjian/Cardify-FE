interface Ikanban {
  _id: string;
  workspaceId: string;
  name: string;
  listIds: string[];
  isPinned: boolean;
}

type IkanbanMap = Record<string, Ikanban>;

interface IqueryKanbans {
  kanbans: Ikanban[];
  kanbanMap: IkanbanMap;
}

interface IaddKanban {
  workspaceId: string;
  name: string;
}
