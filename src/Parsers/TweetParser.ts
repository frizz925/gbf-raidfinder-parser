import BossParser from './BossParser';
import RaidParser from './RaidParser';
import TextParser from './TextParser';
import RaidTweet from '../RaidTweet';
import Raid from '../Raid';
import Boss from '../Boss';

export function parseTweet(text: string): RaidTweet {
  const parser = new TweetParser();
  return parser.parse(text);
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

export default class TweetParser extends TextParser {
  public static readonly parse = parseTweet;
  public static readonly isRaidTweet = isRaidTweet;

  public parse(text: string): RaidTweet {
    const lines = text
      .trim()
      .split('\n')
      .reverse();
    if (lines.length < 3) {
      throw this.invalidFormatError(text);
    }

    let image: string | undefined = lines[0].trim();
    // pad the tokenized string if it doesn't start with an image link
    if (!image.startsWith('https://t.co')) {
      lines.splice(0, 0, '');
      image = undefined;
    }

    const boss = new BossParser().parse(lines[1]);
    const language = this.getLanguage(lines[2]);
    const raid = new RaidParser().parse(lines[3]);
    return new RaidTweet(text, raid, boss, language, image);
  }

  public getLanguage(text: string): string {
    return text.match(/参加者募集！/) ? 'jp' : 'en';
  }
}
