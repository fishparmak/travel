// let hero = $(".hero");
// let gameWidth = 500;
// let heroWidth = 50;
//
// !function moveHero() {
//   var elem = hero[0];
//   var pos = 0;
//   var id = setInterval(frame, 6);
//   function frame() {
//     if (pos >= (gameWidth-heroWidth)) {
//       clearInterval(id);
//     } else {
//       pos++;
//       elem.style.left = pos + 'px';
//     }
//   }
// }()


(function(global, factory){
    'use strict';

    global.Game = factory();
})(this, function() {
    var hero = {
        element: ".hero",
        size: 50,
        position: 0,
        direction: "right",
        lives: 3,
        eye: ".hero__eye",
    };
    var item = {
        element: ".item",
        size: 35,
        position: 0,
        catched: 0,
    };
    var speed = 6;
    var tools = {
        moveHero : function(gameWidth) {
            var elem = $(hero.element)[0];
            var eye = $(hero.eye)[0];
              var id = setInterval(frame, speed);
              function frame() {
                if (hero.position >= (gameWidth-hero.size)) {
                    clearInterval(id);
                    hero.position = 0;
                    if(hero.direction == "left"){
                        hero.direction = "right";
                        eye.style.left = "25%";
                        elem.style.right = "inherit";
                    }
                    else {
                        hero.direction = "left";
                        eye.style.left = "0%";
                        elem.style.left = "inherit";
                    }
                    id = setInterval(frame, speed);

                } else {
                    document.body.onkeyup = function(e){
                    if(e.keyCode == 32){
                            if(hero.direction=="right") {
                                hero.direction = "left";
                                eye.style.left = "0%";
                                elem.style.left = "inherit";
                                hero.position = Math.abs(gameWidth - hero.position);
                            }
                            else {
                                hero.direction = "right";
                                eye.style.left = "25%";
                                elem.style.right = "inherit";
                                hero.position = Math.abs(gameWidth - hero.position);
                            }
                    }
                }
                  hero.position++;
                  console.log(elem.getBoundingClientRect().top);
                  if(hero.direction=="right") {
                      elem.style.left = hero.position + 'px';
                  }
                  if(hero.direction=="left") {

                      elem.style.right = hero.position + 'px';
                  }
                }
              }
        },
        score: 0,
        moveItem : function(gameWidth) {
            var itemEl = $(item.element)[0];
              var id = setInterval(frame, speed);
              function frame() {
                if (item.position >= (gameWidth-item.size)) {
                    clearInterval(id);
                    item.position = 0;
                    itemEl.style.display = "block";
                    $(hero.element)[0].style.backgroundColor = "white";
                    itemEl.style.top = 0;
                    itemEl.style.left = Math.floor((Math.random() * (gameWidth-item.size)))+'px';
                    id = setInterval(frame, speed);
                } else {
                  item.position++;
                itemEl.style.top = item.position + 'px';


                if(item.position>=gameWidth-(item.size*2)) {
                    tools.check();
                }
                }
              }
        },
        check : function() {

            el = $(hero.element)[0];
            it = $(item.element)[0];
            rad1 = hero.size/2;
            rad2 = item.size/2;
            var xH = el.offsetLeft;
            var yH = el.offsetTop;
            var xI =  it.offsetLeft;
            var yI = it.offsetTop;
            if(Math.sqrt((xH-xI)*(xH-xI)-(yH-yI)*(yH-yI))<=rad1+rad2){
                it.style.display = "none";
                el.style.backgroundColor = "green";
                tools.score+=50;
                $(".score").text('your score: ' + tools.score);
            }
        }
    }
    var api = {
        create: function() {
            hero.size = 0.1*this.gameProp.gameSize;
            item.size = 0.06*this.gameProp.gameSize;
            speed = 0.012*this.gameProp.gameSize;
            $("body").append('<div class="game" style="width:' + this.gameProp.gameSize + 'px; height:' + this.gameProp.gameSize + 'px">' +
                '<div class="score style="font-size:' + hero.size*0.36 + 'px;">your score: </div>' +
                '<div class="item" style="width:' + item.size+ 'px; height:' + item.size + 'px">yo</div>' +
                '<div class="hero" style="width:' + hero.size + 'px; height:' + hero.size + 'px">' +
                    '<div class="hero__eye" style="width:' + hero.size*0.36 + 'px; height:' + hero.size*0.36 + 'px; border-width:' + hero.size*0.22 +'px;">' +
                    '</div>' +
                '</div>' +
            '</div>' + '<link rel="stylesheet" href="library.css" type="text/css" />');
            this.start();
            return this;
        },
        start: function() {
                tools.moveHero(this.gameProp.gameSize);
                tools.moveItem(this.gameProp.gameSize);

                return this;
        },
        changeSpeed : function(sp) {
            speed = sp;
            return this;
        }
    };

    function Gametor(obj) {

        Game.prototype = api;
        return new Game(obj);

        function Game(obj) {
            //debugger;
            this.gameProp = {
                gameSize: 500,
            };
        !function(src){
            Object.assign(src, obj);
        }(this);

        }
    }

    return Gametor;
})
//a = { gameProp : {gameSize: 500,}, }
