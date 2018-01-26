[![Build Status](https://travis-ci.org/Frizz925/gbf-raidfinder-parser.svg?branch=master)](https://travis-ci.org/Frizz925/gbf-raidfinder-parser)
[![codecov](https://codecov.io/gh/Frizz925/gbf-raidfinder-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/Frizz925/gbf-raidfinder-parser)
[![npm version](https://badge.fury.io/js/gbf-raidfinder-parser.svg)](https://badge.fury.io/js/gbf-raidfinder-parser)

Parser for Granblue Fantasy raid tweets.

## Getting started
### Installation
```sh
npm install gbf-raidfinder-parser
```

### Usage
```js
const tweetParser = require('gbf-raidfinder-parser');
const tweetText = `MVP AD3959A6 :参戦ID
参加者募集！
Lv75 セレスト・マグナ`;
tweetParser.isRaidTweet(tweetText); // -> true
tweetParser.parse(tweetText); 
/* RaidTweet {
  text: 'MVP AD3959A6 :参戦ID\n参加者募集！\nLv75 セレスト・マグナ',
  boss: Boss {
    text: 'Lv75 セレスト・マグナ',
    language: 'jp',
    level: 75,
    name: 'セレスト・マグナ' },
  raid: Raid { 
    text: 'MVP AD3959A6 :参戦ID', 
    code: 'AD3959A6', 
    message: 'MVP' },
  language: 'jp' }
*/

const randomTweet = 'random tweet';
tweetParser.isRaidTweet(randomTweet); // -> false
tweetParser.parse(randomTweet); // -> throw TypeError
```

## License
MIT
