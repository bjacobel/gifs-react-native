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

let expandedStyle;

class Gif extends Component {
  constructor() {
    super();

    this.toggleOpen = () => {
      if (!this.state.expanded) {
        this.setState({ expanded: true });
      } else {
        this.setState({ expanded: false });
      }
    };
  }

  componentWillMount() {
    this.setState({ expanded: false });
    Image.getSize('https://placeholdit.imgix.net/~text?txtsize=50&txt=750%C3%97400&w=750&h=400', (width, height) => {
      expandedStyle = StyleSheet.create({ height });
    });
  }

  render() {
    const { gif } = this.props;
    const { expanded } = this.state;

    const imageURL = 'https://placeholdit.imgix.net/~text?txtsize=50&txt=750%C3%97200&w=750&h=400'; // `${rootURL}${gif.src}`

    return (
      <TouchableHighlight onPress={ this.toggleOpen }>
        <Image
          source={ { uri: imageURL } }
          style={ expanded ? expandedStyle : styles.gif }
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
