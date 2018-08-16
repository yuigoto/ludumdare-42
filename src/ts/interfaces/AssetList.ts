namespace Interfaces {
  /**
   * UNLOCKR : Interfaces/AssetList
   * --------------------------------------------------------------------
   * Implements the basic interface for an asset list handler, so we can
   * easily handle pre-loading and grouping of assets in the loader state.
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
