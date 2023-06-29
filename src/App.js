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
import LoadingBar from "react-top-loading-bar";
import { flushSync } from "react-dom";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [username, setUserName] = useState("");
  const resume = useRef();
  const bar = useRef(null);
  const [isLoggedIn, setLogin] = useState(false);
  const w = window.innerWidth;
  const [resumeVisible, setVisible] = useState(w >= 1330 ? true : false);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [skills, setSkills] = useState("");
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [linkedin, setLinkedIn] = useState("");

  const [github, setGitHub] = useState("");
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);

  const [education, setEducation] = useState([]);
  const [certifications, setCerts] = useState([]);

  Axios.defaults.baseURL = "http://localhost:3001";
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("/loginStatus").then(function (response) {
      console.log("login");
      const loginStatus = response.data.status;
      setLogin(loginStatus);
      if (loginStatus) {
        setUserName(response.data.username);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("/getResume").then(function (response) {
      console.log("resume");
      const resume = response.data;
      setName(resume.name);
      setDesignation(resume.designation);
      setEmail(resume.email);
      setLinkedIn(resume.linkedin);
      setGitHub(resume.github);
      setSkills(resume.skills);
      setSummary(resume.summary);
      setExperience(resume.experience);
      setEducation(resume.education);
      setProjects(resume.projects);
      setCerts(resume.certifications);
    });
  }, []);

  const handleGeneratePdf = () => {
    bar.current.continuousStart();
    if (w < 1330)
      flushSync(() => {
        setVisible(true);
      });
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
      hotfixes: ["px_scaling"],
    });
    doc.html(resume.current, {
      async callback(doc) {
        await doc.save("Resume");
        if (w < 1330) setVisible(false);
        bar.current.complete();
      },
      autoPaging: "text",
    });
  };

  const handleExperienceChange = (event) => {
    const { name, value } = event.target;
    const id = event.currentTarget.getAttribute("id");
    const newExperience = experience.map((experience) => {
      if (id === experience.id) {
        return {
          ...experience,
          [name]: value,
        };
      } else {
        return experience;
      }
    });
    setExperience(newExperience);
  };

  const handleExperienceAdd = () => {
    setExperience([
      {
        id: uuidv4(),
        designation: "",
        company: "",
        duration: "",
      },
      ...experience,
    ]);
  };

  const handleExperienceDelete = (event) => {
    const id = event.currentTarget.parentNode.parentNode.getAttribute("id");
    setExperience(
      experience.filter((experience) => {
        return experience.id !== id;
      })
    );
  };

  const handleProjectAdd = () => {
    setProjects([
      {
        id: uuidv4(),
        title: "",
        skills: "",
        desc: "",
      },
      ...projects,
    ]);
  };

  const handleProjectChange = (event) => {
    const { name, value } = event.target;
    const id = event.currentTarget.getAttribute("id");
    const newProjects = projects.map((project) => {
      if (id === project.id) {
        return {
          ...project,
          [name]: value,
        };
      } else {
        return project;
      }
    });
    setProjects(newProjects);
  };

  const handleProjectDelete = (event) => {
    const id = event.currentTarget.parentNode.parentNode.getAttribute("id");
    setProjects(
      projects.filter((project) => {
        return project.id !== id;
      })
    );
  };

  const handleEducationAdd = () => {
    setEducation([
      {
        id: uuidv4(),
        degree: "",
        institute: "",
        duration: "",
      },
      ...education,
    ]);
  };

  const handleEducationChange = (event) => {
    const { name, value } = event.target;
    const id = event.currentTarget.getAttribute("id");
    const newEducation = education.map((education) => {
      if (id === education.id) {
        return {
          ...education,
          [name]: value,
        };
      } else {
        return education;
      }
    });
    setEducation(newEducation);
  };

  const handleEducationDelete = (event) => {
    const id = event.currentTarget.parentNode.parentNode.getAttribute("id");
    setEducation(
      education.filter((education) => {
        return education.id !== id;
      })
    );
  };

  function handleCertAdd(event) {
    setCerts([
      ...certifications,
      {
        id: uuidv4(),
        title: "",
      },
    ]);
  }

  function handleCertDelete(event) {
    const id = event.currentTarget.parentNode.parentNode.getAttribute("id");
    setCerts(
      certifications.filter((cert) => {
        return cert.id !== id;
      })
    );
  }

  function handleCertChange(event) {
    const { name, value } = event.target;
    const id = event.currentTarget.getAttribute("id");
    const newCert = certifications.map((cert) => {
      if (id === cert.id) {
        return {
          ...cert,
          [name]: value,
        };
      } else {
        return cert;
      }
    });
    setCerts(newCert);
  }

  const saveResume = () => {
    bar.current.continuousStart();
    const newResume = {
      name: name,
      designation: designation,
      email: email,
      linkedin: linkedin,
      github: github,
      summary: summary,
      skills: skills,
      experience: experience,
      projects: projects,
      education: education,
      certifications: certifications,
    };
    Axios.post("/saveResume", newResume).then(function (response) {
      bar.current.complete();
      console.log(response);
    });
  };

  const logout = () => {
    bar.current.continuousStart();
    Axios.get("/logout").then((res) => {
      setLogin(false);
      bar.current.complete();
    });
  };

  return (
    <div style={{ fontFamily: "Helvetica" }}>
      <LoadingBar color="#f11946" ref={bar} />
      <div className="header">
        <div className="header-content">
          <h1
            className="heading"
            style={{ marginTop: "0px", marginBottom: "0px" }}
          >
            Resume {w < 640 && <br />}Builder
          </h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {isLoggedIn ? (
              w >= 640 ? (
                <>
                  <Button
                    color="success"
                    startDecorator={<SaveIcon />}
                    onClick={saveResume}
                  >
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
                    onClick={logout}
                    color="danger"
                    style={{ marginLeft: "10px" }}
                    startDecorator={<LogoutIcon />}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <IconButton
                    color="success"
                    variant="solid"
                    onClick={saveResume}
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton
                    style={{ marginLeft: "10px" }}
                    variant="solid"
                    onClick={handleGeneratePdf}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    style={{ marginLeft: "10px" }}
                    color="danger"
                    variant="solid"
                    onClick={logout}
                  >
                    <LogoutIcon />
                  </IconButton>
                </>
              )
            ) : (
              <a href="http://localhost:3001/auth/google">
                <Button startDecorator={<GoogleIcon />}>
                  {w >= 640 ? "Login with Google" : "Login"}
                </Button>
              </a>
            )}
          </div>
        </div>
        <Divider />
      </div>
      <div className="body" style={{ alignItems: !isLoggedIn && "center" }}>
        {isLoggedIn ? (
          <Home
            w={w}
            resume={resume}
            visible={resumeVisible}
            name={name}
            designation={designation}
            skills={skills}
            email={email}
            linkedin={linkedin}
            github={github}
            summary={summary}
            experience={experience}
            education={education}
            projects={projects}
            certifications={certifications}
            setName={setName}
            setDesignation={setDesignation}
            setSkills={setSkills}
            setEmail={setEmail}
            setLinkedIn={setLinkedIn}
            setGitHub={setGitHub}
            setSummary={setSummary}
            setExperience={setExperience}
            setEducation={setEducation}
            setProjects={setProjects}
            setCerts={setCerts}
            handleEducationAdd={handleEducationAdd}
            handleEducationChange={handleEducationChange}
            handleEducationDelete={handleEducationDelete}
            handleExperienceAdd={handleExperienceAdd}
            handleExperienceChange={handleExperienceChange}
            handleExperienceDelete={handleExperienceDelete}
            handleProjectAdd={handleProjectAdd}
            handleProjectChange={handleProjectChange}
            handleProjectDelete={handleProjectDelete}
            handleCertAdd={handleCertAdd}
            handleCertChange={handleCertChange}
            handleCertDelete={handleCertDelete}
          />
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

export default App;
