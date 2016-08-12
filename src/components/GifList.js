import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, LayoutAnimation } from 'react-native';

import Gif from './Gif';
import Loading from './Loading';
import { getGifsAsync } from '../actions/gifs';

const mapStateToProps = (state) => {
  return {
    gifs: state.gifs,
  };
};

const mapDispatchToProps = {
  getGifsAsync,
};

class GifList extends Component {
  constructor() {
    super();

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    };
  }

  componentDidMount() {
    this.props.getGifsAsync();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.gifs !== this.props.gifs) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.gifs),
      });
    }
  }

  render() {
    if (this.state.dataSource instanceof ListView.DataSource) {
      return (
        <ListView
          dataSource={ this.state.dataSource }
          initialListSize={ 10 }
          removeClippedSubviews={ false }
          renderRow={ (gif) => (
            <Gif gif={ gif } />
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
