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
var Instruction = function(game){};
var placeT = 0;
var object;
var timer = 0;
var elephants;
var base;
var bullet;
var bullets;
var turretN = 0;
var gold = 200;
var score = 0;
var scoreT;
var goldT;
var background;
var iState = 0;
var curretTurret = 0;
var uButton;
var removeButton;
var stats;
var T1;
var T2;
var T3;
var T4;
var slots = [[0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0],		// representation of the game board. keeping track which slots are empty.
			 [1,1,0,0,0,0,0,0,0,0,0],
			 [1,1,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0],
			 [0,0,0,0,0,0,0,0,0,0,0]];
MainMenu.prototype = {
	preload: function(){
		game.load.audio('bgm',['assets/audio/bgm.mp3','assets/audio/bgm.ogg']); 
		game.load.image('background','assets/img/background.png');
		game.load.image('main','assets/img/main.png');
		game.load.image('rockB','assets/img/rockBoard.png');
		game.load.image('lance','assets/img/lanceBoard.png');
		game.load.image('fenceB','assets/img/fanceBoard.png');
		game.load.image('start', 'assets/img/arrow.png');
		game.load.spritesheet('button2', 'assets/img/button2.png', 308,86);
	},
	create: function(){
		var bgm = game.add.audio('bgm');
		bgm.loop = true; //making it loop
		bgm.volume = 0.1;
		bgm.play();
		
		background = this.add.sprite(0,0, 'main');
		background.scale.setTo(1.2,2.0);
		game.stage.backgroundColor = "#71c5cf";
			
		var sButton = game.add.button(712,704,'start',this.startGame);
		sButton.scale.setTo(0.7,0.7);
		title = game.add.text(780, 730, "Start",{
			font: "32px Arial",
			fill: "#000",

		});	
		
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('GamePlay');
		}
	},
	startGame: function(){
		game.state.start('Instruction');
	}
}
Instruction.prototype = {
	preload: function(){
		game.load.image('insbackground','assets/img/ingBackground.png');
		game.load.image('ins1','assets/img/ins1.png');
		game.load.image('ins2','assets/img/ins2.png');
		game.load.image('ins3','assets/img/ins3.png');
		game.load.image('ins4','assets/img/ins4.png');
		game.load.image('ins5','assets/img/ins5.png');
		
		
	},
	create: function(){
		game.add.sprite(0, 0, 'insbackground');
		var ins1 = game.add.sprite(780, 670, 'ins1');
		ins1.scale.setTo(0.5,0.5);
		var ins2 = game.add.sprite(80, 570, 'ins2');
		ins2.scale.setTo(0.5,0.5);
		var ins3 = game.add.sprite(580, 570, 'ins3');
		ins3.scale.setTo(0.5,0.5);
		
	},
	update: function(){
		if(game.input.mousePointer.isDown){
			game.state.start('GamePlay');
		}
	}
}
GamePlay.prototype = {
	preload: function(){
		game.load.image('remove','assets/img/remove.png');
		
		game.load.image('scoreboard','assets/img/scoreboard.png');
		game.load.image('firelance','assets/img/firelance.png');
		game.load.image('base','assets/img/zhangpeng3.png');
		game.load.image('fence','assets/img/fence.png');
		game.load.image('spear','assets/img/lance.png');
		game.load.spritesheet('man1', 'assets/img/man2.png', 235, 274, 5);
		game.load.spritesheet('fireT','assets/img/fire.png',500,503,2);
		game.load.spritesheet('elephant','assets/img/elephant240.png', 240,170,6);
		game.load.spritesheet('boar','assets/img/boar130.png', 150,80,5);
		game.load.spritesheet('boar+','assets/img/bombboar.png', 150,170,5);
		game.load.spritesheet('duck','assets/img/dodo.png', 295.8,300,4);
		game.load.spritesheet('superElephant','assets/img/superElephant.png', 243,170,4);
		game.load.image('upgrade','assets/img/button.png');
		game.load.image('bullet','assets/img/rock.png');
		game.load.image('fireB','assets/img/fireBoard.png');
		game.load.audio('fire',['assets/audio/fire.mp3','assets/audio/fire.ogg']);
		game.load.audio('hit',['assets/audio/hit.mp3','assets/audio/hit.ogg']);
		game.load.audio('base_destroyed',['assets/audio/base_destroyed.mp3','assets/audio/base_destroyed.ogg']);
		game.load.audio('boar_attack',['assets/audio/boar_attack.mp3','assets/audio/boar_attack.ogg']);
		game.load.audio('boar_death',['assets/audio/boar_death.mp3','assets/audio/boar_death.ogg']);
		game.load.audio('building_destroyed',['assets/audio/building_destroyed.mp3','assets/audio/building_destroyed.ogg']);
		game.load.audio('dodo_attack',['assets/audio/dodo_attack.mp3','assets/audio/dodo_attack.ogg']);
		game.load.audio('dodo_death',['assets/audio/dodo_death.mp3','assets/audio/dodo_death.ogg']);
		game.load.audio('dodo_fire_attack',['assets/audio/dodo_fire_attack.mp3','assets/audio/dodo_fire_attack.ogg']);
		game.load.audio('elephant_attack',['assets/audio/elephant_attack.mp3','assets/audio/elephant_attack.ogg']);
		game.load.audio('elephant_death',['assets/audio/elephant_death.mp3','assets/audio/elephant_death.ogg']);
		game.load.audio('elephant_incoming',['assets/audio/elephant_incoming.mp3','assets/audio/elephant_incoming.ogg']);
		game.load.audio('lance_hit',['assets/audio/lance_hit.mp3','assets/audio/lance_hit.ogg']);
		game.load.audio('lance_throw',['assets/audio/lance_throw.mp3','assets/audio/lance_throw.ogg']);
		game.load.audio('man_death',['assets/audio/man_death.mp3','assets/audio/man_death.ogg']);
		game.load.audio('man_placement',['assets/audio/man_placement.mp3','assets/audio/man_placement.ogg']);
		game.load.audio('notification',['assets/audio/notification.mp3','assets/audio/notification.ogg']);
		game.load.audio('rock_throw',['assets/audio/rock_throw.mp3','assets/audio/rock_throw.ogg']);
		game.load.audio('tower_build',['assets/audio/tower_build.mp3','assets/audio/tower_build.ogg']);
		game.load.audio('tower_destroyed',['assets/audio/tower_destroyed.mp3','assets/audio/tower_destroyed.ogg']);
		game.load.audio('upgrade',['assets/audio/upgrade.mp3','assets/audio/upgrade.ogg']);
		
		game.load.spritesheet('man', 'assets/img/man1.png', 235, 260, 5);
		game.load.image('fireRock','assets/img/firerock.png');
				
	},
	create: function(){

		game.add.sprite(0, 0, 'background');
		var sc = game.add.sprite(16,700,'scoreboard');
		sc.scale.setTo(0.3,0.3);
		
		base = game.add.sprite(91,414,'base');
		base.scale.setTo(0.818,1.2);
		base.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(base);

		bullets = game.add.group();
		bullets.enableBody = true;

		
		var turretButton = game.add.button(212,704,'rockB',this.placeTurret);
		var turretButton1 = game.add.button(362,704,'lance',this.placeTurret1);
		var turretButton2 = game.add.button(512,704,'fenceB',this.placeTurret2);
		var turretButton3 = game.add.button(662,704,'fireB',this.placeTurret3);
		removeButton = game.add.button(1000,780,'remove',this.removeTurret);
		removeButton.scale.setTo(0.5,0.5);
		uButton = game.add.button(970,704,'button2',this.upgradeT,this,1,0,2);
		uButton.scale.setTo(0.6,0.6);
		
		turretButton1.scale.setTo(0.25,0.25);
		turretButton.scale.setTo(0.25,0.25);
		turretButton2.scale.setTo(0.25,0.25);
		turretButton3.scale.setTo(0.25,0.25);
		T1 = game.add.text(252, 820,'$40', {fontSize: '16px' , fill: '#000'});
		T2 = game.add.text(402, 820,'$100', {fontSize: '16px' , fill: '#000'});
		T3 = game.add.text(552, 820, '$30', { fontSize: '16px', fill: '#000' });
		T4 = game.add.text(702, 820, '$50', { fontSize: '16px', fill: '#000' });
		scoreT = game.add.text(130, 735, '0', { fontSize: '16px', fill: '#000' });
		goldT = game.add.text(130, 765, '200', { fontSize: '16px', fill: '#000' });
		stats = game.add.text(850,704,'', {fontSize: '16px', fill: '#000'});
	},
	update: function(){
		timer++;			// the timer. 
		
		if(curretTurret == 0){
			uButton.inputEnabled = false;
			removeButton.inputEnabled = false;
			stats.text = '';
		}else{
			if(curretTurret.level<3){
				stats.text = 'level: ' + curretTurret.level+'\n'+'hp: '+ Math.round(curretTurret.hp)+'\n' + 'damage: ' +curretTurret.damage+'\n' + 'upGrade cost: ' + (curretTurret.level+1)*10;
			}else{
				stats.text = 'level: ' + curretTurret.level+'\n'+'hp: '+ Math.round(curretTurret.hp)+'\n' + 'damage: ' +curretTurret.damage+'\n' + 'upGrade cost: MAX' ;
			}
		}
		if (curretTurret.hp<=0){
			curretTurret = 0;
		}
		if(timer%4000==0){
			if(score>=30){
				var sElephant = new Enemies(game, 'superElephant', 1 , 1.9, 0, 250+score*1.5,3);
				game.add.existing(sElephant);
				game.physics.enable(sElephant);
				eArray.push(sElephant);
				game.physics.arcade.moveToObject(sElephant,base,35);
				var elephant_incoming = game.add.audio('elephant_incoming');
				elephant_incoming.play();
			}
		}
		if(timer%2000==0){
			if(score>=30){
				var Bboar = new Enemies(game, 'boar+', 1 , 0.5, 0, 150+Math.round(score/3),3);
				game.add.existing(Bboar);
				game.physics.enable(Bboar);
				eArray.push(Bboar);
				game.physics.arcade.moveToObject(Bboar,base,35);
			}
		}
		if(timer %1500 ==0){
			if(score>= 50){
				var elephant = new Enemies(game, 'elephant', 0 , 1.3, 0, 150+score,0);
				game.add.existing(elephant);
				game.physics.enable(elephant);
				eArray.push(elephant);
				game.physics.arcade.moveToObject(elephant,base,35);
				var elephant_incoming = game.add.audio('elephant_incoming');
				elephant_incoming.play();
			}
		}
		if(timer%700==0){
			if(score>=30){
				var boar = new Enemies(game, 'boar', 1 , 0.5, 0, 150+Math.round(score/3),1);
				game.add.existing(boar);
				game.physics.enable(boar);
				eArray.push(boar);
				game.physics.arcade.moveToObject(boar,base,35);
			}
		}
		
		if(timer%450 ==0){
			var duck = new Enemies(game, 'duck', 0 , 1, 0, 100,2);
			duck.scale.setTo(0.25,0.25);
			game.add.existing(duck);
			game.physics.enable(duck);
			eArray.push(duck);
			game.physics.arcade.moveToObject(duck,base,35);
		}
		if(iState == 0){
			if(game.input.mousePointer.isDown&&game.input.y<720&&game.input.x <1100){
				var mx = Math.floor(game.input.x/100);
				var my = Math.floor((game.input.y-130)/100);
				if(slots[my][mx]!=0&&slots[my][mx]!=1&&my<=5&&mx<=10){
					curretTurret = slots[my][mx];
					uButton.inputEnabled = true;
					removeButton.inputEnabled = true;
				
				}else{
					curretTurret = 0;
				}
			}
		}
	
		if(placeT!= 0){
			if(game.input.mousePointer.isDown&&placeT == 1){
				var mx = Math.floor(game.input.x/100); //locate the nearest slot
				var my = Math.floor((game.input.y-130)/100);
				if(my<6&&mx<12&&game.input.x<1057&&game.input.y>130){ //check if the slot exist
					if(slots[my][mx] == 0 && gold >= 40){	//check if slot is available and play has enough gold
						tArray.push(0);
						var currentT = timer;
						console.log(currentT);
						tArray[tArray.length-1] = new Player(game, 'man', 0, 0.5, 0, mx*100+32,my*100+152,currentT,0,mx,my,50,65);
						game.physics.enable(tArray[tArray.length-1]);
						var man_placement = game.add.audio('man_placement');
						man_placement.play();
						tArray[tArray.length-1].enableBody = true;
						tArray[tArray.length-1].body.immovable = true;
						game.add.existing(tArray[tArray.length-1]);
						turretN++;
						slots[my][mx] = tArray[tArray.length-1];  //mark the slot unavailable
						placeT = 0;
						iState = 0;
						gold = gold - 40;
						goldT.text = gold;
					}
				}
			}
			if(game.input.mousePointer.isDown&&placeT == 2){
				var mx = Math.floor(game.input.x/100); //locate the nearest slot
				var my = Math.floor((game.input.y-130)/100);
				if(my<6&&mx<12&&game.input.x<1057&&game.input.y>130){ //check if the slot exist
					if(slots[my][mx] == 0 && gold >= 100){	//check if slot is available and play has enough gold
						tArray.push(0);
						var currentT = timer;
						console.log(currentT);
						tArray[tArray.length-1] = new Player(game, 'man1', 0, 0.5, 0, mx*100+32,my*100+152,currentT,1,mx,my,100,100);
						game.physics.enable(tArray[tArray.length-1]);
						var man_placement = game.add.audio('man_placement');
						man_placement.play();
						tArray[tArray.length-1].enableBody = true;
						tArray[tArray.length-1].body.immovable = true;
						game.add.existing(tArray[tArray.length-1]);
						turretN++;
						slots[my][mx] = tArray[tArray.length-1];  //mark the slot unavailable
						placeT = 0;
						iState = 0;
						gold = gold - 100;
						goldT.text =  gold;
					}
				}
			}
			if(game.input.mousePointer.isDown&&placeT == 3){
				var mx = Math.floor(game.input.x/100); //locate the nearest slot
				var my = Math.floor((game.input.y-130)/100);
				if(my<6&&mx<12&&game.input.x<1057&&game.input.y>130){ //check if the slot exist
					if(slots[my][mx] == 0 && gold >= 10){	//check if slot is available and play has enough gold
						tArray.push(0);
						var currentT = timer;
						console.log(currentT);
						tArray[tArray.length-1] = new Player(game, 'fence', 0, 0.5, 0, mx*100+32,my*100+152,currentT,2,mx,my,500,0);
						game.physics.enable(tArray[tArray.length-1]);
						tArray[tArray.length-1].enableBody = true;
						tArray[tArray.length-1].body.immovable = true;
						game.add.existing(tArray[tArray.length-1]);
						turretN++;
						slots[my][mx] = tArray[tArray.length-1];  //mark the slot unavailable
						placeT = 0;
						iState = 0;
						gold = gold - 10;
						goldT.text =  gold;
					}else if(slots[my][mx] != 0 ){
						console.log('error!');
					}
				}
			}
			if(game.input.mousePointer.isDown&&placeT == 4){
				var mx = Math.floor(game.input.x/100); //locate the nearest slot
				var my = Math.floor((game.input.y-130)/100);
				if(my<6&&mx<12&&game.input.x<1057&&game.input.y>130){ //check if the slot exist
					if(slots[my][mx] == 0 && gold >= 50){	//check if slot is available and play has enough gold
						tArray.push(0);
						var currentT = timer;
						console.log(currentT);
						tArray[tArray.length-1] = new Player(game, 'fireT', 0, 0.25, 0, mx*100+32,my*100+152,currentT,3,mx,my,200,0);
						
						game.physics.enable(tArray[tArray.length-1]);
						tArray[tArray.length-1].enableBody = true;
						tArray[tArray.length-1].body.immovable = true;
						game.add.existing(tArray[tArray.length-1]);
						turretN++;
						slots[my][mx] = tArray[tArray.length-1];  //mark the slot unavailable
						placeT = 0;
						iState = 0;
						gold = gold - 50;
						goldT.text =  gold;
					}else if(slots[my][mx] != 0 ){
						console.log('error!');
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
					eArray.splice(i,1);					
				}
				if((timer-tArray[j].getT())%225 == 0 &&eArray[i]!=null &&Math.abs(eArray[i].body.x-tArray[j].body.x)<tArray[j].range&& tArray[j]!= null){
					if(tArray[j].type==0){
						if(tArray[j].buff == false){
							bullet = bullets.create(tArray[j].body.x+30,tArray[j].y-10,'bullet');
						}else{
							bullet = bullets.create(tArray[j].body.x+30,tArray[j].y-10,'fireRock');
						}
						bullet.scale.setTo(0.5,0.5);
						bullet.damage = tArray[j].damage;
						var rock_throw = game.add.audio('rock_throw');
						tArray[j].attack();
						rock_throw.play();
						game.physics.arcade.moveToObject(bullet,eArray[i],400);
					}else if(tArray[j].type == 1){
						if(tArray[j].buff ==false){
							bullet = bullets.create(tArray[j].body.x+30,tArray[j].y-10,'spear');
						}else{
							bullet = bullets.create(tArray[j].body.x+30,tArray[j].y-10,'firelance');
						}
						bullet.scale.setTo(0.25,0.25);
						bullet.anchor.setTo(0.5,0.5);
						bullet.rotation = game.physics.arcade.angleBetween(tArray[j],eArray[i])-80;

						
						bullet.damage = tArray[j].damage;
						var lance_throw = game.add.audio('lance_throw');
						tArray[j].attack();
						lance_throw.play();
						game.physics.arcade.moveToObject(bullet,eArray[i],600);
					}					
				}	
			}
			break;
			
		}
		
		game.physics.arcade.overlap(bullets, eArray, killElephant, null, this);
		//game.physics.arcade.overlap(eArray, tArray, turretDestroyed, null, this);
		game.physics.arcade.overlap(eArray, base, gameOver, null, this);
		game.physics.arcade.collide(eArray, tArray, eAttack, null, this);
	},
	placeTurret: function(){
		placeT = 1;
		iState = 1
	},
	placeTurret1: function(){
		placeT = 2;
		iState = 1;
	},
	placeTurret2: function(){
		placeT = 3;
		iState = 1;
	},
	placeTurret3: function(){
		placeT = 4;
		iState = 1;
	},
	upgradeT: function(){
		curretTurret.upgrade();
	},
	removeTurret: function() {
		slots[curretTurret.my][curretTurret.mx] = 0;
		curretTurret.alive = false;
		curretTurret.destroy();
		for(var i = 0;i<tArray.length;i++){			
			if(tArray[i].alive==false){
				tArray.splice(i,1);
			}
		}	
	}
	
}

function gameOver(elephant,base){
	game.state.start('GameOver');
	
}

function killElephant(elephant,bullet){
	elephant.hitP = elephant.hitP - bullet.damage;
	if(elephant.hitP <=0){
		gold = gold +7+ Math.round(elephant.maxH/50);
		score = score + Math.round(elephant.maxH/10);
		elephant.alive = false;
		elephant.kill();
		if(elephant.key=='duck'){
			var dodo_death = game.add.audio('dodo_death');
			dodo_death.play();
		}
		if(elephant.key=='superElephant'||elephant.key=='elephant'){
			var elephant_death = game.add.audio('elephant_death');
			elephant_death.play();
		}
		if(elephant.key=='boar'||elephant.key=='boar+'){
			var boar_death = game.add.audio('boar_death');
			boar_death.play();
		}
		for(var i = 0;i<eArray.length;i++){
			console.log('hi'+i);
			if(eArray[i].alive==false){
				eArray.splice(i,1);
				console.log('deleted');
			}
		}
		

		scoreT.text =  score;
		goldT.text =  gold;
	}		
	var hit = game.add.audio('hit');
	hit.volume = 3;
	hit.play();
	bullet.kill();

}

function eAttack(enemy,turret){
	if (timer%50 ==0){
		enemy.attack();
		turret.hp = turret.hp-50;
	}
	if (turret.hp<0){
		slots[turret.my][turret.mx] = 0;
		turret.alive = false;
		turret.destroy();
		for(var i = 0;i<tArray.length;i++){			
			if(tArray[i].alive==false){
				tArray.splice(i,1);
			}
		}	
	}

}

function turretDestroyed(elephant,turret){
	console.log(turret.my);
	console.log(turret.mx);
	slots[turret.my][turret.mx] = 0;
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
	
}


GameOver.prototype = {
	preload: function(){
		game.load.image('go','assets/img/gameover.png');
		game.load.image('bar','assets/img/bar.png');
	},
	create: function(){
		background = this.add.sprite(0,0, 'main');
		background.scale.setTo(1.2,1.5);
		var go = this.add.sprite(250,400,'go');
		go.scale.setTo(0.3,0.3);
		var scoreText = game.add.text(450,600,'Score: ' + score, { fontSize: '32px', fill: '#000' });;
	
		var sButton = game.add.button(812,704,'start',this.reStart);
		sButton.scale.setTo(0.7,0.7);
		title = game.add.text(900, 730, "Restart",{
			font: "32px Arial",
			fill: "#000",

		});
	
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			gold = 200;  //reset upon restart
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
	},
	reStart: function(){
		gold = 200;  //reset upon restart
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
game.state.add('MainMenu', MainMenu);
game.state.add('Instruction', Instruction);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');