import HeroImg from "../images/Hero.jpg";
import "./HomePage.css";

export default function HomePage() {
  return (
    <>
      <img className="heroImg" alt="Working on laptop" src={HeroImg} style={{borderRadius:"10px",margin:"25px"}}/>
      <h1 className="heroText">Create, edit, save and download resume.</h1>
    </>
  );
}
