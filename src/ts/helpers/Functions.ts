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
