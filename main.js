const MARGIN = 20;
const PLAYER_Y = height() - MARGIN;
const SPEED = 250;
const ENEMY_SPEED = 10;
const BULLET_SPEED = 350;


loadSprite("mark", "gfx/mark.png");
loadSprite("notmark", "gfx/notmark.png");

scene("main", (hiScore = 0) => {
    let score = 0;
    let dead = false;
    let bulletPresent = false;
    let enemyDirection = 1;
    let enemySpeedModifer = 1;

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
            spawnBullet(player.pos, "bullet")
        }
    }
    let spawnBullet = (position, tag) => {
        add([
            rect(2, 6),
            color(255, 255, 255),
            pos(position),
            origin("center"),
            area(),
            tag,
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
        destroy(player);
        shake(12);
        wait(2, () => {
            go("menu", hiScore);
        });
    }

    // Enemy
    let spawnWave = () => {
        for (let x = 0; x < 11; x++) {
            for (let y = 0; y < 5; y++) {
                spawnEnemy(pos(MARGIN * 2 + x * 35 , MARGIN * 2 + y * 30))
            }
        }
    };
    let spawnEnemy = (position) => {
        add([
            sprite("notmark"),
            scale(1),
            position,
            origin("center"),
            area(),
            "enemy"
        ])
    };
    onCollide("bullet", "enemy", (b, e) => {
        bulletPresent = false
        destroy(b);
        destroy(e);
        shake(3);
        enemySpeedModifer += 0.1;
        score += 20;
    });
    onCollide("bullet", "enemyBullet", (b, e) => {
        bulletPresent = false
        destroy(b);
        destroy(e);
        shake(1);
        score += 5;
    });
    onCollide("player", "enemy", (p, e) => {
        die();
        destroy(e);
    });
    onCollide("player", "enemyBullet", (p, e) => {
        die();
        destroy(e);
    });
    onUpdate("enemy", (e) => {
        e.angle = Math.sin(100 * time())
        if(!dead) {
            e.move(enemyDirection * ENEMY_SPEED * enemySpeedModifer, 0);
            if (e.pos.x > width() - MARGIN || e.pos.x < MARGIN) {
                enemyDirection = enemyDirection * -1;
                every("enemy", (e) => {
                    e.pos.y = e.pos.y + 15
                })
            } 
            if (rand(1, 10000) < 2 + enemySpeedModifer) spawnBullet(e.pos, "enemyBullet");
        }
    });

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
    onKeyDown("r", () => { go("main", hiScore); });
    onKeyDown("escape", () => { go("menu", hiScore); });

    // Start
    spawnWave();


});

go("main");