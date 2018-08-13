namespace Interfaces {
  /**
   * LD42 : Interfaces/AssetTypeBitmapFont
   * --------------------------------------------------------------------
   * Implements basic parameters for an `AssetList` bitmap font object.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface AssetTypeBitmapFont {
    name: string;
    texture: string;
    atlas: string;
    atlasData: string;
    ignore: boolean;
  }
}
