import ParsedText from './ParsedText';

export default class Boss extends ParsedText {
  public name: string;
  public level: number;

  public parse(text: string): Boss {
    this.text = text;
    return this;
  }
}
