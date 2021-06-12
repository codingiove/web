export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = (difference / duration) * 10;
  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick;
    // 如果还是当前这句歌词就不执行 scrollTo
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}
