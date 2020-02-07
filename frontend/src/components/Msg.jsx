import React, { Component } from 'react';

class Msg extends Component {
    render() {
        return <div className={this.props.className}>{this.props.msg}</div>;
    }
}


export default Msg