namespace Helpers {
  /**
   * UNLOCKR : Helpers/Functions
   * --------------------------------------------------------------------
   * Provides helper functions for common operations, also provides some
   * pre-defined constants to avoid too much calculations.
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
   * @param {number} start
   *    Starting value
   * @param {number} end
   *    Target value
   * @param {number} step
   *    Step to move/shift
   * @returns {number}
   */
  export function approach(start: number, end: number, step: number): number {
    if (start > end) {
      return Math.max(start - step, end);
    } else {
      return Math.min(start + step, end);
    }
  }
}
