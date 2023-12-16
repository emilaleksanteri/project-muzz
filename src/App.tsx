import { Chats } from "./routes/Chats";
import { Chat } from "./routes/chat/[id]/Chat";
import {
  RootRoute,
  Route,
  Router,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";
import { Heart } from "lucide-react";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function Index() {
  return (
    <>
      <div className="hidden md:block">
        <section className="flex w-full flex-col items-center justify-center gap-3">
          <Heart width={100} height={100} className="stroke-[#ef426e]" />
          <h2 className="font-mono text-3xl font-bold capitalize tracking-wide text-[#ef426e]">
            Find Your Habibi
          </h2>
        </section>
      </div>
      <div className="block md:hidden">
        <Chats />
      </div>
    </>
  );
}

const rootRouter = new RootRoute({
  component: RootComponent,
});
const indexRoute = new Route({
  getParentRoute: () => rootRouter,
  path: "/",
  component: Index,
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

function RootComponent(): JSX.Element {
  return (
    <main className="flex w-full items-center justify-center md:border-r-2">
      <div className="hidden border-x-2 md:block md:w-[40%] lg:w-[35%] 2xl:w-[20%]">
        <Chats />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  );
}

export default function App(): JSX.Element {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
