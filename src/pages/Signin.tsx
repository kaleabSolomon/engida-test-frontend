import React from "react";
import AuthLayout from "../features/auth/components/AuthLayout";
import SignInForm from "../features/auth/components/SigninForm";

const SignIn: React.FC = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your credentials to access your account"
    >
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
