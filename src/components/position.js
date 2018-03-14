import React, { Component } from 'react';
class Position extends Component{
    constructor(props){
        super(props);
    }
    display(){
        document.getElementById(this.props.value).style.backgroundColor = 'red';
    }
    render(){
        return (
            <div className = "pos">{this.display().bind(this)}</div>
        );
    }
}
export default Position;