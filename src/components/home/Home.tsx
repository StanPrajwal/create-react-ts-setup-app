import HomeStyle from "./Home.module.css";
import homeImg from "../../assets/images/home.avif";
const Home = () => {
  return (
    <div className={HomeStyle.container}>
      <div className={HomeStyle.box}>
        <img src={homeImg} alt="home" className={HomeStyle.image} />
      </div>
    </div>
  );
};

export default Home;
