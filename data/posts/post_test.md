---
title: Markdown syntax demo
description: A post to test the markdown rendering
authors:
  - Benjamin
  - Tayzen
tags:
  - test
  - markdown
  - id123abc
date: 2024-11-26
---

This post is used to visualize the render of the markdown syntax if you are in the blog directly. If you are reading this from a RSS reader, the rendering will be simpler to accommodate most readers, so each of the elements will not be the smae.

Esse sit culpa id ut ex in magna incididunt duis sint. Officia do ipsum aliquip
irure tempor adipisicing. Elit do ipsum fugiat proident irure et in
reprehenderit commodo excepteur aliquip. Labore mollit et ut enim anim ad
proident.

Nostrud est pariatur esse aliqua. Lorem do ullamco sit est. Nisi minim tempor
aute excepteur dolore. Officia quis pariatur id quis nulla aute exercitation ea.

Culpa proident sit exercitation mollit elit adipisicing duis excepteur voluptate
deserunt ullamco ex laboris tempor. Excepteur aute Lorem dolore culpa sunt culpa
qui nisi nisi ullamco. Nostrud cillum nulla ad aliquip laboris elit. Ea
adipisicing est aliqua mollit enim laboris id cupidatat velit nisi
reprehenderit. Exercitation irure incididunt commodo elit deserunt ipsum. Dolor
excepteur tempor occaecat aliquip fugiat Lorem duis magna ea consectetur laboris
occaecat. Deserunt ea aute aliqua cupidatat do sint velit cillum amet tempor ex.

## First section

### Paragraphs

Italic: _Esse sit culpa id ut ex in magna incididunt duis sint. Officia do ipsum aliquip
irure tempor adipisicing. Elit do ipsum fugiat proident irure et in
reprehenderit commodo excepteur aliquip. Labore mollit et ut enim anim ad
proident._

Bold: **Nostrud est pariatur esse aliqua. Lorem do ullamco sit est. Nisi minim tempor
aute excepteur dolore. Officia quis pariatur id quis nulla aute exercitation ea.**

Bold and italic: **_Culpa proident sit exercitation mollit elit adipisicing duis excepteur voluptate
deserunt ullamco ex laboris tempor. Excepteur aute Lorem dolore culpa sunt culpa
qui nisi nisi ullamco. Nostrud cillum nulla ad aliquip laboris elit. Ea
adipisicing est aliqua mollit enim laboris id cupidatat velit nisi
reprehenderit. Exercitation irure incididunt commodo elit deserunt ipsum. Dolor
excepteur tempor occaecat aliquip fugiat Lorem duis magna ea consectetur laboris
occaecat. Deserunt ea aute aliqua cupidatat do sint velit cillum amet tempor ex._**

### Special text formatting

This is a break:

---

Strikethrough: ~~Strikethrough~~

This is\
an hardline break!

### Citation

> A Very Long Citation

### Footnotes

[^1]: This is a footnote

[^bignote]: The first paragraph of the definition.

    Paragraph two of the definition.

Here is a simple footnote[^1]. Here is a big footnote[^bignote], it can contain anything you want.

### Links

[foo]: https://github.com/Tayzendev/smallblog "Smallblog's github"

This is a [link](https://jsr.io/@tayzendev/smallblog)

Link reference definition: [foo].

### Code

```python
import numpy as np

def test_function(ls)
    arr = np.array(ls)
    return arr.T

print(f"result: {test_function([1, 2, 3])}")
```

This is a line containing some `inline code`. Does it render great?

### Lists

#### Unordered list

- First item
- Second one
- Third one

#### Ordered list

1. First item
2. Second one
3. Third one

#### Checklist

- [ ] Uncheck
- [x] Checked

### Image

![Deno](img/deno_logo.png)

### Table

| Column 1 | Column 2 | Column 3 | Column 4 | Column 5 | Column 6 | Column 7 | Column 8 | Column 9 | Column 10 | Column 11 | Column 12 | Column 13 | Column 14 | Column 15 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | --------- | --------- | --------- | --------- | --------- | --------- |
| Row 1    | Data 1   | Data 2   | Data 3   | Data 4   | Data 5   | Data 6   | Data 7   | Data 8   | Data 9    | Data 10   | Data 11   | Data 12   | Data 13   | Data 14   |
| Row 2    | Data 15  | Data 16  | Data 17  | Data 18  | Data 19  | Data 20  | Data 21  | Data 22  | Data 23   | Data 24   | Data 25   | Data 26   | Data 27   | Data 28   |
| Row 3    | Data 29  | Data 30  | Data 31  | Data 32  | Data 33  | Data 34  | Data 35  | Data 36  | Data 37   | Data 38   | Data 39   | Data 40   | Data 41   | Data 42   |
| Row 4    | Data 43  | Data 44  | Data 45  | Data 46  | Data 47  | Data 48  | Data 49  | Data 50  | Data 51   | Data 52   | Data 53   | Data 54   | Data 55   | Data 56   |

### Video

To include a video in your blog post, you can use the following syntax:

```md
![Deno - Keep it simple (YouTube version)](https://www.youtube.com/watch?v=swXWUfufu2w)
![Deno - Keep it simple (local version)](img/deno.mp4)
```

This only works with YouTube videos or videos hosted on your own server. For other sites, you can search in their documentation how to embed videos, you can use all the html you want in your markdown documents.

Example with a YouTube video:

![Deno - Keep it simple (YouTube version)](https://www.youtube.com/watch?v=swXWUfufu2w)

### Math

This is want math looks like in :

$$
x^2 + y^2 = z^2
$$

This is inline math: $x^2 + y^2 = z^2$.

The syntax uses LaTeX math expressions surrounding by `$` for the inline rendering or `$$` for the block rendering.

### Mermaid

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### Alerts

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
