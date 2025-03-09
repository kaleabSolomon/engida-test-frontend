import React, { useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "@reduxjs/toolkit/query";
import { AppDispatch } from "../../../store";
import { resetError, signUp } from "../authSlice";
import { FaLock, FaMailBulk, FaUser } from "react-icons/fa";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // Redirect if authenticated
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Show error notification if any
    if (error) {
      notification.error({
        message: "Sign Up Failed",
        description: error,
        placement: "topRight",
      });
      dispatch(resetError());
    }
  }, [error, dispatch]);

  const onFinish = async (values: SignUpFormValues) => {
    console.log("values", values);
    const { firstName, lastName, email, password, confirmPassword } = values;

    const resultAction = await dispatch(
      signUp({
        firstName,
        lastName,
        email,
        password,
        passwordConfirm: confirmPassword,
      })
    );

    if (signUp.fulfilled.match(resultAction)) {
      notification.success({
        message: "Sign Up Successful",
        description: "Welcome to Fintask! Your account has been created.",
        placement: "topRight",
      });
    }
  };

  return (
    <Form
      name="sign-up"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      size="large"
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input
          prefix={<FaUser className="text-gray-400" />}
          placeholder="First Name"
          className="rounded-lg h-12"
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input
          prefix={<FaUser className="text-gray-400" />}
          placeholder="Last Name"
          className="rounded-lg h-12"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email address!" },
        ]}
      >
        <Input
          prefix={<FaMailBulk className="text-gray-400" />}
          placeholder="Email"
          className="rounded-lg h-12"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 8, message: "Password must be at least 8 characters!" },
        ]}
      >
        <Input.Password
          prefix={<FaLock className="text-gray-400" />}
          placeholder="Password"
          className="rounded-lg h-12"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<FaLock className="text-gray-400" />}
          placeholder="Confirm Password"
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
          Sign Up
        </Button>
      </Form.Item>

      <div className="text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignUpForm;
