import useWindowStore from "#store/window";
import React from "react";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, toggleMaximizeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <div
        className="close"
        title="Close"
        role="button"
        aria-label="Close window"
        onClick={(e) => { e.stopPropagation(); closeWindow(target); }}
      />
      <div
        className="minimize"
        title="Minimize"
        role="button"
        aria-label="Minimize window"
        onClick={(e) => { e.stopPropagation(); minimizeWindow(target); }}
      />
      <div
        className="maximize"
        title="Zoom"
        role="button"
        aria-label="Zoom window"
        onClick={(e) => { e.stopPropagation(); toggleMaximizeWindow(target); }}
      />
    </div>
  );
};

export default WindowControls;
