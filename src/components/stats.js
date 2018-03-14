import React, { Component } from 'react';
class Stats extends Component{
    render(){
        return (
            <div className= "statinfo">
                <ul>
                <li className= "health"><strong>Health</strong> <span>{this.props.health}</span></li>
                <li className= "weapon"><strong>Weapon</strong> <span>{this.props.weapon}</span></li>
                <li className= "level"><strong>Level</strong> <span>{this.props.level}</span></li>
                <li className= "nextlevel"><strong>Next Level</strong> <span>{this.props.nextLevel} XP</span></li>
                <li className= "dungeon"><strong>Dungeon</strong><span> {this.props.dungeon}</span></li>
                </ul>
            </div>
        );
    }
}
export default Stats;