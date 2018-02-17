import TextParser from './TextParser';
import Boss from '../Boss';

const BOSS_REGEXP = /^(Lv|Lvl )(\d{1,3})\s+(.+)$/u;
export function parseBoss(text: string) {
  const parser = new BossParser();
  return parser.parse(text);
}

export default class BossParser extends TextParser {
  public static readonly BOSS_REGEXP = BOSS_REGEXP;
  public static readonly parse = parseBoss;

  public parse(text: string): Boss {
    const matches = text.match(BOSS_REGEXP);
    if (!matches) {
      throw this.invalidFormatError(text);
    }
    const language = matches[1] === 'Lv' ? 'jp' : 'en';
    const level = Number(matches[2]);
    const name = matches[3];

    return new Boss(text, name, language, level);
  }
}
