import React from "react";
import PropTypes from "prop-types";

const TextTitle = ({ text, className }) => {
  return (
    <h1 className={`text-title ${className}`}>
      {text}
    </h1>
  );
};

TextTitle.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default TextTitle;
