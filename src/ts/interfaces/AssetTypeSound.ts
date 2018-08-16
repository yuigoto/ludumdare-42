namespace Interfaces {
  /**
   * UNLOCKR : Interfaces/AssetTypeSound
   * --------------------------------------------------------------------
   * Implements basic parameters for an `AssetList` sound object.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface AssetTypeSound {
    /**
     * In-game sound name, used to retrieve this sound from the cache.
     */
    name: string;

    /**
     * Path to the file or an array of files inside the build path,
     * to be loaded for this sound.
     *
     * It accepts an array so you can use multiple types for compatibility,
     * like mp3, ogg and wav.
     */
    file: string | string[];

    /**
     * Should this sound file be automatically decoded on load-time?
     *
     * If false, the file is decoded at run-time.
     *
     * IMPORTANT:
     * Decoding for web audio consumes CPU!
     */
    autoDecode: boolean;

    /**
     * Should this item be ignored by the pre-loader?
     */
    ignore: boolean;
  }
}
