namespace Controls {
  /**
   * LD42 : Controls/ControlState
   * --------------------------------------------------------------------
   * Implements the basic properties of a single control state.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface ControlState {
    // If the control is being held down (1) or not (0)
    hold: number;
    // "Just pressed" state
    pressed: boolean;
    // "Just released" state
    release: boolean;
    // Previous "hold" state
    previous: number;
    // Keyboard key (or joypad button) value
    key: number;
  }
}
