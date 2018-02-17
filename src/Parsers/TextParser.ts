import ParsedText from '../ParsedText';

export default abstract class TextParser {
  public abstract parse(text: string): ParsedText;

  protected invalidFormatError(text: string): TypeError {
    return new TypeError(`Can't parse text '${text}'`);
  }
}
