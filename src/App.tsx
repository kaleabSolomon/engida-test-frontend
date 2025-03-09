import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";

import PrivateRoute from "./components/PrivateRoute"; // You would need to create this
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import { store } from "./store";
import TasksPage from "./pages/TasksPage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Hero />
              </Layout>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <TasksPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
