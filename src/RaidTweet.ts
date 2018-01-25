import ParsedText from './ParsedText';
import Raid from './Raid';
import Boss from './Boss';

export default class RaidTweet extends ParsedText {
  public language: string;
  public raid: Raid;
  public boss: Boss;

  public parse(text: string): RaidTweet {
    const lines = text
      .trim()
      .split('\n')
      .reverse();
    if (lines.length < 3) {
      throw this._invalidFormatError(text);
    }

    this.text = text;
    this.boss = new Boss(lines[0]);
    this.raid = new Raid(lines[2]);
    this.language = this.boss.language;
    return this;
  }

  private _invalidFormatError(text: string): TypeError {
    throw new TypeError(`Can't parse text '${text}'`);
  }
}

export function parseTweet(text: string): RaidTweet {
  return new RaidTweet(text);
}

export function isRaidTweet(text: string): boolean {
  try {
    parseTweet(text);
    return true;
  } catch (e) {
    if (e instanceof TypeError && e.message.match(/can't parse/i)) {
      return false;
    } else {
      throw e;
    }
  }
}
