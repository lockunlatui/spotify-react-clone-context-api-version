/** Components */
import { Typography } from "@components/index";

/** Enums */
import { Numbers } from "@enums/numbers";
import axios from "@services/interceptor";
import { useEffect } from "react";

/** Styles */
import Styles from "./home.module.scss";

/** Children Container */
import ListOfNewRelease from "./ListOfNewRelease";

const Home = () => {

  useEffect(() => {
    const user: any = localStorage.getItem("user");

    const token = Boolean(user) ? JSON.parse(user) : "";
    axios
      .get(`https://api.spotify.com/v1/me/tracks?limit=50&offset=0&market=VN`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((response: any) => {

      });
  },[])
  const greeting = () => {
    const currentTime = new Date();
    const getTimeZone = currentTime.getTimezoneOffset() / -Numbers.Sixty;
    const hour = currentTime.getUTCHours() + getTimeZone;
    if (Numbers.Four > hour && hour < Numbers.Eleven) {
      return "Good morning";
    }
    if (Numbers.Twelve > hour && hour > Numbers.Eleven) {
      return "Good noon";
    }
    if (Numbers.Seventeen >= hour && hour > Numbers.Twelve) {
      return "Good afternoon";
    }
    if (Numbers.Twenty > hour && hour > Numbers.Seventeen) {
      return "Good evening";
    }
    return "Good night";
  };

  useEffect(() => {}, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.helloContainer}>
        <Typography className={Styles.title} variant="h4">
          {greeting()}
        </Typography>
      </div>
      <ListOfNewRelease />
    </div>
  );
};

export default Home;
