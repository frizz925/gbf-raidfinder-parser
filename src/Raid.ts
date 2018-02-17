import ParsedText from './ParsedText';

export default class Raid extends ParsedText {
  public message?: string;
  public code: string;

  public constructor(text: string, code: string, message?: string) {
    super(text);
    this.code = code;
    this.message = message;
  }
}
