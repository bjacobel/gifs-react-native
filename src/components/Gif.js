import React, { Component, PropTypes } from 'react';
import {
  Text
} from 'react-native';

class Gif extends Component {
  render() {
    const { gif } = this.props;
    return (
      <Text>{ gif.src }</Text>
    );
  }
}

Gif.propTypes = {
  gif: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired
};

export default Gif;
