import HeroImg from "../images/Hero.jpg";
import "./Login.css";

export default function Login() {
  return (
    <>
      <img className="heroImg" alt="Working on laptop" src={HeroImg} style={{borderRadius:"10px",margin:"25px"}}/>
      <h1 className="heroText">Create, edit, save and download resume.</h1>
    </>
  );
}
