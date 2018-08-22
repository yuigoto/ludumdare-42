namespace LD42 {
  /**
   * UNLOCKR : LD42/Game
   * --------------------------------------------------------------------
   * Main game class.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Game extends Phaser.Game {
    constructor() {
      super(64, 64, Phaser.AUTO, "ld42-game", null, true, false);

      // Set game title
      document.title = `${GameInfo.title} : ${GameInfo.version} : by ${GameInfo.author_display}`;

      // Set HTML info
      let name        = document.getElementById("ld42-name"),
          description = document.getElementById("ld42-description"),
          controls    = document.getElementById("ld42-controls"),
          copy        = document.getElementById("ld42-copy");

      if (name) {
        name.innerHTML = `${GameInfo.title} <small>v${GameInfo.version}</small>`;
      }

      if (description) {
        description.innerHTML = GameInfo.description;
      }

      if (controls) {
        controls.innerHTML = GameInfo.controls;
      }

      if (copy) {
        copy.innerHTML = GameInfo.copyright;
      }

      // Define states
      this.state.add("Boot", Boot, false);
      this.state.add("Preload", Preload, false);
      this.state.add("Title", Title, false);
      this.state.add("Play", Play, false);

      // Start the game
      this.state.start("Boot");
    }
  }
}
