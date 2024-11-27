interface Ikanban {
  _id: string;
  workspaceId: string;
  name: string;
  listIds: string[];
  isPinned: boolean;
}

type IkanbanMap = Record<string, Ikanban>;

interface ITagsContext {
  array: Itag[];
  map: Record<string, Itag>;
}

interface IkanbanContext {
  tags: ITagsContext;
  setTags: ISetStateFunction<ITagsContext>;
  narrowMold: boolean;
  setNarrowMold: ISetStateFunction<boolean>;
}

interface IqueryKanbans {
  kanbans: Ikanban[];
  kanbanMap: IkanbanMap;
}

interface IaddKanban {
  workspaceId: string;
  name: string;
}
