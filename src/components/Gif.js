import React, { Component, PropTypes } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';

import { rootURL } from '../constants';

const styles = StyleSheet.create({
  gif: {
    height: 100
  },
  overlay: {
    fontSize: 25,
    fontFamily: 'AppleSDGothicNeo-Bold',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 7,
    padding: 7,
    position: 'absolute'
  },
  textBackdrop: {
    backgroundColor: 'rgba(0,0,0,0)'
  }
});

class Gif extends Component {
  slideOpen() {
    if (styles.gif.height) {
      styles.gif.height = 300;
    } else {
      styles.gif.height = 100;
    }
  }

  render() {
    const { gif } = this.props;

    //${rootURL}${gif.src}

    return (
      <TouchableHighlight onPress={ this.slideOpen }>
        <Image
          source={ { uri: 'https://placeholdit.imgix.net/~text?txtsize=50&txt=750%C3%97200&w=750&h=400' } }
          style={ styles.gif }
        >
          <View style={ styles.textBackdrop }>
            <Text style={ styles.overlay }>{ gif.src }</Text>
          </View>
        </Image>
      </TouchableHighlight>
    );
  }
}

Gif.propTypes = {
  gif: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired
};

export default Gif;
