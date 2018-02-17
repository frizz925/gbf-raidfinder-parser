export default abstract class ParsedText {
  public text?: string;
  public constructor(text: string) {
    this.parse(text);
  }

  public abstract parse(text: string): ParsedText;
}
