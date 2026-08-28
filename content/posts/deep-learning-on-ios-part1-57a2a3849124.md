---
title: "Deep Learning on iOS — Part1"
description: "Deep Learning (DL) is the new era of Machine Learning. With Deep Learning (CNN, RNN, LSTM etc.) scientists had great success on object detection, natural…"
date: "2016-10-12T22:44:16.000Z"
author: "Gungor Basa"
tags: ["iOS","Artificial Intelligence","Vim"]
originalUrl: "https://medium.com/@gbasa/deep-learning-on-ios-part1-57a2a3849124"
mediumId: "57a2a3849124"
featureimage: "/images/posts/deep-learning-on-ios-part1-57a2a3849124/01-7d260c54.png"
images: ["/images/posts/deep-learning-on-ios-part1-57a2a3849124/01-7d260c54.png"]
---
Deep Learning (DL) is the new era of Machine Learning. With Deep Learning (CNN, RNN, LSTM etc.) scientists had great success on object detection, natural language processing, and many other areas last couple years. Apple, Google, Microsoft and many big companies improved their products with this technology.

There are couple different libraries for DL for iOS platform. This blog post’s topic is one of the most famous ones, Torch. Let’s get hands dirty now.

To be able to continue, you should have Brew package manager If you haven’t installed it to your computer, install it with below command.

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Now, we have Brew in our computer. It is time to install Torch on our Macs. Open your terminal and type below commands. These commands help you to install Torch automatically (painless way :).

```
$ git clone https://github.com/torch/distro.git ~/torch --recursive
$ cd ~/torch; bash install-deps;
$ ./install.sh
$ source ~/.bashrc
```

During the install phase installer may ask you;

```
Do you want to automatically prepend the Torch install location to PATH and LD_LIBRARY_PATH in your /Users/<username>/.zshrc? (yes / no)
```

If you are using zshrc shell, type yes, if you are not using like me, type no and enter. To be able to complete the install, we should add the library to to path. I prefer bash for my terminal, so I do below step. If you are using, something different than zshrc or bash, please find appropriate commands to add Torch install location to Path. For bash terminal open ~/.bash\_profile,

```
$ vim ~/.bash_profile
```

and add below line to end of the file

```
. /Users/<username>/torch/install/bin/torch-active
```

Now based on your terminal type, source our terminal to refresh environment variables.

```
$ source ~/.bash_profile
```

If we do everything correctly, Torch should be installed to your OSx. To test, type “th” command into your terminal.

![Screenshot 2016-07-03 00.19.30](/images/posts/deep-learning-on-ios-part1-57a2a3849124/02-dff6c0dd.png)

If you see above prompt, congratulations you have Torch on your computer. Now, it is time to learn how to use it as iOS library. (To exit type “os.exit()”)

```
$ git clone https://github.com/clementfarabet/torch-ios.git ~/torch_ios --recursive
$ cd ~/torch_ios
$ ./generate_ios_framework
```

Above commands will build all Torch libraries as static library for iOS and put it into “~/torch\_ios/framework” directory. Now we are ready to use Torch in iOS environment.

**Resources:**

[**Torch | Getting started with Torch**  
_Torch is a scientific computing framework for LuaJIT._torch.ch](http://torch.ch/docs/getting-started.html "http://torch.ch/docs/getting-started.html")[](http://torch.ch/docs/getting-started.html)

[**clementfarabet/torch-ios**  
_torch-ios - Torch7 for iOS._github.com](https://github.com/clementfarabet/torch-ios "https://github.com/clementfarabet/torch-ios")[](https://github.com/clementfarabet/torch-ios)
