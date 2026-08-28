---
title: "Swift3 — Memory Leaks"
description: "If you recently started(last 2–3 years) iOS development, you probably don’t know that developers had to do memory management for iOS 4 and earlier versions.…"
date: "2017-02-25T08:07:05.822Z"
author: "Gungor Basa"
tags: ["Swift","iOS"]
originalUrl: "https://medium.com/@gbasa/swift3-memory-leaks-135967a2fcea"
mediumId: "135967a2fcea"
---
If you recently started(last 2–3 years) iOS development, you probably don’t know that developers had to do memory management for iOS 4 and earlier versions. With iOS 5 automatic reference counting (ARC) came out and saved us from this burden. ARC is a compiler feature which, makes memory management process automatic.

Whenever you create a new instance of a class, ARC allocates required memory. As long as you have a strong reference in your program ARC does not deallocate memory. Once it realizes no one needs it (no active/strong reference left) ARC deallocates the memory.

On the paper and most of the time implementation ARC works great and help you write code without thinking about memory management. Look at the code below. It is a simple class which has init and deinit functions. ARC calls init when it creates an instance of a class and calls deinit when deallocates memory for created instance.

Lets create a book instance and then deallocate it.

However, after you create your instance, if you assign the same Book to different variables (if you create more than 1 strong reference), ARC deallocates the instance after no one points it.

Above is the basic explanation of how ARC works. **In short, as long as program has 1 strong reference to an object, ARC does not deallocate the created memory.**

Let’s move forward with our example. I would like to create one more class named Author and I will add one Author type variable in Book class. Also, each Author class has a Book variable named mostFamousBook. Below is our classes.

Now, lets run below code.

Here we have a **strong reference cycle** in our code. ARC will never be able to deallocate memory allocated for book and jkrowling instances.

You may need to have such a relationship in your code. Is that mean we will have a memory leak? Of course, **NO**. How can we solve this problem? All you need to do is using a keyword **weak** while defining your variable (Another way is using **unowned** keyword). If you use weak, it will not cause a runtime error. If you use unowned and the object we are referring to is deallocated, it will cause a run time error. Below is the example for weak keyword.

Let’s use unowned now. To be able to use, unowned we need to use let keyword to define mostFamousBook. This requires us to update init method as well (Since we cannot change it after initialization).

Be careful using unowned though, if you try to reach mostFamousBook after you deinitialize book, you will get a runtime error (Look at the above code).

Hope this post clarifies the memory management on iOS little bit better.

**References:**

[https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift\_Programming\_Language/AutomaticReferenceCounting.html](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html)
