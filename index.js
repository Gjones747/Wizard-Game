const score = document.getElementById('score')

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);

let randomNumber;



function preload() {
    this.load.image('ground', 'images/background.png')
    
    this.load.spritesheet('dude', 
        'images/wizardSpriteSheetLarge.png',
        { frameWidth: 64, frameHeight: 64 }
    );
    this.load.spritesheet('enemy', 
        'images/orcSpriteSheet.png',
        { frameWidth: 64, frameHeight: 64 }
    );
    this.load.image('fireball', 'images/fireball.png')
    this.load.image('fireballUp', 'images/fireballUp.png')
    this.load.image('fireballLeft', 'images/fireballLeft.png')
    this.load.image('fireballDown', 'images/fireballDown.png')

    this.load.image('fireballHitBox', 'images/fireballHitBox.png')
    this.load.image('enemyHitBox', 'images/enemyHitBox.png')
}
let star;
let timer;
let enemy;
let player;
let fireballHitBox
let enemyHitBox
let enemyHitBox2
function moveEnemies(enemyName, playerName) {
    try {
        if (enemyName != null) {
            randomNumber = Math.ceil(Math.random() *2)
            if (randomNumber === 1) {
                if (enemyName.x > playerName.x) {
                    enemyName.setVelocityX(-160)
                    enemyName.setVelocityY(0)
                    enemyName.anims.play('enemyLeft',true)
                } else if (enemyName.x < playerName.x) {
                    enemyName.setVelocityX(160)
                    enemyName.setVelocityY(0)
                    enemyName.anims.play('enemyRight', true)
                }
            } else if (randomNumber === 2) {
                if (enemyName.y > playerName.y) {
                    enemyName.setVelocityY(-160)
                    enemyName.setVelocityX(0)
                    enemyName.anims.play('enemyUp', true)
                } else if (enemyName.y < playerName.y) {
                    enemyName.setVelocityY(160)
                    enemyName.setVelocityX(0)
                    enemyName.anims.play('enemyGoDown', true)
                }
            }
        }
    } catch {
        
    }
    
    
    
}

let enemyKilled = 0

