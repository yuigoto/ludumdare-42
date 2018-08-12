namespace Interfaces {
  /**
   * LD42 : Interfaces/AssetTypeSpritesheet
   * --------------------------------------------------------------------
   * Implements basic parameters for an `AssetList` spritesheet-type object.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface AssetTypeSpritesheet {
    name: string;
    file: string;
    frameWidth: number;
    frameHeight: number;
    frameMax: number;
    margin: number;
    spacing: number;
    skipFrames: number;
    ignore: boolean;
  }
}
