namespace Interfaces {
  /**
   * LD42 : Interfaces/AssetTypeImage
   * --------------------------------------------------------------------
   * Implements basic parameters for an `AssetList` image-type object.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface AssetTypeImage {
    name: string;
    file: string;
    overwrite: boolean;
    ignore: boolean;
  }
}
