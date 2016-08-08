import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ListView,
  LayoutAnimation,
} from 'react-native';

import Gif from './Gif';
import Loading from './Loading';
import {
  getGifsAsync,
  setGifActive,
} from '../actions/gifs';

const mapStateToProps = (state) => {
  return {
    gifs: state.gifs,
    currentlyExpanded: state.currentlyExpanded,
  };
};

const mapDispatchToProps = {
  getGifsAsync,
  setGifActive,
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
        dataSource: this.state.dataSource.cloneWithRows(
          nextProps.gifs.list.map(gif => Object.assign({}, gif, {
            expanded: gif.id === nextProps.gifs.currentlyExpanded,
          }))
        ),
      });
    }
  }

  setActiveWithTransition(id) {
    LayoutAnimation.easeInEaseOut();
    this.props.setGifActive(id);
  }

  render() {
    if (this.state.dataSource instanceof ListView.DataSource) {
      return (
        <ListView
          dataSource={ this.state.dataSource }
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
