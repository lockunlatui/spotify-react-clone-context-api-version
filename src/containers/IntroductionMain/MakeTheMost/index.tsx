import { FormattedMessage } from "react-intl";

/** Components */
import { Typography, Button } from "@components/index";

/** Mocks */
import { makeTheMostFeatures } from "@mocks/IntroductionMain";

/** Interfaces */
import { MakeTheMostFeatures } from "@interfaces/IntroductionMain";

/** Styles */
import Styles from "./makeTheMost.module.scss";

const MakeTheMost = () => {

  return (
    <div className={Styles.container}>
      <div className={Styles.makeTheMostContainer}>
        <div className={Styles.wrapTitleMakeTheMost}>
          <Typography variant="h3">
            <FormattedMessage id="introductionMain.makeTheMost.title" />
          </Typography>
        </div>
        <ul className={Styles.makeTheMostFeatures}>
          {makeTheMostFeatures.map(
            (feature: MakeTheMostFeatures, index: number) => {
              return (
                <li key={feature.id} className={Styles.feature}>
                  <Typography className={Styles.name} variant="h5">
                    {feature.name}
                  </Typography>
                  <Typography className={Styles.desc} variant="subtitle1">
                    {index === 2 ? (
                      <div className={Styles.play}>
                        {feature.desc} {` `}
                        <span>play.spotify.com</span>
                      </div>
                    ) : (
                      feature.desc
                    )}
                  </Typography>
                  <div>
                    <Button className={Styles.featureBtn}>
                      {feature.linkName}
                    </Button>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default MakeTheMost;
