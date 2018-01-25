import * as fs from 'fs';
import * as path from 'path';

function readText(lang: string, withMessage: boolean): string {
  const fileName = lang + (withMessage ? '_with' : '_no') + '_message.txt';
  const filePath = path.resolve(__dirname, 'text', fileName);
  return fs.readFileSync(filePath).toString('utf-8');
}

describe('Parser tests', () => {
  it('test the Japanese text without message', () => {
    const text = readText('jp', false);
    expect(text.length).toBeGreaterThan(1);
  });
});
