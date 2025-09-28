import { Lang } from '@common/enums';

export class LangSelectHelper {
  public static langSelects(str: string, lang?: string | Lang) {
    if (lang) {
      return [`${str}_${lang}`];
    }
    return [`${str}_tk`, `${str}_ru`, `${str}_en`];
  }

  public static langSelectsSql(str: string, lang?: string | Lang) {
    return lang === 'en'
      ? `${str}_${lang}`
      : lang === 'ru'
        ? `${str}_${lang}`
        : `${str}_tk`;
  }
}
