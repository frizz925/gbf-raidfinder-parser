import ParsedText from './ParsedText';
import Raid from './Raid';
import Boss from './Boss';

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

export default class RaidTweet extends ParsedText {
  public static readonly parse = parseTweet;
  public static readonly isRaidTweet = isRaidTweet;

  public image: string;
  public language: string;
  public raid: Raid;
  public boss: Boss;

  public parse(text: string): RaidTweet {
    const lines = text
      .trim()
      .split('\n')
      .reverse();
    if (lines.length < 4) {
      throw this._invalidFormatError(text);
    }

    this.text = text;
    this.image = lines[0].trim();
    this.boss = new Boss(lines[1]);
    this.language = this.getLanguage(lines[2]);
    this.raid = new Raid(lines[3]);
    return this;
  }

  public getLanguage(text: string): string {
    return text.match(/参加者募集！/) ? 'jp' : 'en';
  }

  private _invalidFormatError(text: string): TypeError {
    throw new TypeError(`Can't parse text '${text}'`);
  }
}
