var width = 101;
var height = 73; //player height
var eheight = 93; //ememy height

var counter = 0;
var character = 'images/char-boy.png';
var second,minute,hour,seconds;
var image,timer=null,timerFlag=false;

var bestTime = 0;

// Enemies our player must avoid
var Enemy = function() {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    this.pos1 = 0.5*eheight;
    this.pos2 = 1.5*eheight; 
    this.pos3 = 2.5*eheight;

    this.x = -10; 
    this.y = this.pos3;           
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    //move bugs
    this.x = this.x + (250*dt);


    //reset bugs
    if(this.x>505)
    {         
        switch(Math.floor((Math.random()*3)+1))
        {
            case 1:
            {
                this.y = this.pos1;
                this.x = -102;
                
                break;
            }
            case 2:
            {
                this.y = this.pos2;
                this.x = -306;
                
                break;
            }
            case 3:
            {
                this.y = this.pos3;
                this.x = -506;
                
                break;
            }
            default:break;

        }        
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.location = function(){

    var collision = {row:0,col:0};

    if(this.x>=0 && this.x<=width)
    {
        collision.col = 0;
    }
    else if(this.x>=width && this.x<=(width*2))
    {
        collision.col = 1;
    }
    else if(this.x>=(width*2) && this.x<=(width*3))
    {
        collision.col = 2;
    }
    else if(this.x>=(width*3) && this.x<=(width*4))
    {
        collision.col = 3;
    }
    else if (this.x>=(width*4) && this.x<=(width*5)) 
    {
        collision.col = 4;
    }

    switch(this.y)
    {
        case this.pos1:
        {
            collision.row = 1;
            break;
        }
        
        case this.pos2:
        {
            collision.row = 2;
            break;
        }

        case this.pos3:
        {
            collision.row = 3;
            break;
        }
    }

    return collision;
}

var Timer = function(){
    hour = 0;
    minute = 0;
    second = 0;
    seconds = 0;
}

Timer.prototype.event = window.setInterval(function(){

    if(timerFlag)
    {
        second++; //this variable controls the seconds displayed
        seconds++; //this variable keep track of the total number of seconds 

        var minuteTxt = "00";
        var hourTxt = "00";
        var secondTxt = "00";
        
        if (second==60)
        {
           second = 0;
           this.minute++;
           if(this.minute == 60)
            {
                this.minute = 0;
                hour++;
            }
        }

        if(second <10){
           secondTxt = "0"+second;
        }
        else if(second>=10)
        {
           secondTxt = second;
        }

        if(this.minute==0 || this.minute<10){
           minuteTxt = "0"+this.minute
        }
        else
        {
           minuteTxt = this.minute;
        }

        if (this.hour==0 || this.hour<10) 
        {
           hourTxt = "0"+this.hour;
        }
        
        var time = hourTxt+":"+minuteTxt+":"+secondTxt;
         
         //update UI
         $('#time').html(time);
    }     
},1000);


Timer.prototype.reset = function(){
     $('#time').html('00:00:00');
     second = 0;
     seconds = 0;
     minute = 0;
     hour = 0;
}

Timer.prototype.stop = function(){
    timerFlag = false;
}

Timer.prototype.start = function(){
    timerFlag = true;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){   
    
    this.row = 5; //value controls the y axis default 2   
    this.col = 2; //value controls the x axis default 5   

    this.playerTimer = function(row){
        if(row>=1 && row<=3) // location for where the ememies are. this location start the timer
        {
            timer.start();  //start timer when player is on stones 
        }
        else
        {
            timer.stop(); //stop timer when player is on grass
        }
    };

    this.validate = function(direction){       

        switch(direction)
        {
            case 'left':
            {
                if(this.boardBoundries('horizontal',(this.col-1))){
                    this.col--;                   
                }                          
                    
                break;
            }
            case 'up':
            {                
                if (this.boardBoundries('vertical',(this.row-1))) {
                    this.row--;   
                    this.playerTimer(this.row);
                }
                            
                break;
            }
            case 'down':
            {
                if(this.boardBoundries('vertical',(this.row+1))){
                    this.row++;            
                    this.playerTimer(this.row);
                }
                           
                break;
            }
            case 'right':
            {            
                if(this.boardBoundries('horizontal',(this.col+1))){
                    this.col++;                     
                }
                
                break;
            }

            default:break;
        };
                 
    };

    this.boardBoundries = function(direction,value){

        switch(direction){
            case "vertical":
            {
                if(value>=1 && value<=5){
                    return true;
                }
                break;
            }
            case "horizontal":
            {
                if(value>=0 && value<=4){
                    return true;
                }
                break;
            }
            default:break;
        }

        return false;
    };   

    // initalize timer constructure
    timer = new Timer(); 
}

Player.prototype.update = function(){
    this.x = this.col*width;
    this.y = this.row*height;   
}

Player.prototype.render = function(){
    image = new Image();
    image.src = character;
    ctx.drawImage(image,this.x,this.y);
}

Player.prototype.handleInput = function(key){
    this.validate(key);    
}

Player.prototype.location = function(){
    var collision = {row:this.row,col:this.col};
    return collision;
}

Player.prototype.reset = function(){
    this.row = 5;    
    this.col = 2; 
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for(var i=0; i<2; i++){
    allEnemies.push(new Enemy());
}

var player = new Player(); // player instances

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]); //pass input to players function
});

function checkCollisions(){

    var flag = false;

    //loop through ememies to detect collision
    allEnemies.forEach(function(enemy){
        var epos = enemy.location();       
        var ppos = player.location();     

        if(epos.col==ppos.col && epos.row == ppos.row) //detect collision
        {
           timer.stop(); //stop timer 
           
            if(seconds>bestTime) //log the best time
            {      
                console.log(seconds);
                bestTime = seconds          
                $('#bestTime').html( $('#time').html());   
            }      
           
            timer.reset(); //reset time
            flag = true; //there was a collision
        }
        
    });    

    return flag;
}

// function containing procedure to change player
function selectCharactor(char,name){
    character = char; //set character image location 
    $('#profile').attr('src',char); // change profile image of player
    $('#name').html(name);  // change name of player on the player panel  
    player.render(); // render new player image on the game canvas
    $('.close').click(); //close the modal box
}



