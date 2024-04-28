// 目前登入人員的預設值
export const USER_INIT_VALUE: IUser = {
  username: "",
  email: "",
  avatar: "",
  _id: "",
};
// workspace 的預設值
export const WS_INIT_VALUE: Iworkspace = {
  _id: "",
  name: "",
  ownerId: "",
  userIds: [],
  kanbanIds: [],
  memberIds: [],
};

// kanban 的預設值
export const KANBAN_INIT_VALUE: Ikanban = {
  _id: "",
  workspaceId: "",
  name: "",
  isPinned: false,
  listIds: [],
};
// 透過 userId 取得登入人員有哪些 workspace 的預設值
export const QUERY_WORKSPACE_INIT_VALUE: IqueryWorkspaces = {
  workspaces: [],
  workspaceMap: {},
};

// 透過 userId 取得登入人員有哪些 kanban 的預設值
export const QUERY_KANBANS_INIT_VALUE: IqueryKanbans = {
  kanbans: [],
  kanbanMap: {},
};
// workspec 內 member 總共有哪些選項
export const ROLE_DEFAULT_VALUE: Imember["role"][] = [
  "Owner",
  "Member",
  "Admin",
];
