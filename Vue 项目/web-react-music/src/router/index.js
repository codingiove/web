import React from "react";
import { Redirect } from "react-router-dom";

const Discover = React.lazy(() => import("../pages/discover/index.js"));
const Recommend = React.lazy(() =>
  import("../pages/discover/Subpage/recommend/index.js")
);
const Ranking = React.lazy(() =>
  import("../pages/discover/Subpage/ranking/index.js")
);
const Songs = React.lazy(() =>
  import("../pages/discover/Subpage/songs/index.js")
);
const Djradio = React.lazy(() =>
  import("../pages/discover/Subpage/djradio/index.js")
);
const Artist = React.lazy(() =>
  import("../pages/discover/Subpage/artist/index.js")
);
const Album = React.lazy(() =>
  import("../pages/discover/Subpage/album/index.js")
);
const Player = React.lazy(() => import("../pages/Player/index.js"));
const Mine = React.lazy(() => import("../pages/mine/index.js"));
const Friend = React.lazy(() => import("../pages/friend/index.js"));
const Search = React.lazy(() => import("../pages/search/index.js"));
const Playlist = React.lazy(() =>
  import("../pages/SongSheetDetails/index.js")
);

const routes = [
  // 路径为 / 渲染 Redirect 组件, 而 Redirect 会重定向到 /discover 路径
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/discover" />,
  },
  {
    path: "/discover",
    component: Discover,
    routes: [
      //  是这个路径 /discover 就重定向到 /discover/recommend
      {
        path: "/discover",
        exact: true,
        render: () => <Redirect to="/discover/recommend" />,
      },
      {
        path: "/discover/recommend",
        component: Recommend,
      },
      {
        path: "/discover/ranking",
        component: Ranking,
      },
      {
        path: "/discover/songs",
        component: Songs,
      },
      {
        path: "/discover/djradio",
        component: Djradio,
      },
      {
        path: "/discover/artist",
        component: Artist,
      },
      {
        path: "/discover/album",
        component: Album,
      },
      {
        path: "/discover/Player",
        component: Player,
      },
    ],
  },
  {
    path: "/mine",
    component: Mine,
  },
  {
    path: "/friend",
    component: Friend,
  },
  {
    path: "/Search/:keywords",
    component: Search,
  },
  {
    path: "/playlist",
    component: Playlist,
  },
];
export default routes;
