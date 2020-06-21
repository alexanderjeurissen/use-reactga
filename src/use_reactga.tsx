import * as React from 'react';
import { useState, useContext, useEffect, createContext, Node } from "react";
import * as OurReactGA from "react-ga";
import { GaOptions } from "react-ga";

type ObjType = {[key: string]: any};

export const ReactGAContext = createContext({});

export const useReactGA = () => useContext(ReactGAContext);

interface ProviderProps {
  configOrTrackingId: ObjType | string,
  options?: GaOptions,
  children: Node
}
export const ReactGAProvider:React.FC<ProviderProps> = ({ configOrTrackingId, options, ReactGA = OurReactGA, children }) => {
  useEffect(() => {
    ReactGA.initialize(configOrTrackingId, options);
  }, []);

  return (
  <ReactGAContext.Provider value={ReactGA}>
    {children}
  </ReactGAContext.Provider>
  )
};

type ComponentOrFunction = React.FC | (() => Node);

export const withReactGAContext = (ComponentOrFunction: ComponentOrFunction, configOrTrackingId: ObjType | string, options?: GaOptions, ReactGA: any = OurReactGA) => (
  <ReactGAProvider configOrTrackingId={configOrTrackingId} options={options} ReactGA={ReactGA}>
    { typeof ComponentOrFunction === React.FC ? <ComponentOrFunction /> : ComponentOrFunction()}
  </ReactGAProvider>
);
