import ParsedText from './ParsedText';

const BOSS_LEVEL_REGEXP = /^(Lv|Lvl )(\d{1,3}) (.+)$/;

export default class Boss extends ParsedText {
  public language: string;
  public name: string;
  public level: number;

  public parse(text: string): Boss {
    const matches = text.match(BOSS_LEVEL_REGEXP);
    if (!matches) {
      throw new TypeError(`Can't parse boss text '${text}'`);
    }
    this.text = text;
    this.language = matches[1] === 'Lv' ? 'jp' : 'en';
    this.level = Number(matches[2]);
    this.name = matches[3];
    return this;
  }
}
