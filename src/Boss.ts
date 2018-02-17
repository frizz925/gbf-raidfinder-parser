import ParsedText from './ParsedText';

const BOSS_REGEXP = /^(Lv|Lvl )(\d{1,3}) (.+)$/;

export default class Boss extends ParsedText {
  public name: string;
  public language: string;
  public level: number;

  public constructor(text: string, name: string, language: string, level: number) {
    super(text);
    this.name = name;
    this.language = language;
    this.level = level;
  }
}
