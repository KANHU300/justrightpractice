import React from "react";
import PropTypes from "prop-types";

const Text2Title = ({ text, className }) => {
  return (
    <h1 className={`text-title2 ${className}`}>
      {text}
    </h1>
  );
};

Text2Title.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Text2Title;
