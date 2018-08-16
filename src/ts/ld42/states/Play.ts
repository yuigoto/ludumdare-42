namespace LD42 {
  // Imports
  import Control = Controls.Control;
  import GroupCollection = Interfaces.GroupCollection;
  import ItemGroup = Interfaces.ItemGroup;
  import approach = Helpers.approach;

  /**
   * UNLOCKR : LD42/States/Play
   * --------------------------------------------------------------------
   * Gameplay state.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Play extends Phaser.State {
    // Properties
    // ------------------------------------------------------------------

    /**
     * Controller instance.
     */
    controller: Control;

    /**
     * Collection for handling multiple sprite groups.
     *
     * Used for layering the game.
     */
    groups: GroupCollection;

    /**
     * Collection for handling UI elements.
     */
    sounds: ItemGroup;

    /**
     * Collection for handling sprites.
     */
    sprites: ItemGroup;

    /**
     * Collection for handling UI elements.
     */
    ui: ItemGroup;

    /**
     * Current game's status.
     */
    status: number = -1;

    /**
     * Initial counter.
     */
    init_count: number = 0;

    /**
     * Initial alpha counter.
     */
    init_alpha: number = 0;

    /**
     * Current lock's number.
     */
    lock: number = 0;

    /**
     * Current lock values.
     */
    lock_values: Array<number> = [];

    /**
     * Wall time count.
     */
    wall_time: number = 0;

    /**
     * Frame count for the time.
     */
    wall_time_count: number = 0;

    /**
     * Wall time max count.
     */
    wall_time_max: number = 64;

    /**
     * Total doors unlocked.
     */
    unlocked: number;

    // Methods
    // ------------------------------------------------------------------

    /**
     * State values bootstrapper.
     *
     * @private
     */
    __boot() {
      this.controller   = null;
      this.groups       = null;
      this.sounds       = null;
      this.sprites      = null;
      this.ui           = null;

      this.status       = -1;
      this.init_count   = 0;
      this.init_alpha   = 0;

      this.lock         = 0;
      this.lock_values  = [];
      this.unlocked     = 0;
    }

    /**
     * Initializes state.
     *
     * @private
     */
    __init() {
      // Initialize controller
      this.controller = new Control(this.game);

      // Set Phaser.Group collection
      this.groups     = {
        bg: this.game.add.group(),
        next: this.game.add.group(),
        current: this.game.add.group(),
        prev: this.game.add.group(),
        ui: this.game.add.group(),
        overlay: this.game.add.group()
      };

      // Init sound collection
      this.sounds     = {};

      // Init sprites collection
      this.sprites    = {
        bg: null,
        dial: null,
        doorL: null,
        doorR: null,
        nextDial: null,
        nextDoorL: null,
        nextDoorR: null,
        wallText: null,
        escapeText: null,
        wallShadow: null
      };

      // Init interface label collection
      this.ui         = {
        label_1: null,
        label_2: null,
        label_3: null,
        label_4: null,
        label_5: null
      };

      // Generate labels beforehand
      this.generateLabels();

      // LOAD SOUNDS
      this.loadSounds();

      // Add background
      this.sprites.bg = this.game.add.sprite(
        0,
        0,
        "bg_corridor_sprite"
      );
      this.sprites.bg.animations.add("move", null, 30, true);
      this.sprites.bg.animations.play("move");
      this.sprites.bg.alpha = 0;
      this.groups.bg.add(this.sprites.bg);
      this.game.add.tween(this.sprites.bg).to(
        {
          alpha: 1
        },
        1000,
        Phaser.Easing.Linear.None,
        true,
        0,
        0,
        false
      );

      // Add the starter screen
      this.sprites.wallText = this.game.add.sprite(
        0,
        0,
        "ui_wall"
      );
      this.sprites.wallText.alpha = 0;
      this.groups.overlay.add(this.sprites.wallText);

      // Add the overlay
      this.sprites.wallShadow = this.game.add.sprite(
        0,
        64,
        "ui_wall_shadow"
      );
      this.sprites.wallShadow.alpha = 0;
      this.groups.overlay.add(this.sprites.wallShadow);

      // Fire first event
      this.game.time.events.add(
        Phaser.Timer.SECOND,
        this.initTimerEvent,
        this
      );

      // DEBUG
      // ----------------------------------------------------------------
    }

    /**
     * The initial game timer.
     *
     * Starts the level.
     */
    initTimerEvent() {
      // Increase counter
      this.init_count += 1;

      // Plays the bell
      this.sounds.bell.play();

      // Plays the voice
      if (this.init_count === 1) {
        // Set game as ready to begin
        this.status = 0;

        // Play the voice
        this.playWallVoice();

        // Populate the level with the current doors and dial
        this.sprites.doorL = new Door(
          this.game,
          this.world.centerX,
          this.world.centerY,
          false,
          this.groups.current
        );

        this.sprites.doorR = new Door(
          this.game,
          this.world.centerX,
          this.world.centerY,
          true,
          this.groups.current
        );

        this.sprites.dial = new Dial(
          this.game,
          this.world.centerX,
          this.world.centerY,
          this.groups.current
        );

        this.sprites.doorL.scale.setTo(0, 0);
        this.game.add.tween(this.sprites.doorL.scale).to(
          {
            x: 1,
            y: 1
          },
          2000,
          Phaser.Easing.Linear.None,
          true,
          0,
          0,
          false
        );

        this.sprites.doorR.scale.setTo(0, 0);
        this.game.add.tween(this.sprites.doorR.scale).to(
          {
            x: 1,
            y: 1
          },
          2000,
          Phaser.Easing.Linear.None,
          true,
          0,
          0,
          false
        );

        this.sprites.dial.scale.setTo(0, 0);
        this.game.add.tween(this.sprites.dial.scale).to(
          {
            x: 1,
            y: 1
          },
          2000,
          Phaser.Easing.Linear.None,
          true,
          0,
          0,
          false
        );
      }

      // Set new event, if lower than 5
      if (this.init_count < 5) {
        this.game.time.events.add(
          Phaser.Timer.SECOND,
          this.initTimerEvent,
          this
        );
      } else {
        // Start the game
        this.status = 1;

        // Play escape sound
        this.playEscapeVoice();

        /*
        // Escape text
        this.ui.escapeText = this.game.add.sprite(
          0,
          0,
          "ui_escape",
          0
        );
        this.ui.escapeText.anchor.setTo(0.5, 0.5);
        this.ui.escapeText.x = this.world.centerX;
        this.ui.escapeText.y = this.world.centerY + 16;
        this.ui.escapeText.alpha = 0;
        this.groups.ui.add(this.ui.escapeText);

        // Tween In
        this.game.add.tween(this.ui.escapeText).to(
          {
            y: this.world.centerY,
            alpha: 1
          },
          500,
          Phaser.Easing.Circular.Out,
          true,
          0,
          0,
          false
        ).onComplete.add(function() {
          // Tween out
          this.game.add.tween(this.ui.escapeText).to(
            {
              y: this.world.centerY - 16,
              alpha: 0
            },
            500,
            Phaser.Easing.Circular.In,
            true,
            500,
            0,
            false
          ).onComplete.add(function() {
            // Destroy
            this.groups.ui.remove(this.ui.escapeText);
            this.ui.escapeText.destroy();
          }, this);
        }, this);
        //*/

        // Erase sprite
        this.sprites.wallText.alpha = 0;

        // Popylate with labels
        this.populateLabels();

        // Start song and wall sound
        this.sounds.song.play();
        this.sounds.wall_loop.play();
      }
    }

    /**
     * Handles loading the sounds from the cache into the state.
     */
    loadSounds() {
      // Door sounds
      for (let i = 1; i <= 5; i++) {
        this.sounds[`door_0${i}`] = this.game.add.sound(
          `snd_door_0${i}`,
          0.3,
          false
        );
      }

      // Lock sounds
      for (let i = 1; i <= 4; i++) {
        this.sounds[`lock_0${i}`] = this.game.add.sound(
          `snd_lock_0${i}`,
          0.3,
          false
        );
      }

      // Wall voice sounds
      for (let i = 1; i <= 4; i++) {
        this.sounds[`wall_0${i}`] = this.game.add.sound(
          `vox_wall_0${i}`,
          0.75,
          false
        );
      }

      // Escape voice sounds
      for (let i = 1; i <= 4; i++) {
        this.sounds[`escape_0${i}`] = this.game.add.sound(
          `vox_escape_0${i}`,
          0.75,
          false
        );
      }

      // Bell sound
      this.sounds.bell = this.game.add.sound(
        "snd_bell_01",
        0.3,
        false
      );

      // Music
      this.sounds.song = this.game.add.sound(
        "ld42_song",
        0.5,
        true
      );

      // Wall Loop
      this.sounds.wall_loop = this.game.add.sound(
        "snd_wall_loop",
        0.0,
        true
      );
    }

    /**
     * Generates values for a lock.
     */
    generateValues() {
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

      // Reset current lock
      this.lock = 0;
      this.lock_values = values;
    }

    /**
     * Generates the labels used for secrets.
     */
    generateLabels() {
      for (let i = 1; i <= 5; i++) {
        let label_name = "label_" + i.toString(),
            label_temp = this.game.add.bitmapText(
              0,
              0,
              "yx_ui",
              "---",
              10
            );
        label_temp.tint = 0xff0000;
        label_temp.anchor.setTo(0.5, 0.5);
        label_temp.x = this.world.centerX;
        label_temp.y = this.world.centerY + 30;
        label_temp.alpha = 0;

        // Add to group
        this.groups.ui.add(label_temp);

        // Set to ui item
        this.ui[label_name] = label_temp;
      }
    }

    /**
     * Force-destroys all labels.
     */
    destroyLabels() {
      for (let i = 1; i <= 5; i++) {
        let label_name = "label_" + i.toString();
        this.groups.ui.remove(this.ui[label_name]);
        this.ui[label_name].destroy();
      }
    }

    /**
     * Populates the labels when a round starts.
     */
    populateLabels() {
      // Generate values
      this.generateValues();

      // Populate label 1
      this.ui.label_1.text = this.setLabelValue(this.lock_values[this.lock]);
      this.ui.label_1.anchor.setTo(0.5, 0.5);
      this.ui.label_1.x = this.world.centerX;
      this.ui.label_1.y = this.world.centerY + 8;
      this.ui.label_1.alpha = 0;

      this.game.add.tween(this.ui.label_1).to(
        {
          y: this.world.centerY,
          alpha: .8
        },
        500,
        Phaser.Easing.Quintic.Out,
        true
      );

      // Populate label 2
      this.ui.label_2.text = this.setLabelValue(this.lock_values[this.lock + 1]);
      this.ui.label_2.anchor.setTo(0.5, 0.5);
      this.ui.label_2.x = this.world.centerX;
      this.ui.label_2.y = this.world.centerY + 16;
      this.ui.label_1.alpha = 0;

      this.game.add.tween(this.ui.label_2).to(
        {
          y: this.world.centerY + 8,
          alpha: .25
        },
        500,
        Phaser.Easing.Quintic.Out,
        true
      );
    }

    /**
     * Unlocks one of the locks from the door.
     */
    unlockValue() {
      let curr, next, prev, discard, recycle;

      // Plays the lock sound
      this.playLockSound();

      // Handle label changes
      if (this.lock == this.lock_values.length - 1) {
        // Set game state to changing doors
        this.status = 2;

        // Play door unlock sound
        this.playDoorSound();

        // Hide previous label
        this.game.add.tween(this.ui.label_4).to(
          {
            y: this.game.world.centerY - 16,
            alpha: 0
          },
          300,
          Phaser.Easing.Quintic.Out,
          true,
          0,
          0,
          false
        );

        // Discard current label
        this.game.add.tween(this.ui.label_1).to(
          {
            y: this.game.world.centerY - 8,
            alpha: 0
          },
          300,
          Phaser.Easing.Quintic.Out,
          true,
          0,
          0,
          false
        ).onComplete.add(function() {
          // Reset lock
          this.lock = 0;
          this.unlocked += 1;

          // Change level
          this.handleLevelChange();
        }, this);
      } else {
        // Recycle
        recycle = this.ui.label_5;

        // Add previous label to discard
        discard = this.ui.label_4;
        this.game.add.tween(discard).to(
          {
            y: this.game.world.centerY - 16,
            alpha: 0
          },
          300,
          Phaser.Easing.Quintic.Out,
          true,
          0,
          0,
          false
        );
        this.ui.label_5 = discard;

        // Update current lock
        this.lock += 1;

        // Move prev item
        prev = this.ui.label_1;
        prev.text = "OK!";
        this.game.add.tween(prev).to(
          {
            y: this.game.world.centerY - 8,
            alpha: .25
          },
          300,
          Phaser.Easing.Quintic.Out,
          true,
          0,
          0,
          false
        );
        this.ui.label_4 = prev;

        // Set current item
        curr = this.ui.label_2;
        this.game.add.tween(curr).to(
          {
            y: this.game.world.centerY,
            alpha: 0.8
          },
          300,
          Phaser.Easing.Quintic.Out,
          true,
          0,
          0,
          false
        );
        this.ui.label_1 = curr;

        // Checks if it's the last one
        if (this.lock < this.lock_values.length - 1) {
          next = this.ui.label_3;
          next.text = this.setLabelValue(this.lock_values[this.lock + 1]);
          next.y = this.game.world.centerY + 16;
          this.game.add.tween(next).to(
            {
              y: this.game.world.centerY + 8,
              alpha: .25
            },
            300,
            Phaser.Easing.Quintic.Out,
            true,
            0,
            0,
            false
          );
          this.ui.label_2 = next;

          // Set label 3 as the recycled one
          this.ui.label_3 = recycle;
        }
      }
    }

    /**
     * Sets the value for a label.
     *
     * @param {number} value
     * @returns {string}
     */
    setLabelValue(value: number): string {
      if (Math.sign(value) < 0) {
        return "L" + Math.abs(value);
      } else {
        return "R" + Math.abs(value);
      }
    }

    /**
     * Handles level change.
     */
    handleLevelChange() {
      let tempDial, tempDoorL, tempDoorR;

      // Destroy labels
      this.destroyLabels();

      // Handles points
      if (this.unlocked % 10 === 0) {
      } else {
      }

      // Kills current door set
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

      // Generate new Door
      this.sprites.doorL = new Door(
        this.game,
        this.world.centerX,
        this.world.centerY,
        false,
        this.groups.current
      );
      this.sprites.doorL.scale.setTo(0.5, 0.5);
      this.game.add.tween(this.sprites.doorL.scale).to(
        {
          x: 1,
          y:1
        },
        1000,
        Phaser.Easing.Quartic.Out,
        true,
        500,
        0,
        false
      );

      // Generate new Door
      this.sprites.doorR = new Door(
        this.game,
        this.world.centerX,
        this.world.centerY,
        true,
        this.groups.current
      );
      this.sprites.doorR.scale.setTo(0.5, 0.5);
      this.game.add.tween(this.sprites.doorR.scale).to(
        {
          x: 1,
          y:1
        },
        1000,
        Phaser.Easing.Quartic.Out,
        true,
        500,
        0,
        false
      );

      // Generate new Dial
      this.sprites.dial = new Dial(
        this.game,
        this.world.centerX,
        this.world.centerY,
        this.groups.current
      );
      this.sprites.dial.scale.setTo(0.5, 0.5);
      this.game.add.tween(this.sprites.dial.scale).to(
        {
          x: 1,
          y:1
        },
        1000,
        Phaser.Easing.Quartic.Out,
        true,
        500,
        0,
        false
      ).onComplete.add(function() {
        // Generate and populate the labels
        this.generateLabels();
        this.populateLabels();

        // Set to playable
        this.status = 1;
      }, this);
    }

    /**
     * Plays one of the door's sounds.
     */
    playDoorSound() {
      let curr = (1 + Math.floor(Math.random() * 4)).toString();
      this.sounds[`door_0${curr}`].play();
    }

    /**
     * Plays one of the lock's sounds.
     */
    playLockSound() {
      let curr = (1 + Math.floor(Math.random() * 3)).toString();
      this.sounds[`lock_0${curr}`].play();
    }

    /**
     * Plays one of the wall's voice sounds.
     */
    playWallVoice() {
      let curr = (1 + Math.floor(Math.random() * 3)).toString();
      this.sounds[`wall_0${curr}`].play();
    }

    /**
     * Plays one of the escape voice sounds.
     */
    playEscapeVoice() {
      let curr = (1 + Math.floor(Math.random() * 3)).toString();
      this.sounds[`escape_0${curr}`].play();
    }

    /**
     * Just an updater for the initial screen.
     */
    statusInit() {
      this.init_alpha += 1;
      this.sprites.wallText.alpha = this.init_alpha / 60;
      if (this.init_alpha == 60) this.init_alpha = 0;
    }

    /**
     * Handles the gameplay state.
     */
    statusPlay() {
      let { controls } = this.controller;
      let turn = controls.right.hold - controls.left.hold;

      this.sprites.dial.direction = (turn != 0) ? turn : 0;

      // Increase timer
      this.wall_time_count += 1;
      if (this.wall_time_count % 60 == 0) {
        this.wall_time += 1;
      }

      // Update wall overlay
      if (this.sprites.wallShadow.y > 0) {
        this.sprites.wallShadow.alpha = this.wall_time / 64;
        this.sprites.wallShadow.y = 64 - this.wall_time;
        this.sounds.wall_loop.volume = .5 * (this.wall_time / 64);
      }

      if (Math.abs(this.sprites.dial.turn) > 0) {
        let tempVals = this.lock_values[this.lock],
            tempTurn = this.sprites.dial.turn,
            tempSign = Math.sign(tempVals),
            tempMove;

        // Shift value
        if (Math.sign(tempVals) === Math.sign(tempTurn)) {
          tempMove = approach(Math.abs(tempVals), 0, Math.abs(tempTurn));
        } else {
          tempMove = Math.abs(tempVals) + Math.abs(tempTurn);
        }

        // Update array value
        this.lock_values[this.lock] = tempMove * tempSign;

        // Checks if we're unlocked or not
        if (tempMove === 0) {
          this.unlockValue();
        } else {
          // Update text
          this.ui.label_1.text = this.setLabelValue(this.lock_values[this.lock]);
        }
      }
    }

    statusUnlock() {
    }

    statusOver() {
    }

    // Lifecycle Methods
    // ------------------------------------------------------------------

    /**
     * Executes the state.
     */
    create() {
      // Bootstrap variables
      this.__boot();

      // Initialize state
      this.__init();
    }

    /**
     * Updates the state.
     */
    update() {
      switch (this.status) {
        case 1:
          this.statusPlay();
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        default:
          this.statusInit();
          break;
      }

      // DEBUG
      // ----------------------------------------------------------------
    }

    /**
     * Shutdowns the state, removes all children, etc.
     */
    shutdown() {
      // Remove all children
      this.game.world.removeAll(true);

      // Enforce reset of all properties
      this.__boot();
    }
  }
}
