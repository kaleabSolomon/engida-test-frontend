import React from "react";
import AuthLayout from "../features/auth/components/AuthLayout";
import SignUpForm from "../features/auth/components/SignupForm";

const SignUp: React.FC = () => {
  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join JOT to manage your productivity"
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
