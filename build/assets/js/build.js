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
            key: key
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
    LD42.Assets = {
        image: [
            {
                name: "bg_main",
                file: "assets/img/bg/bg_main.png",
                overwrite: false,
                ignore: false
            },
            {
                name: "ui_wall",
                file: "assets/img/bg/ui_wall.png",
                overwrite: false,
                ignore: false
            },
            {
                name: "ui_wall_over",
                file: "assets/img/bg/ui_wall_over.png",
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
                name: "spr_lock",
                file: "assets/img/sprite/spr_lock.png",
                overwrite: false,
                ignore: false
            }
        ],
        sound: [
            {
                name: "snd_bell_01",
                file: [
                    "assets/sound/bell-01.mp3",
                    "assets/sound/bell-01.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_dial_01",
                file: [
                    "assets/sound/snd-dial-01.mp3",
                    "assets/sound/snd-dial-01.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_dial_02",
                file: [
                    "assets/sound/snd-dial-02.mp3",
                    "assets/sound/snd-dial-02.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_dial_03",
                file: [
                    "assets/sound/snd-dial-03.mp3",
                    "assets/sound/snd-dial-03.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_dial_04",
                file: [
                    "assets/sound/snd-dial-04.mp3",
                    "assets/sound/snd-dial-04.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_dial_05",
                file: [
                    "assets/sound/snd-dial-05.mp3",
                    "assets/sound/snd-dial-05.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_dial_06",
                file: [
                    "assets/sound/snd-dial-06.mp3",
                    "assets/sound/snd-dial-06.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_dial_07",
                file: [
                    "assets/sound/snd-dial-07.mp3",
                    "assets/sound/snd-dial-07.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_dial_08",
                file: [
                    "assets/sound/snd-dial-08.mp3",
                    "assets/sound/snd-dial-08.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_dial_09",
                file: [
                    "assets/sound/snd-dial-09.mp3",
                    "assets/sound/snd-dial-09.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_dial_10",
                file: [
                    "assets/sound/snd-dial-10.mp3",
                    "assets/sound/snd-dial-10.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_dial_11",
                file: [
                    "assets/sound/snd-dial-11.mp3",
                    "assets/sound/snd-dial-11.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_dial_12",
                file: [
                    "assets/sound/snd-dial-12.mp3",
                    "assets/sound/snd-dial-12.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_door_01",
                file: [
                    "assets/sound/snd-door-01.mp3",
                    "assets/sound/snd-door-01.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_door_02",
                file: [
                    "assets/sound/snd-door-02.mp3",
                    "assets/sound/snd-door-02.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_door_03",
                file: [
                    "assets/sound/snd-door-03.mp3",
                    "assets/sound/snd-door-03.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_door_04",
                file: [
                    "assets/sound/snd-door-04.mp3",
                    "assets/sound/snd-door-04.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_door_05",
                file: [
                    "assets/sound/snd-door-05.mp3",
                    "assets/sound/snd-door-05.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_lock_01",
                file: [
                    "assets/sound/lock-01.mp3",
                    "assets/sound/lock-01.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_lock_02",
                file: [
                    "assets/sound/lock-02.mp3",
                    "assets/sound/lock-02.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_lock_03",
                file: [
                    "assets/sound/lock-03.mp3",
                    "assets/sound/lock-03.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "snd_lock_04",
                file: [
                    "assets/sound/lock-04.mp3",
                    "assets/sound/lock-04.ogg"
                ],
                autoDecode: false,
                ignore: false
            },
            {
                name: "ld42_song",
                file: [
                    "assets/music/ld42-kronos.mp3",
                    "assets/music/ld42-kronos.ogg"
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
            },
            {
                name: "vox_wall_04",
                file: [
                    "assets/sound/vox_wall_04.mp3",
                    "assets/sound/vox_wall_04.ogg"
                ],
                autoDecode: false,
                ignore: false
            }
        ],
        spritesheet: [],
        bitmapfont: [
            {
                name: "consolas",
                texture: "assets/fonts/consolas_0.png",
                atlas: "assets/fonts/consolas.fnt",
                atlasData: null,
                ignore: false
            },
            {
                name: "ubuntumono",
                texture: "assets/fonts/ubuntumono_0.png",
                atlas: "assets/fonts/ubuntumono.fnt",
                atlasData: null,
                ignore: false
            },
            {
                name: "yx_ui",
                texture: "assets/fonts/yx_ui_0.png",
                atlas: "assets/fonts/yx_ui.fnt",
                atlasData: null,
                ignore: false
            }
        ]
    };
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 64, 64, Phaser.CANVAS, "ld42-game", null, true, false) || this;
            document.title = "UNLOCKR : v0.0.1 : by YUITI";
            var name = document.getElementById("ld42-name"), description = document.getElementById("ld42-description"), controls = document.getElementById("ld42-controls"), copy = document.getElementById("ld42-copy");
            name.innerHTML = "UNLOCKR <small>v0.0.1</small>";
            description.innerHTML = "A simple, minimalistic game about unlocking and escaping an infinite corridor";
            controls.innerHTML = "Left and Right to play, Enter to start";
            copy.innerHTML = "©2018 YUITI";
            _this.state.add("Boot", LD42.Boot, false);
            _this.state.add("Preload", LD42.Preload, false);
            _this.state.add("Test", LD42.Test, false);
            _this.state.add("Main", LD42.Main, false);
            _this.state.add("PlayTest", LD42.PlayTest, false);
            _this.state.start("Boot");
            return _this;
        }
        return Game;
    }(Phaser.Game));
    LD42.Game = Game;
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    var approach = Helpers.approach;
    var Dial = (function (_super) {
        __extends(Dial, _super);
        function Dial(game, x, y, group) {
            if (group === void 0) { group = null; }
            var _this = _super.call(this, game, x, y, "spr_lock", 0) || this;
            _this.direction = 0;
            _this.turn = 0;
            _this.speed = 0;
            _this.speed_max = 8;
            _this.factor_accel = 0.5;
            _this.factor_decel = 1.0;
            _this.sound_time = 0;
            _this.sound_group = {};
            _this.loadSounds();
            _this.anchor.setTo(0.5, 0.5);
            game.add.existing(_this);
            return _this;
        }
        Dial.prototype.update = function () {
            this.handleTurn();
        };
        Dial.prototype.loadSounds = function () {
            this.sound_group.dial_01 = this.game.add.sound("snd_dial_01", .3, false);
            this.sound_group.dial_02 = this.game.add.sound("snd_dial_02", .3, false);
            this.sound_group.dial_03 = this.game.add.sound("snd_dial_03", .3, false);
            this.sound_group.dial_04 = this.game.add.sound("snd_dial_04", .3, false);
            this.sound_group.dial_05 = this.game.add.sound("snd_dial_05", .3, false);
            this.sound_group.dial_06 = this.game.add.sound("snd_dial_06", .3, false);
            this.sound_group.dial_07 = this.game.add.sound("snd_dial_07", .3, false);
            this.sound_group.dial_08 = this.game.add.sound("snd_dial_08", .3, false);
            this.sound_group.dial_09 = this.game.add.sound("snd_dial_09", .3, false);
            this.sound_group.dial_10 = this.game.add.sound("snd_dial_10", .3, false);
            this.sound_group.dial_11 = this.game.add.sound("snd_dial_11", .3, false);
            this.sound_group.dial_12 = this.game.add.sound("snd_dial_12", .3, false);
        };
        Dial.prototype.playSound = function () {
            switch (Math.floor(Math.random() * 12)) {
                case 2:
                    this.sound_group.dial_02.play();
                    break;
                case 3:
                    this.sound_group.dial_03.play();
                    break;
                case 4:
                    this.sound_group.dial_04.play();
                    break;
                case 5:
                    this.sound_group.dial_05.play();
                    break;
                case 6:
                    this.sound_group.dial_06.play();
                    break;
                case 7:
                    this.sound_group.dial_07.play();
                    break;
                case 8:
                    this.sound_group.dial_08.play();
                    break;
                case 9:
                    this.sound_group.dial_09.play();
                    break;
                case 10:
                    this.sound_group.dial_10.play();
                    break;
                case 11:
                    this.sound_group.dial_11.play();
                    break;
                case 12:
                    this.sound_group.dial_12.play();
                    break;
                default:
                    this.sound_group.dial_01.play();
                    break;
            }
        };
        Dial.prototype.handleTurn = function () {
            if (this.direction != 0) {
                this.speed = approach(this.speed, this.speed_max * this.direction, this.factor_accel);
            }
            else {
                this.speed = approach(this.speed, 0, this.factor_decel);
            }
            this.turn = Math.floor(this.speed);
            this.angle += this.turn;
            if (this.turn != 0) {
                if (this.sound_time == 0) {
                    this.playSound();
                    this.sound_time = Math.round(8 * (1.5 - (Math.abs(this.turn) / this.speed_max)));
                }
                else {
                    this.sound_time -= 1;
                }
            }
            else {
                this.sound_time = 0;
            }
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
            var _this = this;
            if (right) {
                _this = _super.call(this, game, x, y, "spr_door_r", 0) || this;
                _this.anchor.set(0, 0.5);
            }
            else {
                _this = _super.call(this, game, x, y, "spr_door_l", 0) || this;
                _this.anchor.set(1, 0.5);
            }
            game.add.existing(_this);
            return _this;
        }
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
            this.load.image("loader_in", "assets/img/ui/loader_in.png", false);
            this.load.image("loader_out", "assets/img/ui/loader_out.png", false);
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
            this.state.start("Preload", true, false);
        };
        return Boot;
    }(Phaser.State));
    LD42.Boot = Boot;
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    var Control = Controls.Control;
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Main.prototype.shutdown = function () {
            this.world.removeAll();
        };
        Main.prototype.create = function () {
            this.controller = new Control(this.game, "controller_p1");
            var overText = this.game.add.bitmapText(0, 0, "yx_ui", "UNLOCKR", 10);
            overText.anchor.setTo(0.5, 0.5);
            overText.tint = 0xffffff;
            overText.x = this.game.world.centerX;
            overText.y = this.game.world.centerY + 16;
            overText.alpha = 0;
            this.game.add.tween(overText).to({
                y: this.game.world.centerY - 16,
                alpha: 1
            }, 500, Phaser.Easing.Quintic.Out, true, 100, 0, false);
            var startText = this.game.add.bitmapText(0, 0, "yx_ui", "Press Enter\nto Start", 10);
            startText.anchor.setTo(0.5, 0.5);
            startText.tint = 0xffffff;
            startText.x = this.game.world.centerX;
            startText.y = this.game.world.centerY + 16;
            startText.alpha = 0;
            this.game.add.tween(startText).to({
                y: this.game.world.centerY,
                alpha: 1
            }, 500, Phaser.Easing.Quintic.Out, true, 100, 0, false);
        };
        Main.prototype.update = function () {
            if (this.controller.controls.start.pressed) {
                this.state.start("PlayTest", true, false);
            }
        };
        return Main;
    }(Phaser.State));
    LD42.Main = Main;
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    var Control = Controls.Control;
    var approach = Helpers.approach;
    var PlayTest = (function (_super) {
        __extends(PlayTest, _super);
        function PlayTest() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.init_count = 0;
            _this.init_time = 0;
            _this.gameState = "begin";
            _this.unlocked = 0;
            _this.currLock = 0;
            _this.lockValues = [];
            _this.timerCurr = 60;
            _this.timerMaxTime = 60;
            return _this;
        }
        PlayTest.prototype.shutdown = function () {
            this.init_time = 0;
            this.init_count = 0;
            this.controller = null;
            this.g_spriteGroup = null;
            this.g_soundGroup = null;
            this.g_uiGroup = null;
            this.objectGroups = null;
            this.gameState = "begin";
            this.unlocked = 0;
            this.currLock = 0;
            this.lockValues = [];
            this.timer = null;
            this.timerCurr = 60;
            this.timerMaxTime = 60;
            this.game.world.removeAll(true);
        };
        PlayTest.prototype.create = function () {
            this.g_spriteGroup = {
                bg: null,
                dial: null,
                doorL: null,
                doorR: null,
                nextDial: null,
                nextDoorL: null,
                nextDoorR: null,
                wallOver: null,
                wallText: null
            };
            this.g_uiGroup = {
                currLabel: null,
                prevLabel: null,
                nextLabel: null,
                overLabel: null,
                scoreLabel: null
            };
            this.g_soundGroup = {};
            this.loadSounds();
            this.controller = new Control(this.game, "controller_p1");
            this.objectGroups = {
                background: this.game.add.group(),
                next: this.game.add.group(),
                current: this.game.add.group(),
                previous: this.game.add.group(),
                ui: this.game.add.group(),
                overlay: this.game.add.group()
            };
            this.g_spriteGroup.bg = this.game.add.tileSprite(0, 0, 64, 64, "bg_main");
            this.objectGroups.background.add(this.g_spriteGroup.bg);
            this.g_spriteGroup.doorL = new LD42.Door(this.game, 0, 0);
            this.g_spriteGroup.doorL.x = this.world.centerX;
            this.g_spriteGroup.doorL.y = this.world.centerY;
            this.objectGroups.current.add(this.g_spriteGroup.doorL);
            this.g_spriteGroup.doorR = new LD42.Door(this.game, 0, 0, true);
            this.g_spriteGroup.doorR.x = this.world.centerX;
            this.g_spriteGroup.doorR.y = this.world.centerY;
            this.objectGroups.current.add(this.g_spriteGroup.doorR);
            this.g_spriteGroup.dial = new LD42.Dial(this.game, 0, 0);
            this.g_spriteGroup.dial.x = this.world.centerX;
            this.g_spriteGroup.dial.y = this.world.centerY;
            this.objectGroups.current.add(this.g_spriteGroup.dial);
            this.g_spriteGroup.wallOver = this.game.add.tileSprite(0, 64, 64, 64, "ui_wall_over");
            this.objectGroups.ui.add(this.g_spriteGroup.wallOver);
            this.objectGroups.ui.bringToTop(this.g_spriteGroup.wallOver);
            this.g_spriteGroup.wallOver.alpha = 0;
            this.g_spriteGroup.wallText = this.game.add.tileSprite(0, 0, 64, 64, "ui_wall");
            this.objectGroups.overlay.add(this.g_spriteGroup.wallText);
        };
        PlayTest.prototype.update = function () {
            switch (this.gameState) {
                case "begin":
                    this.handleStart();
                    break;
                case "change":
                    this.handleLevelChange();
                    this.gameState = "wait";
                    break;
                case "wait":
                    console.log("WAIT");
                    break;
                case "over":
                    this.handleOver();
                    break;
                case "end":
                    if (this.controller.controls.start.pressed) {
                        this.g_soundGroup.song.stop();
                        this.state.start("Main");
                    }
                    break;
                case "unlock":
                default:
                    this.handleGamePlay();
                    break;
            }
        };
        PlayTest.prototype.handleOver = function () {
            this.gameState = "end";
            var _a = this.g_uiGroup, prevLabel = _a.prevLabel, currLabel = _a.currLabel, nextLabel = _a.nextLabel;
            this.g_soundGroup.song.volume = 0.1;
            if (prevLabel) {
                this.game.add.tween(prevLabel).to({
                    y: -16,
                    alpha: 0
                }, 300, Phaser.Easing.Linear.None, true);
            }
            if (currLabel) {
                this.game.add.tween(currLabel).to({
                    y: -16,
                    alpha: 0
                }, 300, Phaser.Easing.Linear.None, true);
            }
            if (nextLabel) {
                this.game.add.tween(nextLabel).to({
                    y: -16,
                    alpha: 0
                }, 300, Phaser.Easing.Linear.None, true);
            }
            var overText = this.game.add.bitmapText(0, 0, "yx_ui", "GAME OVER", 10);
            overText.anchor.setTo(0.5, 0.5);
            overText.tint = 0xffffff;
            overText.x = this.game.world.centerX;
            overText.y = this.game.world.centerY + 16;
            overText.alpha = 0;
            this.game.add.tween(overText).to({
                y: this.game.world.centerY - 16,
                alpha: 1
            }, 500, Phaser.Easing.Quintic.Out, true, 100, 0, false);
            this.g_uiGroup.overLabel = overText;
            var scoreText = this.game.add.bitmapText(0, 0, "yx_ui", this.unlocked.toString(), 20);
            scoreText.anchor.setTo(0.5, 0.5);
            scoreText.tint = 0xffffff;
            scoreText.x = this.game.world.centerX;
            scoreText.y = this.game.world.centerY + 16;
            scoreText.alpha = 0;
            this.game.add.tween(scoreText).to({
                y: this.game.world.centerY - 4,
                alpha: 1
            }, 500, Phaser.Easing.Quintic.Out, true, 100, 0, false);
            this.g_uiGroup.scoreLabel = scoreText;
        };
        PlayTest.prototype.handleStart = function () {
            if (this.init_time >= 18) {
                this.initVals();
                this.g_soundGroup.song.play();
                this.timer = this.game.time.now;
                this.game.add.tween(this.g_spriteGroup.wallText).to({
                    alpha: 0
                }, 100, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function () {
                }, this);
                this.gameState = "run";
            }
            else {
                if (this.init_time == 0 && this.init_count == 0) {
                    this.playWallSound();
                }
                this.init_count += 0.1;
                this.g_spriteGroup.wallText.alpha = Math.abs(Math.sin(this.init_count));
                if (this.g_spriteGroup.wallText.alpha > 0.95
                    && Math.sign(Math.sin(this.init_count)) > 0) {
                    this.g_spriteGroup.wallText.alpha = 1;
                    this.init_time += 1;
                    if (this.g_soundGroup.bell.isPlaying) {
                        this.g_soundGroup.bell.stop();
                    }
                    this.g_soundGroup.bell.play();
                    console.log(this.init_time);
                }
            }
        };
        PlayTest.prototype.handleGamePlay = function () {
            var controls = this.controller.controls;
            var dial = this.g_spriteGroup.dial;
            dial.direction = controls.right.hold - controls.left.hold;
            if (dial.turn) {
                var tempVals = this.lockValues[this.currLock], tempTurn = dial.turn, tempSign = Math.sign(tempVals), tempText = void 0, tempMove = void 0;
                console.log(tempVals + " : " + tempTurn);
                if (Math.sign(tempVals) === Math.sign(tempTurn)) {
                    tempMove = approach(Math.abs(tempVals), 0, Math.abs(tempTurn));
                }
                else {
                    tempMove = Math.abs(tempVals) + Math.abs(tempTurn);
                }
                this.lockValues[this.currLock] = tempMove * tempSign;
                tempText = (tempSign < 0)
                    ? "L" + tempMove.toString()
                    : "R" + tempMove.toString();
                if (this.g_uiGroup.currLabel) {
                    this.g_uiGroup.currLabel.text = tempText;
                }
                if (tempMove == 0) {
                    dial.direction = 0;
                    this.handleLabelChange();
                }
            }
            if ((this.game.time.now - this.timer) / 1000 > 1) {
                this.timer = this.game.time.now;
                this.timerCurr -= 1;
                if (this.timerCurr === 0) {
                    dial.direction = 0;
                    this.gameState = "over";
                }
            }
            var temp = 64 - Math.round((this.timerCurr / this.timerMaxTime) * 64);
            temp = 64 - temp;
            if (this.g_spriteGroup.wallOver.y > 0) {
                this.g_spriteGroup.wallOver.y = temp;
                this.g_spriteGroup.wallOver.alpha = 1 - (temp / 64);
            }
        };
        PlayTest.prototype.handleLevelChange = function () {
            this.gameState = "wait";
            this.unlocked += 1;
            if (this.unlocked % 10 === 0) {
                this.timerCurr = approach(this.timerCurr, this.timerMaxTime, 6);
                this.g_soundGroup.bell.play();
            }
            else {
                this.timerCurr = approach(this.timerCurr, this.timerMaxTime, 3);
            }
            var game = this.game;
            var _a = this.g_spriteGroup, dial = _a.dial, doorL = _a.doorL, doorR = _a.doorR, wallOver = _a.wallOver;
            var _b = this.objectGroups, previous = _b.previous, current = _b.current;
            var tempDial = dial, tempDoorL = doorL, tempDoorR = doorR;
            this.g_spriteGroup.doorL = new LD42.Door(this.game, 0, 0);
            this.g_spriteGroup.doorL.x = this.world.centerX;
            this.g_spriteGroup.doorL.y = this.world.centerY;
            this.g_spriteGroup.doorL.scale.setTo(0.5, 0.5);
            this.g_spriteGroup.doorR = new LD42.Door(this.game, 0, 0, true);
            this.g_spriteGroup.doorR.x = this.world.centerX;
            this.g_spriteGroup.doorR.y = this.world.centerY;
            this.g_spriteGroup.doorR.scale.setTo(0.5, 0.5);
            this.g_spriteGroup.dial = new LD42.Dial(this.game, 0, 0);
            this.g_spriteGroup.dial.x = this.world.centerX;
            this.g_spriteGroup.dial.y = this.world.centerY;
            this.g_spriteGroup.dial.scale.setTo(0.5, 0.5);
            current.add(this.g_spriteGroup.doorL);
            current.add(this.g_spriteGroup.doorR);
            current.add(this.g_spriteGroup.dial);
            current.remove(tempDial);
            current.remove(tempDoorL);
            current.remove(tempDoorR);
            previous.add(tempDoorL);
            previous.add(tempDoorR);
            previous.add(tempDial);
            tempDial.bringToTop();
            var sign = (Math.random() < .5) ? -1 : 1;
            game.add.tween(tempDial).to({
                y: tempDial.y + 96
            }, 500, Phaser.Easing.Back.In, true, 0, 0);
            game.add.tween(tempDial).to({
                x: tempDial.x + Math.round(Math.random() * 32) * sign,
                angle: tempDial.angle + 40
            }, 500, Phaser.Easing.Linear.None, true, 0, 0);
            game.add.tween(tempDial).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, true, 200, 0);
            game.add.tween(tempDial.scale).to({
                x: 2,
                y: 2
            }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            game.add.tween(tempDoorL).to({
                x: tempDoorL.x - tempDoorL.width
            }, 1000, Phaser.Easing.Exponential.Out, true, 200, 0, false);
            game.add.tween(tempDoorL).to({
                alpha: 0
            }, 1000, Phaser.Easing.Linear.None, true, 300, 0, false);
            game.add.tween(tempDoorL.scale).to({
                x: 2,
                y: 2
            }, 1000, Phaser.Easing.Exponential.Out, true, 300, 0, false);
            game.add.tween(tempDoorR).to({
                x: tempDoorR.x + tempDoorR.width
            }, 1000, Phaser.Easing.Exponential.Out, true, 200, 0, false);
            game.add.tween(tempDoorR).to({
                alpha: 0
            }, 1000, Phaser.Easing.Linear.None, true, 300, 0, false);
            game.add.tween(tempDoorR.scale).to({
                x: 2,
                y: 2
            }, 1000, Phaser.Easing.Exponential.Out, true, 300, 0, false);
            game.add.tween(wallOver).to({
                y: Math.round((this.timerCurr / this.timerMaxTime) * 64),
                alpha: 1 - (this.timerCurr / this.timerMaxTime)
            }, 500 * ((64 - wallOver.y) / 64), Phaser.Easing.Linear.None, true, 300, 0);
            game.add.tween(this.g_spriteGroup.doorL.scale).to({
                x: 1,
                y: 1
            }, 1000, Phaser.Easing.Quadratic.Out, true, 1000, 0, false);
            game.add.tween(this.g_spriteGroup.doorR.scale).to({
                x: 1,
                y: 1
            }, 1000, Phaser.Easing.Quadratic.Out, true, 1000, 0, false);
            var dialMove = game.add.tween(this.g_spriteGroup.dial.scale).to({
                x: 1,
                y: 1
            }, 1000, Phaser.Easing.Quadratic.Out, true, 1000, 0, false);
            dialMove.onComplete.add(function () {
                this.gameState = "run";
                this.lockValues = [];
                this.initVals();
            }, this);
            this.playDoorSound();
        };
        PlayTest.prototype.handleLabelChange = function () {
            var curr, next, prev, discard;
            this.playLockSound();
            discard = this.g_uiGroup.prevLabel;
            this.game.add.tween(discard).to({
                y: this.game.world.centerY - 16,
                alpha: 0
            }, 500, Phaser.Easing.Quintic.Out, true, 100, 0, false).onComplete.add(function () {
                discard.destroy();
            }, this);
            if (this.currLock == this.lockValues.length - 1) {
                this.gameState = "change";
                var currDiscard_1 = this.g_uiGroup.currLabel;
                currDiscard_1.text = "OK!";
                this.game.add.tween(currDiscard_1).to({
                    y: this.game.world.centerY - 8,
                    alpha: 0
                }, 500, Phaser.Easing.Quintic.Out, true, 100, 0, false).onComplete.add(function () {
                    currDiscard_1.destroy();
                }, this);
                this.g_uiGroup.prevLabel = null;
                this.g_uiGroup.currLabel = null;
                this.handleLevelChange();
            }
            else {
                console.log(this.currLock);
                this.currLock += 1;
                console.log(this.currLock);
                prev = this.g_uiGroup.currLabel;
                prev.text = "OK!";
                this.game.add.tween(prev).to({
                    y: this.game.world.centerY - 8,
                    alpha: .25
                }, 500, Phaser.Easing.Quintic.Out, true, 100, 0, false);
                this.g_uiGroup.prevLabel = prev;
                curr = this.g_uiGroup.nextLabel;
                this.game.add.tween(curr).to({
                    y: this.game.world.centerY,
                    alpha: 1
                }, 500, Phaser.Easing.Quintic.Out, true, 100, 0, false).onComplete.add(function () {
                    this.gameState = "run";
                }, this);
                this.g_uiGroup.currLabel = curr;
                if (this.currLock < this.lockValues.length - 1) {
                    var nextVal = (this.lockValues[this.currLock + 1] < 0)
                        ? "L" + Math.abs(this.lockValues[this.currLock + 1]).toString()
                        : "R" + this.lockValues[this.currLock + 1].toString();
                    next = this.game.add.bitmapText(0, 0, "yx_ui", nextVal, 10);
                    next.x = this.game.world.centerX;
                    next.y = this.game.world.centerY + 32;
                    next.anchor.setTo(0.5, 0.5);
                    next.alpha = 0;
                    next.tint = 0xff0000;
                    this.game.add.tween(next).to({
                        y: this.game.world.centerY + 8,
                        alpha: 0.25
                    }, 500, Phaser.Easing.Quintic.Out, true, 100, 0, false);
                    this.g_uiGroup.nextLabel = next;
                    this.objectGroups.ui.add(this.g_uiGroup.nextLabel);
                }
                else {
                    this.g_uiGroup.nextLabel = null;
                }
            }
        };
        PlayTest.prototype.generateAngles = function () {
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
            this.currLock = 0;
            this.lockValues = values;
            console.log("HY");
        };
        PlayTest.prototype.initVals = function () {
            this.generateAngles();
            var currVal = (this.lockValues[0] < 0)
                ? "L" + Math.abs(this.lockValues[0]).toString()
                : "R" + this.lockValues[0].toString();
            var currLabel = this.game.add.bitmapText(0, 0, "yx_ui", currVal, 10);
            currLabel.x = this.game.world.centerX;
            currLabel.y = this.game.world.centerY + 16;
            currLabel.anchor.set(0.5, 0.5);
            currLabel.alpha = 0;
            currLabel.tint = 0xff0000;
            this.game.add.tween(currLabel).to({
                y: this.game.world.centerY,
                alpha: 1
            }, 500, Phaser.Easing.Quintic.Out, true, 100, 0, false);
            this.g_uiGroup.currLabel = currLabel;
            this.objectGroups.ui.add(this.g_uiGroup.currLabel);
            var nextVal = (this.lockValues[1] < 0)
                ? "L" + Math.abs(this.lockValues[1]).toString()
                : "R" + this.lockValues[1].toString();
            var nextLabel = this.game.add.bitmapText(0, 0, "yx_ui", nextVal, 10);
            nextLabel.x = this.game.world.centerX;
            nextLabel.y = this.game.world.centerY + 32;
            nextLabel.anchor.set(0.5, 0.5);
            nextLabel.alpha = 0;
            nextLabel.tint = 0xff0000;
            this.game.add.tween(nextLabel).to({
                y: this.game.world.centerY + 8,
                alpha: 0.25
            }, 500, Phaser.Easing.Quintic.Out, true, 100, 0, false);
            this.g_uiGroup.nextLabel = nextLabel;
            this.objectGroups.ui.add(this.g_uiGroup.nextLabel);
        };
        PlayTest.prototype.loadSounds = function () {
            for (var i = 1; i <= 5; i++) {
                this.g_soundGroup["door_0" + i] = this.game.add.sound("snd_door_0" + i, 0.3, false);
            }
            for (var i = 1; i <= 4; i++) {
                this.g_soundGroup["lock_0" + i] = this.game.add.sound("snd_lock_0" + i, 0.3, false);
            }
            for (var i = 1; i <= 4; i++) {
                this.g_soundGroup["wall_0" + i] = this.game.add.sound("vox_wall_0" + i, 0.3, false);
            }
            this.g_soundGroup.bell = this.game.add.sound("snd_bell_01", 0.3, false);
            this.g_soundGroup.song = this.game.add.sound("ld42_song", 0.3, true);
        };
        PlayTest.prototype.playDoorSound = function () {
            switch (Math.round(Math.random() * 5)) {
                case 2:
                    this.g_soundGroup.door_02.play();
                    break;
                case 3:
                    this.g_soundGroup.door_03.play();
                    break;
                case 4:
                    this.g_soundGroup.door_04.play();
                    break;
                case 5:
                    this.g_soundGroup.door_05.play();
                    break;
                default:
                    this.g_soundGroup.door_01.play();
                    break;
            }
        };
        PlayTest.prototype.playLockSound = function () {
            switch (Math.round(Math.random() * 4)) {
                case 2:
                    this.g_soundGroup.lock_02.play();
                    break;
                case 3:
                    this.g_soundGroup.lock_03.play();
                    break;
                case 4:
                    this.g_soundGroup.lock_04.play();
                    break;
                default:
                    this.g_soundGroup.lock_01.play();
                    break;
            }
        };
        PlayTest.prototype.playWallSound = function () {
            switch (Math.round(Math.random() * 4)) {
                case 2:
                    this.g_soundGroup.wall_02.play();
                    break;
                case 3:
                    this.g_soundGroup.wall_03.play();
                    break;
                case 4:
                    this.g_soundGroup.wall_04.play();
                    break;
                default:
                    this.g_soundGroup.wall_01.play();
                    break;
            }
        };
        return PlayTest;
    }(Phaser.State));
    LD42.PlayTest = PlayTest;
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    var Preload = (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preload.prototype.setLoaderImage = function () {
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
            this.setLoaderImage();
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
                var font = _g[_f];
                if (!font.ignore) {
                    this.load.bitmapFont(font.name, font.texture, font.atlas, font.atlasData);
                }
            }
        };
        Preload.prototype.create = function () {
            this.state.start("Main");
        };
        return Preload;
    }(Phaser.State));
    LD42.Preload = Preload;
})(LD42 || (LD42 = {}));
var LD42;
(function (LD42) {
    var Control = Controls.Control;
    var Test = (function (_super) {
        __extends(Test, _super);
        function Test() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.degrees = 0;
            return _this;
        }
        Test.prototype.create = function () {
            this.count = 0;
            this.controller = new Control(this.game, "controller_p1");
            this.game_bg = this.game.add.tileSprite(0, 0, 64, 64, "bg_main");
            this.game_bg.alpha = 0.5;
            this.objectGroups = {
                next: this.game.add.group(),
                current: this.game.add.group()
            };
            this.dial = new LD42.Dial(this.game, this.game.world.centerX, this.game.world.centerY);
            this.nextDial = new LD42.Dial(this.game, this.game.world.centerX, this.game.world.centerY);
            this.nextDial.scale.setTo(0.5, 0.5);
            this.objectGroups.next.add(this.nextDial);
            this.objectGroups.current.add(this.dial);
            this.soundGroup = {};
            this.uiGroup = {};
            this.soundGroup.door_01 = this.game.add.sound("snd_door_01", 0.5, false);
            this.uiGroup.dialText = this.game.add.text(0, 0, this.degrees.toString(), {
                align: "center",
                fill: "#000",
                font: "yx_ui",
                fontSize: 8,
                fontWeight: 400
            });
            this.uiGroup.dialText.x = this.game.world.centerX - this.uiGroup.dialText.width / 2;
            this.uiGroup.dialText.y = this.game.world.centerY - this.uiGroup.dialText.height / 2;
        };
        Test.prototype.update = function () {
            this.handleDial();
            this.game_bg.alpha = Math.abs(1 * Math.sin(this.count / 8));
            if (this.dial.turn != 0) {
                this.degrees += this.dial.turn;
            }
            if (Math.abs(this.degrees) < 5
                && this.dial.direction != 0
                && !this.soundGroup.door_01.isPlaying) {
            }
            if (this.controller.controls.start.pressed) {
                var current_1 = this.dial;
                this.soundGroup.door_01.play();
                this.count = 0;
                this.dial = this.nextDial;
                this.objectGroups.current.add(this.dial);
                this.game.add.tween(this.dial.scale).to({
                    x: 1,
                    y: 1
                }, 500, Phaser.Easing.Linear.None, true, 200, 0, false);
                this.nextDial = new LD42.Dial(this.game, this.game.world.centerX, this.game.world.centerY);
                this.objectGroups.next.add(this.nextDial);
                this.nextDial.scale.set(0.5, 0.5);
                current_1.bringToTop();
                current_1.speed = 0;
                current_1.direction = 0;
                var tween = this.game.add.tween(current_1).to({
                    x: current_1.x + 3,
                    y: 128
                }, 1000, Phaser.Easing.Back.InOut, true, 0, 0);
                this.game.add.tween(current_1.scale).to({
                    x: 2,
                    y: 2
                }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                tween.onComplete.add(function () {
                    current_1.destroy();
                }, this);
            }
            this.count += 0.5;
            this.uiGroup.dialText.text = Math.abs(this.degrees).toString();
            this.uiGroup.dialText.x = this.game.world.centerX - this.uiGroup.dialText.width / 2;
            this.uiGroup.dialText.y = this.game.world.centerY - this.uiGroup.dialText.height / 2;
        };
        Test.prototype.handleDial = function () {
            var controls = this.controller.controls;
            this.dial.direction = controls.right.hold - controls.left.hold;
        };
        return Test;
    }(Phaser.State));
    LD42.Test = Test;
})(LD42 || (LD42 = {}));
//# sourceMappingURL=build.js.map