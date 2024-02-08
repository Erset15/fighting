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
    }
    draw(){
        c.fillStyle='red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }
    update(){
        this.draw();
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

//логика анимации персонажей
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle='black';
    c.fillRect(0,0, canvas.width, canvas.height);
    Player.update();
    Enemy.update();
}

//вызов анимации
animate();