import React from "react";

const IconButton = ({ icon: Icon, badge }) => {
  return (
    <button className="icon_button">
      <div className="icon-circle">
        <Icon size={20} />
      </div>

      {badge !== undefined && (
        <span className="icon-button_badge">{badge}</span>
      )}
    </button>
  );
};

export default IconButton;