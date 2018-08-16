namespace Controls {
  /**
   * UNLOCKR : Controls/ControlState
   * --------------------------------------------------------------------
   * Implements the basic properties of a single control state.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface ControlState {
    /**
     * If the control is being held down (1) or not (0).
     */
    hold: number;

    /**
     * The control's "just pressed" state.
     */
    pressed: boolean;

    /**
     * The control's "just released" state.
     */
    release: boolean;

    /**
     * Previous "hold" state.
     */
    previous: number;

    /**
     * Keyboard key, joypad button or other input ID.
     */
    key: number;

    /**
     * A float value, from 0 to 1, for using with "analog" or variable
     * controls. Usually set at 0.
     */
    value: number;
  }
}
