---
title: "Using (G++-5) + (Xcode) + (Makefile) + (Autocomplete)"
description: "Hey guys, if you have been trying to use Xcode for your C++ projects with “Makefile” and “g++-5”, you are in the right place. I am about to tell you how you…"
date: "2015-08-21T20:19:09.000Z"
author: "Gungor Basa"
tags: ["iOS","C++"]
originalUrl: "https://medium.com/@gbasa/using-g-5-xcode-makefile-autocomplete-d1f1064e2a4f"
mediumId: "d1f1064e2a4f"
featureimage: "/images/posts/using-g-5-xcode-makefile-autocomplete-d1f1064e2a4f/01-dd0e03e4.png"
images: ["/images/posts/using-g-5-xcode-makefile-autocomplete-d1f1064e2a4f/01-dd0e03e4.png"]
---
Hey guys, if you have been trying to use Xcode for your C++ projects with “Makefile” and “g++-5”, you are in the right place. I am about to tell you how you can achieve this :)

First of all, you need to tell Xcode, how to find g++-5. As you may know, after Xcode6 we cannot choose g++ as our compiler in Xcode. (I assume you already have gcc-5) (This part is mostly for autocompletion with g++-5, it is nothing to do with compiling with Makefile. Only required step is installing g++-5)

To be able to see g++-5 on the compiler section, download [this](https://github.com/hmazhar/xcode-gcc) extension and put related plugin(s) to the Xcode/Plug-ins directory.

Since I only want to use “gcc-5.2”, I will copy “GCC 5.2.xcspec”.

```
cp GCC\ 5.2.xcspec /Applications/Xcode.app/Contents/Plugins/Xcode3Core.ideplugin/Contents/SharedSupport/Developer/Library/Xcode/Plug-ins/
```

Now, you can see “gcc-5” under “Build Settings -> Build Options”. For more information check [this](http://hamelot.co.uk/programming/add-gcc-compiler-to-xcode-6/) blog post.

After this step, lets continue with required steps. Lets create a “External Build System”.

![Screenshot 2015-08-21 11.47.22](/images/posts/using-g-5-xcode-makefile-autocomplete-d1f1064e2a4f/02-dcf17861.png)

Then, add new “Empty File” and “main.cpp” files to your project. (Before you start write your Makefile, be sure to set “Prefer Indent Using” to tabs in your Xcode)

I wrote a Makefile and yours also should be look like mine.

![Screenshot 2015-08-21 11.57.19](/images/posts/using-g-5-xcode-makefile-autocomplete-d1f1064e2a4f/03-d374ba61.png)

Now, when you try to run your project, you will see “Build Succeeded” message. But, it won’t run yet.

Go to “Product -> Scheme -> Edit Scheme”

![Screenshot 2015-08-21 12.07.23](/images/posts/using-g-5-xcode-makefile-autocomplete-d1f1064e2a4f/04-2796d6a1.png)

Choose “Run Executable” to “Other” and find your executable file (When you build it, you created one).

![Screenshot 2015-08-21 12.12.26](/images/posts/using-g-5-xcode-makefile-autocomplete-d1f1064e2a4f/05-1d7b8de2.png)

Now, if you try to run your code from Xcode, you will see it runs.

Are we done? Not yet unless you want to use without autocomplete.

For autocompletion, “Add New Target” to your project as “Command Line Tool”.

![Screenshot 2015-08-21 12.32.10](/images/posts/using-g-5-xcode-makefile-autocomplete-d1f1064e2a4f/06-3c62f903.png)

![Screenshot 2015-08-21 12.34.55](/images/posts/using-g-5-xcode-makefile-autocomplete-d1f1064e2a4f/07-faf026bb.png)

This part created another “main.cpp” file we do not need. So, we should get rid of it. Choose the new “Command Line Tool” as our target for now and delete its “Compile Sources” items.

![Screenshot 2015-08-21 12.54.14](/images/posts/using-g-5-xcode-makefile-autocomplete-d1f1064e2a4f/08-19ef52d8.png)

Also, delete new folder which contains newly (automatically) created “main.cpp”.

In the “Build Phases” tab of the “Command Line Tool Target” change compiler to “GCC-5.2”.

Choose “Project File” as target.

![Screenshot 2015-08-21 13.01.48](/images/posts/using-g-5-xcode-makefile-autocomplete-d1f1064e2a4f/09-4ab77e8a.png)

Change also compiler to “GCC-5.2” and delete the line “CLANG\_CXX\_LIBRARY”.

Choose the main file (and all other files you want to have autocomplete) we created and set its target to newly created “Command Line Tool” target.

![Screenshot 2015-08-21 12.51.50](/images/posts/using-g-5-xcode-makefile-autocomplete-d1f1064e2a4f/10-163b6731.png)

Build your “Command Line Project” (In my case it is MakefileProject-doc) and go and run your actual project :) Thats all.

P.S. If you add another file, don’t forget to set their target to “Command Line Project”.

P.S2. Each time you add something, don’t forget to build your “Command Line Project”

![Screenshot 2015-08-21 13.17.25](/images/posts/using-g-5-xcode-makefile-autocomplete-d1f1064e2a4f/11-65589a24.png)

Happy Coding :)
