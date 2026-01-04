import React from "react";
import * as icons from "lucide-react";

const DynamicIcon = ({ name, ...props }) => {
  // Ikon default jika nama ikon tidak ditemukan
  const fallbackIcon = "FileQuestion";
  const IconComponent = icons[name] || icons[fallbackIcon];

  if (!IconComponent) {
    return null; // Atau fallback UI lainnya jika diperlukan
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;
