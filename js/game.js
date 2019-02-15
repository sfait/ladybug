function Player() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
    this.direction = "direction";
}

function Item() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {
    const self = this;
    let counter = 1;

    this.board = document.querySelectorAll("#board div");
    this.score = document.querySelector(".score .result");
    this.player = new Player();
    this.item = new Item();
    this.score = 0;
    this.index = function(x,y) {
        return x + (y * 10);
    }

    this.showPlayer = function () {
        this.hideVisiblePlayer();
        this.board[ this.index(this.player.x,this.player.y) ].classList.add("player");
    }

    this.showItem = function () {
        this.board[ this.index(this.item.x,this.item.y) ].classList.add('item');
    }

    this.startGame = function () {
        this.showPlayer();
        this.showItem();
        this.idSetInterval = setInterval(function () {
            self.movePlayer();
        }, 350);
    }

    this.movePlayer = function () {
        if(this.player.direction === "right") {
            this.player.x = this.player.x + 1;
        } else if (this.player.direction === "left") {
            this.player.x = this.player.x - 1;
        } else if (this.player.direction === "up") {
            this.player.y = this.player.y - 1;
        } else if (this.player.direction === "down") {
            this.player.y = this.player.y + 1;
        }

        this.gameOver();
        this.checkItemCollision();
        this.showPlayer();
    }

    this.hideVisiblePlayer = function () {
        const divPlayer = document.querySelector(".player");
        divPlayer.classList.remove("player");
    }

    this.turnPlayer = function(event) {
        switch (event.which) {
            case 37:
                this.player.direction = 'left';
                break;
            case 38:
                this.player.direction = 'up';
                break;
            case 39:
                this.player.direction = 'right';
                break;
            case 40:
                this.player.direction = 'down';
                break;
        }
    }

    this.checkItemCollision = function () {
        if (this.player.x === this.item.x && this.player.y === this.item.y) {
            const divItem = document.querySelector(".item");
            divItem.classList.remove("item");
            const score = document.querySelector(".score .result");
            score.innerText = counter++;
            this.item = new Item();
            this.showItem();
        }
    }

    this.gameOver = function () {

        if (this.player.x < 0 || this.player.x > 9 || this.player.y < 0 || this.player.y > 9) {

            clearInterval(this.idSetInterval);
            this.hideVisiblePlayer();

            const over = document.querySelector("#over");
            over.classList.remove("invisible");
            const scoreGameOver = document.querySelector("#over .score .result");
            scoreGameOver.innerText = counter++ - 1;
            return true;
        }
        return false;
    }
}

const game = new Game();
game.startGame();

document.addEventListener("keydown", function (event) {
    game.turnPlayer(event);

});
