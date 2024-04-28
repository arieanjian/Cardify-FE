interface IapiResponse {
  status: "success" | "error" | "fail";
  msg: string;
  data: unknown;
}

interface ISetStateFunction<T> {
  (newState: T | ((prevState: T) => T)): void;
}

interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}
