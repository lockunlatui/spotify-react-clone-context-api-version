import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";

/** Components */
import { Typography, Button } from "@components/index";

/** Mocks */
import { boxMusic } from "@mocks/IntroductionMain";

/** Constants */
import { Colors } from "@constants/index";

/** Styles */
import Styles from "./lookingForMusic.module.scss";

const LookingForMusic = () => {
  useEffect(() => {}, []);

  return (
    <section className={Styles.container}>
      <div className={Styles.lookForMusicBg} />
      <div className={Styles.lookForMusicBgGradient} />
      <div className={Styles.premiumPromoContainer}>
        <div className={Styles.premiumPromo}>
          <div className={Styles.heroIntro}>
            <Typography variant="h3" className={Styles.lookForMusicText}>
              <FormattedMessage id="introductionMain.lookForMusic" />
            </Typography>
            <Typography variant="h5" className={Styles.startListeningText}>
              <FormattedMessage id="introductionMain.startListening" />
            </Typography>
            <Button
              className={Styles.openWebPlayer}
              color={Colors.white}
              backgroundColor={Colors.green}
              variant="contained"
            >
              <FormattedMessage id="introductionMain.openWebPlayer" />
            </Button>
          </div>
          <div className={Styles.boxMusicContainer}>
            <div className={Styles.boxMusic}>
              <div className={Styles.albumResult}>
                <ul>
                  {boxMusic.map((box: any) => {
                    return (
                      <li key={box.id}>
                        <figure>
                          <div className={Styles.box}>
                            <div className={Styles.content}>
                              <img src={box.img} alt={box.title} />
                            </div>
                          </div>
                          <div className={Styles.contentOverlay} />
                          <div className={Styles.contentDetail}>
                            <figcaption className={Styles.albumPlayIcon}>
                              <FontAwesomeIcon
                                color={Colors.white}
                                icon={faPlayCircle}
                              />
                              <Typography
                                className={Styles.title}
                                variant="subtitle1"
                              >
                                {box.title}
                              </Typography>
                              <Typography
                                className={Styles.subtitle}
                                variant="body2"
                              >
                                {box.subtitle}
                              </Typography>
                            </figcaption>
                          </div>
                        </figure>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <a href="#load" className={Styles.btnScroll}>
            <div className={Styles.iconScrollDown}>
              <FontAwesomeIcon color={Colors.white} icon={faArrowCircleDown} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LookingForMusic;
