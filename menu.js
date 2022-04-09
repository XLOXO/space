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
    onKeyPress("r", () => { go("main", hiScore); });
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
        pos(240, 60),
        color(255, 255, 128),
        origin("center"),
        scale(1),
    ]);
    add([
        text("swilliamsio"),
        pos(240, 80),
        color(255, 255, 128),
        origin("center"),
        scale(2),
    ]);
    add([
        text("https://www.swilliams.io/"),
        pos(240, 100),
        color(255, 255, 128),
        origin("center"),
        area(),
        scale(1),
        "swilliamsio"
    ]);
    onClick("swilliamsio", () => window.open("https://www.swilliams.io/", '_blank'));
    add([
        text("Music:"),
        pos(240, 120),
        color(255, 255, 128),
        origin("center"),
        scale(1),
    ]);
    add([
        text("TeraVex"),
        pos(240, 140),
        color(255, 255, 128),
        origin("center"),
        scale(2),
    ]);
    add([
        text("https://www.newgrounds.com/audio/listen/997121"),
        pos(240, 160),
        color(255, 255, 128),
        origin("center"),
        area(),
        scale(1),
        "TeraVex"
    ]);
    onClick("TeraVex", () => window.open("https://www.newgrounds.com/audio/listen/997121", '_blank'));
    add([
        text("SFX:"),
        pos(240, 180),
        color(255, 255, 128),
        origin("center"),
        scale(1),
    ]);
    add([
        text("SwissArcadeGameEntertainment"),
        pos(240, 200),
        color(255, 255, 128),
        origin("center"),
        scale(2),
    ]);
    add([
        text("https://opengameart.org/content/sfx-the-ultimate-2017-16-bit-mini-pack"),
        pos(240, 220),
        color(255, 255, 128),
        origin("center"),
        area(),
        scale(1),
        "SwissArcadeGameEntertainment"
    ]);
    onClick("SwissArcadeGameEntertainment", () => window.open("https://opengameart.org/content/sfx-the-ultimate-2017-16-bit-mini-pack", '_blank'));
    add([
        text("SFX:"),
        pos(240, 240),
        color(255, 255, 128),
        origin("center"),
        scale(1),
    ]);
    add([
        text("Kenny"),
        pos(240, 260),
        color(255, 255, 128),
        origin("center"),
        scale(2),
    ]);
    add([
        text("https://kenney.nl"),
        pos(240, 280),
        color(255, 255, 128),
        origin("center"),
        area(),
        scale(1),
        "kenney"
    ]);
    onClick("kenney", () => window.open("https://kenney.nl", '_blank'));
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