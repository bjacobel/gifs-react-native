import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ListView,
  LayoutAnimation
} from 'react-native';

import Gif from './Gif';
import Loading from './Loading';
import {
  getGifsAsync,
  setGifActive
} from '../actions/gifs';

const mapStateToProps = (state) => {
  return {
    gifs: state.gifs
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
    if (gifs instanceof ListView.DataSource) {
      return (
        <ListView
          dataSource={ gifs }
          renderRow={ (gif) => (
            <Gif
              gif={ gif }
              toggleFn={ () => this.setActiveWithTransition(gif.id) }
            />
          ) }
        />
      );
    } else {
      return <Loading />;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifList);
