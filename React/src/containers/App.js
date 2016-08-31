import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import * as layoutActions from '../actions/LayoutActions'

class App extends Component {
  render() {
    const { sidebar } = this.props
    const { toggleSidebar } = this.props.layoutActions

    return (
      <Layout open={sidebar.open} toggleSidebar={toggleSidebar}/>
  )
}
}

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar
  }
}

function mapDispatchToProps(dispatch) {
  return {
    layoutActions: bindActionCreators(layoutActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)