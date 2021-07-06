import { faHome, faSearch, faBook } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare, faHeart } from "@fortawesome/free-regular-svg-icons";

/** Enums */
import { Routes } from "@enums/routes";

const menus = [
  {
    id: `1`,
    icon: faHome,
    name: "Home",
    link: Routes.Open,
  },
  {
    id: `2`,
    icon: faSearch,
    name: "Search",
    link: Routes.Search,
  },
  {
    id: `3`,
    icon: faBook,
    name: "Your Library",
    link: Routes.YourLibrary,
  },
  {
    id: `4`,
    icon: faPlusSquare,
    name: "Create Playlist",
    link: Routes.PlayList,
  },
  {
    id: `5`,
    icon: faHeart,
    name: "Liked Songs",
    link: Routes.LikedSong,
  },
];

export { menus };
