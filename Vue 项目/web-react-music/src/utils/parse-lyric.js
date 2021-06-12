/*   
    [ "[00:00.000] 作词 : Peter Manos/Sam Ricci" ]
    [ "[00:01.000] 作曲 : Peter Manos/Sam Ricci" ]
    [ "[00:12.89]  You forgot to" ]
    [ "[00:15.80]  Turn the light out" ]
    [ "[00:18.86]  When you left last night" ] 
*/
// () 表示数组中的内容 ,\d{2} 类型是两位的数字
// (\d{2,3}) 两到三位的数字
const ParseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

export function ParseLyric(lyric) {
  const divisionArr = lyric.split("\n");
  const lyrics = [];
  for (const item of divisionArr) {
    if (item) {
      const result = ParseExp.exec(item);
      if (!result) continue;
      const time1 = result[1] * 60 * 1000;
      const time2 = result[2] * 1000;
      const time3 = result[3].length === 3 ? result[3] * 1 : result[3] * 10;
      const time = time1 + time2 + time3;
      const content = item.replace(ParseExp, "").trim();
      if (content) {
        const Obj = { time, content };
        lyrics.push(Obj);
      }
    }
  }
  return lyrics;
}
