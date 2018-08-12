namespace Interfaces {
  /**
   * LD42 : Interfaces/AssetTypeSound
   * --------------------------------------------------------------------
   * Implements basic parameters for an `AssetList` sound-type object.
   *
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface AssetTypeSound {
    name: string;
    file: string | string[];
    autoDecode: boolean;
    ignore: boolean;
  }
}
