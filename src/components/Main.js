import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTagsAsync } from '../actions/tags';
import GifList from './GifList';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  getTagsAsync
};

class Main extends Component {
  componentDidMount() {
    // this.props.getTagsAsync();
  }

  render() {
    return (
      <GifList />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
