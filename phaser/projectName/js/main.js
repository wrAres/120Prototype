/* Zhengyang Zhang   zzhan127@ucsc.edu
   Yibo Wang         ywang315@ucsc.edu
   Shay Dong         sdong9@ucsc.edu
   
   
   
*/


var game = new Phaser.Game(1144, 900, Phaser.AUTO);
var tArray = [];
var eArray = [];
var MainMenu = function(game){};
var GamePlay = function(game) {};
var GameOver = function(game){};
var placeT = false;
var object;
var timer = 0;
var elephants;
var base;
var bullet;
var bullets;
var turretN = 0;
var gold = 100;
var score = 0;
var scoreT;
var goldT;

var slots = [[0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0],		// representation of the game board. keeping track which slots are empty.
			 [1,1,0,0,0,0,0,0,0,0,0],
			 [1,1,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0]];
MainMenu.prototype = {
	preload: function(){
		game.load.audio('bgm',['assets/audio/bgm.mp3','assets/audio/bgm.ogg']); 
	},
	create: function(){
		var bgm = game.add.audio('bgm');
		bgm.loop = true; //making it loop
		bgm.volume = 0.1;
		bgm.play();
		game.stage.backgroundColor = "#71c5cf";
		title = game.add.text(0, 0, " MainMenu",{
			font: "32px Arial",
			fill: "#000",

		});
		txt = game.add.text(game.world.centerX, game.world.centerY, " Press 'Space' to start",{
			font: "30px Arial",
			fill: "#ff0044",
			align: "center"
		});
		txt.anchor.setTo(0.5,0.5);
		var prompt = game.add.text(50,50, 
			"use mouse to control.\n Click on the card in grey bar and then click on the board to place turrets \n If elephant collide with your turret the turret will be destroyed. \n GameOver if elephant reaches the base.",
			{
			font: "30px Arial",
			fill: "#ff0044",
			align: "center"
		});
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('GamePlay');
		}
	}
}

GamePlay.prototype = {
	preload: function(){
		game.load.image('ground1','assets/img/ground1.png');
		game.load.image('ground2','assets/img/ground2.png');
		game.load.image('bar','assets/img/bar.png');
		game.load.image('base','assets/img/zhangpeng3.png');
		game.load.image('fence','assets/img/fence.png');
		game.load.image('turret','assets/img/turret.png');
		game.load.image('turretButton','assets/img/turretButton.png');
		game.load.spritesheet('elephant','assets/img/elephant120.png', 230,120,6);
		game.load.spritesheet('boar','assets/img/boar80.png', 120,80,5);
		game.load.spritesheet('duck','assets/img/dodo35.png', 34,35,4);
		game.load.image('bullet','assets/img/bullet1.png');
		game.load.audio('fire',['assets/audio/fire.mp3','assets/audio/fire.ogg']);
		game.load.audio('hit',['assets/audio/hit.mp3','assets/audio/hit.ogg']);
		game.load.spritesheet('man', 'assets/img/man100.png', 95, 200, 5);
		
	},
	create: function(){
		var ground = game.add.group();
		for(var i = 0;i<12;i++){
			for(var j = 0;j<=5;j++){
				if((i+j)%2 == 0){
					var ground1 = ground.create(i*104,j*104,'ground1');
				}else{
					var ground2 = ground.create(i*104,j*104,'ground2');
				}
			}
		}
		base = game.add.sprite(104,312,'base');
		base.scale.setTo(0.818,1.2);
		base.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(base);

		bullets = game.add.group();
		bullets.enableBody = true;

		game.add.sprite(0,624,'bar');
		var turretButton = game.add.button(212,664,'turretButton',this.placeTurret);
		scoreT = game.add.text(16, 700, 'score: 0', { fontSize: '16px', fill: '#000' });
		goldT = game.add.text(16, 730, 'gold: 100', { fontSize: '16px', fill: '#000' });
	},
	update: function(){
		timer++;			// the timer. 
		if(timer %1346 ==0){
			if(score>= 50){
				var elephant = new Enemies(game, 'elephant', 0 , 0.5, 0, 150+score);
				game.add.existing(elephant);
				game.physics.enable(elephant);
				eArray.push(elephant);
				game.physics.arcade.moveToObject(elephant,base,35);
			}
		}
		if(timer%658==0){
			if(score>=30){
				var boar = new Enemies(game, 'boar', 0 , 0.5, 0, 150);
				game.add.existing(boar);
				game.physics.enable(boar);
				eArray.push(boar);
				game.physics.arcade.moveToObject(boar,base,35);
			}
		}
		if(timer%300 ==0){
			var duck = new Enemies(game, 'duck', 0 , 1, 0, 100);
			game.add.existing(duck);
			game.physics.enable(duck);
			eArray.push(duck);
			game.physics.arcade.moveToObject(duck,base,35);
		}
	
	
		if(placeT){
			if(game.input.mousePointer.isDown){
				var mx = Math.floor(game.input.x/104); //locate the nearest slot
				var my = Math.floor(game.input.y/104);
				if(my<6&&mx<12){ //check if the slot exist
					if(slots[my][mx] == 0 && gold >= 60){	//check if slot is available and play has enough gold
						tArray.push(0);
						var currentT = timer;
						console.log(currentT);
						tArray[tArray.length-1] = new Player(game, 'man', 0, 0.5, 0, mx*104+52,my*104+52,currentT);
						game.physics.enable(tArray[tArray.length-1]);
						tArray[tArray.length-1].enableBody = true;
						game.add.existing(tArray[tArray.length-1]);

						turretN++;
						slots[my][mx] = 1;  //mark the slot unavailable
						placeT = false;
						gold = gold - 60;
						goldT.text = 'gold: ' + gold;
					}
				}
			}
		}
		for(var i = 0; i< eArray.length;i++){
			if(eArray[i] == null){
				eArray.splice(i,1);
			}
		}
		for(var i = 0;i<eArray.length;i++){
			for(var j = 0;j < tArray.length;j++){
			
				if(eArray[i] == null){
					console.log(eArray[i]);
					eArray.splice(i,1);
					
				}
				if((timer-tArray[j].getT())%225 == 0 &&eArray[i]!=null && tArray[j]!= null){
						bullet = bullets.create(tArray[j].body.x+30,tArray[j].y-10,'bullet');
						var fire = game.add.audio('fire');
						tArray[j].attack();
						fire.play();
						game.physics.arcade.moveToObject(bullet,eArray[i],400);
					
					
					
				}	
			}
			break;
			
		}
		
		game.physics.arcade.overlap(bullets, eArray, killElephant, null, this);
		game.physics.arcade.overlap(eArray, tArray, turretDestroyed, null, this);
		game.physics.arcade.overlap(eArray, base, gameOver, null, this);
	},
	placeTurret: function(){
		placeT = true;
	}
	
}

