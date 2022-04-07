scene("menu", (hiScore = 0) => {
    add([
        text(String(0).padStart(10, 0)),
        layer("ui"),
        pos(width() - 5, 5),
        color(255, 255, 128),
        origin("topright")
    ]);
    add([
        text("HI " + String(hiScore).padStart(10, 0)),
        layer("ui"),
        pos(5, 5),
        color(255, 255, 128),
        origin("topleft"),
    ]);

    add([
        text("MARK"),
        pos(width() / 2, 100),
        origin("center"),
        scale(18),
    ]);
    add([
        text("MARK"),
        pos(width() / 2 + 1, 101),
        origin("center"),
        scale(18),
        color(255, 255, 128),
    ]);
    add([
        text("INVADERS"),
        pos(width() / 2, 200),
        origin("center"),
        scale(9),
    ]);
    add([
        text("INVADERS"),
        pos(width() / 2 + 1, 201),
        origin("center"),
        scale(9),
        color(255, 255, 128),
    ]);

    // Start text
    let startText = add([
        text("Press Space to Start"),
        pos(240, 260),
        origin("center"),
        area(),
        scale(1.5),
        color(255, 255, 128),
        "start",
    ]);
    onClick("start", () => { go("main", hiScore); });
    loop(1, () => {
        startText.opacity = startText.opacity == 1 ? 0 : 1;
    });

    // Credits
    add([
        text("Credits"),
        pos(240, height() - 30),
        origin("bot"),
        area(),
        color(255, 255, 128),
        "credits"
    ]);
    onClick("credits", () => { go("credits", hiScore); });
    // Music and SFX mute buttons
    const musicText = add([
        text(musicMuted ? "Muted" : "Music"),
        pos(30, height() - 30),
        origin("botleft"),
        area(),
        color(255, 255, 128),
        "musicText"
    ]);
    onClick("musicText", () => {
        toggleMusic();
    });
    let toggleMusic = () => {
        musicMuted = !musicMuted;
        musicText.text = musicMuted ? "Muted" : "Music";
    }
    const sfxText = add([
        text(sfxMuted ? "Muted" : "SFX"),
        pos(width() - 30, height() - 30),
        origin("botright"),
        area(),
        color(255, 255, 128),
        "sfxText"
    ]);
    onClick("sfxText", () => {
        toggleSfx();
    });
    let toggleSfx = () => {
        sfxMuted = !sfxMuted;
        sfxText.text = sfxMuted ? "Muted" : "SFX";
    }

    onKeyPress("space", () => { go("main", hiScore); });
    onKeyPress("enter", () => { go("main", hiScore); });
    onKeyPress("escape", () => { go("menu", hiScore); });
    onKeyPress("1", () => { toggleMusic() });
    onKeyPress("2", () => { go('credits', hiScore); });
    onKeyPress("3", () => { toggleSfx(); });
});

scene("credits", (hiScore = 0) => {
    add([
        text(String(0).padStart(10, 0)),
        layer("ui"),
        pos(width() - 5, 5),
        color(255, 255, 128),
        origin("topright")
    ]);
    add([
        text("HI " + String(hiScore).padStart(10, 0)),
        layer("ui"),
        pos(5, 5),
        color(255, 255, 128),
        origin("topleft"),
    ]);
    add([
        text("Programming:"),
        pos(240, 100),
        color(255, 255, 128),
        origin("center"),
        scale(1),
    ]);
    add([
        text("swilliamsio"),
        pos(240, 120),
        color(255, 255, 128),
        origin("center"),
        scale(2),
    ]);
    add([
        text("https://www.swilliams.io/"),
        pos(240, 140),
        color(255, 255, 128),
        origin("center"),
        scale(1),
        "button",
        {
            clickAction: () => {
                window.open("https://www.swilliams.io/", '_blank');
            }
        },
    ]);
    add([
        text("Back"),
        pos(240, height() - 30),
        origin("bot"),
        area(),
        color(255, 255, 128),
        "back"
    ]);
    onClick("back", () => { go("menu", hiScore); });
    onKeyDown("escape", () => { go("menu", hiScore); });
    onKeyDown("1", () => { go("menu", hiScore); });
});

// go("menu");