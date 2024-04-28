import { UseMutationResult } from "@tanstack/react-query";

type pinnedType = UseMutationResult<Ikanban, Error, Ikanban, unknown>;

const switchPinned = (kanban: Ikanban, mutatePinned: pinnedType) => {
  mutatePinned.mutate({
    ...kanban,
    isPinned: !kanban.isPinned, // 切換是否 pinned
  });
};

export default switchPinned;
