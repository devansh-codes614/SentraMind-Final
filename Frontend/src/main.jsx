import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Layout from "./Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Chatbot from "./Chatbot/Chatbot.jsx";

import EditSentiment from "./Components/Sentiment/EditSentiment.jsx";
import Sentiment from "./Components/Sentiment/Sentiment.jsx";

import Login from "./Authentication/Login.jsx";
import SignUp from "./Authentication/SignUp.jsx";
import { AuthProvider } from "./Authentication/AuthProvider.jsx";

import Dashboard from "./Dashboard/Dashboard.jsx";
import News from "./Components/News/News.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/posts",
        element: <Sentiment />
      },
      {
        path: "/news",
        element: <News />
      }
    ]
  },

  {
    path: "/chatbot",
    element: <Chatbot />
  },

  {
    path: "/details/:id/edit",
    element: <EditSentiment />
  },

  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/signup",
    element: <SignUp />
  },

  {
    path: "/dashboard",
    element: <Dashboard />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);