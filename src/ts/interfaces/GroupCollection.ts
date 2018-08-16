namespace Interfaces {
  /**
   * UNLOCKR : Interfaces/GroupCollection
   * --------------------------------------------------------------------
   * Implements a basic interface used to build collections of `Phaser.Group`
   * elements, so we can easily handle grouping and layering.
   *
   * Works in a similar way to `ItemGroup`.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface GroupCollection {
    [key: string]: Phaser.Group;
  }
}