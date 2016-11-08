import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../components/Layout'



import * as layoutActions from '../actions/LayoutActions'

import './app.scss'

class App extends Component {
  render() {
    const { sidebar } = this.props;
    const { toggleSidebar } = this.props.layoutActions;

    return (
        <div>
          <Layout open={sidebar.open} toggleSidebar={toggleSidebar}/>
          <main>
            {this.props.children}
          </main>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    sidebar: state.sidebar
});

const mapDispatchToProps = (dispatch) => ({
    layoutActions: bindActionCreators(layoutActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App)