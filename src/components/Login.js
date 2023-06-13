import HeroImg from "../images/hero.jpg";

export default function Login() {
  return (
    <div style={{width:"500px",padding:"20px"}}>
      <img alt="Working on laptop" src={HeroImg} style={{borderRadius: "25px",width:"100%"}}/>
      <h1 style={{textAlign:"center"}}>Create, edit, save and download resume.</h1>
    </div>
  );
}
