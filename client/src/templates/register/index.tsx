import { Header } from "@/shared/components";
import { AuthCard } from "@/shared/components";
import { Form } from "./components";

const Register = () => {
  return (
    <>
      <main className="flex-center-between p-10 lg:p-0">
        <AuthCard />

        <Form />
      </main>
    </>
  );
};

export default Register;
