import ParsedText from './ParsedText';
import Raid from './Raid';
import Boss from './Boss';

export default class RaidTweet extends ParsedText {
  public raid: Raid;
  public boss: Boss;
  public language: string;
  public image?: string;

  public constructor(text: string, raid: Raid, boss: Boss, language: string, image?: string) {
    super(text);
    this.text = text;
    this.raid = raid;
    this.boss = boss;
    this.language = language;
    this.image = image;
  }
}
