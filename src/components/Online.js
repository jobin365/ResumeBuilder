import './Online.css'

function Online(props) {
  return (
    <div className='links'>
      <img
        src={props.img}
        alt='GitHub'
        width="20px"
        style={{  paddingRight: "7px" }}
      />
      <span>{props.url}</span>
    </div>
  );
}

export default Online;
