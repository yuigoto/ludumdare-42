namespace Interfaces {
  /**
   * LD42 : Interfaces/AssetList
   * --------------------------------------------------------------------
   * Implements the basic interface for an asset list handler, so we can
   * easily handle loading and grouping of item types.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface AssetList {
    image: Array<AssetTypeImage>,
    sound: Array<AssetTypeSound>,
    spritesheet: Array<AssetTypeSpritesheet>,
    bitmapfont: Array<AssetTypeBitmapFont>
  }
}
