  // Enemies our player must avoid  
 var headObj = document.getElementsByTagName('div')[0];
 var Enemy = function(x, y, speed) {     
    this.x = x;      
    this.y = y;  
    this.speed = speed;    
    this.sprite = 'images/enemy-bug.png';  
  };    // Update the enemy's position, required method for game  // Parameter: dt, a time delta between ticks
 Enemy.prototype.update = function(dt) {
     // You should multiply any movement by the dt parameter
     // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if(this.x>505){
      this.x = 0;
      this.sprite = 'images/enemy-bug.png';  

    }
 };
 
 // Draw the enemy on the screen, required method for game
 Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };
 // Now write your own player class
 // This class requires an update(), render() and
 // a handleInput() method.
 var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png'
 };
 
 Player.prototype.update = function (dt) {
    if(this.x>400){
      this.x = 400
    }
    if(this.x<0){
      this.x = 0;
    }
    if(this.y<20){
      this.x = 200;
      this.y = 400;
      headObj.innerHTML = "perfect,you win !";
      window.setTimeout(player.change,3000);
    }
    if(this.y>400){
      this.y =400;
   }
 };
 Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    player.checkCollisions();
 };

 Player.prototype.handleInput = function (movement) {
    switch (movement) {
       case 'left':
          if (this.x >= 0) {
             this.x -= 101;
          } break;
       case 'right':
          if (this.x <= 404) {
             this.x += 101;
          } break;
       case 'up':
          if (this.y <= 505) {            
            this.y -= 83;
          } break;
       case 'down':
         if (this.y >= 0) {
             this.y += 83;
          } break;
    }
 };
 Player.prototype.change=function(){
    headObj.innerHTML = "Arcade-Game-Clone";
 }
 // Now instantiate your objects.
 // Place all enemy objects in an array called allEnemies
 // Place the player object in a variable called player
 var allEnemies = [
    new Enemy(22, 83 * 0 + 55, Math.random(0,150)*150+1), new Enemy(21, 83 * 0 + 55, Math.random(0,220)*220+1), // row 1
    new Enemy(57, 83 * 1 + 55, Math.random(0,60)*60+1), new Enemy(20, 83 * 1 + 55, Math.random(0,100)*100+1), // row 2
    new Enemy(22, 83 * 2 + 55, Math.random(0,180)*180+1), new Enemy(59, 83 * 3 + 55, Math.random(0,100)*100+1) // row 3
    ];

 var player = new Player(200, 400);

 Player.prototype.checkCollisions = function(x,y){
    for(var i=0;i<allEnemies.length;i++){
        if(Math.abs(this.x - allEnemies[i].x)<55){
            if((Math.abs(this.y - allEnemies[i].y))<40){
                headObj.innerHTML = "sorry,just do it again !";
                this.x =202;
                this.y =83*5+50-63;
                window.setTimeout(player.change,3000);
            }
       };
    };
}; 
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