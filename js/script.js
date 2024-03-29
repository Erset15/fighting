//общие настройки блока канвас
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0, canvas.width, canvas.height);

const gravity = 0.2;
//общая логика спрайтов (игровых элементов)
class Sprite{
    constructor({position,velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey;
    }
    draw(){
        c.fillStyle='red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }
    update(){
        this.draw();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        }
        else {
            this.velocity.y += gravity;
        }
    }
}

//добавление информации о блоке игрока
const Player = new Sprite({
    position:{
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:0
    }
});

const Enemy = new Sprite({
    position:{
        x:400,
        y:0
    },
    velocity:{
        x:0,
        y:0
    }
});
//управление доп
const keys ={
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}
//логика анимации персонажей
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle='black';
    c.fillRect(0,0, canvas.width, canvas.height);
    Player.update();
    Enemy.update();

    Player.velocity.x=0;
    if(keys.a.pressed && Player.lastKey === 'a'){
        Player.velocity.x =-1;
    }else if (keys.d.pressed  && Player.lastKey === 'd'){
        Player.velocity.x=1;
    }
    Enemy.velocity.x=0;
    if(keys.ArrowLeft.pressed && Enemy.lastKey === 'ArrowLeft'){
        Enemy.velocity.x =-1;
    }else if (keys.ArrowRight.pressed  && Enemy.lastKey === 'ArrowRight'){
        Enemy.velocity.x=1;
    }
}

//вызов анимации
animate();

//Прослушивание событий
window.addEventListener('keydown', (event) =>{
    switch (event.key){
        case 'd':
            keys.d.pressed=true;
            Player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed=true;
            Player.lastKey = 'a'
            break;
        case 'w':
            keys.w.pressed=true;
            Player.velocity.y = -10;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed=true;
            Enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=true;
            Enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed=true;
            Enemy.velocity.y = -10;
            break;
    }
})
window.addEventListener('keyup', (event) =>{
    switch (event.key){
        case 'd':
            keys.d.pressed=false;
            break;
        case 'a':
            keys.a.pressed=false;
            break;
        case 'w':
            keys.w.pressed=false;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed=false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=false;
            break;
        case 'ArrowUP':
            keys.ArrowUp.pressed=false;
            break;
    }
})