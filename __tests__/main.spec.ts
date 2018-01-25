import * as fs from 'fs';
import * as path from 'path';
import RaidTweet, { isRaidTweet } from '../src/RaidTweet';

function readTweet(lang: string, withMessage: boolean): string {
  const fileName = lang + (withMessage ? '_with' : '_no') + '_message.txt';
  const filePath = path.resolve(__dirname, 'tweets', fileName);
  return fs.readFileSync(filePath).toString('utf-8');
}

function testTweet(tweet: string): void {
  const raidTweet = new RaidTweet(tweet);
  expect(raidTweet).toHaveProperty('text', tweet);
  expect(isRaidTweet(tweet)).toBeTruthy();
}

function testTweetError(tweet: string): void {
  expect(() => testTweet(tweet)).toThrow(/can't parse/i);
  expect(isRaidTweet(tweet)).toBeFalsy();
}

describe('Parser tests', () => {
  it('test the Japanese tweet with message', () => {
    testTweet(readTweet('jp', true));
  });

  it('test the English tweet with message', () => {
    testTweet(readTweet('en', true));
  });

  it('test the Japanese tweet without message', () => {
    testTweet(readTweet('jp', false));
  });

  it('test the English tweet without message', () => {
    testTweet(readTweet('en', false));
  });

  it('test with a random English tweet', () => {
    testTweetError('This is a random tweet in English');
  });

  it('test with a random Japanese tweet', () => {
    testTweetError('これは日本語のランダムなつぶやきです');
  });
});
