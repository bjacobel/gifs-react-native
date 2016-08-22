import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {
  gifURL,
  thumbURL,
  DEFAULT_CONTAINER_HEIGHT,
  EXPANDED_CONTAINER_HEIGHT,
} from '../constants';
import { setGifActive } from '../actions/gifs';

const mapStateToProps = (state) => {
  return {
    currentlyExpanded: state.currentlyExpanded,
  };
};

const mapDispatchToProps = {
  setGifActive,
};

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
  constructor() {
    super();
    this.getImage = this.getImage.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.setHeight = this.setHeight.bind(this);
  }

  toggleExpanded() {
    const {
      setGifActive,  // eslint-disable-line no-shadow
      currentlyExpanded,
      gif,
    } = this.props;

    LayoutAnimation.easeInEaseOut();

    if (gif.id !== currentlyExpanded.id) {
      setGifActive(gif.id);
    } else {
      setGifActive(null);
    }
  }

  getHeight() {
    const { gif, currentlyExpanded } = this.props;
    if (currentlyExpanded.id === gif.id) {
      return this.state.height;
    } else {
      return DEFAULT_CONTAINER_HEIGHT;
    }
  }

  setHeight() {
    const { gif } = this.props;
    Image.getSize(`${thumbURL}${gif.src}`, (width, height) => {
      this.setState({
        height: height / (width / Dimensions.get('window').width),
      });
    });
  }

  getImage() {
    const { gif, currentlyExpanded } = this.props;
    if (currentlyExpanded.id === gif.id) {
      return `${gifURL}${gif.src}`;
    } else {
      return `${thumbURL}${gif.src}`;
    }
  }

  shouldComponentUpdate(nextProps) {
    const { gif, currentlyExpanded } = this.props;
    if (nextProps.currentlyExpanded.id !== currentlyExpanded.id) {
      if (nextProps.currentlyExpanded.id === gif.id) {
        return true;  // this gif has become the expanded gif
      } else if (currentlyExpanded.id === gif.id) {
        return true;  // this gif was the expanded gif, but it isn't anymore
      }
    }

    return false;
  }

  render() {
    const { gif } = this.props;

    return (
      <TouchableWithoutFeedback onPress={ () => this.toggleExpanded() }>
        <Image
          onLoad={ this.setHeight }
          source={ { uri: this.getImage() } }
          style={ { height: this.getHeight() } }
          resizeMode="cover"
        >
          <View style={ styles.textBackdrop }>
            <Text style={ styles.overlay }>{ gif.src }</Text>
          </View>
        </Image>
      </TouchableWithoutFeedback>
    );
  }
}

Gif.propTypes = {
  gif: PropTypes.shape({
    src: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gif);
