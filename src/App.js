import './App.css'
import { useState, useEffect } from 'react';
import Loadingmask from './components/Loadingmask';
import Hotels from './components/Hotels';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("./api/hotels")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setHotels(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  console.log(hotels);

  return (
    <div className="App">
      <h1>Hotels</h1>
      {!isLoaded && <Loadingmask />}
      {!error ? hotels.map((hotel, index) => (<Hotels key={index} hotel={hotel}/>)) : 
      <h3>Oops, something happened.</h3>}
    </div>
  )
}

export default App
