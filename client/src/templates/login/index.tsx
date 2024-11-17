import { Form } from "./components";
import { AuthCard } from "@/shared/components";

const Login = () => {
  return (
    <>
      <main className="flex-center-between p-10 lg:p-0">
        <AuthCard />

        <Form />
      </main>
    </>
  );
};

export default Login;
