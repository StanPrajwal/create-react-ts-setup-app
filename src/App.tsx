import { useState } from "react";
import "./App.css";
import { AppContext } from "./context/AppContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <div className="App">
      <AppContext.Provider
        value={{
          userInfo,
          setUserInfo
        }}
      >
        <AppRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
