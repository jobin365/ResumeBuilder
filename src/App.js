import "./App.css";
import Input from "@mui/joy/Input";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
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
    const { name,value} = event.target;
    const id=event.target.parentNode.parentNode.getAttribute("id")
    const newExperience = experience.map((experience) => {
    console.log(id)
      if (id === experience.id) {
        return {
          ...experience,
          [name]: value
        };
      } else {
        return experience;
      }
    });
    setExperience(newExperience)
  };

  

  return (
    <div style={{ fontFamily: "Helvetica" }}>
      <div className="header">
        <div className="header-content">
          <div>
            <h1 className="heading" style={{ marginTop: "0px" }}>
              Resume Builder
            </h1>
          </div>
          <div>
            <Button onClick={handleGeneratePdf}>Download</Button>
          </div>
        </div>
        <div>
          <Divider className="top-divider" />
        </div>
      </div>
      <div className="body">
        <div className="editor" style={{ width: "500px", margin: "25px" }}>
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
          {experience.map((experience,index) => (
            <div key={experience.id} id={experience.id}>
              <Input
                name="company"
                placeholder={"Company name "+(index+1)}
                value={experience.company}
                onChange={handleExperienceChange}
              /><br/>
              <Input
                name="designation"
                placeholder={"Designation"+(index+1)}
                value={experience.designation}
                onChange={handleExperienceChange}
              /><br/>
              <Input
                name="duration"
                placeholder={"Duration"+(index+1)}
                value={experience.duration}
                onChange={handleExperienceChange}
              /><br/>
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
