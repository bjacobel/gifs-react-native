import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { rootURL } from '../constants';

const placeholder = 'https://placeholdit.imgix.net/~text?txtsize=50&txt=750%C3%97200&w=750&h=400';

const styles = StyleSheet.create({
  overlay: {
    fontSize: 25,
    fontFamily: 'AppleSDGothicNeo-Bold',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 7,
    padding: 7,
    position: 'absolute',
  },
  textBackdrop: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

class Gif extends Component {
  render() {
    const { gif, toggleFn } = this.props;
    const imageURL = placeholder; // `${rootURL}${gif.src}`

    return (
      <TouchableHighlight onPress={ () => toggleFn(gif.id) }>
        <Image
          source={ { uri: imageURL } }
          style={ { height: gif.expanded ? 400 : 100 } }
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
    src: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
  }).isRequired,
  toggleFn: PropTypes.func.isRequired,
};

export default Gif;
