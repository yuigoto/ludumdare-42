namespace Interfaces {
  /**
   * UNLOCKR : Interfaces/AssetTypeImage
   * --------------------------------------------------------------------
   * Implements basic parameters for an `AssetList` image object.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface AssetTypeImage {
    /**
     * In-game sprite name, used to retrieve this image from the cache.
     */
    name: string;

    /**
     * Path to the file containing the image in the build.
     */
    file: string;

    /**
     * Should this sprite overwrite an unloaded file with the same name/key?
     */
    overwrite: boolean;

    /**
     * Should this item be ignored by the pre-loader?
     */
    ignore: boolean;
  }
}
