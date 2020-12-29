---
title: Third post from Netlify cms
date: 2020-12-29T19:10:50.485Z
author: Burhan SAVCI
tag: Netlify
---
## Lorem Ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu purus sed massa interdum efficitur eleifend cursus mauris. Nullam id porta leo. Praesent vitae tempor metus. Sed ornare tellus at metus posuere ultrices. Vivamus sapien urna, dignissim et varius a, pharetra eget quam. Suspendisse sed vehicula est, eget vulputate velit. Maecenas lacus dolor, tempor in rutrum ut, cursus nec risus. Mauris vel eros est. Cras ac condimentum justo. Nullam tempus diam lorem, at volutpat quam sollicitudin ut. Cras consequat urna a libero imperdiet, eu porta nulla sodales. Maecenas feugiat enim elit, a elementum ex imperdiet a. Morbi id nunc malesuada risus dignissim molestie sed nec eros. Fusce mollis fringilla volutpat.

### Donec fermentum in odio tempor pulvinar

* Maecenas auctor eleifend suscipit.
* Integer pharetra lectus quam, eu vulputate lacus lobortis at.
* Nunc vel sollicitudin est. Etiam nec iaculis sem.

Phasellus quis ante convallis velit maximus aliquet. Suspendisse consectetur justo risus, id molestie tellus iaculis quis. Mauris suscipit sollicitudin sapien, vel accumsan tellus convallis a. Etiam sit amet velit mollis, accumsan est eu, porttitor mauris. Etiam erat sapien, consequat eget imperdiet eu, pretium vitae nunc. Vestibulum eget suscipit nibh, id cursus quam. Nam vehicula molestie cursus. Suspendisse sodales blandit nibh, ac gravida eros suscipit nec. Praesent laoreet quis nulla ut posuere. Aliquam efficitur diam lectus, et ultrices urna porttitor quis. Donec molestie aliquet molestie. Etiam sit amet nibh quis augue pulvinar vehicula. Aliquam egestas tortor vitae auctor hendrerit. Maecenas vestibulum sem vitae consequat cursus. Maecenas mauris sapien, iaculis at tortor eu, venenatis dictum turpis.

Nunc hendrerit cursus nulla, sit amet malesuada orci viverra eget. Nunc nibh lorem, suscipit eu dignissim a, eleifend id augue. Phasellus vulputate orci scelerisque, molestie est vitae, fringilla elit. Nulla rutrum nulla ac rutrum sollicitudin. Pellentesque ut enim pellentesque, egestas magna et, tincidunt mi. Vestibulum ut arcu nunc. In hac habitasse platea dictumst. Proin in dolor sit amet nulla scelerisque faucibus. Ut convallis sapien non libero egestas pellentesque. Nullam hendrerit eu turpis at dignissim.

```csharp
using System.Linq;

public static class Kata
{
  public static int palindromeChainLength(int n)
  {
    var k = long.Parse(n.ToString());
    var m = new string(n.ToString().Reverse().ToArray());
    var step = 0;
    while (m != k.ToString())
    {
      k += long.Parse(m);
      m = new string(k.ToString().Reverse().ToArray());
      step++;
    }

    return step;
  }
}
```

Phasellus tempor dignissim justo a scelerisque. Curabitur hendrerit ex ut semper suscipit. Phasellus convallis dapibus ante in congue. Sed dictum sollicitudin pretium. Morbi consequat vel nulla mattis aliquam. Phasellus et tempor augue. Mauris quis felis pellentesque, tristique diam ornare, molestie lacus. Donec sit amet ultrices lectus. Etiam lacinia lacus odio, ac posuere neque pharetra a. Vestibulum id pellentesque odio. Aenean ut cursus augue. Praesent venenatis leo quis feugiat porttitor. Ut eget egestas metus, at luctus orci. Cras scelerisque pretium pretium. In consequat tortor ligula, vel gravida magna suscipit quis.

Pellentesque et nisi nec tellus hendrerit congue eleifend vel sem. Vivamus sollicitudin imperdiet posuere. Nullam ut nulla cursus, pellentesque risus id, consectetur elit. Ut scelerisque vestibulum neque, a cursus urna posuere sit amet. Mauris lobortis purus eu ante tristique, vel elementum mauris finibus. Quisque vestibulum felis vitae ipsum vestibulum, ut viverra quam convallis. Aliquam erat volutpat. Integer pellentesque vehicula purus, sed aliquet ante rutrum eget.

```javascript
const palindromeChainLength = (n) => {
  let m = parseInt([...n.toString()].reverse().join(''));
  return m == n ? 0 : 1 + palindromeChainLength(n + m);
};
```

Nullam faucibus nunc erat, nec venenatis lorem malesuada vel. Vestibulum auctor rutrum eleifend. Sed convallis risus risus, eu ultricies enim iaculis at. Nulla a nunc nec diam tempus interdum. Duis bibendum ex sit amet erat viverra rhoncus ac vel arcu. Suspendisse semper interdum vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in urna aliquam, finibus arcu et, iaculis enim.

Cras id mi nulla. Aenean ut elit lectus. Cras eu arcu tellus. Vivamus eget aliquam magna, id iaculis mi. Mauris lacinia turpis laoreet, tempor lorem in, tempus sem. Curabitur et justo enim. Sed sed orci at nulla dignissim hendrerit. Aliquam nec risus in purus efficitur interdum a id risus. Donec tempor, eros non iaculis venenatis, turpis est molestie ipsum, ut bibendum lorem nulla non elit. Fusce pellentesque, tortor id consectetur placerat, diam ante placerat massa, id placerat metus turpis in libero. Suspendisse et placerat leo. In tristique tempus erat faucibus imperdiet. Cras quis nulla eu augue blandit vulputate. Sed vehicula, ipsum a aliquam tempus, quam nibh tincidunt dui, eu tincidunt nibh arcu ac sem.

**Suspendisse nec diam pellentesque quam suscipit rutrum.** Morbi at luctus enim. Nullam id tincidunt tortor, vitae luctus lorem. Sed nibh mi, suscipit vitae nibh vitae, tempor porta justo. Aliquam vulputate mollis aliquet. Quisque ut ligula gravida enim porttitor eleifend sed vel nulla. *Vestibulum suscipit odio dapibus est eleifend eleifend. Etiam nec ullamcorper ex. Proin dignissim ex vel ultrices viverra.*

Donec eu sapien molestie, suscipit nisi eu, blandit libero. Aliquam erat volutpat. Vestibulum ac orci augue. In varius tellus leo, sed ullamcorper risus sagittis eget. Mauris consectetur turpis ut tortor feugiat, ut tincidunt eros luctus. Aliquam magna sem, hendrerit quis faucibus quis, tempus et enim. Nam dapibus diam ac eros aliquam malesuada. Quisque a sem ornare, auctor neque sed, rhoncus metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi at enim enim. Nunc eget sapien velit. Cras non porta urna, ac lacinia purus. Cras faucibus leo a odio pellentesque blandit. Aliquam id ullamcorper sapien, id dignissim purus. Curabitur eu fringilla augue.