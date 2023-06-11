import "./App.css";
import Input from "@mui/joy/Input";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Divider from "@mui/joy/Divider";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import jsPDF from "jspdf";
import emailIcon from "./images/email.png";
import githubIcon from "./images/github.png";
import linkedinIcon from "./images/linkedin.png";
import Online from "./components/Online";
import History from "./components/History";
import Project from "./components/Project";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function App() {
  const [name, setName] = useState("Jobin John K");
  const [designation, setDesignation] = useState("Campaign Builder");
  const [skills, setSkills] = useState("SFMC,AMPScript,HTML,CSS,Python,AWS");
  const [email, setEmail] = useState("jobinjohnk5@gmail.com");
  const [summary, setSummary] = useState(
    "I have 1 year of experience working as part of Email Operations team building testing and deploying email marketing campaigns using SFMC's Email Studio, Automation Studio and Journey Builder. I am also using Python to automate some of the repetitive tasks. Currently learning AWS."
  );
  const [linkedin, setLinkedIn] = useState(
    "linkedin.com/in/jobin-john-k-b8141b1ba"
  );

  const [github, setGitHub] = useState("github.com/jobin365");
  const [experience, setExperience] = useState([
    {
      id: uuidv4(),
      designation: "Senior Analyst",
      company: "eClerx",
      duration: "June 2023 - Present",
    },
    {
      id: uuidv4(),
      designation: "Intern",
      company: "eClerx",
      duration: "June 2022 - June 2023",
    },
  ]);
  const [projects, setProjects] = useState([
    {
      id: uuidv4(),
      title: "Resume Builder",
      skills: "React",
      desc: "Resume Builder is a web application that allows you to create, edit and download a resume.",
    },
    {
      id: uuidv4(),
      title: "MyTasks",
      skills: "React,Node,MongoDB",
      desc: "MyTasks is a web application that allows you to create, edit, delete and maintain multiple lists of tasks.",
    },
    {
      id: uuidv4(),
      title: "Keeper",
      skills: "React,Node,MongoDB",
      desc: "Keeper is a web application that allows you to create, edit, delete and maintain notes.",
    },
  ]);

  const [education, setEducation] = useState([
    {
      id: uuidv4(),
      degree: "Master of Computer Applications",
      institute: "Lovely Professional University",
      duration: "June 2021 - May 2023",
    },
    {
      id: uuidv4(),
      degree: "Bachelor of Science in Computer Science",
      institute: "University of Calicut",
      duration: "June 2018 - May 2021",
    },
  ]);

  const resume = useRef();

  var w = window.innerWidth;

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
          <div>
            <Button onClick={handleGeneratePdf}>Download</Button>
          </div>
        </div>
        <div>
          <Divider />
        </div>
      </div>
      <div className="body">
        <div className="editor" style={{ width: "500px", margin: "25px" }}>
          <h3 style={{ marginTop: "0px" }}>About</h3>
          <br />
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
          <br />
          <Input
            name="designation"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          <br />
          <Input
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <Input
            name="linkedin"
            placeholder="Linkedin profile URL"
            value={linkedin}
            onChange={(e) => setLinkedIn(e.target.value)}
          />
          <br />
          <Input
            name="github"
            placeholder="GitHub profile URL"
            value={github}
            onChange={(e) => setLinkedIn(e.target.value)}
          />
          <br />
          <Textarea
            placeholder="Skill separated by comma without space"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            minRows={3}
            name="skills"
          />
          <br />
          <Textarea
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            minRows={3}
            name="summary"
          />
          <br />
          <div className="editor-heading">
            <h3 style={{ marginTop: "0px" }}>Experience</h3>
            <Button onClick={handleExperienceAdd}>
              <AddIcon />
            </Button>
          </div>

          <br />
          {experience.map((experience, index) => (
            <div
              key={experience.id}
              id={experience.id}
              onChange={handleExperienceChange}
            >
              <div className="editor-heading">
                <Input
                  name="company"
                  placeholder={"Company name " + (index + 1)}
                  value={experience.company}
                  style={{width:"100%",marginRight:"20px"}}
                />
                <Button color="danger" onClick={handleExperienceDelete}>
                  <DeleteIcon />
                </Button>
              </div>
              <br />
              <Input
                name="designation"
                placeholder={"Designation"}
                value={experience.designation}
              />
              <br />
              <Input
                name="duration"
                placeholder={"Duration"}
                value={experience.duration}
              />
              <br />
            </div>
          ))}
          <div className="editor-heading">
            <h3 style={{ marginTop: "0px" }}>Projects</h3>
            <Button onClick={handleProjectAdd}>
              <AddIcon />
            </Button>
          </div>
          <br />
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={project.id}
              onChange={handleProjectChange}
            >
              <div className="editor-heading">
                <Input
                  name="title"
                  placeholder={"Title " + (index + 1)}
                  value={project.title}
                  style={{width:"100%",marginRight:"20px"}}
                />
                <Button color="danger" onClick={handleProjectDelete}>
                  <DeleteIcon />
                </Button>
              </div>
              <br />
              <Input
                name="skills"
                placeholder={"Skills"}
                value={project.skills}
              />
              <br />
              <Input
                name="desc"
                placeholder={"Description"}
                value={project.desc}
              />
              <br />
            </div>
          ))}
          <div className="editor-heading">
            <h3 style={{ marginTop: "0px" }}>Education</h3>
            <Button onClick={handleEducationAdd}>
              <AddIcon />
            </Button>
          </div>
          <br />
          {education.map((education, index) => (
            <div
              key={education.id}
              id={education.id}
              onChange={handleEducationChange}
            >
              <div className="editor-heading">
                <Input
                  name="degree"
                  placeholder={"Degree " + (index + 1)}
                  value={education.degree}
                  style={{width:"100%",marginRight:"20px"}}
                />
                <Button color="danger" onClick={handleEducationDelete}>
                  <DeleteIcon />
                </Button>
              </div>
              <br />
              <Input
                name="institute"
                placeholder={"Institute"}
                value={education.institute}
              />
              <br />
              <Input
                name="duration"
                placeholder={"Duration"}
                value={education.duration}
              />
              <br />
            </div>
          ))}
        </div>
        {w >= 1330 && <Divider orientation="vertical" />}
        {w >= 1330 && (
          <div
            className="resume"
            style={{
              fontFamily: "Helvetica",
            }}
            ref={resume}
          >
            <div
              style={{
                width: "350px",
                padding: "25px",
                paddingRight: "0px",
              }}
            >
              <h1 style={{ marginBottom: "0px", marginTop: "0px" }}>{name}</h1>
              <h3 style={{ marginTop: "5px", marginBottom: "15px" }}>
                {designation}
              </h3>
              <Online img={emailIcon} url={email} />
              <Online img={linkedinIcon} url={linkedin} />
              <Online img={githubIcon} url={github} />
              <h2>Summary</h2>
              <p>{summary}</p>
              <h2>Experience</h2>
              {experience.map((experience) => (
                <History
                  key={experience.id}
                  title={experience.designation}
                  place={experience.company}
                  duration={experience.duration}
                />
              ))}
              <h2>Education</h2>
              {education.map((education) => (
                <History
                  key={education.id}
                  title={education.degree}
                  place={education.institute}
                  duration={education.duration}
                />
              ))}
            </div>
            <div
              style={{
                width: "350px",
                padding: "25px",
              }}
            >
              <h2 style={{ marginTop: "0px" }}>Skills</h2>
              <p>{skills.replace(/,/g, " • ")}</p>
              <h2>Projects</h2>
              {projects.map((project) => (
                <Project
                  key={project.id}
                  title={project.title}
                  tools={project.skills}
                  desc={project.desc}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
