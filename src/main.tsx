import React from "react";
import ReactDOM from "react-dom/client";
import { Chats } from "./routes/Chats";
import { Chat } from "./routes/chat/[id]/Chat";
import "./index.css";

import {
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/react-router";

const rootRouter = new RootRoute();
const indexRoute = new Route({
  getParentRoute: () => rootRouter,
  path: "/",
  component: Chats,
});

const chatRoute = new Route({
  getParentRoute: () => rootRouter,
  path: "/chat",
});

const chatIdRoute = new Route({
  getParentRoute: () => chatRoute,
  path: "$chatId",
  component: Chat,
});

const routeTree = rootRouter.addChildren([
  indexRoute,
  chatRoute.addChildren([chatIdRoute]),
]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
