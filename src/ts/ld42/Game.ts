namespace LD42 {
  /**
   * LD42 : LD42/Game
   * --------------------------------------------------------------------
   * Main game class.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Game extends Phaser.Game {
    /**
     * Constructor.
     */
    constructor() {
      super(64, 64, Phaser.CANVAS, "ld42-game", null, true, false);

      // Game title
      document.title  = "UNLOCKR : v0.0.1 : by YUITI";

      // Set HTML info
      let name        = document.getElementById("ld42-name"),
          description = document.getElementById("ld42-description"),
          controls    = document.getElementById("ld42-controls"),
          copy        = document.getElementById("ld42-copy");
      name.innerHTML        = "UNLOCKR <small>v0.0.1</small>";
      description.innerHTML = "A simple, minimalistic game about unlocking and escaping an infinite corridor";
      controls.innerHTML    = "Left and Right to play, Enter to start";
      copy.innerHTML        = "©2018 YUITI";

      // Set state
      this.state.add("Boot", Boot, false);
      this.state.add("Preload", Preload, false);
      this.state.add("Test", Test, false);
      this.state.add("Main", Main, false);
      this.state.add("PlayTest", PlayTest, false);

      // Fires game
      this.state.start("Boot");
    }
  }
}
