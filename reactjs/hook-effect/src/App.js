import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [piadas, setPiadas] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://official-joke-api.appspot.com/jokes/programming/ten"
      );
      setPiadas(res.data);
    })();
  }, []);

  return (
    <div className="App">
      <ul>
        {piadas.map((piada, index) => {
          return (
            <li key={index}>
              {piada.setup} {piada.punchline}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
