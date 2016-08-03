import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ListView,
  LayoutAnimation
} from 'react-native';

import Gif from './Gif';
import {
  getGifsAsync,
  setGifActive
} from '../actions/gifs';

const mapStateToProps = (state) => {
  return {
    gifs: state.gifs,
    currentlyExpanded: state.currentlyExpanded
  };
};

const mapDispatchToProps = {
  getGifsAsync,
  setGifActive
};

class GifList extends Component {
  componentDidMount() {
    this.props.getGifsAsync();
  }

  setActiveWithTransition(id) {
    LayoutAnimation.easeInEaseOut();
    this.props.setGifActive(id);
  }

  render() {
    const { gifs } = this.props;

    return (
      <ListView
        dataSource={ gifs }
        renderRow={ (gif) => (
          <Gif
            gif={ gif }
            height={ gif.height[gif.height.current] }
            toggleFn={ () => this.setActiveWithTransition(gif.id) }
          />
        ) }
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifList);
