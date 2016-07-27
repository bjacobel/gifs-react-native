import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';

import Gif from './Gif';
import Loading from './Loading';
import { getGifsAsync } from '../actions/gifs';

const mapStateToProps = (state) => {
  return {
    gifs: state.gifs
  };
};

const mapDispatchToProps = {
  getGifsAsync
};

class GifList extends Component {
  componentDidMount() {
    this.props.getGifsAsync();
  }

  render() {
    const { gifs } = this.props;
    if (gifs instanceof ListView.DataSource) {
      return (
        <ListView
          dataSource={ gifs }
          renderRow={ (listEl) => <Gif gif={ listEl } /> }
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
