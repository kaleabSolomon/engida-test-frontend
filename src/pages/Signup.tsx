import React from "react";
import AuthLayout from "../features/auth/components/AuthLayout";
import SignUpForm from "../features/auth/components/SignupForm";

const SignUp: React.FC = () => {
  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join Fintask to manage your team's productivity"
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
