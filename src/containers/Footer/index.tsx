import { FormattedMessage } from 'react-intl';

/** Components */
import { Logo, Typography } from '@components/index';

/** Mocks */
import { topLinks, profileUrl, socialLinks, bottomLinks } from '@mocks/Footer';

/** Styles */
import Styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <nav className={Styles.nav}>
        <div className={Styles.wrapLogo}>
          <a href={profileUrl}>
            <span>
              <Logo />
            </span>
          </a>
        </div>
        <div className={Styles.topLinks}>
          {topLinks.map((link) => {
            return (
              <dl key={link.id} className={Styles.company}>
                <dt>
                  <Typography variant='caption' className={Styles.defineTerm}>
                    {link.term}
                  </Typography>
                </dt>
                {link.descList.map((desc, index) => {
                  return (
                    <dd key={`${desc.id}_${index}`}>
                      <a href={desc.link}>
                        <Typography
                          variant='subtitle1'
                          className={Styles.descriptionTerm}
                        >
                          {desc.desc}
                        </Typography>
                      </a>
                    </dd>
                  );
                })}
              </dl>
            );
          })}
        </div>
        <div className={Styles.socialIcons}>
          <ul>
            {socialLinks.map((socialLink) => {
              return (
                <li key={socialLink.id}>
                  <a href={socialLink.link}>
                    <span
                      style={{
                        background: `no-repeat url(${socialLink.img}),
                        currentColor`,
                      }}
                      className={Styles.icon}
                      aria-label={socialLink.label}
                    ></span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={Styles.myCountry}>
          <svg
            width='12'
            height='13'
            viewBox='0 0 12 13'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            focusable='false'
          >
            <path
              d='M6 0.624023C8.07255 0.624023 9.90309 1.68041 10.9815 3.28299C10.9819 3.28367 10.9822 3.28403 10.9825 3.28438C11.0029 3.30998 11.0209 3.33677 11.0363 3.36446C11.6453 4.30352 12 5.42315 12 6.62402C12 9.92265 9.32436 12.6079 6.02962 12.624C6.02732 12.6241 6.02495 12.6241 6.02258 12.6241L6 12.624C2.69149 12.624 0 9.93253 0 6.62402C0 3.31571 2.69149 0.624023 6 0.624023ZM6 1.78528C5.80411 1.78528 5.61089 1.79698 5.42102 1.81972C5.39755 1.91375 5.34896 2.0023 5.2765 2.07641L3.75157 3.63714C3.64024 3.75103 3.48978 3.812 3.33616 3.812C3.26752 3.812 3.19848 3.7998 3.1318 3.77483C2.91623 3.69359 2.76891 3.49277 2.75652 3.26265L2.74444 3.04725C1.77228 3.93289 1.16125 5.20844 1.16125 6.62402C1.16125 6.90513 1.18535 7.1807 1.23158 7.44881L2.11909 8.18538C2.12814 8.19266 2.13699 8.20053 2.14564 8.20859L2.91981 8.93437C2.99003 9.00007 3.04274 9.08228 3.07323 9.17374L3.37633 10.0793L3.83343 10.3016H4.86133C5.01514 10.3016 5.16285 10.3625 5.27182 10.4715L6.25621 11.4561C8.80567 11.3224 10.8387 9.20617 10.8387 6.62402C10.8387 5.8726 10.6666 5.16063 10.3596 4.52549L9.45716 5.24616L9.62455 5.6122C9.65956 5.68812 9.67726 5.77053 9.67726 5.85393V6.60784C9.67726 6.78014 9.60075 6.94358 9.46857 7.05393C9.3362 7.16407 9.16154 7.2103 8.99219 7.17902L8.05556 7.00751L8.52643 8.28855C8.58347 8.44354 8.57167 8.61544 8.49417 8.76139L7.67162 10.3097C7.58211 10.4783 7.41628 10.5907 7.22969 10.6136L7.15866 10.6179C6.94387 10.6179 6.74659 10.4991 6.64589 10.3093L6.25231 9.56742C6.24563 9.55444 6.23913 9.54126 6.23323 9.52788L5.91027 8.78833L5.5222 8.25412L4.15443 8.44118C4.0551 8.45475 3.9538 8.44255 3.86057 8.40518L2.68811 7.93765C2.46526 7.84855 2.3201 7.632 2.32244 7.39204L2.33879 5.84783C2.34095 5.65035 2.44304 5.46763 2.61022 5.3624L4.57554 4.12641C4.81058 3.97869 5.11781 4.01783 5.30801 4.22062L5.95905 4.91395L6.7818 5.23062L7.05303 5.13365L5.90181 3.48933C5.77849 3.3131 5.76256 3.08317 5.86051 2.89179L6.41732 1.80311C6.27976 1.7913 6.14057 1.78528 6 1.78528Z'
              fill='#8F8F8F'
            ></path>
          </svg>
          <a href={profileUrl}>
            <Typography className={Styles.language} variant='caption'>
              <FormattedMessage id='language' />
            </Typography>
          </a>
        </div>
        <div className={Styles.bottomLinks}>
          <ul>
            {bottomLinks.map((bottomLink) => {
              return (
                <li key={bottomLink.id}>
                  <a href={bottomLink.link}>
                    <Typography className={Styles.link} variant='caption'>
                      {bottomLink.name}
                    </Typography>
                  </a>
                </li>
              );
            })}
          </ul>
          <span className={Styles.copyRight}>
            <Typography className={Styles.desc} variant='caption'>
              @ 2021 Spotify AB
            </Typography>
          </span>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
