import "./History.css"

export default function History(props){
    return(
        <div>
            <h4>{props.place}</h4>
            <p style={{marginBottom:"0px"}}>{props.title}</p>
            <p>{props.duration}</p>
        </div>
    )
}
