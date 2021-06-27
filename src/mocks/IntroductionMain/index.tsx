import { FormattedMessage } from "react-intl";
import { Images } from "@utils/index";

const boxMusic: any = [
  {
    id: `1`,
    img: Images["BOXMUSIC1"],
    title: "LUMBERJACK",
    subtitle: `Tyler, The Creator`,
  },
  {
    id: `2`,
    img: Images["BOXMUSIC2"],
    title: "LUMBERJACK",
    subtitle: `Tyler, The Creator`,
  },
  {
    id: `3`,
    img: Images["BOXMUSIC3"],
    title: "LUMBERJACK",
    subtitle: `Tyler, The Creator`,
  },
  {
    id: `4`,
    img: Images["BOXMUSIC4"],
    title: "LUMBERJACK",
    subtitle: `Tyler, The Creator`,
  },
  {
    id: `5`,
    img: Images["BOXMUSIC5"],
    title: "LUMBERJACK",
    subtitle: `Tyler, The Creator`,
  },
  {
    id: `6`,
    img: Images["BOXMUSIC6"],
    title: "LUMBERJACK",
    subtitle: `Tyler, The Creator`,
  },
];

const makeTheMostFeatures = [
  {
    id: `1`,
    name: (
      <FormattedMessage id="introductionMain.makeTheMost.manageYourAccount" />
    ),
    desc: (
      <FormattedMessage id="introductionMain.makeTheMost.manageYourAccount.description" />
    ),
    linkName: (
      <FormattedMessage id="introductionMain.makeTheMost.manageYourAccount.nameButton" />
    ),
    link: `/manageAccount`,
  },
  {
    id: `2`,
    name: <FormattedMessage id="introductionMain.makeTheMost.getOurFreeApp" />,
    desc: (
      <FormattedMessage id="introductionMain.makeTheMost.getOurFreeApp.description" />
    ),
    linkName: (
      <FormattedMessage id="introductionMain.makeTheMost.getOurFreeApp.nameButton" />
    ),
    link: `/downloadDesktopApp`,
  },
  {
    id: `3`,
    name: <FormattedMessage id="introductionMain.makeTheMost.listenOnTheWeb" />,
    desc: (
      <FormattedMessage id="introductionMain.makeTheMost.listenOnTheWeb.description" />
    ),
    linkName: (
      <FormattedMessage id="introductionMain.makeTheMost.listenOnTheWeb.nameButton" />
    ),
    link: `/openWebPlayer`,
  },
];

export { boxMusic, makeTheMostFeatures };
