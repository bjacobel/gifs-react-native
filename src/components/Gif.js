import React, { Component, PropTypes } from 'react';
import {
  Image,
  LayoutAnimation,
  Text,
  StyleSheet,
  TouchableHighlight,
  View
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
    position: 'absolute'
  },
  textBackdrop: {
    backgroundColor: 'rgba(0,0,0,0)'
  }
});

class Gif extends Component {
  constructor() {
    super();
    this.state = { slideContainerHeight: 100 };
  }

  toggleOpen() {
    LayoutAnimation.easeInEaseOut();
    const newHeight = this.state.slideContainerHeight === 100 ? 400 : 100;
    this.setState({ slideContainerHeight: newHeight });
  }

  render() {
    const { gif } = this.props;
    const imageURL = placeholder; // `${rootURL}${gif.src}`

    return (
      <TouchableHighlight onPress={ () => this.toggleOpen() }>
        <Image
          source={ { uri: imageURL } }
          style={ { height: this.state.slideContainerHeight } }
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
