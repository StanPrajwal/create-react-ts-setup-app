import { useState } from "react";
import "./App.css";
import { AppContext, UserInfo } from "./context/AppContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo>(null);
  return (
    <div className="App">
      <AppContext.Provider
        value={{
          userInfo,
          setUserInfo,
        }}
      >
        <AppRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
