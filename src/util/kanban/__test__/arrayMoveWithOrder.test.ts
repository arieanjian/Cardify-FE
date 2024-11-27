import arrayMoveWithOrder from "../arrayMoveWithOrder";

const initialArray = [
  { order: 0, name: "A" },
  { order: 1, name: "B" },
  { order: 2, name: "C" },
  { order: 3, name: "D" },
  { order: 4, name: "E" },
];

describe("變更順序測試", () => {
  let array: [];

  beforeEach(() => {
    array = JSON.parse(JSON.stringify(initialArray));
  });

  it("case1: from=2, to=1 應該正確地交換順序並更新 order", () => {
    const result = arrayMoveWithOrder(array, 2, 1);
    expect(result).toEqual([
      { order: 0, name: "A" },
      { order: 1, name: "C" },
      { order: 2, name: "B" },
      { order: 3, name: "D" },
      { order: 4, name: "E" },
    ]);
  });

  it("case2: from=1, to=3 應該正確地交換順序並更新 order", () => {
    const result = arrayMoveWithOrder(array, 1, 3);
    expect(result).toEqual([
      { order: 0, name: "A" },
      { order: 1, name: "D" },
      { order: 2, name: "C" },
      { order: 3, name: "B" },
      { order: 4, name: "E" },
    ]);
  });

  it("case3: from=4, to=3 應該正確地交換順序並更新 order", () => {
    const result = arrayMoveWithOrder(array, 4, 3);
    expect(result).toEqual([
      { order: 0, name: "A" },
      { order: 1, name: "B" },
      { order: 2, name: "C" },
      { order: 3, name: "E" },
      { order: 4, name: "D" },
    ]);
  });
});

describe("負數測試", () => {
  let array: [];

  beforeEach(() => {
    array = JSON.parse(JSON.stringify(initialArray));
  });

  it("case1: 如果 from 跟 to 都是負數，應該回傳原陣列", () => {
    const result = arrayMoveWithOrder(array, -1, -3);
    expect(result).toEqual(initialArray);
  });

  it("case2: 如果 from 是負數，應該回傳原陣列", () => {
    const result = arrayMoveWithOrder(array, -1, 2);
    expect(result).toEqual(initialArray);
  });

  it("case3: 如果 to 是負數，應該回傳原陣列", () => {
    const result = arrayMoveWithOrder(array, 1, -2);
    expect(result).toEqual(initialArray);
  });
});

describe("超出範圍測試", () => {
  let array: [];

  beforeEach(() => {
    array = JSON.parse(JSON.stringify(initialArray));
  });

  it("case1: 如果 from 超出陣列範圍，應該回傳原始陣列", () => {
    const result = arrayMoveWithOrder(array, 10, 2);
    expect(result).toEqual(initialArray);
  });

  it("case2: 如果 to 超出陣列範圍，應該回傳原始陣列", () => {
    const result = arrayMoveWithOrder(array, 1, 15);
    expect(result).toEqual(initialArray);
  });

  it("case3: from=2, to=2 因為 from 和 to 相等，應該回傳原陣列", () => {
    const result = arrayMoveWithOrder(array, 2, 2);
    expect(result).toEqual(initialArray);
  });
});
