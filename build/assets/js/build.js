var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
window.onload = function () {
    var game = new LD42.Game();
};
var Controls;
(function (Controls) {
    var Control = (function (_super) {
        __extends(Control, _super);
        function Control(game, key) {
            if (key === void 0) { key = null; }
            var _this = _super.call(this, game, -1280, -1280, key || "controls") || this;
            _this.controls = new Controls.ControlItem();
            _this.keyboard = _this.game.input.keyboard;
            game.add.existing(_this);
            return _this;
        }
        Control.prototype.update = function () {
            var keys = Object.keys(this.controls);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var curr = this.controls[key];
                curr.hold = this.keyboard.isDown(curr.key) ? 1 : 0;
                curr.pressed = (curr.previous === 0 && curr.hold === 1);
                curr.release = (curr.previous === 1 && curr.hold === 0);
                if (curr.previous !== curr.hold)
                    curr.previous = curr.hold;
            }
        };
        return Control;
    }(Phaser.Sprite));
    Controls.Control = Control;
})(Controls || (Controls = {}));
var Controls;
(function (Controls) {
    var ControlItem = (function () {
        function ControlItem(up, down, left, right, start, select, action1, action2, action3, action4, action5, action6, action7, action8) {
            if (up === void 0) { up = null; }
            if (down === void 0) { down = null; }
            if (left === void 0) { left = null; }
            if (right === void 0) { right = null; }
            if (start === void 0) { start = null; }
            if (select === void 0) { select = null; }
            if (action1 === void 0) { action1 = null; }
            if (action2 === void 0) { action2 = null; }
            if (action3 === void 0) { action3 = null; }
            if (action4 === void 0) { action4 = null; }
            if (action5 === void 0) { action5 = null; }
            if (action6 === void 0) { action6 = null; }
            if (action7 === void 0) { action7 = null; }
            if (action8 === void 0) { action8 = null; }
            this.up = Controls.ControlStateItem(up || Phaser.Keyboard.UP);
            this.down = Controls.ControlStateItem(down || Phaser.Keyboard.DOWN);
            this.left = Controls.ControlStateItem(left || Phaser.Keyboard.LEFT);
            this.right = Controls.ControlStateItem(right || Phaser.Keyboard.RIGHT);
            this.start = Controls.ControlStateItem(start || Phaser.Keyboard.ENTER);
            this.select = Controls.ControlStateItem(select || Phaser.Keyboard.ESC);
            this.action1 = Controls.ControlStateItem(action1 || Phaser.Keyboard.Z);
            this.action2 = Controls.ControlStateItem(action2 || Phaser.Keyboard.X);
            this.action3 = Controls.ControlStateItem(action3 || Phaser.Keyboard.C);
            this.action4 = Controls.ControlStateItem(action4 || Phaser.Keyboard.V);
            this.action5 = Controls.ControlStateItem(action5 || Phaser.Keyboard.A);
            this.action6 = Controls.ControlStateItem(action6 || Phaser.Keyboard.S);
            this.action7 = Controls.ControlStateItem(action7 || Phaser.Keyboard.D);
            this.action8 = Controls.ControlStateItem(action8 || Phaser.Keyboard.F);
        }
        return ControlItem;
    }());
    Controls.ControlItem = ControlItem;
})(Controls || (Controls = {}));
var Controls;
(function (Controls) {
    function ControlStateItem(key) {
        if (key === void 0) { key = Phaser.Keyboard.SPACEBAR; }
        return {
            hold: 0,
            pressed: false,
            release: false,
            previous: 0,
            key: key,
            value: 0
        };
    }
    Controls.ControlStateItem = ControlStateItem;
})(Controls || (Controls = {}));
var Helpers;
(function (Helpers) {
    Helpers.DEG_TO_RAD = Math.PI / 180;
    Helpers.RAD_TO_DEG = 180 / Math.PI;
    function approach(start, end, step) {
        if (start > end) {
            return Math.max(start - step, end);
        }
        else {
            return Math.min(start + step, end);
        }
    }
    Helpers.approach = approach;
})(Helpers || (Helpers = {}));
var LD42;
(function (LD42) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 64, 64, Phaser.AUTO, "ld42-game", null, true, false) || this;
            document.title = LD42.GameInfo.title + " : " + LD42.GameInfo.version + " : by " + LD42.GameInfo.author_display;
            var name = document.getElementById("ld42-name"), description = document.getElementById("ld42-description"), controls = document.getElementById("ld42-controls"), copy = document.getElementById("ld42-copy");
            if (name) {
                name.innerHTML = LD42.GameInfo.title + " <small>v" + LD42.GameInfo.version + "</small>";
            }
            if (description) {
                description.innerHTML = LD42.GameInfo.description;
            }
            if (controls) {
                controls.innerHTML = LD42.GameInfo.controls;
            }
            if (copy) {
                copy.innerHTML = LD42.GameInfo.copyright;
            }
            _this.state.add("Boot", LD42.Boot, false);
            _this.state.add("Preload", LD42.Preload, false);
            _this.state.add("Title", LD42.Title, false);
            _this.state.add("Play", LD42.Play, false);
            _this.state.start("Boot");
            return _this;
        }
        return Game;
    }(Phaser.Game));
    LD42.Game = Game;
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    LD42.AssetListBitmapFont = [
        {
            name: "anonymous_pro",
            texture: "assets/fonts/anonymous_pro_0.png",
            atlas: "assets/fonts/anonymous_pro.fnt",
            atlasData: null,
            ignore: false
        },
        {
            name: "arial",
            texture: "assets/fonts/arial_0.png",
            atlas: "assets/fonts/arial.fnt",
            atlasData: null,
            ignore: false
        },
        {
            name: "consolas",
            texture: "assets/fonts/consolas_0.png",
            atlas: "assets/fonts/consolas.fnt",
            atlasData: null,
            ignore: true
        },
        {
            name: "envy_code_r",
            texture: "assets/fonts/envy_code_r_0.png",
            atlas: "assets/fonts/envy_code_r.fnt",
            atlasData: null,
            ignore: false
        },
        {
            name: "ubuntumono",
            texture: "assets/fonts/ubuntumono_0.png",
            atlas: "assets/fonts/ubuntumono.fnt",
            atlasData: null,
            ignore: true
        },
        {
            name: "yx_ui",
            texture: "assets/fonts/yx_ui_0.png",
            atlas: "assets/fonts/yx_ui.fnt",
            atlasData: null,
            ignore: false
        }
    ];
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    LD42.AssetListImage = [
        {
            name: "bg_corridor",
            file: "assets/img/bg/bg_corridor.png",
            overwrite: false,
            ignore: false
        },
        {
            name: "spr_dial",
            file: "assets/img/sprite/spr_dial.png",
            overwrite: false,
            ignore: false
        },
        {
            name: "spr_door_l",
            file: "assets/img/sprite/spr_door_l.png",
            overwrite: false,
            ignore: false
        },
        {
            name: "spr_door_r",
            file: "assets/img/sprite/spr_door_r.png",
            overwrite: false,
            ignore: false
        },
        {
            name: "ui_escape",
            file: "assets/img/ui/ui_escape.png",
            overwrite: false,
            ignore: false
        },
        {
            name: "ui_title",
            file: "assets/img/ui/ui_title.png",
            overwrite: false,
            ignore: false
        },
        {
            name: "ui_wall",
            file: "assets/img/ui/ui_wall.png",
            overwrite: false,
            ignore: false
        },
        {
            name: "ui_wall_shadow",
            file: "assets/img/ui/ui_wall_shadow.png",
            overwrite: false,
            ignore: false
        }
    ];
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    LD42.AssetListSound = [
        {
            name: "ld42_intro",
            file: [
                "assets/music/ld42_intro.mp3",
                "assets/music/ld42_intro.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "ld42_song",
            file: [
                "assets/music/ld42_kronos.mp3",
                "assets/music/ld42_kronos.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_bell_01",
            file: [
                "assets/sound/snd_bell_01.mp3",
                "assets/sound/snd_bell_01.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_dial_01",
            file: [
                "assets/sound/snd_dial_01.mp3",
                "assets/sound/snd_dial_01.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_dial_02",
            file: [
                "assets/sound/snd_dial_02.mp3",
                "assets/sound/snd_dial_02.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_dial_03",
            file: [
                "assets/sound/snd_dial_03.mp3",
                "assets/sound/snd_dial_03.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_dial_04",
            file: [
                "assets/sound/snd_dial_04.mp3",
                "assets/sound/snd_dial_04.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_dial_05",
            file: [
                "assets/sound/snd_dial_05.mp3",
                "assets/sound/snd_dial_05.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_dial_06",
            file: [
                "assets/sound/snd_dial_06.mp3",
                "assets/sound/snd_dial_06.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_dial_07",
            file: [
                "assets/sound/snd_dial_07.mp3",
                "assets/sound/snd_dial_07.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_dial_08",
            file: [
                "assets/sound/snd_dial_08.mp3",
                "assets/sound/snd_dial_08.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_dial_09",
            file: [
                "assets/sound/snd_dial_09.mp3",
                "assets/sound/snd_dial_09.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_dial_10",
            file: [
                "assets/sound/snd_dial_10.mp3",
                "assets/sound/snd_dial_10.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_dial_11",
            file: [
                "assets/sound/snd_dial_11.mp3",
                "assets/sound/snd_dial_11.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_dial_12",
            file: [
                "assets/sound/snd_dial_12.mp3",
                "assets/sound/snd_dial_12.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_door_01",
            file: [
                "assets/sound/snd_door_01.mp3",
                "assets/sound/snd_door_01.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_door_02",
            file: [
                "assets/sound/snd_door_02.mp3",
                "assets/sound/snd_door_02.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_door_03",
            file: [
                "assets/sound/snd_door_03.mp3",
                "assets/sound/snd_door_03.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_door_04",
            file: [
                "assets/sound/snd_door_04.mp3",
                "assets/sound/snd_door_04.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_door_05",
            file: [
                "assets/sound/snd_door_05.mp3",
                "assets/sound/snd_door_05.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_lock_01",
            file: [
                "assets/sound/snd_lock_01.mp3",
                "assets/sound/snd_lock_01.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_lock_02",
            file: [
                "assets/sound/snd_lock_02.mp3",
                "assets/sound/snd_lock_02.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_lock_03",
            file: [
                "assets/sound/snd_lock_03.mp3",
                "assets/sound/snd_lock_03.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_lock_04",
            file: [
                "assets/sound/snd_lock_04.mp3",
                "assets/sound/snd_lock_04.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_lock_05",
            file: [
                "assets/sound/snd_lock_05.mp3",
                "assets/sound/snd_lock_05.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_start_01",
            file: [
                "assets/sound/snd_start_01.mp3",
                "assets/sound/snd_start_01.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "snd_wall_loop",
            file: [
                "assets/sound/snd_wall_loop.mp3",
                "assets/sound/snd_wall_loop.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "vox_escape_01",
            file: [
                "assets/sound/vox_escape_01.mp3",
                "assets/sound/vox_escape_01.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "vox_escape_02",
            file: [
                "assets/sound/vox_escape_02.mp3",
                "assets/sound/vox_escape_02.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "vox_escape_03",
            file: [
                "assets/sound/vox_escape_03.mp3",
                "assets/sound/vox_escape_03.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "vox_unlockr_01",
            file: [
                "assets/sound/vox_unlockr_01.mp3",
                "assets/sound/vox_unlockr_01.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "vox_unlockr_02",
            file: [
                "assets/sound/vox_unlockr_02.mp3",
                "assets/sound/vox_unlockr_02.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "vox_unlockr_03",
            file: [
                "assets/sound/vox_unlockr_03.mp3",
                "assets/sound/vox_unlockr_03.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "vox_wall_01",
            file: [
                "assets/sound/vox_wall_01.mp3",
                "assets/sound/vox_wall_01.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "vox_wall_02",
            file: [
                "assets/sound/vox_wall_02.mp3",
                "assets/sound/vox_wall_02.ogg"
            ],
            autoDecode: false,
            ignore: false
        },
        {
            name: "vox_wall_03",
            file: [
                "assets/sound/vox_wall_03.mp3",
                "assets/sound/vox_wall_03.ogg"
            ],
            autoDecode: false,
            ignore: false
        }
    ];
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    LD42.AssetListSpritesheet = [
        {
            name: "bg_corridor_sprite",
            file: "assets/img/bg/bg_corridor_sprite.png",
            frameWidth: 64,
            frameHeight: 64,
            frameMax: 12,
            margin: 0,
            spacing: 0,
            skipFrames: 0,
            ignore: false
        }
    ];
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    LD42.Assets = {
        image: LD42.AssetListImage,
        sound: LD42.AssetListSound,
        spritesheet: LD42.AssetListSpritesheet,
        bitmapfont: LD42.AssetListBitmapFont
    };
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    LD42.GameInfo = {
        title: "UNLOCKR",
        version: "0.1.1",
        description: "A small infinite runner for the claustrophobic.<br>Open your way by unlocking doors and avoid getting crushed!",
        controls: "<strong>Left/Right</strong>: turn the dial<br><strong>Enter</strong>: start/skip.",
        author: "Fabio Y. Goto",
        author_display: "YUITI",
        copyright: "©2018 YUITI"
    };
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    var approach = Helpers.approach;
    var Dial = (function (_super) {
        __extends(Dial, _super);
        function Dial(game, x, y, group) {
            if (group === void 0) { group = null; }
            var _this = _super.call(this, game, x, y, "spr_dial", 0) || this;
            _this.discard = false;
            _this.direction = 0;
            _this.speed = 0;
            _this.speed_max = 8;
            _this.accel = 0.25;
            _this.decel = 0.5;
            _this.turn = 0;
            _this.sounds = {};
            _this.sound_time = 0;
            _this.anchor.setTo(0.5, 0.5);
            _this.alive = true;
            _this.sounds = {};
            _this.loadSounds();
            game.add.existing(_this);
            if (group)
                group.add(_this);
            _this.group = group;
            return _this;
        }
        Dial.prototype.killDial = function () {
            if (this.alive) {
                this.alive = false;
                var sign_x = (Math.random() < .5) ? -1 : 1, sign_a = (Math.random() < .5) ? -1 : 1;
                this.game.add.tween(this).to({
                    y: this.y + 96
                }, 500, Phaser.Easing.Back.In, true, 0, 0);
                this.game.add.tween(this).to({
                    x: this.x + Math.round(Math.random() * 32) * sign_x,
                    angle: this.angle + (40 * sign_a)
                }, 500, Phaser.Easing.Linear.None, true, 0, 0).onComplete.add(function () {
                    this.discard = true;
                    this.group.remove(this);
                    this.destroy();
                }, this);
                this.game.add.tween(this).to({
                    alpha: 0
                }, 200, Phaser.Easing.Linear.None, true, 200, 0);
                this.game.add.tween(this.scale).to({
                    x: 1.5,
                    y: 1.5
                }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            }
        };
        Dial.prototype.loadSounds = function () {
            for (var i = 1; i <= 12; i++) {
                var n = i.toString();
                if (n.length < 2)
                    n = "0" + n;
                this.sounds["dial_" + n] = this.game.add.sound("snd_dial_" + n, 0.3, false);
            }
        };
        Dial.prototype.playSounds = function () {
            var n = (1 + Math.floor(Math.random() * 11)).toString();
            if (n.length < 2)
                n = "0" + n;
            this.sounds["dial_" + n].play();
        };
        Dial.prototype.playDialSound = function () {
            if (this.turn != 0) {
                if (this.sound_time == 0) {
                    this.playSounds();
                    this.sound_time = Math.round(this.speed_max * (1.5 - (Math.abs(this.turn) / this.speed_max)));
                }
                else {
                    this.sound_time -= 1;
                }
            }
            else {
                this.sound_time = 0;
            }
        };
        Dial.prototype.turnDial = function () {
            if (this.alive && Math.abs(this.direction)) {
                if (Math.sign(this.speed) !== Math.sign(this.direction)) {
                    this.speed = approach(this.speed, 0, this.decel);
                }
                this.speed = approach(this.speed, this.speed_max * this.direction, this.accel);
            }
            else {
                this.speed = approach(this.speed, 0, this.decel);
            }
            if (this.alive) {
                this.turn = Math.floor(this.speed);
                this.angle += this.turn;
                this.playDialSound();
            }
        };
        Dial.prototype.update = function () {
            this.turnDial();
        };
        return Dial;
    }(Phaser.Sprite));
    LD42.Dial = Dial;
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    var Door = (function (_super) {
        __extends(Door, _super);
        function Door(game, x, y, right, group) {
            if (right === void 0) { right = false; }
            if (group === void 0) { group = null; }
            var _this = _super.call(this, game, x, y, (right === true) ? "spr_door_r" : "spr_door_l", 0) || this;
            _this.discard = false;
            _this.rightSide = false;
            _this.anchor.set((right === true) ? 0 : 1, 0.5);
            _this.rightSide = right;
            game.add.existing(_this);
            if (group)
                group.add(_this);
            _this.group = group;
            return _this;
        }
        Door.prototype.killDoor = function () {
            if (this.alive) {
                this.alive = false;
                var move = (this.rightSide)
                    ? this.x + this.width
                    : this.x - this.width;
                this.game.add.tween(this).to({
                    x: move
                }, 1000, Phaser.Easing.Exponential.Out, true, 200, 0, false);
                this.game.add.tween(this).to({
                    alpha: 0
                }, 500, Phaser.Easing.Linear.None, true, 300, 0, false).onComplete.add(function () {
                    this.discard = true;
                    this.group.remove(this);
                    this.destroy();
                }, this);
                this.game.add.tween(this.scale).to({
                    x: 2,
                    y: 2
                }, 1000, Phaser.Easing.Exponential.Out, true, 300, 0, false);
            }
        };
        return Door;
    }(Phaser.Sprite));
    LD42.Door = Door;
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
            this.load.image("loader_in", "assets/img/ui/ui_loader_in.png", false);
            this.load.image("loader_out", "assets/img/ui/ui_loader_out.png", false);
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.smoothed = false;
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }
            else {
            }
            this.state.start("Preload");
        };
        return Boot;
    }(Phaser.State));
    LD42.Boot = Boot;
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    var Control = Controls.Control;
    var approach = Helpers.approach;
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.status = -1;
            _this.init_count = 0;
            _this.init_alpha = 0;
            _this.lock = 0;
            _this.lock_values = [];
            _this.wall_time = 0;
            _this.wall_time_count = 0;
            _this.wall_time_max = 64;
            _this.overall_time = 0;
            return _this;
        }
        Play.prototype.__boot = function () {
            this.controller = null;
            this.groups = null;
            this.sounds = null;
            this.sprites = null;
            this.ui = null;
            this.status = -1;
            this.init_count = 0;
            this.init_alpha = 0;
            this.lock = 0;
            this.lock_values = [];
            this.wall_time = 0;
            this.wall_time_count = 0;
            this.wall_time_max = 64;
            this.unlocked = 0;
            this.overall_time = 0;
        };
        Play.prototype.__init = function () {
            this.controller = new Control(this.game);
            this.groups = {
                bg: this.game.add.group(),
                next: this.game.add.group(),
                current: this.game.add.group(),
                prev: this.game.add.group(),
                ui: this.game.add.group(),
                overlay: this.game.add.group()
            };
            this.sounds = {};
            this.sprites = {
                bg: null,
                dial: null,
                doorL: null,
                doorR: null,
                wallText: null,
                escapeText: null,
                wallShadow: null
            };
            this.ui = {
                label_1: null,
                label_2: null,
                label_3: null,
                label_4: null,
                label_5: null,
                over_text: null,
                score_text: null,
                start_text: null
            };
            this.generateLabels();
            this.loadSounds();
            this.sprites.bg = this.game.add.sprite(0, 0, "bg_corridor_sprite");
            this.sprites.bg.animations.add("move", null, 30, true);
            this.sprites.bg.animations.play("move");
            this.sprites.bg.alpha = 0;
            this.groups.bg.add(this.sprites.bg);
            this.game.add.tween(this.sprites.bg).to({
                alpha: 1
            }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            this.sprites.wallText = this.game.add.sprite(0, 0, "ui_wall");
            this.sprites.wallText.alpha = 0;
            this.groups.overlay.add(this.sprites.wallText);
            this.sprites.wallShadow = this.game.add.sprite(0, 64, "ui_wall_shadow");
            this.sprites.wallShadow.alpha = 0;
            this.groups.overlay.add(this.sprites.wallShadow);
            this.game.time.events.add(Phaser.Timer.SECOND, this.initTimerEvent, this);
        };
        Play.prototype.initTimerEvent = function () {
            this.init_count += 1;
            this.sounds.bell.play();
            if (this.init_count === 1) {
                this.status = 0;
                this.playWallVoice();
                this.sprites.doorL = new LD42.Door(this.game, this.world.centerX, this.world.centerY, false, this.groups.current);
                this.sprites.doorR = new LD42.Door(this.game, this.world.centerX, this.world.centerY, true, this.groups.current);
                this.sprites.dial = new LD42.Dial(this.game, this.world.centerX, this.world.centerY, this.groups.current);
                this.sprites.doorL.scale.setTo(0, 0);
                this.game.add.tween(this.sprites.doorL.scale).to({
                    x: 1,
                    y: 1
                }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
                this.sprites.doorR.scale.setTo(0, 0);
                this.game.add.tween(this.sprites.doorR.scale).to({
                    x: 1,
                    y: 1
                }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
                this.sprites.dial.scale.setTo(0, 0);
                this.game.add.tween(this.sprites.dial.scale).to({
                    x: 1,
                    y: 1
                }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
            }
            if (this.init_count < 5) {
                this.game.time.events.add(Phaser.Timer.SECOND, this.initTimerEvent, this);
            }
            else {
                this.status = 1;
                this.playEscapeVoice();
                this.ui.escapeText = this.game.add.sprite(0, 0, "ui_escape", 0);
                this.ui.escapeText.anchor.setTo(0.5, 0.5);
                this.ui.escapeText.x = this.world.centerX;
                this.ui.escapeText.y = this.world.centerY + 16;
                this.ui.escapeText.alpha = 0;
                this.groups.ui.add(this.ui.escapeText);
                this.game.add.tween(this.ui.escapeText).to({
                    y: this.world.centerY,
                    alpha: 1
                }, 500, Phaser.Easing.Circular.Out, true, 0, 0, false).onComplete.add(function () {
                    this.game.add.tween(this.ui.escapeText).to({
                        y: this.world.centerY - 16,
                        alpha: 0
                    }, 500, Phaser.Easing.Circular.In, true, 500, 0, false).onComplete.add(function () {
                        this.groups.ui.remove(this.ui.escapeText);
                        this.ui.escapeText.destroy();
                    }, this);
                }, this);
                this.sprites.wallText.alpha = 0;
                this.populateLabels();
                this.sounds.song.play();
                this.sounds.wall_loop.play();
            }
        };
        Play.prototype.loadSounds = function () {
            for (var i = 1; i <= 5; i++) {
                this.sounds["door_0" + i] = this.game.add.sound("snd_door_0" + i, 0.3, false);
            }
            for (var i = 1; i <= 4; i++) {
                this.sounds["lock_0" + i] = this.game.add.sound("snd_lock_0" + i, 0.3, false);
            }
            for (var i = 1; i <= 4; i++) {
                this.sounds["wall_0" + i] = this.game.add.sound("vox_wall_0" + i, 0.75, false);
            }
            for (var i = 1; i <= 4; i++) {
                this.sounds["escape_0" + i] = this.game.add.sound("vox_escape_0" + i, 0.75, false);
            }
            this.sounds.bell = this.game.add.sound("snd_bell_01", 0.3, false);
            this.sounds.start = this.game.add.sound("snd_start_01", 0.5, false);
            this.sounds.song = this.game.add.sound("ld42_song", 0.5, true);
            this.sounds.wall_loop = this.game.add.sound("snd_wall_loop", 0.0, true);
        };
        Play.prototype.generateValues = function () {
            var values = [], curr = 0, rand = 0;
            while (values.length < 5) {
                rand = Math.round(Math.random() * 360);
                if (Math.random() < 0.5)
                    rand *= -1;
                if (Math.abs(rand) > 16
                    && Math.abs(curr - rand) > 32) {
                    values.push(rand);
                }
            }
            this.lock = 0;
            this.lock_values = values;
        };
        Play.prototype.generateLabels = function () {
            for (var i = 1; i <= 5; i++) {
                var label_name = "label_" + i.toString(), label_temp = this.game.add.bitmapText(0, 0, "yx_ui", "---", 10);
                label_temp.tint = 0xff0000;
                label_temp.anchor.setTo(0.5, 0.5);
                label_temp.x = this.world.centerX;
                label_temp.y = this.world.centerY + 30;
                label_temp.alpha = 0;
                this.groups.ui.add(label_temp);
                this.ui[label_name] = label_temp;
            }
        };
        Play.prototype.destroyLabels = function () {
            for (var i = 1; i <= 5; i++) {
                var label_name = "label_" + i.toString();
                this.groups.ui.remove(this.ui[label_name]);
                this.ui[label_name].destroy();
            }
        };
        Play.prototype.populateLabels = function () {
            this.generateValues();
            this.ui.label_1.text = this.setLabelValue(this.lock_values[this.lock]);
            this.ui.label_1.anchor.setTo(0.5, 0.5);
            this.ui.label_1.x = this.world.centerX;
            this.ui.label_1.y = this.world.centerY + 8;
            this.ui.label_1.alpha = 0;
            this.game.add.tween(this.ui.label_1).to({
                y: this.world.centerY,
                alpha: .8
            }, 500, Phaser.Easing.Quintic.Out, true);
            this.ui.label_2.text = this.setLabelValue(this.lock_values[this.lock + 1]);
            this.ui.label_2.anchor.setTo(0.5, 0.5);
            this.ui.label_2.x = this.world.centerX;
            this.ui.label_2.y = this.world.centerY + 16;
            this.ui.label_1.alpha = 0;
            this.game.add.tween(this.ui.label_2).to({
                y: this.world.centerY + 8,
                alpha: .25
            }, 500, Phaser.Easing.Quintic.Out, true);
        };
        Play.prototype.unlockValue = function () {
            var curr, next, prev, discard, recycle;
            this.playLockSound();
            if (this.lock == this.lock_values.length - 1) {
                this.status = 2;
                this.playDoorSound();
                this.game.add.tween(this.ui.label_4).to({
                    y: this.game.world.centerY - 16,
                    alpha: 0
                }, 300, Phaser.Easing.Quintic.Out, true, 0, 0, false);
                this.game.add.tween(this.ui.label_1).to({
                    y: this.game.world.centerY - 8,
                    alpha: 0
                }, 300, Phaser.Easing.Quintic.Out, true, 0, 0, false).onComplete.add(function () {
                    this.lock = 0;
                    this.unlocked += 1;
                    this.handleLevelChange();
                }, this);
            }
            else {
                recycle = this.ui.label_5;
                discard = this.ui.label_4;
                this.game.add.tween(discard).to({
                    y: this.game.world.centerY - 16,
                    alpha: 0
                }, 300, Phaser.Easing.Quintic.Out, true, 0, 0, false);
                this.ui.label_5 = discard;
                this.lock += 1;
                prev = this.ui.label_1;
                prev.text = "OK!";
                this.game.add.tween(prev).to({
                    y: this.game.world.centerY - 8,
                    alpha: .25
                }, 300, Phaser.Easing.Quintic.Out, true, 0, 0, false);
                this.ui.label_4 = prev;
                curr = this.ui.label_2;
                this.game.add.tween(curr).to({
                    y: this.game.world.centerY,
                    alpha: 0.8
                }, 300, Phaser.Easing.Quintic.Out, true, 0, 0, false);
                this.ui.label_1 = curr;
                if (this.lock < this.lock_values.length - 1) {
                    next = this.ui.label_3;
                    next.text = this.setLabelValue(this.lock_values[this.lock + 1]);
                    next.y = this.game.world.centerY + 16;
                    this.game.add.tween(next).to({
                        y: this.game.world.centerY + 8,
                        alpha: .25
                    }, 300, Phaser.Easing.Quintic.Out, true, 0, 0, false);
                    this.ui.label_2 = next;
                    this.ui.label_3 = recycle;
                }
            }
        };
        Play.prototype.setLabelValue = function (value) {
            if (Math.sign(value) < 0) {
                return "L" + Math.abs(value);
            }
            else {
                return "R" + Math.abs(value);
            }
        };
        Play.prototype.handleLevelChange = function () {
            var tempDial, tempDoorL, tempDoorR;
            this.destroyLabels();
            var new_y;
            if (this.unlocked > 9 && this.unlocked % 25 === 0) {
                new_y = approach(this.sprites.wallShadow.y, 64, 12);
                this.wall_time = approach(this.wall_time, 0, 4);
                this.sounds.bell.play();
            }
            else if (this.unlocked > 9 && this.unlocked % 10 === 0) {
                new_y = approach(this.sprites.wallShadow.y, 64, 6);
                this.wall_time = approach(this.wall_time, 0, 4);
                this.sounds.bell.play();
            }
            else {
                new_y = approach(this.sprites.wallShadow.y, 64, 2);
                this.wall_time = approach(this.wall_time, 0, 2);
            }
            this.wall_time_count = 0;
            this.game.add.tween(this.sprites.wallShadow).to({
                y: new_y,
                alpha: (64 - new_y) / 64
            }, 300, Phaser.Easing.Cubic.Out, true, 0, 0, false);
            tempDoorL = this.sprites.doorL;
            this.groups.current.remove(tempDoorL);
            this.groups.prev.add(tempDoorL);
            tempDoorL.killDoor();
            tempDoorR = this.sprites.doorR;
            this.groups.current.remove(tempDoorR);
            this.groups.prev.add(tempDoorR);
            tempDoorR.killDoor();
            tempDial = this.sprites.dial;
            this.groups.current.remove(tempDial);
            this.groups.prev.add(tempDial);
            tempDial.killDial();
            this.sprites.doorL = new LD42.Door(this.game, this.world.centerX, this.world.centerY, false, this.groups.current);
            this.sprites.doorL.scale.setTo(0.5, 0.5);
            this.game.add.tween(this.sprites.doorL.scale).to({
                x: 1,
                y: 1
            }, 1000, Phaser.Easing.Quartic.Out, true, 500, 0, false);
            this.sprites.doorR = new LD42.Door(this.game, this.world.centerX, this.world.centerY, true, this.groups.current);
            this.sprites.doorR.scale.setTo(0.5, 0.5);
            this.game.add.tween(this.sprites.doorR.scale).to({
                x: 1,
                y: 1
            }, 1000, Phaser.Easing.Quartic.Out, true, 500, 0, false);
            this.sprites.dial = new LD42.Dial(this.game, this.world.centerX, this.world.centerY, this.groups.current);
            this.sprites.dial.scale.setTo(0.5, 0.5);
            this.game.add.tween(this.sprites.dial.scale).to({
                x: 1,
                y: 1
            }, 1000, Phaser.Easing.Quartic.Out, true, 500, 0, false).onComplete.add(function () {
                this.generateLabels();
                this.populateLabels();
                this.status = 1;
            }, this);
        };
        Play.prototype.playDoorSound = function () {
            var curr = (1 + Math.floor(Math.random() * 4)).toString();
            this.sounds["door_0" + curr].play();
        };
        Play.prototype.playLockSound = function () {
            var curr = (1 + Math.floor(Math.random() * 3)).toString();
            this.sounds["lock_0" + curr].play();
        };
        Play.prototype.playWallVoice = function () {
            var curr = (1 + Math.floor(Math.random() * 3)).toString();
            this.sounds["wall_0" + curr].play();
        };
        Play.prototype.playEscapeVoice = function () {
            var curr = (1 + Math.floor(Math.random() * 3)).toString();
            this.sounds["escape_0" + curr].play();
        };
        Play.prototype.statusInit = function () {
            this.init_alpha += 1;
            this.sprites.wallText.alpha = this.init_alpha / 60;
            if (this.init_alpha == 60)
                this.init_alpha = 0;
        };
        Play.prototype.statusPlay = function () {
            var controls = this.controller.controls;
            var turn = controls.right.hold - controls.left.hold;
            this.sprites.dial.direction = (turn != 0) ? turn : 0;
            this.wall_time_count += 1;
            if (this.wall_time_count % 60 == 0) {
                this.wall_time += 1;
                this.overall_time += 1;
            }
            if (this.wall_time === this.wall_time_max) {
                this.sprites.dial.direction = 0;
                this.game.add.tween(this.sounds.song).to({
                    volume: 0.1
                }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                this.game.add.tween(this.sounds.wall_loop).to({
                    volume: 0
                }, 100, Phaser.Easing.Linear.None, true, 0, 0, false);
                this.sprites.wallShadow.alpha = 1;
                this.sprites.wallShadow.y = 0;
                this.status = 2;
                this.drawGameOverScreen();
            }
            else {
                if (this.sprites.wallShadow.y > 0) {
                    this.sprites.wallShadow.alpha = this.wall_time / this.wall_time_max;
                    this.sprites.wallShadow.y = this.wall_time_max - this.wall_time;
                    this.sounds.wall_loop.volume = .5 * (this.wall_time / this.wall_time_max);
                }
                if (Math.abs(this.sprites.dial.turn) > 0) {
                    var tempVals = this.lock_values[this.lock], tempTurn = this.sprites.dial.turn, tempSign = Math.sign(tempVals), tempMove = void 0;
                    if (Math.sign(tempVals) === Math.sign(tempTurn)) {
                        tempMove = approach(Math.abs(tempVals), 0, Math.abs(tempTurn));
                    }
                    else {
                        tempMove = Math.abs(tempVals) + Math.abs(tempTurn);
                    }
                    this.lock_values[this.lock] = tempMove * tempSign;
                    if (tempMove === 0) {
                        this.unlockValue();
                    }
                    else {
                        this.ui.label_1.text = this.setLabelValue(this.lock_values[this.lock]);
                    }
                }
            }
        };
        Play.prototype.drawGameOverScreen = function () {
            this.ui.over_text = this.game.add.bitmapText(0, 0, "yx_ui", "GAME OVER", 10);
            this.ui.over_text.anchor.setTo(0.5, 0.5);
            this.ui.over_text.x = this.world.centerX;
            this.ui.over_text.y = this.world.centerY;
            this.ui.over_text.alpha = 0;
            this.ui.over_text.tint = 0xff0000;
            this.game.add.tween(this.ui.over_text).to({
                y: 5,
                alpha: 1
            }, 500, Phaser.Easing.Exponential.Out, true, 0, 0, false);
            this.ui.score_text = this.game.add.bitmapText(0, 0, "yx_ui", "DOORS: " + this.unlocked + "\nTIME: " + this.overall_time, 10);
            this.ui.score_text.align = "center";
            this.ui.score_text.anchor.setTo(0.5, 0.5);
            this.ui.score_text.x = this.world.centerX;
            this.ui.score_text.y = this.world.centerY + 16;
            this.ui.score_text.alpha = 0;
            this.ui.score_text.tint = 0xffff00;
            this.game.add.tween(this.ui.score_text).to({
                y: this.world.centerY + 1,
                alpha: 1
            }, 500, Phaser.Easing.Exponential.Out, true, 0, 0, false);
            this.ui.start_text = this.game.add.bitmapText(0, 0, "envy_code_r", "Press Enter", 12);
            this.ui.start_text.anchor.setTo(0.5, 0.5);
            this.ui.start_text.x = this.world.centerX;
            this.ui.start_text.y = this.world.centerY + 64;
            this.ui.start_text.alpha = 0;
            this.ui.start_text.tint = 0xcccccc;
            this.game.add.tween(this.ui.start_text).to({
                y: 56,
                alpha: 1
            }, 500, Phaser.Easing.Exponential.Out, true, 0, 0, false).onComplete.add(function () {
                this.status = 3;
            }, this);
        };
        Play.prototype.itIsOver = function () {
            var keysSprites = Object.keys(this.sprites);
            var keysLabels = Object.keys(this.ui);
            this.sounds.start.play();
            for (var _i = 0, keysSprites_1 = keysSprites; _i < keysSprites_1.length; _i++) {
                var key = keysSprites_1[_i];
                this.game.add.tween(this.sprites[key]).to({
                    alpha: 0
                }, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
            }
            for (var _a = 0, keysLabels_1 = keysLabels; _a < keysLabels_1.length; _a++) {
                var key = keysLabels_1[_a];
                this.game.add.tween(this.ui[key]).to({
                    alpha: 0
                }, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
            }
            this.game.add.tween(this.sounds.song).to({
                volume: 0
            }, 800, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function () {
                this.state.start("Title");
            }, this);
        };
        Play.prototype.create = function () {
            this.__boot();
            this.__init();
        };
        Play.prototype.update = function () {
            switch (this.status) {
                case 1:
                    this.statusPlay();
                    break;
                case 2:
                    break;
                case 3:
                    this.ui.start_text.alpha = 0.6 * Math.abs(Math.sin(this.game.time.now / 128));
                    if (this.controller.controls.start.pressed) {
                        this.status = 2;
                        this.itIsOver();
                    }
                    break;
                default:
                    this.statusInit();
                    break;
            }
        };
        Play.prototype.shutdown = function () {
            this.game.world.removeAll(true);
            this.__boot();
        };
        return Play;
    }(Phaser.State));
    LD42.Play = Play;
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    var Preload = (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preload.prototype.setLoaderImages = function () {
            this.preloadOut = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "loader_out");
            this.preloadOut.x -= this.preloadOut.width / 2;
            this.preloadOut.y -= this.preloadOut.height / 2;
            this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "loader_in");
            this.preloadBar.anchor.setTo(0, 0);
            this.preloadBar.x -= this.preloadBar.width / 2;
            this.preloadBar.y -= this.preloadBar.height / 2;
            this.load.setPreloadSprite(this.preloadBar, 0);
        };
        Preload.prototype.preload = function () {
            this.setLoaderImages();
            for (var _i = 0, _a = LD42.Assets.image; _i < _a.length; _i++) {
                var image = _a[_i];
                if (!image.ignore) {
                    this.load.image(image.name, image.file, image.overwrite);
                }
            }
            for (var _b = 0, _c = LD42.Assets.sound; _b < _c.length; _b++) {
                var sound = _c[_b];
                if (!sound.ignore) {
                    this.load.audio(sound.name, sound.file, sound.autoDecode);
                }
            }
            for (var _d = 0, _e = LD42.Assets.spritesheet; _d < _e.length; _d++) {
                var spritesheet = _e[_d];
                if (!spritesheet.ignore) {
                    this.load.spritesheet(spritesheet.name, spritesheet.file, spritesheet.frameWidth, spritesheet.frameHeight, spritesheet.frameMax, spritesheet.margin, spritesheet.spacing, spritesheet.skipFrames);
                }
            }
            for (var _f = 0, _g = LD42.Assets.bitmapfont; _f < _g.length; _f++) {
                var bitmapfont = _g[_f];
                if (!bitmapfont.ignore) {
                    this.load.bitmapFont(bitmapfont.name, bitmapfont.texture, bitmapfont.atlas, bitmapfont.atlasData);
                }
            }
        };
        Preload.prototype.create = function () {
            this.state.start("Title");
        };
        return Preload;
    }(Phaser.State));
    LD42.Preload = Preload;
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    var Control = Controls.Control;
    var Title = (function (_super) {
        __extends(Title, _super);
        function Title() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.finish = false;
            _this.status = -1;
            return _this;
        }
        Title.prototype.__boot = function () {
            this.bg = null;
            this.controller = null;
            this.credit = null;
            this.finish = false;
            this.press = null;
            this.sounds = null;
            this.status = -1;
            this.title = null;
        };
        Title.prototype.loadSounds = function () {
            this.sounds.intro = this.game.add.sound("ld42_intro", 0, true);
            this.sounds.start = this.game.add.sound("snd_start_01", 0.3, false);
            for (var i = 1; i <= 3; i++) {
                this.sounds["vox_unlockr_0" + i] = this.game.add.sound("vox_unlockr_0" + i, 0.3, false);
            }
        };
        Title.prototype.playUnlockr = function () {
            var num = 1 + Math.floor(Math.random() * 2);
            console.log(num);
            this.sounds["vox_unlockr_0" + num].play();
        };
        Title.prototype.drawTitleScreen = function () {
            this.bg = this.game.add.graphics(0, 0);
            this.bg.alpha = 0;
            this.bg.beginFill(0xffffff);
            this.bg.drawRect(0, 0, 64, 64);
            this.bg.endFill();
            this.game.add.tween(this.bg).to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            this.title = this.game.add.sprite(0, 0, "ui_title", 0);
            this.title.anchor.setTo(0.5, 0.5);
            this.title.x = this.world.centerX;
            this.title.y = this.world.centerY + 8;
            this.title.alpha = 0;
            this.game.add.tween(this.title).to({
                y: 21,
                alpha: 1
            }, 500, Phaser.Easing.Quintic.Out, true, 500, 0, false);
            this.credit = this.game.add.bitmapText(0, 0, "envy_code_r", "©2018 YUITI", 12);
            this.credit.tint = 0x000000;
            this.credit.alpha = 0;
            this.credit.anchor.setTo(0.5, 0.5);
            this.credit.x = this.world.centerX;
            this.credit.y = 72;
            this.game.add.tween(this.credit).to({
                y: 60,
                alpha: 1
            }, 500, Phaser.Easing.Quintic.Out, true, 700, 0, false);
            this.press = this.game.add.bitmapText(0, 0, "envy_code_r", "PRESS ENTER", 12);
            this.press.tint = 0xcccccc;
            this.press.alpha = 0;
            this.press.anchor.setTo(0.5, 0.5);
            this.press.x = this.world.centerX;
            this.press.y = 49;
            this.game.add.tween(this.press).to({
                alpha: .5
            }, 300, Phaser.Easing.Quintic.Out, true, 1000, 0, false).onComplete.add(function () {
                this.playUnlockr();
                this.finish = true;
                this.status = 0;
            }, this);
        };
        Title.prototype.statusDefault = function () {
            if (this.finish === true) {
                this.press.alpha = 1 * Math.abs(Math.sin(this.game.time.now / 512));
            }
            if (this.controller.controls.start.pressed) {
                this.status = 1;
                this.sounds.start.play();
                this.game.add.tween(this.title).to({
                    alpha: 0
                }, 300, Phaser.Easing.Linear.None, true, 100);
                this.game.add.tween(this.title).to({
                    y: -16
                }, 300, Phaser.Easing.Back.In, true).onComplete.add(function () {
                    this.status = 2;
                }, this);
                this.game.add.tween(this.credit).to({
                    alpha: 0
                }, 300, Phaser.Easing.Linear.None, true, 100);
                this.game.add.tween(this.credit).to({
                    y: 70
                }, 300, Phaser.Easing.Back.In, true);
            }
        };
        Title.prototype.statusPressed = function () {
            this.press.alpha = 1 * Math.abs(Math.sin(this.game.time.now / 64));
        };
        Title.prototype.statusFade = function () {
            this.game.add.tween(this.press).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, true, 100);
            this.game.add.tween(this.sounds.intro).to({
                volume: 0
            }, 400, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function () {
                this.sounds.intro.stop();
            }, this);
            this.game.add.tween(this.bg).to({
                alpha: 0
            }, 300, Phaser.Easing.Linear.None, true, 100).onComplete.add(function () {
                this.status = 3;
            }, this);
        };
        Title.prototype.create = function () {
            this.__boot();
            this.controller = new Control(this.game);
            this.sounds = {};
            this.loadSounds();
            this.sounds.intro.play();
            this.game.add.tween(this.sounds.intro).to({
                volume: 0.5
            }, 1000, Phaser.Easing.Linear.None, true, 500, 0, false);
            this.drawTitleScreen();
        };
        Title.prototype.update = function () {
            switch (this.status) {
                case 1:
                    this.statusPressed();
                    break;
                case 2:
                    this.statusFade();
                    break;
                case 3:
                    this.state.start("Play");
                    break;
                default:
                    this.statusDefault();
                    break;
            }
        };
        Title.prototype.shutdown = function () {
            this.game.world.removeAll(true);
            this.__boot();
        };
        return Title;
    }(Phaser.State));
    LD42.Title = Title;
})(LD42 || (LD42 = {}));
//# sourceMappingURL=build.js.map