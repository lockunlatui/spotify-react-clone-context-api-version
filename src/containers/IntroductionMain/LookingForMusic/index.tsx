import { useEffect } from "react";
import { Typography, Button } from "@components/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";

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
              Looking for music?
            </Typography>
            <Typography variant="h5" className={Styles.startListeningText}>
              Start listening to the best new releases.
            </Typography>
            <Button
              className={Styles.openWebPlayer}
              color={Colors.white}
              backgroundColor={Colors.green}
            >
              Open Web Player
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
                        {/* <figcaption className={Styles.scroll}>
                            <Typography variant="h5">{box.title}</Typography>
                            <Typography variant="h5">{box.subtitle}</Typography>
                            <div className={Styles.playNow}>
                              <a href="/open">Play Now</a>
                            </div>
                          </figcaption> */}
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
