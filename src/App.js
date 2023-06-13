import "./App.css";
import { useEffect, useRef, useState } from "react";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import jsPDF from "jspdf";
import Home from "./components/Home";
import Login from "./components/Login";
import GoogleIcon from '@mui/icons-material/Google';

function App() {
  const resume = useRef();
  const [isLoggedIn,setLogin]=useState(false);

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
      hotfixes: ["px_scaling"],
    });
    doc.html(resume.current, {
      async callback(doc) {
        await doc.save("Resume");
      },
      autoPaging: "text",
    });
  };

  return (
    <div style={{ fontFamily: "Helvetica" }}>
      <div className="header">
        <div className="header-content">
          <h1
            className="heading"
            style={{ marginTop: "0px", marginBottom: "0px" }}
          >
            Resume Builder
          </h1>
          <div>{isLoggedIn?
            <Button onClick={handleGeneratePdf}>Download</Button>:
            <Button startDecorator={<GoogleIcon />}>Login with Google</Button>
          }
          </div>
        </div>
        <div>
          <Divider />
        </div>
      </div>
      <div className="body">
      {isLoggedIn?
        <Home resume={resume} />:
        <Login/>
      }
      </div>
    </div>
  );
}

export default App;
