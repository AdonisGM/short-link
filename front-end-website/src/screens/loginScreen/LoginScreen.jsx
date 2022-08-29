import { useEffect } from "react";
import Login from "../../components/login/Login";

const LoginScreen = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <Login/>;
};

export default LoginScreen;
