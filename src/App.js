import "./App.css";
import { useEffect, useRef, useState } from "react";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import Editor from "./components/Editor";
import HomePage from "./components/HomePage";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/joy/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import LoadingBar from "react-top-loading-bar";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Chip from "@mui/joy/Chip";
import emailIcon from "./images/email.png";
import githubIcon from "./images/github.png";
import linkedinIcon from "./images/linkedin.png";
import CircularProgress from "@mui/joy/CircularProgress";

import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Font,
} from "@react-pdf/renderer";

function App() {
  const [username, setUserName] = useState("");
  const resume = useRef();
  const bar = useRef(null);
  const [isLoggedIn, setLogin] = useState(false);
  const [w, setW] = useState(window.innerWidth);
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

  const prod = false;

  Axios.defaults.baseURL = prod
    ? "https://resume-builder-sl0y.onrender.com"
    : "http://localhost:3001";
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("/loginStatus").then(function (response) {
      const loginStatus = response.data.status;
      setLogin(loginStatus);
      if (loginStatus) {
        setUserName(response.data.username);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("/getResume").then(function (response) {
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
    });
  };

  const logout = () => {
    bar.current.continuousStart();
    Axios.get("/logout").then((res) => {
      setLogin(false);
      bar.current.complete();
    });
  };

  Font.register({
    family: "Open Sans",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
      },
      {
        src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
        fontWeight: 600,
      },
    ],
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      fontFamily: "Open Sans",
    },
    section: {
      flexGrow: 1,
      margin: 10,
      padding: 10,
    },
    bigHeading: {
      fontSize: 25,
      fontWeight: 600,
    },
    belowHeading: {
      fontSize: 13,
    },
    subHeading: {
      fontSize: 18,
      marginTop: 10,
      fontWeight: 600,
    },
    paragraph: {
      fontSize: 11,
      marginTop: 2,
      textAlign: "justify",
    },
    textwithicon: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    },
    title: {
      fontSize: 13,
      fontWeight: 600,
    },
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.section, { width: "50%", paddingRight: 0 }]}>
          <Text style={styles.bigHeading}>{name}</Text>
          <Text style={styles.belowHeading}>{designation}</Text>

          <View style={[styles.textwithicon, { marginTop: 10 }]}>
            <Image
              src={emailIcon}
              style={{ width: 15, marginRight: 5 }}
            ></Image>
            <Text style={[styles.paragraph]}>{email}</Text>
          </View>

          <View style={[styles.textwithicon, { marginTop: 2 }]}>
            <Image
              src={linkedinIcon}
              style={{ width: 15, marginRight: 5 }}
            ></Image>
            <Text style={[styles.paragraph]}>{linkedin}</Text>
          </View>

          <View style={[styles.textwithicon, { marginTop: 2 }]}>
            <Image
              src={githubIcon}
              style={{ width: 15, marginRight: 5 }}
            ></Image>
            <Text style={[styles.paragraph]}>{github}</Text>
          </View>

          <Text style={[styles.subHeading]}>Summary</Text>
          <Text style={[styles.paragraph, {}]}>{summary}</Text>

          <Text style={[styles.subHeading]}>Experience</Text>
          {experience.map((experience, i) => (
            <View key={experience.id}>
              <Text style={[styles.title, { marginTop: i === 0 ? 0 : 7 }]}>
                {experience.designation}
              </Text>
              <Text style={[styles.paragraph]}>{experience.company}</Text>
              <Text style={[styles.paragraph]}>{experience.duration}</Text>
            </View>
          ))}

          <Text style={[styles.subHeading]}>Education</Text>
          {education.map((education, i) => (
            <View key={education.id}>
              <Text style={[styles.title, { marginTop: i === 0 ? 0 : 7 }]}>
                {education.degree}
              </Text>
              <Text style={[styles.paragraph]}>{education.institute}</Text>
              <Text style={[styles.paragraph]}>{education.duration}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { width: "50%", paddingLeft: 0 }]}>
          <Text style={[styles.subHeading, { marginTop: 0 }]}>Skills</Text>
          <Text style={[styles.paragraph]}>{skills.replace(/,/g, " • ")}</Text>
          <Text style={[styles.subHeading]}>Certifications</Text>
          {certifications.map((cert, i) => (
            <Text key={cert.id} style={[styles.paragraph]}>
              {"\u2022 " + cert.title}
            </Text>
          ))}
          <Text style={[styles.subHeading]}>Projects</Text>
          {projects.map((project, i) => (
            <View key={project.id}>
              <Text style={[styles.title, { marginTop: i === 0 ? 0 : 7 }]}>
                {project.title}
              </Text>
              <Text style={[styles.paragraph]}>
                {project.skills.replace(/,/g, " • ")}
              </Text>
              <Text style={[styles.paragraph]}>{project.desc}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const generatePdfDocument = async () => {
    bar.current.continuousStart();
    const blob = await pdf(<MyDocument />).toBlob();
    bar.current.complete();
    saveAs(blob, "Resume");
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
            Resume Builder
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: w <= 580 ? "column-reverse" : "row",
            }}
          >
            {isLoggedIn ? (
              w >= 750 ? (
                <>
                  <div>
                    <Chip color="info">{username}</Chip>
                  </div>
                  <Button
                    color="success"
                    startDecorator={<SaveIcon />}
                    onClick={saveResume}
                    style={{ marginLeft: "10px" }}
                  >
                    Save
                  </Button>
                  <Button
                    startDecorator={<DownloadIcon />}
                    style={{ marginLeft: "10px" }}
                    onClick={generatePdfDocument}
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
                  <div style={{ marginTop: w <= 580 ? "5px" : "0px" }}>
                    <Chip color="info">{username}</Chip>
                  </div>
                  <div>
                    <IconButton
                      color="success"
                      variant="solid"
                      onClick={saveResume}
                      style={{ marginLeft: w <= 580 ? "0px" : "10px" }}
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton style={{ marginLeft: "10px" }} variant="solid" onClick={generatePdfDocument}>
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
                  </div>
                </>
              )
            ) : (
              <a
                href={
                  prod
                    ? "https://resume-builder-sl0y.onrender.com/auth/google"
                    : "http://localhost:3001/auth/google"
                }
              >
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
          <Editor
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
          <HomePage />
        )}
      </div>
    </div>
  );
}

export default App;
