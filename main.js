const MARGIN = 20;
const PLAYER_Y = height() - MARGIN;
const SPEED = 250;
const ENEMY_SPEED = 10;
const BULLET_SPEED = 350;
const BONUS_SPEED = 30;

const WAVE_ROWS = 4;
const WAVE_COLS = 11;
const WAVE_TIME_SECONDS = 4;


loadSprite("mark", "gfx/mark.png");
loadSprite("notmark", "gfx/notmark.png");
loadSprite("bean", "gfx/bean.png");
loadSprite("enemybullet1", "gfx/enemybullet1.png");
loadSprite("enemybullet2", "gfx/enemybullet2.png");
loadSprite("enemybullet3", "gfx/enemybullet3.png");
loadSprite("enemybullet4", "gfx/enemybullet4.png");
loadSprite("enemybullet5", "gfx/enemybullet5.png");

loadSound("bonus", "sfx/bonus.ogg");
loadSound("gameOver", "sfx/gameOver.ogg");
loadSound("enemyDeath", "sfx/enemyDeath.ogg");
loadSound("playerDeath", "sfx/playerDeath.ogg");
loadSound("bonusDeath", "sfx/bonusDeath.ogg");
loadSound("bulletImpact", "sfx/bulletImpact.ogg");
loadSound("enemyShoot", "sfx/enemyShoot.ogg");
loadSound("playerShoot", "sfx/playerShoot.ogg");

loadSound("music", "sfx/music.mp3");

