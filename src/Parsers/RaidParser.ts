import TextParser from './TextParser';
import Raid from '../Raid';

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

export default class RaidParser extends TextParser {

  public parse(text: string): Raid {
    const parts = (getRaidCode(text) || '').split(' ');
    const code = parts.pop();
    if (!code) {
      throw this.invalidFormatError(text);
    }
    const message = parts.length > 0 ? parts.join(' ') : undefined;
    return new Raid(text, code, message);
  }
}
