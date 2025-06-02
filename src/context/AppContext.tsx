import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DeviceInfo {
  id: string;
  name: string;
  isBound: boolean;
}

interface UserInfo {
  isParent: boolean;
  name: string;
  email: string;
  hasVerifiedEmail: boolean;
  children: {
    name: string;
    age: number;
  }[];
}

interface AppContextType {
  device: DeviceInfo;
  user: UserInfo | null;
  currentStep: number;
  isFromApp: boolean;
  setCurrentStep: (step: number) => void;
  setUser: (user: UserInfo | null) => void;
  setIsFromApp: (isFromApp: boolean) => void;
  bindDevice: (childName: string) => void;
}

const defaultDevice: DeviceInfo = {
  id: 'DV-2024-0001',
  name: 'MLMDS',
  isBound: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [device, setDevice] = useState<DeviceInfo>(defaultDevice);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isFromApp, setIsFromApp] = useState(false);

  const bindDevice = (childName: string) => {
    setDevice({ ...device, isBound: true });
  };

  return (
    <AppContext.Provider
      value={{
        device,
        user,
        currentStep,
        isFromApp,
        setCurrentStep,
        setUser,
        setIsFromApp,
        bindDevice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};