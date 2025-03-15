import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, className }) => {
    return (
        <button
            className={`px-6 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};

Button.defaultProps = {
    className: '',
};

export default Button;
