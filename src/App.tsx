import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Login/Login";
import { useState } from "react";
import { Register } from "./Components/Register/Register";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isRegister, setIsRegister] = useState(true);

  return (
    <>
      {isRegister ? (
        isLogged ? (
          <Home />
        ) : (
          <Login setIsLogged={setIsLogged} setIsRegister={setIsRegister} />
        )
      ) : (
        <Register />
      )}
    </>
  );
}

export default App;
