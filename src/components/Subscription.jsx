import React, { useState } from "react";
import Loadingmask from './Loadingmask';

const Subscription = (props) => {
  
  const [valid, setValid] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [result, setResult] = useState(false);
  const [ShowSubscription, setShowSubscription] = useState(true);
  
  function validation(e) {
    setEmailValue(e.target.value)
    if (e.target.value.includes(".") && e.target.value.includes("@")) {
        setValid(true)
    } else {
      setValid(false)
    }
  }
  
  function submitted(e) {
    e.preventDefault()
    
    setShowForm(false);

    fetch("api/hotels/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        hotel: props.hotel.name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setResult("Subscribed");
        } else {
          setResult("Already subscribed");
        }
      })
      .finally(() => {
        setTimeout(() => {
          props.setSubs(true);
        }, 5000);
      });
  }
  
  const form = <form onSubmit={submitted}>
      <input type="email" id="email" name="email" onInput={validation}/>
      { valid ? <button>Subscribe</button> :
      <button disabled>Subscribe</button>}
    </form>;
  
  return (
    <div>
    {result ? <h2>{result}</h2> : 
    <div>
      <br />
      {showForm ? form :<Loadingmask/> }
    </div>
    }
  </div>
)};

export default Subscription;
