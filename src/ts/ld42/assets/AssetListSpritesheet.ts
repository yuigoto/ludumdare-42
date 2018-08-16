namespace LD42 {
  // Imports
  import AssetTypeSpritesheet = Interfaces.AssetTypeSpritesheet;

  /**
   * UNLOCKR : LD42/Assets/AssetListSpritesheet
   * --------------------------------------------------------------------
   * Holds the array containing all the spritesheets used by the game.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export const AssetListSpritesheet: Array<AssetTypeSpritesheet> = [
    {
      name: "bg_corridor_sprite",
      file: "assets/img/bg/bg_corridor_sprite.png",
      frameWidth: 64,
      frameHeight: 64,
      frameMax: 12,
      margin: 0,
      spacing: 0,
      skipFrames: 0,
      ignore:false
    }
  ];
}
