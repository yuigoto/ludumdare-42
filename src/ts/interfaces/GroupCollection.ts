namespace Interfaces {
  /**
   * LD24 : Interfaces/GroupCollection
   * --------------------------------------------------------------------
   * Implements a generic interface used to define `Phaser.Group` collections,
   * so we can easily handle multiple groups.
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
