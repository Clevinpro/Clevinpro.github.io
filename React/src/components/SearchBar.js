/**
 * Created by Clevin on 20.10.2016.
 */
import React from 'react'

export default class SearchBar extends React.Component {
    render() {
        return (
           <section className="search-bar">
               <i className="search-icon fa fa-search" />

               <input
                   className="search-input"
                   type="text"
                   placeholder=" Look for a hotel"
                   onChange={this.props.onSearch}
               />
           </section>
        )
    }
}
