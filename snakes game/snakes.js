// Snakes Game

function init(){
    
    canvas = document.getElementById('mycanvas');
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    game_over = false;
    
    food = getRandomFood();
    score = 00;
    
    
    snake = {
        init_length:5,
        color:"yellow",
        cells:[],
        direction:"right",
        
        createSnake:function(){
            for(var i=this.init_length-1;i>=0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){
            
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                
                pen.strokeStyle = "black";
                pen.lineWidth  = 5;
                
                pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10); pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);  
            }
            
        },

        // Update the snake
        updateSnake:function(){
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            
            if(headX==food.x && headY==food.y){
                food = getRandomFood();
                score+=10;
            }
            else{
                //Pop last cell if food not eaten
                this.cells.pop();
            }
            
            if(this.direction =="right"){
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction=="left"){
                nextX = headX-1;
                nextY = headY;
            }
            else if(this.direction=="down"){
                nextX = headX;
                nextY = headY + 1;
            }
            else if(this.direction=="up"){
                nextX = headX;
                nextY = headY - 1;
            }

            //Insert the new cell at head/front
            this.cells.unshift({x:nextX,y:nextY});
            
            
            //Find out the last coordinate (boundaries)
            var last_x = Math.round(W/10);
            var last_y = Math.round(H/10);
            
            if(this.cells[0].y<0 || this.cells[0].x <0|| this.cells[0].x>last_x || this.cells[0].y>last_y){
                    alert("GameOver!! Your score is: " + score);
                    game_over = true;
                
            }
            
            
            
        }
    };
    snake.createSnake();
    
    //Adding Event listeners
    
    function KeyPressed(e){
        
        console.log("You pressed a key");
        console.log(e);
        
        if(e.key=="ArrowRight" || e.key=="D" || e.key=="d"){
            snake.direction = "right";
        }
        else if(e.key=="ArrowLeft" || e.key=="A" || e.key=="a"){
            snake.direction = "left";
        }
        else if(e.key=="ArrowDown" || e.key=="S" || e.key=="s"){
            snake.direction = "down";
        }
        else if(e.key=="ArrowUp" || e.key=="W" || e.key=="w"){
            snake.direction = "up";
        }
        
    }
    
    
    document.addEventListener('keydown',KeyPressed);
    
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    
    //Lets us draw the food
    
    pen.fillStyle = food.color;
    
    pen.fillRect(food.x*10,food.y*10,10,10);
    
    pen.fillStyle = "white";
    pen.font = "14px Roboto";
    pen.fillText("Score : "+score,10,10);
    
    
    
}

function update(){
    snake.updateSnake();
   
}

function gameLoop(){
    draw();
    update();
    
    if(game_over==true){
        clearInterval(f);
    }
}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-10)/10);
    var foodY = Math.round(Math.random()*(H-10)/10);
    
    foodColors = ["red","green","aqua","coral","orchid"];
    var i = Math.round(Math.random()*foodColors.length);
    
    
    
    var food = {
        x:foodX,
        y:foodY,
        color:foodColors[i],
    };
    
    return food;
}

init();


//Speed of the game:

var f = setInterval(gameLoop,100);



