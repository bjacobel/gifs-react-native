import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import Gif from './Gif';

class GifList extends Component {
  componentWillMount() {
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({ gifsDS: this.ds.cloneWithRows(this.props.gifs) });
  }

  componentWillUpdate() {
    this.setState({ gifsDS: this.ds.cloneWithRows(this.props.gifs) });
  }

  render() {
    return (
      <ListView
        dataSource={ this.state.gifsDS }
        renderRow={ (listEl) => <Gif gif={ listEl } /> }
      />
    );
  }
}

GifList.propTypes = {
  gifs: PropTypes.array.isRequired
};

export default GifList;
