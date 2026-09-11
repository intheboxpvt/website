import React from "react";
import NotFound from "./NotFound";
import Viewer3D from "@/components/configurator/Viewer3D";

export const ConfiguratorDev = () => {
  // Gate the page: Only accessible in development mode
  const isDev = import.meta.env.DEV;

  if (!isDev) {
    return <NotFound />;
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#050505]">
      <Viewer3D />
    </div>
  );
};

export default ConfiguratorDev;
