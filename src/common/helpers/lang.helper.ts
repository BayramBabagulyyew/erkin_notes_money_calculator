import { Lang } from '@common/enums';

export class LangValidation {
  /**
   * Encrypts plain string
   * @param str {string}
   * @returns Promise<string> Returns encrypted
   */

  public static lang(str: Lang): Lang {
    if (str === Lang.EN) {
      return Lang.EN;
    }
    if (str === Lang.RU) {
      return Lang.RU;
    }
    return Lang.TK;
  }
}
