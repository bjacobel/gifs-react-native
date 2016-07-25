import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';

import { getTagsAsync } from '../actions/tags';
import GifList from './GifList';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  getTagsAsync
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#212121'
  }
});

class Main extends Component {
  componentDidMount() {
    // this.props.getTagsAsync();
  }

  render() {
    return (
      <ScrollView style={ styles.scrollView } >
        <StatusBar hidden />
        <GifList />
      </ScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
