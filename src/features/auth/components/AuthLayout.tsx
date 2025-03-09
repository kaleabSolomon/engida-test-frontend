import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <Layout className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-800 md:bg-authbg md:bg-center md:bg-cover md:bg-no-repeat">
      <Content className="flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-full"></div>
              </div>{" "}
              <span className="ml-2 text-xl font-bold text-blue-500">JOT</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>

          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
