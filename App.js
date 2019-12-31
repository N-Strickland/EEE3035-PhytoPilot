import React, { Component } from 'react';
import Amplify, { PubSub } from 'aws-amplify';
import aws_exports from './aws-exports';
import RootNavigator from './src/navigation/RootNavigator';

Amplify.configure(aws_exports);

export default class App extends Component {
  render() {
    return <RootNavigator />;
  }
}