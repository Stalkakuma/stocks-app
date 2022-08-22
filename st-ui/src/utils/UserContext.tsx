import { createContext, FC, useState, ReactNode } from "react";
import { UserDateContextValues } from "../types/types";

export const MainContext = createContext<UserDateContextValues | null>(null);

type ChildrenProps = {
  children: ReactNode;
};

const UserContextProvider: FC<ChildrenProps> = ({ children }) => {
  const [startValue, setStartValue] = useState<number | null>(null);
  const [endValue, setEndValue] = useState<number | null>(null);

  return (
    <MainContext.Provider
      value={{ startValue, setStartValue, endValue, setEndValue }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default UserContextProvider;
