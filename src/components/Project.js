export default function Project(props){
    return(
        <div>
            <h4>{props.title}</h4>
            <p style={{marginBottom:"5px"}}>{props.tools.replace(/,/g, " • ")}</p>
            <p>{props.desc}</p>
        </div>
    )
}