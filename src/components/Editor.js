import "./Editor.css";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/joy/IconButton";
import ButtonGroup from "@mui/joy/ButtonGroup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Switch from "@mui/joy/Switch";

export default function Editor(props) {
  return (
    <div className="editor" style={{ width: "640px", margin: "25px" }}>
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
      <div style={{display:"flex"}}>
      <Input
        name="github"
        placeholder="GitHub profile URL"
        value={props.github}
        style={{width:"100%"}}
        onChange={(e) => props.setGitHub(e.target.value)}
      />
      <Switch
        checked={props.showGithub}
        onChange={(event) => props.setShowGithub(event.target.checked)}
        style={{ marginLeft: "20px" }}
      />
      </div>
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
        <div>
          <Switch
            checked={props.showCert}
            onChange={(event) => props.setShowCert(event.target.checked)}
            style={{ marginRight: "20px" }}
          />
          <IconButton variant="solid" onClick={props.handleCertAdd}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <br />
      {props.certifications.map((cert, index) => (
        <div key={cert.id} id={cert.id} onChange={props.handleCertChange}>
          <div className="editor-sub-heading">
            <Input
              className="editor-sub-heading-input"
              name="title"
              placeholder={"Certification name"}
              value={cert.title}
              style={{ width: "100%" }}
            />
            <ButtonGroup aria-label="outlined primary button group">
              <IconButton color="primary" onClick={props.handleMoveCertUp}>
                <KeyboardArrowUpIcon />
              </IconButton>
              <IconButton color="primary" onClick={props.handleMoveCertDown}>
                <KeyboardArrowDownIcon />
              </IconButton>
              <IconButton color="danger" onClick={props.handleCertDelete}>
                <DeleteIcon />
              </IconButton>
            </ButtonGroup>
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
            <IconButton
              color="danger"
              variant="outlined"
              onClick={props.handleExperienceDelete}
            >
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
          <br />
        </div>
      ))}
      <div className="editor-heading">
        <h3 style={{ marginTop: "0px" }}>Projects</h3>
        <div>
          <Switch
            checked={props.showProjects}
            onChange={(event) => props.setShowProjects(event.target.checked)}
            style={{ marginRight: "20px" }}
          />
          <IconButton variant="solid" onClick={props.handleProjectAdd}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <br />
      {props.projects.map((project, index) => (
        <div
          key={project.id}
          id={project.id}
          onChange={props.handleProjectChange}
        >
          <div className="editor-sub-heading">
            <Input
              className="editor-sub-heading-input"
              name="title"
              placeholder={"Title"}
              value={project.title}
              style={{ width: "100%" }}
            />
            <ButtonGroup aria-label="outlined primary button group">
              <IconButton color="primary" onClick={props.handleMoveProjectUp}>
                <KeyboardArrowUpIcon />
              </IconButton>
              <IconButton color="primary" onClick={props.handleMoveProjectDown}>
                <KeyboardArrowDownIcon />
              </IconButton>
              <IconButton
                color="danger"
                variant="outlined"
                onClick={props.handleProjectDelete}
              >
                <DeleteIcon />
              </IconButton>
            </ButtonGroup>
          </div>
          <br />
          <Input name="skills" placeholder={"Skills"} value={project.skills} />
          <br />
          <Input name="desc" placeholder={"Description"} value={project.desc} />
          <br />
          <br />
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
            <IconButton
              color="danger"
              variant="outlined"
              onClick={props.handleEducationDelete}
            >
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
          <br />
        </div>
      ))}
    </div>
  );
}
