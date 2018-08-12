namespace Helpers {
  /**
   * LD42 : Helpers/Functions
   * --------------------------------------------------------------------
   * Provides helper functions for some common operations.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */

  /**
   * Pre-defined constant for easy degree/radian conversion.
   */
  export const DEG_TO_RAD: number = Math.PI / 180;

  /**
   * Pre-defined constant for easy radian/degree conversion.
   */
  export const RAD_TO_DEG: number = 180 / Math.PI;

  /**
   * Shifts one value towards another by step.
   *
   * Useful for simple acceleration.
   *
   * @param {number} start
   *    Starting value
   * @param {number} end
   *    Target value
   * @param {number} step
   *    Step value to shift
   */
  export function approach(start: number, end: number, step: number): number {
    if (start > end) {
      return Math.max(start - step, end);
    } else {
      return Math.min(start + step, end);
    }
  }
}
