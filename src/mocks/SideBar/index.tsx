import { faHome, faSearch, faBook } from "@fortawesome/free-solid-svg-icons";

const menus = [
  {
    id: `1`,
    icon: faHome,
    name: "Home",
    link: '/open'
  },
  {
    id: `2`,
    icon: faSearch,
    name: "Search",
    link: '/search'
  },
  {
    id: `3`,
    icon: faBook,
    name: "Your Library",
    link: '/yourLibrary'
  },
];

export { menus };
