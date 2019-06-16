import React from 'React';
import PorpTypes from 'prop-types';

function Question(props) {
  return (
    <h2 className="question">{props.content}</h2>
  );
}

Question.propTypes = {
  content: PropTypes.string.isRequired
};

export default Question;
