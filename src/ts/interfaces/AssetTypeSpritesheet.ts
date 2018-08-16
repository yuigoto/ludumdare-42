namespace Interfaces {
  /**
   * UNLOCKR : Interfaces/AssetTypeSpritesheet
   * --------------------------------------------------------------------
   * Implements basic parameters for an `AssetList` spritesheet object.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface AssetTypeSpritesheet {
    /**
     * In-game spritesheet name, used to retrieve this item from the cache.
     */
    name: string;

    /**
     * Path to the file containing the spritesheet inside the build path folder.
     */
    file: string;

    /**
     * Width of a single frame in this sprite sheet, in pixels.
     */
    frameWidth: number;

    /**
     * Height of a single frame in this sprite sheet, in pixels.
     */
    frameHeight: number;

    /**
     * How many frames are in this spritesheet, if not specified the whole
     * image will be divided into frames.
     */
    frameMax: number;

    /**
     * If the frames have been drawn with a margin, specify.
     */
    margin: number;

    /**
     * If the frames have been drawn with some spacing, specify.
     */
    spacing: number;

    /**
     * Number of frames to skip, useful for images with multiple spritesheets.
     */
    skipFrames: number;

    /**
     * Should this item be ignored by the pre-loader?
     */
    ignore: boolean;
  }
}
