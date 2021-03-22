import React, {useState} from 'react'
import Subscription from './Subscription';

function Hotels(props) {
  const[details, setDetails] = useState(false);
  const[moreinfo, setMoreinfo] = useState(false);
  const[subs, setSubs] = useState(false);

  function stars (stars) {
    let star = '';
    for (let i = 0; i < stars ;i++) {
      star += "*";
    }
    return <span>{star}</span>
  }

  function Details () {
    return (
      <div>
        <p>City: {props.hotel.city}</p>
        <p>Quality: {stars(props.hotel.stars)}</p>
        <button onClick = {() => setMoreinfo(!moreinfo)}>Request more info about {props.hotel.name}</button>
        {moreinfo && <Subscription hotel={props.hotel} setSubs={setSubs} />}
      </div>
    )
  }

  return (
    <div className = "hotel">
      <p>{props.hotel.name}</p>
      <button onClick = {() => setDetails(!details)} >{!details ? "Show More!" : "Show Less!"}</button>
      {details && !subs && <Details />}

    </div>
  )
}

export default Hotels;
