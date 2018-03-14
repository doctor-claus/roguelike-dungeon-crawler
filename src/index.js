import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/grid';
import Position from './components/position';
import Stats from './components/stats';
class App extends Component{
    constructor(props){
        super(props);
        this.dimensions = 70;
        this.maxTunnels = 100;
        this.maxLength = 30;
        this.grid = this.createMap();
        this.state = {
            map: this.grid,
            visible: [false],
            position: [],
            health: [100],
            enemyHealth: [100],
            weapon: "Stick",
            level: [0],
            nextLevel: [60],
            dungeon: [0]
        };
    }
    createArray(num, dimensions){
        var array = [];
        for(var i = 0; i < dimensions; i++){
            array.push([]);
            for(var j = 0; j < dimensions; j++){
                array[i][j] = num;
            }
        }
        return array;
    }
    createMap(){
        var dimensions = this.dimensions;
        var maxTunnels = this.maxTunnels;
        var maxLength = this.maxLength;
        var map = this.createArray(1, dimensions);
        var currentRow = Math.floor(Math.random() * dimensions);
        var currentCol = Math.floor(Math.random() * dimensions);
        var directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
        var lastDirection = [];
        var randomDirection;
        while(maxTunnels && dimensions && maxLength){
            do{
                randomDirection = directions[Math.floor(Math.random() * directions.length)]; // random direction selection
            }
            while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) || (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1])); // prevent a same or reverse random direction
            var randomLength = Math.floor(Math.random() * maxLength);
            var tunnelLength = 0;
            while(tunnelLength < randomLength){
                if((currentRow == 0 && randomDirection[0] == -1) || (currentCol == 0 && randomDirection[1] == -1 ) || (currentRow == dimensions - 1 && randomDirection[0] == 1) || (currentCol == dimensions - 1 && randomDirection[1] == 1)){
                    break; // if position at end of the map, loop will break;
                }
                else{
                    map[currentRow][currentCol] = 0;
                    currentRow += randomDirection[0]; // current position updated
                    currentCol += randomDirection[1];
                    tunnelLength++;
                } 
            }
            if(tunnelLength){
                lastDirection = randomDirection;// lastDIrection variable gets updated with randomDirection variable
                maxTunnels--;
            }
        }
        return map;
    }
    display = () => {
        var rowArr = [];
        var g = this.state.map;
        for(var i = 0; i < this.dimensions; i++){
            for(var j = 0; j < this.dimensions; j++){
                var cellId  = i+"_"+j;
                rowArr.push(<Grid values= {g[i][j]} key= {cellId}/>);
            }
        }
        return rowArr;
    }
    componentDidMount(){
        this.setPosition();
    }
    componentWillMount(){
        document.addEventListener('keydown', this.handleCharacterMove);
    }
    attackLeft(playerDamage, enemyDamage){
        var pos = this.state.position.slice();
        var grid = this.state.map;
        var health = this.state.health.slice();  
        var enemyHealth = this.state.enemyHealth.slice();   
        if(enemyHealth[0] <= 0){
            grid[pos[0]][pos[1]] = 0;
            var newPos = [ pos[0], pos[1] - 1 ];
            enemyHealth[0] = 100;
            var nextLevel = this.state.nextLevel.slice();
            nextLevel[0] = nextLevel[0] - ((this.state.level[0] + 1) * 10);
            var level = this.state.level.slice();
            if(nextLevel[0] <= 0){
                level[0] = level[0] + 1;
                nextLevel[0] = nextLevel[0] + (60 * (level[0] + 1));
                this.setState({ level: level, nextLevel: nextLevel, position: newPos });
            }
            this.setState({ position: newPos, enemyHealth: enemyHealth,  nextLevel: nextLevel });
            return null;
        }
        health[0] = health[0] - Math.floor(Math.random() * playerDamage);
        if(health[0] < 0){
            health[0] = 0;
            this.setState({ health: health });
            return null;
        }
        enemyHealth[0] = enemyHealth[0] - Math.floor(Math.random() * enemyDamage);
        this.setState({ health: health, enemyHealth: enemyHealth });
        return null;
    }
    attackUp(playerDamage, enemyDamage){
        var pos = this.state.position.slice();
        var grid = this.state.map;
        var health = this.state.health.slice();  
        var enemyHealth = this.state.enemyHealth.slice();   
        if(enemyHealth[0] <= 0){
            grid[pos[0]][pos[1]] = 0;
             var newPos = [ pos[0] - 1, pos[1] ];
            enemyHealth[0] = 100;
            var nextLevel = this.state.nextLevel.slice();
            nextLevel[0] = nextLevel[0] - ((this.state.level[0] + 1) * 10);
            var level = this.state.level.slice();
            if(nextLevel[0] <= 0){
                level[0] = level[0] + 1;
                nextLevel[0] = nextLevel[0] + (60 * (level[0] + 1));
                this.setState({ level: level, nextLevel: nextLevel, position: newPos });
            }
            this.setState({ position: newPos, enemyHealth: enemyHealth,  nextLevel: nextLevel });
            return null;
        }
        health[0] = health[0] - Math.floor(Math.random() * playerDamage);
        if(health[0] < 0){
            health[0] = 0;
            this.setState({ health: health });
            return null;
        }
        enemyHealth[0] = enemyHealth[0] - Math.floor(Math.random() * enemyDamage);
        this.setState({ health: health, enemyHealth: enemyHealth });
        return null;
    }
    attackRight(playerDamage, enemyDamage){
        var pos = this.state.position.slice();
        var grid  = this.state.map;
        var health = this.state.health.slice();  
        var enemyHealth = this.state.enemyHealth.slice();   
        if(enemyHealth[0] <= 0){
            grid[pos[0]][pos[1]] = 0;
            var newPos = [ pos[0], pos[1] + 1 ];
            enemyHealth[0] = 100;
            var nextLevel = this.state.nextLevel.slice();
            nextLevel[0] = nextLevel[0] - ((this.state.level[0] + 1) * 10);
            var level = this.state.level.slice();
            if(nextLevel[0] <= 0){
                level[0] = level[0] + 1;
                nextLevel[0] = nextLevel[0] + (60 * (level[0] + 1));
                this.setState({ level: level, nextLevel: nextLevel, position: newPos });
            }
            this.setState({ position: newPos, enemyHealth: enemyHealth,  nextLevel: nextLevel });
            return null;
        }
        health[0] = health[0] - Math.floor(Math.random() * playerDamage);
        if(health[0] < 0){
            health[0] = 0;
            this.setState({ health: health });
            return null;
        }
        enemyHealth[0] = enemyHealth[0] - Math.floor(Math.random() * enemyDamage);
        this.setState({ health: health, enemyHealth: enemyHealth });
        return null;
    }
    attackDown(playerDamage, enemyDamage){
        var pos = this.state.position.slice();
        var grid = this.state.map;
        var health = this.state.health.slice();  
        var enemyHealth = this.state.enemyHealth.slice();   
        if(enemyHealth[0] <= 0 ){
            grid[pos[0]][pos[1]] = 0;
            var newPos = [ pos[0] + 1, pos[1] ];
            enemyHealth[0] = 100;
            var nextLevel = this.state.nextLevel.slice();
            nextLevel[0] = nextLevel[0] - ((this.state.level[0] + 1) * 10);
            var level = this.state.level.slice();
            if(nextLevel[0] <= 0){
                level[0] = level[0] + 1;
                nextLevel[0] = nextLevel[0] + (60 * (level[0] + 1));
                this.setState({ level: level, nextLevel: nextLevel, position: newPos });
            }
            this.setState({ position: newPos, enemyHealth: enemyHealth,  nextLevel: nextLevel });
            return null;
        }
        health[0] = health[0] - Math.floor(Math.random() * playerDamage);
        if(health[0] < 0){
            health[0] = 0;
            this.setState({ health: health });
            return null;
        }
        enemyHealth[0] = enemyHealth[0] - Math.floor(Math.random() * enemyDamage);
        this.setState({ health: health, enemyHealth: enemyHealth });
        return null;
    }
    handleCharacterMove = (event) =>{
        var grid = this.state.map;
        var pos = this.state.position.slice();
        var newPos = [];
        switch(event.keyCode){
            case 37:
                if(grid[pos[0]][pos[1] - 1] == "enemy"){
                    if(this.state.weapon == "Stick"){
                        this.attackLeft(5, 60);
                        break;    
                    } 
                    else if(this.state.weapon == "Katana"){
                        this.attackLeft(5, 40);
                        break;
                    }
                    else if(this.state.weapon == "Dagger"){
                        this.attackLeft(10, 30);
                        break;
                    }
                    else if(this.state.weapon == "Mace"){
                        this.attackLeft(15, 25);
                        break;
                    }
                    else if(this.state.weapon == "Spear"){
                        this.attackLeft(10, 30);
                        break;
                    }
                    else if(this.state.weapon == "Warhammer"){
                       this.attackLeft(5, 35);
                       break;
                    }
                    else if(this.state.weapon == "Scythe"){
                        this.attackLeft(20, 15);
                        break;
                    }
                    else if(this.state.weapon == "Axe"){
                        this.attackLeft(20, 15);
                        break;
                    }
                    else if(this.state.weapon == "Club"){
                        this.attackLeft(10, 20);
                        break;
                    }
                    else if(this.state.weapon == "Sai"){
                        this.attackLeft(10, 25);
                        break;
                    }    
                }
                if(grid[pos[0]][pos[1] - 1] == "Katana" || grid[pos[0]][pos[1] - 1] == "Dagger" || grid[pos[0]][pos[1] - 1] == "Mace" || grid[pos[0]][pos[1] - 1] == "Spear" || grid[pos[0]][pos[1] - 1] == "Warhammer" || grid[pos[0]][pos[1] - 1] == "Scythe" || grid[pos[0]][pos[1] - 1] == "Axe" || grid[pos[0]][pos[1] - 1] == "Club" || grid[pos[0]][pos[1] - 1] == "Sai" ){
                    var weapon = grid[pos[0]][pos[1] - 1 ];
                    grid[pos[0]][pos[1]] = 0;
                    newPos = [ pos[0], pos[1] - 1 ];
                    this.setState({ weapon: weapon, position: newPos });
                    break;
                }
                if(grid[pos[0]][pos[1] - 1] == "health"){
                    var health = this.state.health.slice();
                    health[0] = health[0] + Math.floor(Math.random() * 10);
                    grid[pos[0]][pos[1]] = 0;
                    newPos = [ pos[0], pos[1] - 1 ];
                    this.setState({ health: health, position: newPos});
                    break;
                }
                if(grid[pos[0]][pos[1] - 1] == "nextlevel"){
                    var vis = this.state.visible.slice();
                    if(vis[0] == true){
                        vis[0] = false;
                    }
                    else if(vis[0] == false){
                        vis[0] = true;
                    }
                    console.log(vis[0]);
                    var map = this.createMap();
                    var dungeon  = this.state.dungeon.slice();
                    dungeon[0]  = dungeon[0] + 1;
                    this.setState({ map: map, position: [], dungeon: dungeon, visible: vis });
                    this.setPosition();
                    break;        
                }
                if(grid[pos[0]][pos[1] - 1] == "boss"){
                    if(this.state.weapon == "Stick"){
                        this.attackLeft(5, 60);
                        break;    
                    } 
                    else if(this.state.weapon == "Katana"){
                        this.attackLeft(20, 30);
                        break;
                    }
                    else if(this.state.weapon == "Dagger"){
                        this.attackLeft(10, 30);
                        break;
                    }
                    else if(this.state.weapon == "Mace"){
                        this.attackLeft(15, 25);
                        break;
                    }
                    else if(this.state.weapon == "Spear"){
                        this.attackLeft(10, 30);
                        break;
                    }
                    else if(this.state.weapon == "Warhammer"){
                        this.attackLeft(5, 35);
                        break;
                    }
                    else if(this.state.weapon == "Scythe"){
                        this.attackLeft(20, 15);
                        break;
                    }
                    else if(this.state.weapon == "Axe"){
                        this.attackLeft(20, 15);
                        break;
                    }
                    else if(this.state.weapon == "Club"){
                        this.attackLeft(10, 20);
                        break;
                    }
                    else if(this.state.weapon == "Sai"){
                        this.attackLeft(10, 25);
                        break;
                    }                        
                }
                if(this.state.health[0] == 0){
                    document.onkeydown = function(e){
                        e.preventDefault();
                    }
                    break;
                }
                if(this.state.enemyHealth[0] <= 0 && grid[pos[0]][pos[1] - 1] == "boss"){
                    document.onkeydown = function(e){
                        e.preventDefault();
                    }
                    break;
                }
                grid[pos[0]][pos[1]] = 0;
                newPos = [ pos[0], pos[1] - 1 ];
                if(grid[newPos[0]][newPos[1]] == 1){
                    break;
                }
                this.setState({ position: newPos });
                break;
            case 38:
                if(grid[pos[0] - 1][pos[1]] == "enemy"){
                    if(this.state.weapon == "Stick"){
                        this.attackUp(30, 5);
                        break;    
                    } 
                    else if(this.state.weapon == "Katana"){
                        this.attackUp(5, 40);
                        break;
                    }
                    else if(this.state.weapon == "Dagger"){
                        this.attackUp(10, 30);
                        break;
                    }
                    else if(this.state.weapon == "Mace"){
                        this.attackUp(15, 25);
                        break;
                    }
                    else if(this.state.weapon == "Spear"){
                        this.attackUp(10, 30);
                        break;
                    }
                    else if(this.state.weapon == "Warhammer"){
                       this.attackUp(5, 35);
                       break;
                    }
                    else if(this.state.weapon == "Scythe"){
                        this.attackUp(20, 15);
                        break;
                    }
                    else if(this.state.weapon == "Axe"){
                        this.attackUp(20, 15);
                        break;
                    }
                    else if(this.state.weapon == "Club"){
                        this.attackUp(10, 20);
                        break;
                    }
                    else if(this.state.weapon == "Sai"){
                        this.attackUp(10, 25);
                        break;
                    }    
                }
                if(grid[pos[0] - 1 ][pos[1]] == "Katana" || grid[pos[0] - 1 ][pos[1]] == "Dagger" || grid[pos[0] - 1][pos[1]] == "Mace" || grid[pos[0] - 1][pos[1]] == "Spear" || grid[pos[0]- 1][pos[1] ] == "Warhammer" || grid[pos[0] - 1][pos[1] ] == "Scythe" || grid[pos[0] - 1][pos[1]] == "Axe" || grid[pos[0] - 1][pos[1]] == "Club" || grid[pos[0] - 1][pos[1]] == "Sai" ){
                    var weapon = grid[pos[0] - 1][pos[1]];
                    grid[pos[0]][pos[1]] = 0;
                    newPos = [ pos[0] - 1, pos[1]];
                    this.setState({ weapon: weapon, position: newPos });
                    break;
                }
                if(grid[pos[0] - 1][pos[1]] == "health"){
                    var health = this.state.health.slice();
                    health[0] = health[0] + Math.floor(Math.random() * 10);
                    grid[pos[0]][pos[1]] = 0;
                    newPos = [ pos[0] - 1, pos[1] ];
                    this.setState({ health: health, position: newPos});
                    break;
                }
                if(grid[pos[0] - 1][pos[1]] == "nextlevel"){
                    var vis = this.state.visible.slice();
                    if(vis[0] == true){
                        vis[0] = false;
                    }
                    else if(vis[0] == false){
                        vis[0] = true;
                    }
                    console.log(vis[0]);
                    var map = this.createMap();
                    var dungeon  = this.state.dungeon.slice();
                    dungeon[0]  = dungeon[0] + 1;
                    this.setState({ map: map, position: [], dungeon: dungeon, visible: vis });
                    this.setPosition();
                    break;        
                }
                if(grid[pos[0] - 1][pos[1]] == "boss"){
                    if(this.state.weapon == "Stick"){
                        this.attackUp(5, 30);
            
                        break;    
                    } 
                    else if(this.state.weapon == "Katana"){
                        this.attackUp(5, 40);
                        
                        break;
                    }
                    else if(this.state.weapon == "Dagger"){
                        this.attackUp(10, 30);
                        
                        break;
                    }
                    else if(this.state.weapon == "Mace"){
                        this.attackUp(15, 25);
                        
                        break;
                    }
                    else if(this.state.weapon == "Spear"){
                        this.attackUp(10, 30);
                                             
                        break;
                    }
                    else if(this.state.weapon == "Warhammer"){
                       this.attackUp(5, 35);
                       
                        break;
                    }
                    else if(this.state.weapon == "Scythe"){
                        this.attackUp(20, 15);
                        
                        break;
                    }
                    else if(this.state.weapon == "Axe"){
                        this.attackUp(20, 15);
                        
                        break;
                    }
                    else if(this.state.weapon == "Club"){
                        this.attackUp(10, 20);
                        
                        break;
                    }
                    else if(this.state.weapon == "Sai"){
                        this.attackUp(10, 25);
                        
                        break;
                    }    
                }
                if(this.state.health[0] == 0){
                    document.onkeydown = function(e){
                        e.preventDefault();
                    }
                    break;
                }
                if(this.state.enemyHealth[0] <= 0 && grid[pos[0] - 1][pos[1]] == "boss"){
                    document.onkeydown = function(e){
                        e.preventDefault();
                    }
                    break;
                }
                grid[pos[0]][pos[1]] = 0;
                newPos = [ pos[0] - 1, pos[1] ];
                if(grid[newPos[0]][newPos[1]] == 1){
                    break;
                }
                this.setState({ position: newPos });
                break;
            case 39:
                if(grid[pos[0]][pos[1] + 1] == "enemy"){
                    if(this.state.weapon == "Stick"){
                        this.attackRight(30, 5);
                        break;    
                    } 
                    else if(this.state.weapon == "Katana"){
                        this.attackRight(5, 40);
                        break;
                    }
                    else if(this.state.weapon == "Dagger"){
                        this.attackRight(10, 30);
                        break;
                    }
                    else if(this.state.weapon == "Mace"){
                        this.attackRight(15, 25);
                        break;
                    }
                    else if(this.state.weapon == "Spear"){
                        this.attackRight(10, 30);
                        break;
                    }
                    else if(this.state.weapon == "Warhammer"){
                       this.attackRight(5, 35);
                       break;
                    }
                    else if(this.state.weapon == "Scythe"){
                        this.attackRight(20, 15);
                        break;
                    }
                    else if(this.state.weapon == "Axe"){
                        this.attackRight(20, 15);
                        break;
                    }
                    else if(this.state.weapon == "Club"){
                        this.attackRight(10, 20);
                        break;
                    }
                    else if(this.state.weapon == "Sai"){
                        this.attackRight(10, 25);
                        break;
                    }   
                }
                if(grid[pos[0]][pos[1] + 1] == "Katana" || grid[pos[0]][pos[1] + 1] == "Dagger" || grid[pos[0]][pos[1] + 1] == "Mace" || grid[pos[0]][pos[1] + 1] == "Spear" || grid[pos[0]][pos[1] + 1 ] == "Warhammer" || grid[pos[0]][pos[1] + 1 ] == "Scythe" || grid[pos[0]][pos[1] + 1] == "Axe" || grid[pos[0]][pos[1] + 1] == "Club" || grid[pos[0]][pos[1] + 1] == "Sai" ){
                    var weapon = grid[pos[0]][pos[1] + 1 ];
                    grid[pos[0]][pos[1]] = 0;
                    newPos = [ pos[0], pos[1] + 1];
                    this.setState({ weapon: weapon, position: newPos });
                    break;
                }
                if(grid[pos[0]][pos[1] + 1] == "health"){
                    var health = this.state.health.slice();
                    health[0] = health[0] + Math.floor(Math.random() * 10);
                    grid[pos[0]][pos[1]] = 0;
                    newPos = [ pos[0], pos[1] + 1 ];
                    this.setState({ health: health, position: newPos});
                    break;
                }
                if(grid[pos[0]][pos[1] + 1] == "nextlevel"){
                    var vis = this.state.visible.slice();
                    if(vis[0] == true){
                        vis[0] = false;
                    }
                    else if(vis[0] == false){
                        vis[0] = true;
                    }
                    console.log(vis[0]);
                    var map = this.createMap();
                    var dungeon  = this.state.dungeon.slice();
                    dungeon[0]  = dungeon[0] + 1;
                    this.setState({ map: map, position: [], dungeon: dungeon, visible: vis });
                    this.setPosition();
                    break;        
                }
                if(grid[pos[0]][pos[1] + 1] == "boss"){
                    if(this.state.weapon == "Stick"){
                        this.attackRight(5, 30);
                        
                        break;    
                    } 
                    else if(this.state.weapon == "Katana"){
                        this.attackRight(5, 40);
                        
                        break;
                    }
                    else if(this.state.weapon == "Dagger"){
                        this.attackRight(10, 30);
                        
                        break;
                    }
                    else if(this.state.weapon == "Mace"){
                        this.attackRight(15, 25);
                        
                        break;
                    }
                    else if(this.state.weapon == "Spear"){
                        this.attackRight(10, 30);
                        
                        break;
                    }
                    else if(this.state.weapon == "Warhammer"){
                       this.attackRight(5, 35);
                       
                        break;
                    }
                    else if(this.state.weapon == "Scythe"){
                        this.attackRight(20, 15);
                        
                        break;
                    }
                    else if(this.state.weapon == "Axe"){
                        this.attackRight(20, 15);
                       
                        break;
                    }
                    else if(this.state.weapon == "Club"){
                        this.attackRight(10, 20);
                        
                        break;
                    }
                    else if(this.state.weapon == "Sai"){
                        this.attackRight(10, 25);
                        
                        break;
                    }   
                }
                if(this.state.health[0] == 0){
                    document.onkeydown = function(e){
                        e.preventDefault();
                    }
                    break;
                }
                if(this.state.enemyHealth[0] <= 0 && grid[pos[0]][pos[1] + 1] == "boss"){
                    document.onkeydown = function(e){
                        e.preventDefault();
                    }
                    break;
                }
                grid[pos[0]][pos[1]] = 0;
                newPos = [ pos[0], pos[1] + 1 ];
                if(grid[newPos[0]][newPos[1]] == 1){
                    break;
                }
                this.setState({ position: newPos });
                break;
            case 40:
                if(grid[pos[0] + 1][pos[1]] == "enemy"){
                    if(this.state.weapon == "Stick"){
                        this.attackDown(30, 5);
                        break;    
                    } 
                    else if(this.state.weapon == "Katana"){
                        this.attackDown(5, 40);
                        break;
                    }
                    else if(this.state.weapon == "Dagger"){
                        this.attackDown(10, 30);
                        break;
                    }
                    else if(this.state.weapon == "Mace"){
                        this.attackDown(15, 25);
                        break;
                    }
                    else if(this.state.weapon == "Spear"){
                        this.attackDown(10, 30);
                        break;
                    }
                    else if(this.state.weapon == "Warhammer"){
                       this.attackDown(5, 35);
                       break;
                    }
                    else if(this.state.weapon == "Scythe"){
                        this.attackDown(20, 15);
                        break;
                    }
                    else if(this.state.weapon == "Axe"){
                        this.attackDown(20, 15);
                        break;
                    }
                    else if(this.state.weapon == "Club"){
                        this.attackDown(10, 20);
                        break;
                    }
                    else if(this.state.weapon == "Sai"){
                        this.attackDown(10, 25);
                        break;
                    }
                }
                if(grid[pos[0] + 1 ][pos[1]] == "Katana" || grid[pos[0] + 1 ][pos[1]] == "Dagger" || grid[pos[0] + 1][pos[1]] == "Mace" || grid[pos[0] + 1][pos[1]] == "Spear" || grid[pos[0]+ 1][pos[1] ] == "Warhammer" || grid[pos[0] + 1][pos[1] ] == "Scythe" || grid[pos[0] + 1][pos[1]] == "Axe" || grid[pos[0] + 1][pos[1]] == "Club" || grid[pos[0] + 1][pos[1]] == "Sai" ){
                    var weapon = grid[pos[0] + 1][pos[1]];
                    grid[pos[0]][pos[1]] = 0;
                    newPos = [ pos[0] + 1, pos[1] ];
                    this.setState({ weapon: weapon, position: newPos });
                    break;
                }
                if(grid[pos[0] + 1][pos[1]] == "health"){
                    var health = this.state.health.slice();
                    health[0] = health[0] + Math.floor(Math.random() * 10);
                    grid[pos[0]][pos[1]] = 0;
                    newPos = [ pos[0] + 1, pos[1] ];
                    this.setState({ health: health, position: newPos});
                    break;
                }
                if(grid[pos[0] + 1][pos[1]] == "nextlevel"){
                    var vis = this.state.visible.slice();
                    if(vis[0] == true){
                        vis[0] = false;
                    }
                    else if(vis[0] == false){
                        vis[0] = true;
                    }
                    console.log(vis[0]);
                    var map = this.createMap();
                    var dungeon  = this.state.dungeon.slice();
                    dungeon[0]  = dungeon[0] + 1;
                    this.setState({ map: map, position: [], dungeon: dungeon, visible: vis });
                    this.setPosition();
                    break;        
                }
                if(grid[pos[0] + 1][pos[1]] == "boss"){
                    if(this.state.weapon == "Stick"){
                        this.attackDown(60, 5);
                       
                        break;    
                    } 
                    else if(this.state.weapon == "Katana"){
                        this.attackDown(20, 30);
                        
                        break;
                    }
                    else if(this.state.weapon == "Dagger"){
                        this.attackDown(10, 30);
                        
                        break;
                    }
                    else if(this.state.weapon == "Mace"){
                        this.attackDown(15, 25);
                        
                        break;
                    }
                    else if(this.state.weapon == "Spear"){
                        this.attackDown(10, 30);
                        
                        break;
                    }
                    else if(this.state.weapon == "Warhammer"){
                        this.attackDown(5, 35);
                        
                        break;
                    }
                    else if(this.state.weapon == "Scythe"){
                        this.attackDown(20, 15);
                        
                        break;
                    }
                    else if(this.state.weapon == "Axe"){
                        this.attackDown(20, 15);
                        
                        break;
                    }
                    else if(this.state.weapon == "Club"){
                        this.attackDown(10, 20);
                        
                        break;
                    }
                    else if(this.state.weapon == "Sai"){
                        this.attackDown(10, 25);
                        
                        break;
                    }                        
                }
                if(this.state.health[0] == 0){
                    document.onkeydown = function(e){
                        e.preventDefault();
                    }
                    break;
                }
                if(this.state.enemyHealth[0] <= 0 && grid[pos[0] + 1][pos[1]] == "boss"){
                    document.onkeydown = function(e){
                        e.preventDefault();
                    }
                    break;
                }
                grid[pos[0]][pos[1]] = 0;
                newPos = [ pos[0] + 1, pos[1] ];
                if(grid[newPos[0]][newPos[1]] == 1){
                    break;
                }
                this.setState({ position: newPos });
                break;
            default: break;
        }
    }
    setPosition = () => {
        var tunnelArray = [];
        var width = this.dimensions * 14;
        var grid = this.state.map;
        var enemyArray = [];
        var weaponArray = [];
        var healthArray = [];
        var weapons = ["Katana", "Dagger", "Mace", "Spear", "Warhammer", "Scythe", "Axe", "Club", "Sai"];
        for(var i = 0; i < this.dimensions; i++){
            for(var j = 0; j < this.dimensions; j++){
                if(grid[i][j] == 0){
                    tunnelArray.push([i, j]);
                }
            }
        }
        var pos = this.state.position.slice(0, 0);
        pos = tunnelArray[Math.floor(Math.random() * tunnelArray.length)];
        for(var i = 0; i < 10; i++){
            enemyArray.push(tunnelArray[Math.floor(Math.random() * tunnelArray.length)]);
        }
        for(var i = 0; i < 5; i++){
            weaponArray.push(tunnelArray[Math.floor(Math.random() * tunnelArray.length)]);
        }
        for(var i = 0; i < 4; i++){
            healthArray.push(tunnelArray[Math.floor(Math.random() * tunnelArray.length)]);
        }
        for(var i = 0; i < 10; i++){
            grid[enemyArray[i][0]][enemyArray[i][1]] = "enemy";
        }
        for(var i = 0; i < 5; i++){
            grid[weaponArray[i][0]][weaponArray[i][1]] = weapons[Math.floor(Math.random() * weapons.length)];
        }
        for(var i = 0; i < 4; i++){
            grid[healthArray[i][0]][healthArray[i][1]] = "health";
        }
        var nextLevel = tunnelArray[Math.floor(Math.random() * tunnelArray.length)];
        if(nextLevel !== pos && this.state.dungeon[0] < 4){
            grid[nextLevel[0]][nextLevel[1]] = 'nextlevel';
        }
        else if(this.state.dungeon[0] < 4){
            var nextLevel = tunnelArray[Math.floor(Math.random() * tunnelArray.length)];
            grid[nextLevel[0]][nextLevel[1]] = 'nextlevel';
        }
        if(this.state.dungeon == 4){
            var boss = tunnelArray[Math.floor(Math.random() * tunnelArray.length)];
            grid[boss[0]][boss[1]] = "boss";
            grid[boss[0] - 1 ][boss[1]] = "boss";
            grid[boss[0]][boss[1] - 1] = "boss";
            grid[boss[0] + 1][boss[1]] = "boss";
            grid[boss[0]][boss[1] + 1] = "boss";
            grid[boss[0] - 1][boss[1] - 1] = "boss";
            grid[boss[0] + 1][boss[1] + 1] = "boss";
            grid[boss[0] - 1][boss[1] + 1] = "boss";
            grid[boss[0] + 1][boss[1] - 1] = "boss";
        }
        this.setState({ position: pos });
    }
    error(h, e, p){
        var grid = this.state.map;
        console.log(e);
        if(h[0] == 0){
            return (
                <div className= "error">You died!</div>
            );
        }
        if(e[0] <= 0 && grid[p[0]][p[1] - 1] == "boss"){
            document.onkeydown = function(e){
                e.preventDefault();
            }
            return (
                <div className= "win">You won!</div>
            );
        }
        if(e[0] <= 0 && grid[p[0] - 1][p[1]] == "boss"){
            document.onkeydown = function(e){
                e.preventDefault();
            }
            return (
                <div className= "win">You won!</div>
            );
        }
        if(e[0] <= 0 && grid[p[0]][p[1] + 1] == "boss"){
            document.onkeydown = function(e){
                e.preventDefault();
            }
            return (
                <div className= "win">You won!</div>
            );
        }
        if(e[0] <= 0 && grid[p[0] + 1][p[1]] == "boss"){
            document.onkeydown = function(e){
                e.preventDefault();
            }
            return (
                <div className= "win">You won!</div>
            );
        }
    }
    render(){
        var width = this.dimensions * 14;
        if(this.state.position.length !== 0){
            var grid = this.state.map;
            var pos = this.state.position;
            grid[pos[0]][pos[1]] = 'pos';
        }
        return (
            <div>
                <div className  = "stats" >
                    <Stats 
                        health= {this.state.health} 
                        weapon= {this.state.weapon} 
                        attack = {this.state.attack} 
                        level = {this.state.level} 
                        nextLevel = {this.state.nextLevel} 
                        dungeon = {this.state.dungeon} 
                    />
                </div>
                <div className= {(this.state.visible[0] == true) ? 'grid1' : 'grid'} style= {{width}}>
                    {this.display()}
                </div>
                {this.error(this.state.health, this.state.enemyHealth, this.state.position)}
            </div>
        );
    }
}
function arrayClone(arr){
    return JSON.parse(JSON.stringify(arr));
}
ReactDOM.render(<App />, document.querySelector('.mainContainer'));