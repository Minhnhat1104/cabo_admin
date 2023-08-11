// import React from "react";
import ListPage from "@home/page/index";
import StorePage from "../page/StorePage";
import TrashPage from "../page/TrashPage";
import ViewPage from "../page/ViewPage";

const Routes = {
  path: "/course",
  children: [
    {
      index: true,
      element: <ListPage />,
    },
    {
      path: "/course/store",
      element: <StorePage />,
    },
    {
      path: "/course/trash",
      element: <TrashPage />,
    },
    {
      path: "/course/:slug",
      element: <ViewPage />,
    },
  ],
};
export default Routes;
