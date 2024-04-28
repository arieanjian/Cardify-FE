interface IloginProps {
  email: string;
  password: string;
}

interface IregisterProps extends IloginProps {
  username: string;
}

interface IauthResponse {
  userInfo: IUser;
  token: string;
}

type IaccountType = "login" | "register";
