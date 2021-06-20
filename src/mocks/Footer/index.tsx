import { FormattedMessage } from 'react-intl';

import Instagram from '@assets/images/instagram.svg';
import Twitter from '@assets/images/twitter.svg';
import Facebook from '@assets/images/facebook.svg';
const profileUrl = 'https://www.facebook.com/lockunlatui';

const topLinks = [
  {
    id: `1`,
    term: <FormattedMessage id='top.links.company' />,
    descList: [
      {
        id: `1`,
        desc: <FormattedMessage id='top.links.about' />,
        link: profileUrl,
      },
      {
        id: `2`,
        desc: <FormattedMessage id='top.links.jobs' />,
        link: profileUrl,
      },
      {
        id: `1`,
        desc: <FormattedMessage id='top.links.forTheRecord' />,
        link: profileUrl,
      },
    ],
  },
  {
    id: `2`,
    term: <FormattedMessage id='top.links.communities' />,
    descList: [
      {
        id: `1`,
        desc: <FormattedMessage id='top.links.forArtists' />,
        link: profileUrl,
      },
      {
        id: `2`,
        desc: <FormattedMessage id='top.links.developers' />,
        link: profileUrl,
      },
      {
        id: `3`,
        desc: <FormattedMessage id='top.links.advertising' />,
        link: profileUrl,
      },
      {
        id: `4`,
        desc: <FormattedMessage id='top.links.investors' />,
        link: profileUrl,
      },
      {
        id: `5`,
        desc: <FormattedMessage id='top.links.vendors' />,
        link: profileUrl,
      },
    ],
  },
  {
    id: `3`,
    term: <FormattedMessage id='top.links.usefulLinks' />,
    descList: [
      {
        id: `1`,
        desc: <FormattedMessage id='top.links.support' />,
        link: profileUrl,
      },
      {
        id: `2`,
        desc: <FormattedMessage id='top.links.webPlayer' />,
        link: profileUrl,
      },
      {
        id: `1`,
        desc: <FormattedMessage id='top.links.freeMobileApp' />,
        link: profileUrl,
      },
    ],
  },
];

const socialLinks = [
  {
    id: `1`,
    label: 'Instagram',
    img: Instagram,
    link: profileUrl,
  },
  {
    id: `2`,
    label: 'Twitter',
    img: Twitter,
    link: profileUrl,
  },
  {
    id: `3`,
    label: 'Facebook',
    img: Facebook,
    link: profileUrl,
  },
];

const bottomLinks = [
  {
    id: `1`,
    name: <FormattedMessage id='bottom.links.legal' />,
    link: profileUrl,
  },
  {
    id: `2`,
    name: <FormattedMessage id='bottom.links.privacyCenter' />,
    link: profileUrl,
  },
  {
    id: `3`,
    name: <FormattedMessage id='bottom.links.privacyPolicy' />,
    link: profileUrl,
  },
  {
    id: `4`,
    name: <FormattedMessage id='bottom.links.cookies' />,
    link: profileUrl,
  },
  {
    id: `5`,
    name: <FormattedMessage id='bottom.links.aboutAds' />,
    link: profileUrl,
  },
];

export { topLinks, socialLinks, profileUrl, bottomLinks };
