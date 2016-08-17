import React, { Component } from 'react';
import Header from './Header';


export default class Main extends Component {
    onChange (e) {
        const header = e.target.value;
        this.props.onChange(header);
    }
    onBtnClick (e){
        const header = e.target.innerHTML;
        const color = {color: e.target.innerHTML}
        this.props.onChange(header, color);
    }
    render () {
        return (
            <div>
                <Header color={this.props.color} header={this.props.header}/>
                <input value={this.props.header} onChange={this.onChange.bind(this)} type="text" />
                <button onClick={this.onBtnClick.bind(this)}>green</button>
                <button onClick={this.onBtnClick.bind(this)}>yellow</button>
                <button onClick={this.onBtnClick.bind(this)}>black</button>
                <button onClick={this.onBtnClick.bind(this)}>orange</button>
            </div>
        )
        
    }    
}