import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <div style={this.props.color}>
                {this.props.header}    
            </div>
        );
    }
}

export default Header;