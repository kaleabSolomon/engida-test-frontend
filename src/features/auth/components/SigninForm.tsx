import React, { useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { resetError, signIn } from "../authSlice";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    console.log("error:", error);
  }, [error]);
  useEffect(() => {
    // Redirect if authenticated
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      console.log("Triggering notification for error:", error); // Debugging
      notification.error({
        message: "Sign In Failed",
        description: error,
        placement: "topRight",
      });

      // Delay resetting the error
      const timeout = setTimeout(() => dispatch(resetError()), 500);

      // Cleanup timeout on component unmount
      return () => clearTimeout(timeout);
    }
  }, [error, dispatch]);
  const onFinish = async (values: SignInFormValues) => {
    const { email, password } = values;

    const resultAction = await dispatch(signIn({ email, password }));

    if (signIn.fulfilled.match(resultAction)) {
      notification.success({
        message: "Sign In Successful",
        description: "Welcome back to Fintask!",
        placement: "topRight",
      });
    }
  };

  return (
    <Form
      name="sign-in"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      size="large"
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email address!" },
        ]}
      >
        <Input
          prefix={<FaUser className="text-gray-400" />}
          placeholder="Email"
          className="rounded-lg h-12"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          prefix={<FaLock className="text-gray-400" />}
          placeholder="Password"
          className="rounded-lg h-12"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full h-12 rounded-lg"
          loading={isLoading}
        >
          Sign In
        </Button>
      </Form.Item>

      <div className="text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignInForm;
