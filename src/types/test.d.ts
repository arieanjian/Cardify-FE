type Id = string | number;

interface Column {
  id: Id;
  title: string;
}

interface Task {
  id: Id;
  order: number;
  columnId: Id;
  content: string;
}
