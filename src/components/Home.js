import "./Home.css";
import Input from "@mui/joy/Input";
import Divider from "@mui/joy/Divider";
import Textarea from "@mui/joy/Textarea";
import emailIcon from "../images/email.png";
import githubIcon from "../images/github.png";
import linkedinIcon from "../images/linkedin.png";
import Online from "./Online";
import History from "./History";
import Project from "./Project";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/joy/IconButton";

export default function Home(props) {
  return (
    <>
      <div className="editor" style={{ width: "500px", margin: "25px" }}>
        <h3 style={{ marginTop: "0px" }}>About</h3>
        <br />
        <Input
          placeholder="Name"
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
          name="name"
        />
        <br />
        <Input
          name="designation"
          placeholder="Designation"
          value={props.designation}
          onChange={(e) => props.setDesignation(e.target.value)}
        />
        <br />
        <Input
          name="email"
          placeholder="Email address"
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
        />
        <br />
        <Input
          name="linkedin"
          placeholder="Linkedin profile URL"
          value={props.linkedin}
          onChange={(e) => props.setLinkedIn(e.target.value)}
        />
        <br />
        <Input
          name="github"
          placeholder="GitHub profile URL"
          value={props.github}
          onChange={(e) => props.setGitHub(e.target.value)}
        />
        <br />
        <Textarea
          placeholder="Skill separated by comma without space"
          value={props.skills}
          onChange={(e) => props.setSkills(e.target.value)}
          minRows={3}
          name="skills"
        />
        <br />
        <Textarea
          placeholder="Summary"
          value={props.summary}
          onChange={(e) => props.setSummary(e.target.value)}
          minRows={3}
          name="summary"
        />
        <br />
        <div className="editor-heading">
          <h3 style={{ marginTop: "0px" }}>Certifications</h3>
          <IconButton variant="solid" onClick={props.handleCertAdd}>
            <AddIcon />
          </IconButton>
        </div>
        <br />
        {props.certifications.map((cert, index) => (
          <div key={cert.id} id={cert.id} onChange={props.handleCertChange}>
            <div className="editor-heading">
              <Input
                name="title"
                placeholder={"Certification name"}
                value={cert.title}
                style={{ width: "100%", marginRight: "20px" }}
              />
              <IconButton color="danger" onClick={props.handleCertDelete}>
                <DeleteIcon />
              </IconButton>
            </div>
            <br />
          </div>
        ))}
        <div className="editor-heading">
          <h3 style={{ marginTop: "0px" }}>Experience</h3>
          <IconButton variant="solid" onClick={props.handleExperienceAdd}>
            <AddIcon />
          </IconButton>
        </div>

        <br />
        {props.experience.map((experience, index) => (
          <div
            key={experience.id}
            id={experience.id}
            onChange={props.handleExperienceChange}
          >
            <div className="editor-heading">
              <Input
                name="company"
                placeholder={"Company name"}
                value={experience.company}
                style={{ width: "100%", marginRight: "20px" }}
              />
              <IconButton color="danger" onClick={props.handleExperienceDelete}>
                <DeleteIcon />
              </IconButton>
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
            <br/>
          </div>
        ))}
        <div className="editor-heading">
          <h3 style={{ marginTop: "0px" }}>Projects</h3>
          <IconButton variant="solid" onClick={props.handleProjectAdd}>
            <AddIcon />
          </IconButton>
        </div>
        <br />
        {props.projects.map((project, index) => (
          <div
            key={project.id}
            id={project.id}
            onChange={props.handleProjectChange}
          >
            <div className="editor-heading">
              <Input
                name="title"
                placeholder={"Title"}
                value={project.title}
                style={{ width: "100%", marginRight: "20px" }}
              />
              <IconButton color="danger" onClick={props.handleProjectDelete}>
                <DeleteIcon />
              </IconButton>
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
            <br/>
          </div>
        ))}
        <div className="editor-heading">
          <h3 style={{ marginTop: "0px" }}>Education</h3>
          <IconButton variant="solid" onClick={props.handleEducationAdd}>
            <AddIcon />
          </IconButton>
        </div>
        <br />
        {props.education.map((education, index) => (
          <div
            key={education.id}
            id={education.id}
            onChange={props.handleEducationChange}
          >
            <div className="editor-heading">
              <Input
                name="degree"
                placeholder={"Degree"}
                value={education.degree}
                style={{ width: "100%", marginRight: "20px" }}
              />
              <IconButton color="danger" onClick={props.handleEducationDelete}>
                <DeleteIcon />
              </IconButton>
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
            <br/>
          </div>
        ))}
      </div>
      {props.w >= 1330 && <Divider orientation="vertical" />}
      {(props.w >= 1330 || props.visible) && (
        <div
          className="resume"
          style={{
            fontFamily: "Helvetica",
          }}
          ref={props.resume}
        >
          <div
            style={{
              width: "350px",
              padding: "25px",
              paddingRight: "0px",
            }}
          >
            <h1 style={{ marginBottom: "0px", marginTop: "0px" }}>
              {props.name}
            </h1>
            <h3 style={{ marginTop: "5px", marginBottom: "15px" }}>
              {props.designation}
            </h3>
            <Online img={emailIcon} url={props.email} />
            <Online img={linkedinIcon} url={props.linkedin} />
            <Online img={githubIcon} url={props.github} />
            <h2>Summary</h2>
            <p>{props.summary}</p>
            <h2>Experience</h2>
            {props.experience.map((experience) => (
              <History
                key={experience.id}
                title={experience.designation}
                place={experience.company}
                duration={experience.duration}
              />
            ))}
            <h2>Education</h2>
            {props.education.map((education) => (
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
            <p>{props.skills.replace(/,/g, " • ")}</p>
            <h2>Certifications</h2>
            <ul>
              {props.certifications.map((cert) => (
                <li key={cert.id}>{cert.title}</li>
              ))}
            </ul>
            <h2>Projects</h2>
            {props.projects.map((project) => (
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
    </>
  );
}
