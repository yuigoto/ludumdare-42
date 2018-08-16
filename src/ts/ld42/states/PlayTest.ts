namespace LD42 {
  // Import stuff here
  import GroupCollection = Interfaces.GroupCollection;
  import ItemGroup = Interfaces.ItemGroup;
  import Control = Controls.Control;
  import approach = Helpers.approach;

  /**
   * LD42 : LD42/States/PlayTest
   * --------------------------------------------------------------------
   * Test state.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class PlayTest extends Phaser.State {
    // Properties
    // ------------------------------------------------------------------

    init_count: number = 0;
    init_time: number = 0;

    /**
     * Controller instance.
     */
    controller: Control;

    /**
     * To easily handle objects.
     */
    g_spriteGroup: ItemGroup;

    /**
     * For easy handling of sounds.
     */
    g_soundGroup: ItemGroup;

    /**
     * For easy handling of UI elements.
     */
    g_uiGroup: ItemGroup;

    /**
     * Handles all object groups.
     */
    objectGroups: GroupCollection;

    /**
     * The current game's state, between:
     * - "begin", the game is starting;
     * - "run", the game is running;
     * - "change", advancing levels;
     * - "wait", wait while advancing levels;
     * - "over", game over;
     * - "end", end state;
     */
    gameState: string = "begin";

    /**
     * Number of doors unlocked.
     */
    unlocked: number = 0;

    /**
     * Current user lock.
     */
    currLock: number = 0;

    /**
     * Holds the current lock's values.
     */
    lockValues: Array<number> = [];

    /**
     * Gameplay timer.
     */
    timer: number;

    timerCurr: number = 60;

    timerMaxTime: number = 60;

    // Lifecycle Methods
    // ------------------------------------------------------------------

    shutdown() {
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
    }

    create() {
      // CREATE GROUPS
      // ----------------------------------------------------------------
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
        // Number labels
        currLabel: null,
        prevLabel: null,
        nextLabel: null,
        overLabel: null,
        scoreLabel: null
      };

      this.g_soundGroup = {};

      // BOOTSTRAP LEVEL + CONTROLLER
      // ----------------------------------------------------------------

      // Load sounds
      this.loadSounds();

      // Initialize controller
      this.controller = new Control(this.game, "controller_p1");

      // GAME ELEMENT GROUPS
      // ----------------------------------------------------------------
      this.objectGroups = {
        background: this.game.add.group(),
        next: this.game.add.group(),
        current: this.game.add.group(),
        previous: this.game.add.group(),
        ui: this.game.add.group(),
        overlay: this.game.add.group()
      };

      // BACKGROUND ELEMENTS
      // ----------------------------------------------------------------
      this.g_spriteGroup.bg = this.game.add.tileSprite(
        0,
        0,
        64,
        64,
        "bg_main"
      );
      this.objectGroups.background.add(this.g_spriteGroup.bg);

      // SPRITES
      // ----------------------------------------------------------------
      this.g_spriteGroup.doorL = new Door(this.game, 0, 0);
      this.g_spriteGroup.doorL.x = this.world.centerX;
      this.g_spriteGroup.doorL.y = this.world.centerY;
      this.objectGroups.current.add(this.g_spriteGroup.doorL);

      this.g_spriteGroup.doorR = new Door(this.game, 0, 0, true);
      this.g_spriteGroup.doorR.x = this.world.centerX;
      this.g_spriteGroup.doorR.y = this.world.centerY;
      this.objectGroups.current.add(this.g_spriteGroup.doorR);

      this.g_spriteGroup.dial = new Dial(this.game, 0, 0);
      this.g_spriteGroup.dial.x = this.world.centerX;
      this.g_spriteGroup.dial.y = this.world.centerY;
      this.objectGroups.current.add(this.g_spriteGroup.dial);

      // USER INTERFACE
      // ----------------------------------------------------------------

      /*
      let text = this.game.add.bitmapText(
        10,
        10,
        "yx_ui",
        "960",
        10
      );
      text.x = this.game.world.centerX - (text.width / 2);
      text.y = this.game.world.centerY - (text.height / 2) + 8;
      text.alpha = 0;
      this.game.add.tween(text).to({
        y: text.y - 8,
        alpha: 1
      }, 200).start();
      */

      this.g_spriteGroup.wallOver = this.game.add.tileSprite(
        0,
        64,
        64,
        64,
        "ui_wall_over"
      );
      this.objectGroups.ui.add(this.g_spriteGroup.wallOver);
      this.objectGroups.ui.bringToTop(this.g_spriteGroup.wallOver);
      this.g_spriteGroup.wallOver.alpha = 0;

      this.g_spriteGroup.wallText = this.game.add.tileSprite(
        0,
        0,
        64,
        64,
        "ui_wall"
      );
      this.objectGroups.overlay.add(this.g_spriteGroup.wallText);
    }

    update() {
      switch (this.gameState) {
        case "begin":
          // BEGIN

          this.handleStart();
          break;
        case "change":
          // CHANGE
          this.handleLevelChange();
          this.gameState = "wait";
          break;
        case "wait":
          console.log("WAIT");
          break;
        case "over":
          // GAME OVER
          this.handleOver();
          break;
        case "end":
          // GAME END
          if (this.controller.controls.start.pressed) {
            this.g_soundGroup.song.stop();
            this.state.start("Main");
          }

          // this.g_soundGroup.song.play();
          break;
        case "unlock":
        default:
          // THE GAME'S RUNNING
          this.handleGamePlay();
          break;
      }
    }

    // Methods
    // ------------------------------------------------------------------

    handleOver() {
      this.gameState = "end";

      let { prevLabel, currLabel, nextLabel } = this.g_uiGroup;

      this.g_soundGroup.song.volume = 0.1;

      if (prevLabel) {
        this.game.add.tween(prevLabel).to(
          {
            y: -16,
            alpha: 0
          },
          300,
          Phaser.Easing.Linear.None,
          true
        );
      }

      if (currLabel) {
        this.game.add.tween(currLabel).to(
          {
            y: -16,
            alpha: 0
          },
          300,
          Phaser.Easing.Linear.None,
          true
        );
      }

      if (nextLabel) {
        this.game.add.tween(nextLabel).to(
          {
            y: -16,
            alpha: 0
          },
          300,
          Phaser.Easing.Linear.None,
          true
        );
      }

      let overText = this.game.add.bitmapText(
        0,
        0,
        "yx_ui",
        "GAME OVER",
        10
      );
      overText.anchor.setTo(0.5, 0.5);
      overText.tint = 0xffffff;
      overText.x = this.game.world.centerX;
      overText.y = this.game.world.centerY + 16;
      overText.alpha = 0;

      this.game.add.tween(overText).to(
        {
          y: this.game.world.centerY - 16,
          alpha: 1
        },
        500,
        Phaser.Easing.Quintic.Out,
        true,
        100,
        0,
        false
      );
      this.g_uiGroup.overLabel = overText;

      let scoreText = this.game.add.bitmapText(
        0,
        0,
        "yx_ui",
        this.unlocked.toString(),
        20
      );
      scoreText.anchor.setTo(0.5, 0.5);
      scoreText.tint = 0xffffff;
      scoreText.x = this.game.world.centerX;
      scoreText.y = this.game.world.centerY + 16;
      scoreText.alpha = 0;

      this.game.add.tween(scoreText).to(
        {
          y: this.game.world.centerY - 4,
          alpha: 1
        },
        500,
        Phaser.Easing.Quintic.Out,
        true,
        100,
        0,
        false
      );
      this.g_uiGroup.scoreLabel = scoreText;
    }

    handleStart() {
      if (this.init_time >= 18) {
        this.initVals();

        this.g_soundGroup.song.play();

        this.timer = this.game.time.now;

        this.game.add.tween(this.g_spriteGroup.wallText).to(
          {
            alpha: 0
          },
          100,
          Phaser.Easing.Linear.None,
          true,
          0,
          0,
          false
        ).onComplete.add(function() {
        }, this);

        this.gameState= "run";
      } else {
        if (this.init_time == 0 && this.init_count == 0) {
          this.playWallSound();
        }

        this.init_count += 0.1;

        this.g_spriteGroup.wallText.alpha = Math.abs(Math.sin(this.init_count));

        if (
          this.g_spriteGroup.wallText.alpha > 0.95
          && Math.sign(Math.sin(this.init_count)) > 0
        ) {
          this.g_spriteGroup.wallText.alpha = 1;
          this.init_time += 1;
          if (this.g_soundGroup.bell.isPlaying) {
            this.g_soundGroup.bell.stop();
          }
          this.g_soundGroup.bell.play();
          console.log(this.init_time);
        }
      }
    }

    handleGamePlay() {
      let { controls } = this.controller;
      let { dial } = this.g_spriteGroup;

      dial.direction = controls.right.hold - controls.left.hold;

      if (dial.turn) {
        let tempVals = this.lockValues[this.currLock],
          tempTurn = dial.turn,
          tempSign = Math.sign(tempVals),
          tempText,
          tempMove;

        console.log(`${tempVals} : ${tempTurn}`);

        if (Math.sign(tempVals) === Math.sign(tempTurn)) {
          tempMove = approach(Math.abs(tempVals), 0, Math.abs(tempTurn));
        } else {
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

      let temp = 64 - Math.round((this.timerCurr / this.timerMaxTime) * 64);
      temp = 64 - temp;

      if (this.g_spriteGroup.wallOver.y > 0) {
        this.g_spriteGroup.wallOver.y = temp;
        this.g_spriteGroup.wallOver.alpha = 1 - (temp / 64);
      }
    }

    handleLevelChange() {
      this.gameState = "wait";

      this.unlocked += 1;
      if (this.unlocked % 10 === 0) {
        this.timerCurr = approach(this.timerCurr, this.timerMaxTime, 6);
        this.g_soundGroup.bell.play();
      } else {
        this.timerCurr = approach(this.timerCurr, this.timerMaxTime, 3);
      }

      let { game } = this;
      let { dial, doorL, doorR, wallOver } = this.g_spriteGroup;
      let { previous, current } = this.objectGroups;

      // Set temp values
      let tempDial = dial,
          tempDoorL = doorL,
          tempDoorR = doorR;

      // Create new dial and doors
      this.g_spriteGroup.doorL = new Door(this.game, 0, 0);
      this.g_spriteGroup.doorL.x = this.world.centerX;
      this.g_spriteGroup.doorL.y = this.world.centerY;
      this.g_spriteGroup.doorL.scale.setTo(0.5, 0.5);

      this.g_spriteGroup.doorR = new Door(this.game, 0, 0, true);
      this.g_spriteGroup.doorR.x = this.world.centerX;
      this.g_spriteGroup.doorR.y = this.world.centerY;
      this.g_spriteGroup.doorR.scale.setTo(0.5, 0.5);

      this.g_spriteGroup.dial = new Dial(this.game, 0, 0);
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

      let sign = (Math.random() < .5) ? -1 : 1;

      game.add.tween(tempDial).to(
        {
          y: tempDial.y + 96
        },
        500,
        Phaser.Easing.Back.In,
        true,
        0,
        0
      );

      game.add.tween(tempDial).to(
        {
          x: tempDial.x + Math.round(Math.random() * 32) * sign,
          angle: tempDial.angle + 40
        },
        500,
        Phaser.Easing.Linear.None,
        true,
        0,
        0
      );

      game.add.tween(tempDial).to(
        {
          alpha: 0
        },
        200,
        Phaser.Easing.Linear.None,
        true,
        200,
        0
      );

      game.add.tween(tempDial.scale).to(
        {
          x: 2,
          y: 2
        },
        500,
        Phaser.Easing.Linear.None,
        true,
        0,
        0,
        false
      );

      game.add.tween(tempDoorL).to(
        {
          x: tempDoorL.x - tempDoorL.width
        },
        1000,
        Phaser.Easing.Exponential.Out,
        true,
        200,
        0,
        false
      );

      game.add.tween(tempDoorL).to(
        {
          alpha: 0
        },
        1000,
        Phaser.Easing.Linear.None,
        true,
        300,
        0,
        false
      );

      game.add.tween(tempDoorL.scale).to(
        {
          x: 2,
          y: 2
        },
        1000,
        Phaser.Easing.Exponential.Out,
        true,
        300,
        0,
        false
      );

      game.add.tween(tempDoorR).to(
        {
          x: tempDoorR.x + tempDoorR.width
        },
        1000,
        Phaser.Easing.Exponential.Out,
        true,
        200,
        0,
        false
      );

      game.add.tween(tempDoorR).to(
        {
          alpha: 0
        },
        1000,
        Phaser.Easing.Linear.None,
        true,
        300,
        0,
        false
      );

      game.add.tween(tempDoorR.scale).to(
        {
          x: 2,
          y: 2
        },
        1000,
        Phaser.Easing.Exponential.Out,
        true,
        300,
        0,
        false
      );

      game.add.tween(wallOver).to(
        {
          y: Math.round((this.timerCurr / this.timerMaxTime) * 64),
          alpha: 1 - (this.timerCurr / this.timerMaxTime)
        },
        500 * ((64 - wallOver.y) / 64),
        Phaser.Easing.Linear.None,
        true,
        300,
        0
      );

      // NEW ITEM TWEENS
      game.add.tween(this.g_spriteGroup.doorL.scale).to(
        {
          x: 1,
          y: 1
        },
        1000,
        Phaser.Easing.Quadratic.Out,
        true,
        1000,
        0,
        false
      );

      game.add.tween(this.g_spriteGroup.doorR.scale).to(
        {
          x: 1,
          y: 1
        },
        1000,
        Phaser.Easing.Quadratic.Out,
        true,
        1000,
        0,
        false
      );

      let dialMove = game.add.tween(this.g_spriteGroup.dial.scale).to(
        {
          x: 1,
          y: 1
        },
        1000,
        Phaser.Easing.Quadratic.Out,
        true,
        1000,
        0,
        false
      );
      dialMove.onComplete.add(function() {
        this.gameState = "run";
        this.lockValues = [];
        this.initVals();
      }, this);

      this.playDoorSound();
    }

    handleLabelChange() {
      let curr, next, prev, discard;

      this.playLockSound();

      discard = this.g_uiGroup.prevLabel;
      this.game.add.tween(discard).to(
        {
          y: this.game.world.centerY - 16,
          alpha: 0
        },
        500,
        Phaser.Easing.Quintic.Out,
        true,
        100,
        0,
        false
      ).onComplete.add(function() {
        discard.destroy();
      }, this);

      // HANDLE CHANGES
      if (this.currLock == this.lockValues.length - 1) {
        this.gameState = "change";

        let currDiscard = this.g_uiGroup.currLabel;
        currDiscard.text = "OK!";
        this.game.add.tween(currDiscard).to(
          {
            y: this.game.world.centerY - 8,
            alpha: 0
          },
          500,
          Phaser.Easing.Quintic.Out,
          true,
          100,
          0,
          false
        ).onComplete.add(function() {
          currDiscard.destroy();
        }, this);

        this.g_uiGroup.prevLabel = null;
        this.g_uiGroup.currLabel = null;

        this.handleLevelChange();
      } else {
        console.log(this.currLock);
        this.currLock += 1;
        console.log(this.currLock);

        prev = this.g_uiGroup.currLabel;
        prev.text = "OK!";
        this.game.add.tween(prev).to(
          {
            y: this.game.world.centerY - 8,
            alpha: .25
          },
          500,
          Phaser.Easing.Quintic.Out,
          true,
          100,
          0,
          false
        );
        this.g_uiGroup.prevLabel = prev;

        curr = this.g_uiGroup.nextLabel;
        this.game.add.tween(curr).to(
          {
            y: this.game.world.centerY,
            alpha: 1
          },
          500,
          Phaser.Easing.Quintic.Out,
          true,
          100,
          0,
          false
        ).onComplete.add(function() {
          this.gameState = "run";
        }, this);
        this.g_uiGroup.currLabel = curr;

        if (this.currLock < this.lockValues.length - 1) {
          let nextVal = (this.lockValues[this.currLock + 1] < 0)
            ? "L" + Math.abs(this.lockValues[this.currLock + 1]).toString()
            : "R" + this.lockValues[this.currLock + 1].toString();
          next = this.game.add.bitmapText(
            0,
            0,
            "yx_ui",
            nextVal,
            10
          );
          next.x = this.game.world.centerX;
          next.y = this.game.world.centerY + 32;
          next.anchor.setTo(0.5, 0.5);
          next.alpha = 0;
          next.tint = 0xff0000;
          this.game.add.tween(next).to(
            {
              y: this.game.world.centerY + 8,
              alpha: 0.25
            },
            500,
            Phaser.Easing.Quintic.Out,
            true,
            100,
            0,
            false
          );
          this.g_uiGroup.nextLabel = next;
          this.objectGroups.ui.add(this.g_uiGroup.nextLabel);
        } else {
          this.g_uiGroup.nextLabel = null;
        }
      }
    }

    generateAngles() {
      let values  = [],
        curr    = 0,
        rand    = 0;

      while (values.length < 5) {
        rand = Math.round(Math.random() * 360);
        if (Math.random() < 0.5) rand *= -1;
        if (
          Math.abs(rand) > 16
          && Math.abs(curr - rand) > 32
        ) {
          values.push(rand);
        }
      }

      this.currLock   = 0;
      this.lockValues = values;
      console.log("HY");
    }

    initVals() {
      this.generateAngles();

      // Define values
      let currVal = (this.lockValues[0] < 0)
        ? "L" + Math.abs(this.lockValues[0]).toString()
        : "R" + this.lockValues[0].toString();
      let currLabel = this.game.add.bitmapText(
        0,
        0,
        "yx_ui",
        currVal,
        10
      );
      currLabel.x = this.game.world.centerX;
      currLabel.y = this.game.world.centerY + 16;
      currLabel.anchor.set(0.5, 0.5);
      currLabel.alpha = 0;
      currLabel.tint = 0xff0000;
      this.game.add.tween(currLabel).to(
        {
          y: this.game.world.centerY,
          alpha: 1
        },
        500,
        Phaser.Easing.Quintic.Out,
        true,
        100,
        0,
        false
      );
      this.g_uiGroup.currLabel = currLabel;
      this.objectGroups.ui.add(this.g_uiGroup.currLabel);

      let nextVal = (this.lockValues[1] < 0)
        ? "L" + Math.abs(this.lockValues[1]).toString()
        : "R" + this.lockValues[1].toString();
      let nextLabel = this.game.add.bitmapText(
        0,
        0,
        "yx_ui",
        nextVal,
        10
      );
      nextLabel.x = this.game.world.centerX;
      nextLabel.y = this.game.world.centerY + 32;
      nextLabel.anchor.set(0.5, 0.5);
      nextLabel.alpha = 0;
      nextLabel.tint = 0xff0000;
      this.game.add.tween(nextLabel).to(
        {
          y: this.game.world.centerY + 8,
          alpha: 0.25
        },
        500,
        Phaser.Easing.Quintic.Out,
        true,
        100,
        0,
        false
      );
      this.g_uiGroup.nextLabel = nextLabel;
      this.objectGroups.ui.add(this.g_uiGroup.nextLabel);
    }

    /**
     * Loads sounds used in the state.
     */
    loadSounds() {
      for (let i = 1; i <= 5; i++) {
        this.g_soundGroup[`door_0${i}`] = this.game.add.sound(
          `snd_door_0${i}`,
          0.3,
          false
        );
      }

      for (let i = 1; i <= 4; i++) {
        this.g_soundGroup[`lock_0${i}`] = this.game.add.sound(
          `snd_lock_0${i}`,
          0.3,
          false
        );
      }

      for (let i = 1; i <= 4; i++) {
        this.g_soundGroup[`wall_0${i}`] = this.game.add.sound(
          `vox_wall_0${i}`,
          0.3,
          false
        );
      }

      // Music
      this.g_soundGroup.bell = this.game.add.sound(
        "snd_bell_01",
        0.3,
        false
      );

      // Music
      this.g_soundGroup.song = this.game.add.sound(
        "ld42_song",
        0.3,
        true
      );
    }

    /**
     * Plays the door unlock sound.
     */
    playDoorSound() {
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
    }

    /**
     * Plays the lock vox sound.
     */
    playLockSound() {
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
    }

    /**
     * Plays the wall vox sound.
     */
    playWallSound() {
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
    }
  }
}
