import React from "react";

// MAKE CHANGES AS PER YOUR NEED
export type UserInfo = Record<string, unknown> | null;

export const AppContext = React.createContext<{
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}>({
  userInfo: null,
  setUserInfo: () => {}
});