function create() {
    

    

    this.add.image(0,0, 'ground').setOrigin(0,0);
    this.add.image(0, 1400, 'ground').setOrigin(0,0);
    this.add.image(1400, 0, 'ground').setOrigin(0,0);
    this.add.image(1400, 1400, 'ground').setOrigin(0,0)
    this.cameras.main.setSize(800,500)
    this.physics.world.setBounds(0, 0, 2800, 2800);

    enemy = this.physics.add.sprite(1200, 1200, 'enemy')
    enemy.setCollideWorldBounds(true)
    enemy2 = this.physics.add.sprite(1600, 1600, 'enemy')
    enemy2.setCollideWorldBounds(true)
    enemy3 = this.physics.add.sprite(1600, 1200, 'enemy')
    enemy3.setCollideWorldBounds(true)
    enemy4 = this.physics.add.sprite(1200, 1600, 'enemy')
    enemy4.setCollideWorldBounds(true)
    let enemyX = enemy.x
    let enemyY = enemy.y
    enemyHitBox = this.physics.add.image(enemyX, enemyY, 'enemyHitBox').setScale(2)
    enemyHitBox2 = this.physics.add.image(enemy2.x, enemy2.y, 'enemyHitBox').setScale(2)
    enemyHitBox3 = this.physics.add.image(enemy3.x, enemy3.y, 'enemyHitBox').setScale(2)
    enemyHitBox4 = this.physics.add.image(enemy4.x, enemy4.y, 'enemyHitBox').setScale(2)
    


    
    
    this.cameras.main.setBounds(0, 0, 2800, 2800);

    
    

    player = this.physics.add.sprite(1400, 1400, 'dude');
    player.setBounds = 12


    this.cameras.main.startFollow(player)
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 117, end: 125 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'goDown',
        frames: this.anims.generateFrameNumbers('dude', { start: 130, end: 138 }),
        frameRate: 10,
        repeat: 2
    })

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 130 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 143, end: 151 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dude', { start: 104, end: 112 }),
        frameRate: 10,
        
    });
    this.anims.create({
        key: 'die',
        frames: this.anims.generateFrameNumbers('dude', { start: 260, end: 265 }),
        frameRate: 10,
        loop: false
    });

    this.anims.create({
        key: 'dead',
        frames: [{key:'dude', frame:'265'}],
        
    })




    this.anims.create({
        key: 'enemyLeft',
        frames: this.anims.generateFrameNumbers('enemy', { start: 117, end: 125 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'enemyGoDown',
        frames: this.anims.generateFrameNumbers('enemy', { start: 130, end: 138 }),
        frameRate: 10,
        repeat: 2
    })

    this.anims.create({
        key: 'enemyTurn',
        frames: [ { key: 'enemy', frame: 26 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'enemyRight',
        frames: this.anims.generateFrameNumbers('enemy', { start: 143, end: 151 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'enemyUp',
        frames: this.anims.generateFrameNumbers('enemy', { start: 104, end: 112 }),
        frameRate: 10,
        
    });
    

    this.anims.create({
        key: 'enemyDie',
        frames: this.anims.generateFrameNumbers('enemy', { start: 260, end: 265 }),
        frameRate: 10,
        loop: false
    });
    
    timer = this.time.addEvent({
        delay: 400,                
        callback: moveEnemies,
        args: [enemy, player],

        loop: true,
    });

    timer = this.time.addEvent({
        delay: 420,                
        callback: moveEnemies,
        args: [enemy2, player],

        loop: true,
    });

    timer = this.time.addEvent({
        delay: 380,                
        callback: moveEnemies,
        args: [enemy3, player],

        loop: true,
    });

    timer = this.time.addEvent({
        delay: 400,                
        callback: moveEnemies,
        args: [enemy4, player],

        loop: true,
    });
    
    
    enemyHitBox.visible = false
    enemyHitBox2.visible = false
    enemyHitBox3.visible = false
    enemyHitBox4.visible = false
    enemy.depth = 85
}



let iter = 0
let playerUp
let fireball;
let fireballDirection;

let cursors
let playerDirection


let playerSide;
function update() {
    
    

    if (enemyKilled === 4) {
        scoreText = this.add.text(player.x-40, player.y, 'You Won', { fontSize: '32px', fill: '#000' });

        player.disableBody(true, true)


    }
    
    
    playerDirection = 0
    let playerX = player.x
    let playerY = player.y

    if (enemy != 0) {

        enemyHitBox.x = enemy.x
        enemyHitBox.y = enemy.y
        this.physics.add.overlap(enemyHitBox, fireballHitBox, killEnemy, null, this)
        function killEnemy() {
            randomNumber = null
            enemy.setVelocityX(0)
            enemy.setVelocityY(0)
            
            
    
    
            enemyHitBox.destroy()
            enemy.anims.play('enemyDie', true)
            enemy.once('animationcomplete', ()=>{ 
                enemy.destroy()
                enemy = 0
                enemyKilled+=1
                score.innerText = `Score ${enemyKilled}`
            });
        }
    }

    if (enemy2 != 0) {

        enemyHitBox2.x = enemy2.x
        enemyHitBox2.y = enemy2.y
        this.physics.add.overlap(enemyHitBox2, fireballHitBox, killEnemy, null, this)
        function killEnemy() {
            randomNumber = null
            enemy2.setVelocityX(0)
            enemy2.setVelocityY(0)
            
            
    
    
            enemyHitBox2.destroy()
            enemy2.anims.play('enemyDie', true)
            enemy2.once('animationcomplete', ()=>{ 
                enemy2.destroy()
                enemy2 = 0
                enemyKilled+=1
                score.innerText = `Score ${enemyKilled}`
            });
        }
    }

    if (enemy3 != 0) {

        enemyHitBox3.x = enemy3.x
        enemyHitBox3.y = enemy3.y
        this.physics.add.overlap(enemyHitBox3, fireballHitBox, killEnemy, null, this)
        function killEnemy() {
            randomNumber = null
            enemy3.setVelocityX(0)
            enemy3.setVelocityY(0)
            
            
    
    
            enemyHitBox3.destroy()
            enemy3.anims.play('enemyDie', true)
            enemy3.once('animationcomplete', ()=>{ 
                enemy3.destroy()
                enemy3 = 0
                enemyKilled+=1
                score.innerText = `Score ${enemyKilled}`
            });
        }
    }

    if (enemy4 != 0) {

        enemyHitBox4.x = enemy4.x
        enemyHitBox4.y = enemy4.y
        this.physics.add.overlap(enemyHitBox4, fireballHitBox, killEnemy, null, this)
        function killEnemy() {
            randomNumber = null
            enemy4.setVelocityX(0)
            enemy4.setVelocityY(0)
            
            
    
    
            enemyHitBox4.destroy()
            enemy4.anims.play('enemyDie', true)
            enemy4.once('animationcomplete', ()=>{ 
                enemy4.destroy()
                enemy4 = 0
                enemyKilled+=1
                score.innerText = `Score ${enemyKilled}`
            });
        }
    }
    
    let playerHitBox = this.physics.overlapRect(playerX, playerY, 10,10)

    if (playerHitBox.length > 1) {
        cursors = 0
    }

    if (cursors != 0) {
        cursors = this.input.keyboard.createCursorKeys();
        xKey = this.input.keyboard.addKey('X');  // Get key object
        
        if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) {
            player.setVelocityX(-160);
            playerSide = true
            player.anims.play('left', true);
            playerDirection = 'left'
        }
        else if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
            player.setVelocityX(160);
            playerSide = true
            player.anims.play('right', true);
            playerDirection = 'right'
        } else {
            player.setVelocityX(0);
            playerSide = false
        }
        if (cursors.up.isDown) {
            player.setVelocityY(-160);
            playerUp = true
            player.anims.play('up', true);
            playerDirection = 'up'
    
        } else if (cursors.down.isDown) {
            player.setVelocityY(160);
            playerUp = true
            player.anims.play('goDown', true);
            playerDirection = 'down'
        } else {
            player.setVelocityY(0)
            playerUp = false
        }
    
        if (!playerSide && !playerUp) {
            player.anims.play('turn', true)
        }
        
        if (xKey.isDown && !fireball && playerDirection === 'right') {
            fireball = this.physics.add.image(playerX + 60, playerY, 'fireball').setOrigin(0,0)
            fireballHitBox = this.physics.add.image(fireball.x, fireball.y, 'fireballHitBox').setScale(3)
            fireball.depth = 85
            fireballHitBox.visible = false

            fireballDirection = 'right'
        } else if (xKey.isDown && !fireball && playerDirection === 'left') {
            fireball = this.physics.add.image(playerX-50, playerY, 'fireballLeft').setOrigin(0,0)
            fireballHitBox = this.physics.add.image(fireball.x-10, fireball.y +5, 'fireballHitBox').setScale(3)
            fireballHitBox.visible = false
            fireball.depth = 85

            fireballDirection = 'left'
        } else if (xKey.isDown && !fireball && playerDirection === 'up') {
            fireball = this.physics.add.image(playerX, playerY-50, 'fireballUp').setOrigin(0,0)
            fireballHitBox = this.physics.add.image(fireball.x +5, fireball.y-10, 'fireballHitBox').setScale(3)
            fireballHitBox.visible = false
            fireball.depth = 85
            fireballDirection = 'up'
        } else if (xKey.isDown && !fireball) {

            fireball = this.physics.add.image(playerX, playerY + 60, 'fireballDown').setOrigin(0,0)
            fireballHitBox = this.physics.add.image(fireball.x + 5, fireball.y + 20, 'fireballHitBox').setScale(3)
            fireballHitBox.visible = false
            fireballDirection = 'down'
            fireball.depth = 85

        } else if (xKey.isDown && !fireball && playerDirection === 'down') {
            fireball = this.physics.add.image(playerX-50, playerY, 'fireballDown').setOrigin(0,0)
            fireballHitBox = this.physics.add.image(fireball.x + 50, fireball.y, 'fireballHitBox').setScale(2)

            fireballDirection = 'down'
            
        }
    } else {
        player.setVelocityX(0)
        player.setVelocityY(0)
        player.anims.play('die', true)
        player.once('animationcomplete', ()=>{ 
            player.disableBody(true, true)
        });
        gameOver = true
        scoreText = this.add.text(playerX, playerY, 'You Lost', { fontSize: '32px', fill: '#000' });

    }
    

    
    
    
    
    
    

    
    

    if (fireball ) {
        
        if (fireballDirection === 'right') {
            fireball.x += 5
            fireballHitBox.x += 5
            if (fireball.x > playerX+300) {
                fireball.destroy()
                fireball = null
                fireballHitBox.destroy()
            
            }
        } else if (fireballDirection === 'left') {
            fireball.x -= 5
            fireballHitBox.x -= 5
            if (fireball.x < playerX-370) {
                fireball.destroy()
                fireball = null
                fireballHitBox.destroy()

            }
        } else if (fireballDirection === 'up') {
            fireball.y -= 5
            fireballHitBox.y -= 5
            if (fireball.y < playerY-300) {
                fireball.destroy()
                fireball = null
                fireballHitBox.destroy()

            }
        } else if (fireballDirection === 'down') {
            fireball.y += 5
            fireballHitBox.y += 5
            if (fireball.y > playerY+300) {
                fireball.destroy()
                fireball = null
                fireballHitBox.destroy()

            
            }

        }
        
    }
    
}
