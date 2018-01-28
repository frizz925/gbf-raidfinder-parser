import ParsedText from './ParsedText';

const RAID_CODE_SUFFIXES = [' :Battle ID', ' :参戦ID'];

function getRaidCode(text: string): string | null {
  for (const suffix of RAID_CODE_SUFFIXES) {
    const index = text.indexOf(suffix);
    if (index < 0) {
      continue;
    }
    return text.substr(0, index);
  }
  return null;
}

export default class Raid extends ParsedText {
  public message: string;
  public code: string | undefined;

  public parse(text: string): Raid {
    const parts = (getRaidCode(text) || '').split(' ');
    this.text = text;
    this.code = parts.pop();
    this.message = parts.join(' ');
    return this;
  }
}
