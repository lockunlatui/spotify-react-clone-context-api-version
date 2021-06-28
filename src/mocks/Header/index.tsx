import { FormattedMessage } from "react-intl";

const menus = [
  {
    id: `1`,
    itemName: <FormattedMessage id="header.nav.menu.premium" />,
  },
  {
    id: `2`,
    itemName: <FormattedMessage id="header.nav.menu.support" />,
  },
  {
    id: `3`,
    itemName: <FormattedMessage id="header.nav.menu.download" />,
  },
  {
    id: `5`,
    itemName: "",
    isSeparator: true,
  },
  {
    id: `6`,
    itemName: <FormattedMessage id="header.nav.menu.signUp" />,
  },
  {
    id: `7`,
    itemName: <FormattedMessage id="header.nav.menu.logIn" />,
    link: `api/v1/auth/spotify`,
  },
];

export { menus };
