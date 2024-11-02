import React from "react";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";

export const SimpleCollapse: React.FC<{ initialOpen?: boolean, children: React.ReactNode, title: string }> = ({
                                                                                                                initialOpen,
                                                                                                                title,
                                                                                                                children
                                                                                                              }) => {
  const [checked, setChecked] = React.useState(Boolean(initialOpen));

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div>
      <FormControlLabel
        className="mb-3"
        control={<Switch checked={checked} onChange={handleChange} />}
        label={title}
      />
      <Collapse in={checked} collapsedSize={0}>
        {children}
      </Collapse>
    </div>
  );
};