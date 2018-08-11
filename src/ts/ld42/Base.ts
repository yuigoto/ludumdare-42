namespace LD42 {
  /**
   * LD42 : LD42/Base
   * --------------------------------------------------------------------
   */
  export class Game extends Phaser.Game {
    constructor(){
      super(64, 64, Phaser.CANVAS, "ld42-game", null, false, false);

      // Get elements
      let name = document.getElementById("ld42-name"),
          description = document.getElementById("ld42-description"),
          controls = document.getElementById("ld42-controls"),
          copy = document.getElementById("ld42-copy");

      // Game info
      document.title = "UNLOCKR : v0.0.1";
      name.innerHTML = "UNLOCKR <small>v0.0.1</small>";
      description.innerHTML = "The wall is closing in! Unlock as many doors as you can to escape!";
      controls.innerHTML = "Left/Right | A/D | LT/RT, you choose";
      copy.innerHTML = "©2018 YUITI";

      // States
      this.state.add("Boot", Boot, false);
      this.state.add("Preload", Preload, false);
      this.state.add("Main", Main, false);

      this.state.start("Boot");
    }
  }
}
