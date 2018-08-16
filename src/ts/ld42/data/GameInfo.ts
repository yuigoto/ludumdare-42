namespace LD42 {
  /**
   * UNLOCKR : LD42/Data/GameInfo
   * --------------------------------------------------------------------
   * Returns a POJO with all the basic game information.
   *
   * A JSON file could be used for this, but an object proved much easier
   * this time, for parsing reasons.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export const GameInfo = {
    title: "UNLOCKR",
    version: "0.1.1",
    description: "A small infinite runner for the claustrophobic.<br>Open your way by unlocking doors and avoid getting crushed!",
    controls: "<strong>Left/Right</strong>: turn the dial<br><strong>Enter</strong>: start/skip.",
    author: "Fabio Y. Goto",
    author_display: "YUITI",
    copyright: "©2018 YUITI"
  };
}
