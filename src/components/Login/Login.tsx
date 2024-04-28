import React from "react";
import { Form, Typography, Input, Button, Spin } from "antd";
// api
import useLogin from "@/hooks/Auth/useLogin";
import useRegister from "@/hooks/Auth/useRegister";
// image
import Logo from "@/assets/imgs/Logo.svg";

interface Iprops {
  closeLoginModal: () => void;
  s_accountType: IaccountType;
  set_s_accountType: React.Dispatch<React.SetStateAction<IaccountType>>;
}

interface IformValue {
  username: string;
  email: string;
  password: string;
}

const { Title, Text } = Typography;

const Login: React.FC<Iprops> = ({
  s_accountType,
  set_s_accountType,
  closeLoginModal,
}) => {
  const [form] = Form.useForm();
  // 登入
  const login = useLogin({
    onSuccess: closeLoginModal, // api 完成後執行
  });

  // 註冊
  const register = useRegister({
    onSuccess: closeLoginModal, // api 完成後執行
  });

  // 切換[登入]、[註冊]
  const toggleEditType = () => {
    set_s_accountType(s_accountType === "login" ? "register" : "login");
    form.resetFields();
  };
  // form submit
  const onFinish = async (values: IformValue) => {
    // 登入
    if (s_accountType === "login") {
      login.mutate(values);
    }
    // 註冊
    if (s_accountType === "register") {
      register.mutate(values);
    }
  };
  console.log("login.isPaused = ", login.isPaused);
  return (
    <Spin spinning={login.isPending || register.isPaused}>
      <Form
        layout="vertical"
        name="basic"
        form={form}
        onFinish={onFinish}
        className="py-14 flex flex-col justify-center items-center gap-6 bg-[#F5F5F5]"
      >
        <img src={Logo} alt="Cardify" width={180} height={36} />

        <Form.Item
          label={
            <Title level={3} className="my-0">
              Username
            </Title>
          }
          hidden={s_accountType === "login"}
          className="w-4/5 mb-0"
          name="username"
          rules={[{ required: s_accountType === "register" ? true : false }]}
        >
          <Input placeholder="type your username" />
        </Form.Item>

        <Form.Item
          name="email"
          className="w-4/5 mb-0"
          label={
            <Title level={3} className="my-0">
              Email
            </Title>
          }
          rules={[
            { required: true },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input placeholder="type your email" />
        </Form.Item>

        <Form.Item
          className="w-4/5 mb-0"
          label={
            <Title level={3} className="my-0">
              Password
            </Title>
          }
          name="password"
          rules={[{ required: true }, { max: 20 }, { min: 8 }]}
        >
          <Input.Password placeholder="enter 8 to 20 letters." />
        </Form.Item>

        <Button type="primary" className="w-4/5" htmlType="submit">
          {s_accountType === "login" ? "Log in" : "Sign up"}
        </Button>

        <Text>
          Don't have an account ?
          <Text
            className="ml-2 text-[#FF4D4F] cursor-pointer"
            onClick={toggleEditType}
          >
            {s_accountType === "login" ? "Sign up" : "Log in"}
          </Text>
        </Text>
      </Form>
    </Spin>
  );
};

export default Login;
