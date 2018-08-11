namespace Controls {
  /**
   * LD42 : Controls/ControlState
   * --------------------------------------------------------------------
   * Represents a single control state.
   *
   * Implements the basic properties of a control:
   * - `hold` (number): if the button is being held (1) or not (0);
   * - `pressed` (boolean): button "just pressed" state;
   * - `release` (boolean): button "just released" state;
   * - `previous` (number): previous button `hold` state;
   * - `key` (number): keyboard key (or joypad button) value;
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface ControlState {
    hold: number;
    pressed: boolean;
    release: boolean;
    previous: number;
    key: number;
  }
}
