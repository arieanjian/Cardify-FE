import { NavigateFunction } from "react-router-dom";

const navigateKanban = (navigate: NavigateFunction, kanban: Ikanban) => {
  navigate(`/kanban/${kanban.workspaceId}/${kanban._id}`);
};

export default navigateKanban;