function gameOver(elephant,base){
	game.state.start('GameOver');
}

function killElephant(elephant,bullet){
	elephant.hitP = elephant.hitP - 50;
	if(elephant.hitP <=0){
		elephant.alive = false;
		elephant.kill();
	
		for(var i = 0;i<eArray.length;i++){
			console.log('hi'+i);
			if(eArray[i].alive==false){
				eArray.splice(i,1);
				console.log('deleted');
			}
		}
		
		gold = gold + 10;
		score = score + 10;
		scoreT.text = 'score: ' + score;
		goldT.text = 'gold: ' + gold;
	}		
	var hit = game.add.audio('hit');
	hit.volume = 3;
	hit.play();
	bullet.kill();

}
	
function turretDestroyed(elephant,turret){
	turret.alive = false;
	turret.destroy();
	elephant.kill();
	elephant.alive = false;
	for(var i = 0;i<tArray.length;i++){
			
			if(tArray[i].alive==false){
				tArray.splice(i,1);
				
			}
	}
	for(var i = 0;i<eArray.length;i++){
			
			if(eArray[i].alive==false){
				eArray.splice(i,1);
				
			}
	}
	var hit = game.add.audio('hit');
	hit.play();
	slots[Math.round(game.input.x/104),Math.round(game.input.y/104)] = 1;
}


GameOver.prototype = {
	preload: function(){
	},
	create: function(){
		var gameoverT = game.add.text(200,100,'GameOver!', { fontSize: '32px', fill: '#000' });
		var scoreText = game.add.text(200,200,'Score: ' + score, { fontSize: '32px', fill: '#000' });;
		var restartText = game.add.text(200,350, 'Again ?' , { fontSize: '32px', fill: '#000' });
		var restartText1 = game.add.text(100,400, 'Press Enter to restart.' , { fontSize: '32px', fill: '#000' });
	
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			gold = 100;  //reset upon restart
			score = 0;
			slots = [[0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0],
			 [1,1,0,0,0,0,0,0,0,0,0],
			 [1,1,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0]];
			 timer = 0;
			 game.state.start('GamePlay');
			 eArray = [];
			 tArray = [];
		}
	}
}
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');