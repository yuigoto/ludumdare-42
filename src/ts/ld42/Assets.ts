namespace LD42 {
  /**
   * LD42 : LD42/Assets
   * --------------------------------------------------------------------
   * Stores a list with all the assets used by the game in a single place, so
   * we can easily manage and load'em.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export const Assets: Interfaces.AssetList = {
    // Images
    // ------------------------------------------------------------------
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

    // Sounds
    // ------------------------------------------------------------------
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

    // Spritesheets
    // ------------------------------------------------------------------
    spritesheet: [

    ],

    // Bitmap fonts
    // ------------------------------------------------------------------
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
}
