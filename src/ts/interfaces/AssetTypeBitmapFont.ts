namespace Interfaces {
  /**
   * UNLOCKR : Interfaces/AssetTypeBitmapFont
   * --------------------------------------------------------------------
   * Implements basic parameters for an `AssetList` bitmap font object.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface AssetTypeBitmapFont {
    /**
     * In-game font name, used to retrieve this font from the cache.
     */
    name: string;

    /**
     * Path to the file containing the image serving as texture for this
     * font, in the build path.
     */
    texture: string;

    /**
     * Path to the file containing the texture atlas file with the XML/JSON
     * data for the font.
     */
    atlas: string;

    /**
     * String containing the data for the texture atlas (XML/JSON), optional.
     */
    atlasData: string;

    /**
     * Should this item be ignored by the pre-loader?
     */
    ignore: boolean;
  }
}
