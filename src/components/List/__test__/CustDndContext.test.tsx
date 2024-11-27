// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { act, fireEvent, render } from "@testing-library/react";

// import CustDndContext from "../CustDndContext";
// import List from "../List";

// const queryClient = new QueryClient();

// describe("CustDndContext", () => {
//   const lists = [
//     {
//       name: "22",
//       order: 0,
//       kanbanId: "654314e8aa4a69e5a2756fb8",
//       id: "6649fbef303de5c32c00b18d",
//     },
//     {
//       name: "33",
//       order: 1,
//       kanbanId: "654314e8aa4a69e5a2756fb8",
//       id: "6649fbf2303de5c32c00b191",
//     },
//     {
//       name: "11",
//       order: 2,
//       kanbanId: "654314e8aa4a69e5a2756fb8",
//       id: "6649fbeb303de5c32c00b189",
//     },
//   ];

//   const props = {
//     lists: lists,
//     setLists: jest.fn(),
//     tasks: [],
//     setTasks: jest.fn(),
//     children: <List list={lists[0]} tasks={[]} setTasks={jest.fn()} />,
//   };

//   test("activeList and activeTask should be set on drag start and cleared on drag end", () => {
//     const { getByTestId, queryByTestId } = render(
//       <QueryClientProvider client={queryClient}>
//         <CustDndContext {...props} />
//       </QueryClientProvider>
//     );
//     const listElement = getByTestId("list-element"); // replace 'list-element' with the actual data-testid of your list element
//     expect(listElement).not.toBeNull(); // replace 'active-list' with the actual data-testid of your active list element
//     // // Simulate drag start
//     act(() => {
//       fireEvent.dragStart(listElement);
//     });

//     // At this point, activeList and activeTask should be set. Check if the UI has changed accordingly.
//     const activeList = getByTestId("active-list");
//     expect(activeList).not.toBeNull(); // replace 'active-list' with the actual data-testid of your active list element
//     // expect(queryByTestId("active-task")).not.toBeNull(); // replace 'active-task' with the actual data-testid of your active task element

//     // Simulate drag end
//     fireEvent.dragEnd(listElement);

//     // Now, activeList and activeTask should be cleared. Check if the UI has returned to its initial state.
//     expect(activeList).toBeNull(); // replace 'active-list' with the actual data-testid of your active list element
//     // expect(queryByTestId("active-task")).toBeNull(); // replace 'active-task' with the actual data-testid of your active task element
//   });
// });

// describe("CustDndContext", () => {
//   const lists = [
//     {
//       name: "22",
//       order: 0,
//       kanbanId: "654314e8aa4a69e5a2756fb8",
//       id: "6649fbef303de5c32c00b18d",
//     },
//     {
//       name: "33",
//       order: 1,
//       kanbanId: "654314e8aa4a69e5a2756fb8",
//       id: "6649fbf2303de5c32c00b191",
//     },
//     {
//       name: "11",
//       order: 2,
//       kanbanId: "654314e8aa4a69e5a2756fb8",
//       id: "6649fbeb303de5c32c00b189",
//     },
//   ];

//   const props = {
//     lists: lists,
//     setLists: jest.fn(),
//     tasks: [],
//     setTasks: jest.fn(),
//     children: <List list={lists[0]} tasks={[]} setTasks={jest.fn()} />,
//   };

//   test("activeList and activeTask should be set on drag start and cleared on drag end", () => {
//     const { getByTestId, queryByTestId } = render(
//       <QueryClientProvider client={queryClient}>
//         <CustDndContext {...props} />
//       </QueryClientProvider>
//     );
//     const listElement = getByTestId("list-element"); // replace 'list-element' with the actual data-testid of your list element
//     expect(listElement).not.toBeNull(); // replace 'active-list' with the actual data-testid of your active list element

//     // Simulate drag start
//     act(() => {
//       fireEvent.dragStart(listElement);
//     });

//     // At this point, activeList and activeTask should be set. Check if the UI has changed accordingly.
//     const activeList = getByTestId("active-list");
//     expect(activeList).not.toBeNull(); // replace 'active-list' with the actual data-testid of your active list element

//     // Simulate drag end
//     fireEvent.dragEnd(listElement);

//     // Now, activeList and activeTask should be cleared. Check if the UI has returned to its initial state.
//     expect(activeList).toBeNull(); // replace 'active-list' with the actual data-testid of your active list element
//   });

//   test("calls setActiveList when the dragged item is a List", () => {
//     const mockEvent = {
//       active: {
//         data: {
//           current: {
//             type: "List",
//             list: "Test List",
//           },
//         },
//       },
//     };

//     const setActiveList = jest.fn();

//     render(
//       <CustDndContext
//         {...props}
//         setActiveList={setActiveList}
//         setActiveTask={jest.fn()}
//       />
//     );

//     fireEvent.dragStart(document, mockEvent);

//     expect(setActiveList).toHaveBeenCalledWith("Test List");
//   });

//   test("calls setActiveTask when the dragged item is a Card", () => {
//     const mockEvent = {
//       active: {
//         data: {
//           current: {
//             type: "Card",
//             card: "Test Card",
//           },
//         },
//       },
//     };

//     const setActiveTask = jest.fn();

//     render(
//       <CustDndContext
//         {...props}
//         setActiveList={jest.fn()}
//         setActiveTask={setActiveTask}
//       />
//     );

//     fireEvent.dragStart(document, mockEvent);

//     expect(setActiveTask).toHaveBeenCalledWith("Test Card");
//   });
// });
