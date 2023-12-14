import React from "react";
import ReactDOM from "react-dom/client";
import { App, Chat } from "./App";
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
  component: App,
});
const chatRoute = new Route({
  getParentRoute: () => rootRouter,
  path: "/chat",
  component: Chat,
});

const routeTree = rootRouter.addChildren([indexRoute, chatRoute]);

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
