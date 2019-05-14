var game = new Phaser.Game(1144, 900, Phaser.AUTO);

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
			 [0,0,0,0,0,0,0,0,0,0,0],
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
		game.load.image('elephant','assets/img/elephant.png');
		game.load.image('bullet','assets/img/bullet1.png');
		game.load.audio('fire',['assets/audio/fire.mp3','assets/audio/fire.ogg']);
		game.load.audio('hit',['assets/audio/hit.mp3','assets/audio/hit.ogg']);
		
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
		turrets = game.add.group();
		turrets.enableBody = true;
		turrets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets = game.add.group();
		bullets.enableBody = true;
		//bullets.physicsBodyType = Phaser.Physics.ARCADE;
		elephants = game.add.group();
		elephants.enableBody = true;
		//elephants.physicsBodyType = Phaser.Physics.ARCADE;
		game.add.sprite(0,624,'bar');
		var turretButton = game.add.button(212,664,'turretButton',this.placeTurret);
		scoreT = game.add.text(16, 700, 'score: 0', { fontSize: '16px', fill: '#000' });
		goldT = game.add.text(16, 730, 'gold: 100', { fontSize: '16px', fill: '#000' });
	},
	update: function(){
		timer++;
		if(timer %300 ==0){
			var elephant = elephants.create(1200,Math.random()*624,'elephant');
			elephant.scale.setTo(0.5,0.5);
			elephant.anchor.setTo(0.5,0.5);
			game.physics.arcade.moveToObject(elephant,base,35);
			var elephant = elephants.create(1200,(Math.random()*6)*104,'elephant');
			elephant.scale.setTo(0.5,0.5);
			elephant.anchor.setTo(0.5,0.5);
			game.physics.arcade.moveToObject(elephant,base,35);
		}
	
		if(placeT){
			if(game.input.mousePointer.isDown){
				var mx = Math.round(game.input.x/104);
				var my = Math.round(game.input.y/104);
				if(my<6&&mx<12){
					if(slots[my][mx] == 0 && gold >= 60){
						object = turrets.create(Math.round(game.input.x/104)*104+52,Math.round(game.input.y/104)*104+52,'turret');
						game.physics.enable(object, Phaser.Physics.ARCADE);
						object.anchor.setTo(0.5,0.5);
						turretN++;
						slots[my][mx] = 1;
						placeT = false;
						gold = gold - 60;
						goldT.text = 'gold: ' + gold;
					}
				}
			}
		}
		for(var j = 0;j < elephants.children.length;j++){
			for(var i = 0;i<turrets.children.length;i++){
				if(timer%300 == 0){
					bullet = bullets.create(turrets.children[i].body.x+30,turrets.children[i].y-10,'bullet');
					var fire = game.add.audio('fire');
					fire.play();
					game.physics.arcade.moveToObject(bullet,elephants.children[j],200);
				}
			}
			break;
		}

		game.physics.arcade.overlap(bullets, elephants, killElephant, null, this);
		game.physics.arcade.overlap(elephants, turrets, turretDestroyed, null, this);
		game.physics.arcade.overlap(elephants, base, gameOver, null, this);
	},
	placeTurret: function(){
		placeT = true;
	}
	
}

function gameOver(elephant,base){
	game.state.start('GameOver');
}

function killElephant(bullet,elephant){
	elephant.destroy();
	var hit = game.add.audio('hit');
	hit.volume = 3;
	hit.play();
	bullet.kill();
	gold = gold + 10;
	score = score + 10;
	scoreT.text = 'score: ' + score;
	goldT.text = 'gold: ' + gold;
}
	
function turretDestroyed(elephant,turret){
	turret.destroy();
	elephant.destroy();
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
			gold = 100;
			score = 0;
			slots = [[0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0],
			 [1,1,0,0,0,0,0,0,0,0,0],
			 [1,1,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0]];
			 timer = 0;
			 game.state.start('GamePlay');
		}
	}
}
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');