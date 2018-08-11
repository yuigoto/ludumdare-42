namespace Controls {
  /**
   * LD42 : Controls/ControlStateItem
   * --------------------------------------------------------------------
   * Returns a POJO implementing a default `ControlState` for an input
   * control.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   *
   * @param {number} key
   * @constructor
   */
  export function ControlStateItem(
    key = Phaser.Keyboard.SPACEBAR
  ): ControlState {
    return {
      hold: 0,
      pressed: false,
      release: false,
      previous: 0,
      key: key
    }
  }
}
