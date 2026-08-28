---
title: "Solving YouCompleteMe requires Vim compiled with Python 2.x support Problem"
description: "YCM is one of the best C++ autocomplete plugin for vim. When I tried to use it, I got “YouCompleteMe requires Vim compiled with Python 2.x support” error.…"
date: "2015-04-10T08:21:37.000Z"
author: "Gungor Basa"
tags: ["Python","Vim"]
originalUrl: "https://medium.com/@gbasa/solving-youcompleteme-requires-vim-compiled-with-python-2-x-support-problem-19d2d2c8bca1"
mediumId: "19d2d2c8bca1"
---
YCM is one of the best C++ autocomplete plugin for vim. When I tried to use it, I got “YouCompleteMe requires Vim compiled with Python 2.x support” error. In this post, I will show you how to solve this issue.

First of all lets download the latest source code of the vim. For this step I assume you have mercurial. (Download link may change in the future)

```
Download Vim from https://github.com/vim/vim
```

After download it, follow below instructions.

```
$ cd vim
$./configure --enable-pythoninterp --with-python-config-dir=/usr/lib/python2.7/config
$ make
$ sudo make install
```
