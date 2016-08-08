import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { rootURL } from '../constants';
import { setGifActive } from '../actions/gifs';

const mapStateToProps = (state) => {
  return {
    currentlyExpanded: state.currentlyExpanded,
  };
};

const mapDispatchToProps = {
  setGifActive,
};

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
  toggleExpanded() {
    const {
      setGifActive,  // eslint-disable-line no-shadow
      currentlyExpanded,
      gif,
    } = this.props;

    LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut));

    if (gif.id !== currentlyExpanded.id) {
      setGifActive(gif.id);
    } else {
      setGifActive(null);
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
    const { gif, currentlyExpanded } = this.props;
    const imageURL = placeholder; // `${rootURL}${gif.src}`

    return (
      <TouchableWithoutFeedback onPress={ () => this.toggleExpanded() }>
        <Image
          source={ { uri: imageURL } }
          style={ { height: currentlyExpanded.id === gif.id ? 400 : gif.height.collapsed } }
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
