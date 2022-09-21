// Snakes Game
// ~Prateek

// Initializing elements

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
        color:"green",
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
            else if(this.direction="up"){
                nextX = headX;
                nextY = headY - 1;
            }
            //Insert the new cell at head/front
            this.cells.unshift({x:nextX,y:nextY});
            
            
            //Find out the last coordinate (boundaries)
            var last_x = Math.round(W/10);
            var last_y = Math.round(H/10);
            
            if(this.cells[0].y<0 || this.cells[0].x<0|| this.cells[0].x>last_x || this.cells[0].y>last_y){
                    if(game_over==false){
                        alert("GameOver, Your score is: " + score);
                        game_over = true;
                    }
            }
            
        }
    };
    snake.createSnake();
    
    //Adding Event listeners
    
    function KeyPressed(e){
        
        if(e.key=="ArrowRight" || e.key=="d" || e.key=="D"){
            snake.direction = "right";
        }
        else if(e.key=="ArrowLeft" || e.key=="a" || e.key=="A"){
            snake.direction = "left";
        }
        else if(e.key=="ArrowDown" || e.key=="s" || e.key=="S"){
            snake.direction = "down";
        }
        else if(e.key=="ArrowUp" || e.key=="w" || e.key=="W"){
            snake.direction = "up";
        }
        
    }
    
    document.addEventListener('keydown',KeyPressed);
    
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    //console.log("In draw");
    
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
        clearInterval(speed);
    }
}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(this.W-10)/10);
    var foodY = Math.round(Math.random()*(this.H-10)/10);
    
    var foodColors = ["red","yellow","aqua","coral","orchid","white"];
    var i = Math.round(Math.random()*foodColors.length);
    
    
    
    var food = {
        x:foodX,
        y:foodY,
        color:foodColors[i],
    };
    
    return food;
}

// Determine Speed of the game

function speedslow(){
    speed = setInterval(gameLoop,150);
}

function speedmedium(){
    speed = setInterval(gameLoop,100);
}
function speedfast(){
    speed = setInterval(gameLoop,70);
}

init();