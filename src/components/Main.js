import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGifsAsync } from '../actions/gifs';
import { getTagsAsync } from '../actions/tags';
import GifList from './GifList';

const mapStateToProps = (state) => {
  return {
    gifs: state.gifs,
    tags: state.tags
  };
};

const mapDispatchToProps = {
  getGifsAsync,
  getTagsAsync
};

class Main extends Component {
  componentDidMount() {
    this.props.getGifsAsync();
    this.props.getTagsAsync();
  }

  render() {
    const gifs = this.props.gifs || [];

    return (
      <GifList gifs={ gifs } />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
