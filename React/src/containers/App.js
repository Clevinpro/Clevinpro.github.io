import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import HotelCards from '../components/HotelCards';
import NoteApp from '../components/NotesApp'

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
          
          <HotelCards />
          <NoteApp />
        </main>
      </div>
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