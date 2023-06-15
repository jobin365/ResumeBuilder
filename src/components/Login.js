import HeroImg from "../images/hero.png";

export default function Login() {
  return (
    <div style={{width:"500px",padding:"20px"}}>
      <img alt="Working on laptop" src={HeroImg} style={{borderRadius: "15px",width:"100%"}}/>
      <h1 style={{textAlign:"center"}}>Create, edit, save and download resume. Login to continue.</h1>
    </div>
  );
}
