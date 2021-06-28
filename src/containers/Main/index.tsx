import Styles from "./main.module.scss";
import { FormattedMessage } from "react-intl";

import SpotifyPremiumImg from "../../assets/images/spotifyPremium.png";
/** Components */
import { Typography, Button } from "@components/index";

const Main = () => {
  return (
    <main className={Styles.container}>
      <section className={Styles.spotifyPremiumSection}>
        <div className={Styles.childSection}>
          <article className={Styles.article}>
            <div className={Styles.wrapSpotifyPremium}>
              <Typography className={Styles.spotifyPremium} variant="body2">
                SPOTIFY PREMIUM
              </Typography>
            </div>
            <div className={Styles.wrapStrongSP}>
              <Typography className={Styles.strongSP}>
                <FormattedMessage id="section.premium.title" />
              </Typography>
            </div>
            <div className={Styles.wrapDesc}>
              <Typography variant="h5" className={Styles.descSP}>
                <FormattedMessage id="section.premium.description" />
              </Typography>
            </div>
            <div className={Styles.wrapBtnReceiveFree}>
              <Button
                variant="contained"
                backgroundColor="#2d46b9"
                color="#FFFFFF"
              >
                <FormattedMessage id="section.premium.button.name" />
              </Button>
            </div>
          </article>
          <div className={Styles.imgSP}>
            <img src={SpotifyPremiumImg} alt="Spotify Premium" />
          </div>
        </div>
      </section>
      <section className={Styles.spotifyFreeSection}>
        <div className={Styles.childSection}>
          <article className={Styles.article}>
            <div className={Styles.wrapSpotifyFree}>
              <Typography className={Styles.spotifyFree} variant="body2">
                SPOTIFY FREE
              </Typography>
            </div>
            <div className={Styles.wrapStrongSF}>
              <Typography className={Styles.strongSF}>
                <FormattedMessage id="section.free.title" />
              </Typography>
            </div>
            <div className={Styles.wrapDesc}>
              <Typography variant="h5" className={Styles.descSF}>
                <FormattedMessage id="section.free.description" />
              </Typography>
            </div>
            <div className={Styles.wrapBtnDownloadFree}>
              <Button
                variant="contained"
                backgroundColor="#1ed760"
                color="#2941ab"
              >
                <FormattedMessage id="section.free.button.name" />
              </Button>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Main;