scene("main", (hiScore = 0) => {
    let score = 0;
    let dead = false;
    let bulletPresent = false;
    let enemyDirection = 1;
    let enemySpeedModifer = 1;

    const music = play("music", {
        loop: true,
        volume: musicMuted ? 0 : 1.00
    });

    // Score
    let scoreLabel = add([
        text(String(score).padStart(10, 0)),
        layer("ui"),
        pos(width() - 5, 5),
        color(255, 255, 128),
        origin("topright"),
        "scoreLabel"
    ]);
    onUpdate("scoreLabel", () => {
        scoreLabel.text = String(score).padStart(10, 0);
    });
    let hiScoreLabel = add([
        text("HI " + String(hiScore).padStart(10, 0)),
        layer("ui"),
        pos(5, 5),
        color(255, 255, 128),
        origin("topleft"),
        "hiScoreLabel",
    ]);
    onUpdate("hiScoreLabel", () => {
        if (score > hiScore) {
            hiScore = score;
        }
        hiScoreLabel.text = "HI " + String(hiScore).padStart(10, 0);
    })

    // Player
    let player = add([
        sprite("mark"),
        scale(1),
        pos(width() / 2, PLAYER_Y),
        origin("center"),
        area(),
        "player"
    ]);
    // Player shooting
    let shoot = () => {
        if (!bulletPresent && !dead) {
            bulletPresent = true;
            playSfx("playerShoot");
            spawnBullet(player.pos)
        }
    }
    let spawnBullet = (position) => {
        add([
            rect(2, 6),
            color(255, 255, 255),
            pos(position),
            origin("center"),
            area(),
            "bullet",
        ]);

    }
    onUpdate("bullet", (bullet) => {
        bullet.move(0, -BULLET_SPEED);
        if (bullet.pos.y < 0) {
            bulletPresent = false;
            destroy(bullet);
        }
    });
    onUpdate("enemyBullet", (bullet) => {
        bullet.move(0, BULLET_SPEED);
        if (bullet.pos.y > height()) {
            destroy(bullet);
        }
    });

    // Player death
    let die = () => {
        dead = true;
        music.stop();
        destroy(player);
        playSfx("gameOver");
        destroyAll("bullet");
        shake(12);
        makeExplosion(player.pos, 20, 40, 30, 0.1)
        makeExplosion(player.pos, 20, 40, 30, 0.1)
        wait(2, () => {
            go("menu", hiScore);
        });
    }

    // Enemy
    let spawnWave = () => {
        for (let x = 0; x < WAVE_COLS; x++) {
            for (let y = 0; y < WAVE_ROWS; y++) {
                spawnEnemy(pos(MARGIN * 2 + x * 35 , MARGIN * 3 + y * 30))
            }
        }
    };
    let checkSpawnNewWave = () => {
        if (get("enemy").length === 0) {
            wait(WAVE_TIME_SECONDS, () => {
                spawnWave();
            })
        }
    }
    let spawnEnemy = (position) => {
        add([
            sprite("notmark"),
            scale(1),
            position,
            origin("center"),
            area(),
            rotate(0),
            "enemy"
        ])
    };
    onCollide("bullet", "enemy", (b, e) => {
        bulletPresent = false
        destroy(b);
        destroy(e);
        playSfx("enemyDeath");
        shake(3);
        enemySpeedModifer += 0.1;
        score += 20;
        checkSpawnNewWave();
        makeExplosion(e.pos, 4, 8, 1);
    });
    onCollide("bullet", "enemyBullet", (b, e) => {
        bulletPresent = false
        destroy(b);
        destroy(e);
        playSfx("bulletImpact");
        shake(1);
        score += 5;
        makeExplosion(e.pos, 3, 6, 1);
    });
    onCollide("player", "enemy", (p, e) => {
        die();
        destroy(e);
        playSfx("enemyDeath");
        shake(1);
        makeExplosion(e.pos, 4, 8, 1);
    });
    onCollide("player", "enemyBullet", (p, e) => {
        die();
        destroy(e);
        playSfx("bulletImpact");
        makeExplosion(e.pos, 4, 8, 1);
    });
    onUpdate("enemy", (e) => {
        e.angle = wave(-22, 22, time() * 2);
        if(!dead) {
            e.move(enemyDirection * ENEMY_SPEED * enemySpeedModifer, 0);
            if (e.pos.x > width() - MARGIN || e.pos.x < MARGIN) {
                enemyDirection = enemyDirection * -1;
                every("enemy", (e) => {
                    e.pos.y = e.pos.y + 5
                })
            } 
            if (rand(1, 10000) < 2 + enemySpeedModifer) spawnEnemyBullet(e.pos, "enemyBullet");
        }
    });
    let spawnEnemyBullet = (position) => {
        const spriteStr = "enemybullet" + randi(1, 6)
        playSfx("enemyShoot");
        add([
            sprite(spriteStr),
            color(255, 255, 255),
            pos(position),
            origin("center"),
            area(),
            "enemyBullet",
        ]);

    }

    // Bonuses
    let spawnBonus = () => {
        let direction = rand(-1, 1) > 0 ? 1 : -1;
        playSfx("bonus");
        add([
            sprite("bean"),
            scale(1),
            pos(direction > 0 ? -30 : width() + 30, MARGIN * 1.5),
            origin("center"),
            area(),
            rotate(0),
            "bonus",
            {
                dir: direction
            }
        ]);
    }
    onUpdate("bonus", (bonus) => {
        bonus.move(bonus.dir * BONUS_SPEED * enemySpeedModifer, 0);
        bonus.angle = wave(-45, 45, time());
        if (bonus.pos.x < -50 || bonus.pos.x > width() + 50) {
            destroy(bonus);
        }

    });
    onCollide("bullet", "bonus", (b, e) => {
        bulletPresent = false
        destroy(b);
        destroy(e);
        playSfx("bonusDeath");
        shake(3);
        score += 500;
        makeExplosion(e.pos, 5, 10, 1);
    });
    let spawnBonusLoop = () => {
        wait(randi(15, 30), () => {
            spawnBonus();
            spawnBonusLoop();
        })
    }
    // Starfield
    let spawnStar = () => {
        add([
            rect(1, 1),
            pos(width() / 2, height() / 2),
            origin("center"),
            color(255, 255, 255),
            lifespan(1),
            "star",
            z(-1),
            {
                angle: rand(0, 360),
                speed: rand(10, 20)
            }
        ])
    }
    onUpdate("star", (s) => {
        s.pos = s.pos.add(Vec2.fromAngle(s.angle).scale(s.speed));
    });
    let spawnStarLoop = () => {
        wait(rand(0, 0.05), () => {
            spawnStar();
            spawnStarLoop();
        })
    }

    // Explode
    let makeExplosion = (p, n=4, rad=8, size=1, life=0.2) => {
        for (let i = 0; i < n; i++) {
            wait(rand(n * 0.1), () => {
                for (let i = 0; i < 2; i++) {
                    add([
                        pos(p.add(rand(vec2(-rad), vec2(rad)))),
                        rect(1, 1),
                        scale(1 * size, 1 * size),
                        lifespan(life),
                        origin("center"),
                        "explosion",
                        {
                            scaler: rand(20, 100),
                            time: time()
                        }
                    ]);
                }
            });
        }
    };
    onUpdate("explosion", (e) => {
        e.scaleTo(e.scaler * (time() - e.time), e.scaler * (time() - e.time))
    })

    // Play SFX if its unmuted
    let playSfx = (sfx, volume, detune) => {
        volume = volume || 1.0;
        detune = detune || 0;
        if (!sfxMuted) {
            play(sfx, {
                volume: volume,
                detune: detune,
            });
        }
    };

    // Controls
    let move = (x) => {
        if (!dead) {
            player.move(x * SPEED, 0);
        }
    }
    // move
    onKeyDown("d", () => { if (player.pos.x < width() - MARGIN) move(1); });
    onKeyDown("right", () => { if (player.pos.x < width() - MARGIN) move(1); });
    onKeyDown("a", () => { if (player.pos.x > MARGIN) move(-1); });
    onKeyDown("left", () => { if (player.pos.x > MARGIN) move(-1); });
    // shoot
    onKeyDown("space", () => { shoot(); });
    onMouseDown(() => { shoot(); });
    // restart
    onKeyDown("r", () => { music.stop(); go("main", hiScore); });
    onKeyDown("escape", () => { music.stop(); go("menu", hiScore); });

    // Start
    spawnWave();
    spawnBonusLoop();
    spawnStarLoop();
});

go("menu");

// TODO
// Starfield
// Barriers