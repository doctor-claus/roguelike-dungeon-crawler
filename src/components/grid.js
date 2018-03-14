import React, { Component } from 'react';
class Grid extends Component{
    backgroundColor = (value) => {
        if(value == 1){
            return 'black';
        }
        if(value == 0){
            return 'white';
        }
        if(value == "pos"){
            return 'blue';
        }
        if(value == "enemy" || value == "boss"){
            return 'red';
        }
        if(value == "Katana" || value == "Dagger" || value == "Mace" || value == "Spear" || value == "Warhammer" || value == "Scythe" || value == "Axe" || value == "Club" || value == "Sai"){
            return 'yellow';
        }
        if(value == "health"){
            return 'green';
        }
        if(value == 'nextlevel'){
            return 'purple';
        }
    }
    render(){
        return <div className= "cell" style= {{'background': this.backgroundColor(this.props.values)}} ></div>;
    }
}
export default Grid;