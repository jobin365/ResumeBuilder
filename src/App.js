import "./App.css";
import { useEffect, useRef, useState } from "react";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import jsPDF from "jspdf";
import Home from "./components/Home";
import Login from "./components/Login";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/joy/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/joy/Avatar";
import Tooltip from "@mui/joy/Tooltip";
import LoadingBar from 'react-top-loading-bar'

function App() {
  const resume = useRef();
  const bar = useRef(null)
  const [isLoggedIn, setLogin] = useState(true);

  const w = window.innerWidth;

  const handleGeneratePdf = () => {
    bar.current.continuousStart()
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
      hotfixes: ["px_scaling"],
    });
    doc.html(resume.current, {
      async callback(doc) {
        await doc.save("Resume");
        bar.current.complete();
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            {isLoggedIn ? (
              w >= 640 ? (
                <>
                  <Button color="success" startDecorator={<SaveIcon />}>
                    Save
                  </Button>
                  <Button
                    startDecorator={<DownloadIcon />}
                    style={{ marginLeft: "10px" }}
                    onClick={handleGeneratePdf}
                  >
                    Download
                  </Button>
                  <Button
                    color="danger"
                    style={{ marginLeft: "10px" }}
                    startDecorator={<LogoutIcon />}
                  >
                    Logout
                  </Button>
                  <Tooltip title="Jobin John K">
                    <Avatar color="primary" style={{ marginLeft: "10px" }}>
                      J
                    </Avatar>
                  </Tooltip>
                </>
              ) : (
                <>
                  <IconButton color="success" variant="solid">
                    <SaveIcon />
                  </IconButton>
                  <IconButton style={{ marginLeft: "10px" }} variant="solid">
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    style={{ marginLeft: "10px" }}
                    color="danger"
                    variant="solid"
                  >
                    <LogoutIcon />
                  </IconButton>
                  <Tooltip title="Jobin John K">
                    <Avatar color="primary" style={{ marginLeft: "10px" }}>
                      J
                    </Avatar>
                  </Tooltip>
                </>
              )
            ) : (
              <Button startDecorator={<GoogleIcon />}>
                {w >= 640 ? "Login with Google" : "Login"}
              </Button>
            )}
          </div>
        </div>
        <div>
          <Divider />
          <LoadingBar color='#f11946' ref={bar} />
        </div>
      </div>
      <div className="body">
        {isLoggedIn ? <Home resume={resume} /> : <Login />}
      </div>
    </div>
  );
}

export default App;
