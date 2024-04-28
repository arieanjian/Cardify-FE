type Id = string | number;

interface Column {
  id: Id;
  title: string;
}

interface Task {
  id: Id;
  columnId: Id;
  content: string;
}
