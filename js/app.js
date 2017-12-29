var width = 101;
var height = 83;

var counter = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    this.pos1 = 0.5*height;
    this.pos2 = 1.5*height; 
    this.pos3 = 2.5*height;

    this.x = -10; //this.x-width;
    this.y = this.pos3;   
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x = this.x + (250*dt);

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
                this.x = -204;
                break;
            }
            case 3:
            {
                this.y = this.pos3;
                this.x = -306;
                break;
            }
            default:break;

        }
        
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    
    this.row = 2;   
    this.col = 5;
    

    this.x = this.row*width;
    this.y = this.col*height;

    this.validate = function(direction){       

        switch(direction)
        {
            case 'left':
            {
                if(this.boardBoundries('horizontal',(this.row-1))){
                    this.row--;                   
                }                          
                    
                break;
            }
            case 'up':
            {                
                if (this.boardBoundries('vertical',(this.col-1))) {
                    this.col--;                      
                }
                            
                break;
            }
            case 'down':
            {
                if(this.boardBoundries('vertical',(this.col+1))){
                    this.col++;            
                }
                           
                break;
            }
            case 'right':
            {            
                if(this.boardBoundries('horizontal',(this.row+1))){
                    this.row++;                     
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
                if(value>=0 && value<=5){
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
    }
};

Player.prototype.update = function(){
    this.x = this.row*width;
    this.y = this.col*height;    
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.handleInput = function(key){
    this.validate(key);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i=0; i<2; i++){
    allEnemies.push(new Enemy());
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});





