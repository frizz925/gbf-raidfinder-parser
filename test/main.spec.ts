import * as fs from 'fs';
import * as path from 'path';
import { parseTweet, isRaidTweet } from '../src/RaidTweet';

function readTweet(lang: string, suffix: boolean | string): string {
  const nameParts = [lang];
  if (typeof suffix === 'boolean') {
    nameParts.push(suffix ? 'with' : 'no', 'message');
  } else {
    nameParts.push(suffix);
  }
  const fileName = nameParts.join('_') + '.txt';
  const filePath = path.resolve(__dirname, 'tweets', fileName);
  return fs.readFileSync(filePath).toString('utf-8');
}

function testTweet(tweet: string, options?: object): void {
  const raidTweet = parseTweet(tweet);
  expect(raidTweet).toHaveProperty('text', tweet);
  for (const k in options || {}) {
    if (!options.hasOwnProperty(k)) {
      continue;
    }
    expect(raidTweet).toHaveProperty(k, options[k]);
  }
  expect(isRaidTweet(tweet)).toBeTruthy();
}

function testTweetError(tweet: string): void {
  expect(() => testTweet(tweet)).toThrow(/can't parse/i);
  expect(isRaidTweet(tweet)).toBeFalsy();
}

describe('Parser tests', () => {
  it('test the Japanese tweet with message', () => {
    testTweet(readTweet('jp', true), {
      'boss.level': 75,
      'boss.name': 'セレスト・マグナ',
      language: 'jp',
      'raid.code': 'AD3959A6',
      'raid.message': 'MVP',
    });
  });

  it('test the English tweet with message', () => {
    testTweet(readTweet('en', true), {
      'boss.level': 75,
      'boss.name': 'Celeste Omega',
      language: 'en',
      'raid.code': 'DA3959A6',
      'raid.message': 'Free MVP',
    });
  });

  it('test the Japanese tweet without message', () => {
    testTweet(readTweet('jp', false), {
      'boss.level': 150,
      'boss.name': 'プロトバハムート',
      language: 'jp',
      'raid.code': '5089835C',
    });
  });

  it('test the English tweet without message', () => {
    testTweet(readTweet('en', false), {
      'boss.level': 100,
      'boss.name': 'Celeste Omega',
      language: 'en',
      'raid.code': '470A4098',
    });
  });

  it('test with a random English tweet', () => {
    testTweetError('This is a random tweet in English');
  });

  it('test with a random Japanese tweet', () => {
    testTweetError('これは日本語のランダムなつぶやきです');
  });

  it('test English tweet without image', () => {
    testTweet(readTweet('en', 'without_image'));
  });

  it('test Japanese tweet without image', () => {
    testTweet(readTweet('jp', 'without_image'));
  });
});
