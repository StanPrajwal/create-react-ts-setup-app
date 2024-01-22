import React from "react";

//MAKE CHANGES AS PER YOUR NEED

export const AppContext = React.createContext<{
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  userInfo: any;
}>({
  userInfo: {},
  setUserInfo: () => {}
});
