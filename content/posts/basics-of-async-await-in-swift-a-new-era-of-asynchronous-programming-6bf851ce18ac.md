---
title: "Basics of Async/Await in Swift: A New Era of Asynchronous Programming"
description: "Handling asynchronous context in Swift has been challenging for years, but with the introduction of async/await in Swift 5.5 (2021), things have changed.…"
date: "2024-08-14T07:26:45.020Z"
author: "Gungor Basa"
tags: ["Swift"]
originalUrl: "https://medium.com/@gbasa/basics-of-async-await-in-swift-a-new-era-of-asynchronous-programming-6bf851ce18ac"
mediumId: "6bf851ce18ac"
---
Handling asynchronous context in Swift has been challenging for years, but with the introduction of `async/await` in Swift 5.5 (2021), things have changed. The promise of `async/await` is to allow developers to write safer, more intuitive code, a.k.a making our lives easier. Swift 6 takes this goal even further and tries to make the process safer than the original `async/await`. In this post, I'll explore how `async/await` works, its benefits, and how it transforms the way we write asynchronous code.

But first, let’s remember the way we have been writing asynchronous code all these years, and let’s see what are the problems with it.

#### **Grand Central Dispatch(GCD) — The Traditional Way**

Before `async/await`, asynchronous programming in Swift often relied on callbacks, completion handlers, and Grand Central Dispatch (GCD). While these tools were effective, they often led to code that was hard to read, maintain, and debug. Additionally, managing references with `weak` and `unowned` keywords can add complexity and lead to potential issues.

```swift
func fetchData(completion: @escaping (Result<Data, Error>) -> Void) {
    DispatchQueue.global().async {
        // Making a network call
        guard let data: Data = ... else { return completion(.failure(NetworkError.notFound)) }
        completion(.success(data))
    }
}

fetchData { result in
    switch result {
    case .success(let success):
        print("Successfully Fetch Data")
    case .failure(let error):
        print("Failed to Fetch Data \(error.localizedDescription)")
    }
}
```

I can hear many of you saying, “It’s not that bad. It’s okay, and it looks familiar. We like our way.” However, in real-world scenarios, code is rarely that simple. Often, we find ourselves writing more complex code where multiple asynchronous calls need to be chained together, leading to what is commonly known as Callback Hell.

#### **From Callback Hell to** `**async/await**` **Simplicity**

Let’s consider a scenario where we first fetch the data, then parse it, and finally save it to disk.

```swift
// Method signatures
func fetchData(completion: @escaping (Result<Data, Error>) -> Void)
func parseData(_ data: Data, completion: @escaping (Result<String, Error>) -> Void)
func saveData(_ parsedResult: String, completion: @escaping (Result<Bool, Error>) -> Void)

fetchData { [weak self] result in
    switch result {
    case .success(let data):
        self?.parseData(data) { parseResult in
            switch parseResult {
            case .success(let parsedString):
                self?.saveData(parsedString) { saveResult in
                    switch saveResult {
                    case .success:
                        print("Successfully Saved Parsed String")
                    case .failure(let error):
                        print("Failed to Save Parsed String \(error.localizedDescription)")
                    }
                }
            case .failure(let error):
                print("Failed to parse data!")
            }
        }
    case .failure(let error):
        print("Failed to Fetch Data \(error.localizedDescription)")
    }
}
```

How about now? Still like your traditional method? I didn’t think so. This code is very hard to read and debug, and it’s only three levels deep. What if you needed more?

#### **Simplicity of async/await Code**

With `async/await`, your method definitions become much cleaner and more readable:

```swift
func fetchData() async throws -> Data { fatalError() }
func parseData(_ data: Data) async throws -> String { fatalError() }
func saveData(_ parsedResult: String) async throws -> Bool { fatalError() }
```

Now, let’s see how it transforms the callback hell:

```swift
let data = try await fetchData()
let parsedString = try await parseData(data)
let isSaved = try await saveData(parsedString)
```

Isn’t it beautiful? No more callback hell — just straightforward, easily readable code.

On top of it, it is very easy to handle errors as well. Just wrap it up with a `do/catch` block and Voila! 🪄🪄🪄

Your new code looks like this ⬇️

```swift
do {
    let data = try await fetchData()
    let parsedString = try await parseData(data)
    let isSaved = try await saveData(parsedString)
} catch {
    // Handle your error
}
```

**Using** `**Task**` **to Manage Asynchronous Context**  
How do we call these `async` functions? Can we directly call it from our synchronous code? The answer is unfortunately NO! Don’t worry, though — it’s easy to solve. Simply wrap it in a `Task`.

* * *

```swift
Task {
    do {
        let data = try await fetchData()
        let parsedString = try await parseData(data)
        let isSaved = try await saveData(parsedString)
    } catch {
        // Handle your error
    }
}
```

With above code block ⬆️, your code will run in an asynchronous context, allowing you to perform concurrent work without blocking the thread that initiated the task.

* * *

Let’s go over some of the keywords we used for our example;

`Task:` It allows you to run asynchronous code from within a synchronous context, effectively bridging the gap between traditional synchronous code and the new asynchronous model.

`try:` Used to call a function that might throw an error. When using `try` in combination with `async/await`, you're signaling that the asynchronous function you're calling could fail, and you need to handle that failure appropriately. If an error is thrown, it will be caught in a `catch` block.

`async:` Marks a function as asynchronous, meaning it can be suspended and resumed later. This type of function can only be called from an asynchronous context. When a function is marked with `async`, it allows you to use the `await` keyword within that function to wait for asynchronous tasks to complete without blocking the current thread.

`await:` Pauses the execution of the function until the asynchronous operation completes. Due to the nature of the new concurrency model, tasks can be suspended and resumed later. When you use `await`, you essentially tell Swift to wait for an asynchronous operation to finish before moving on to the next line of code, making the code look and behave like synchronous code.

* * *

In conclusion; `async/await` in Swift is a powerful tool that brings simplicity and clarity to asynchronous programming. By making asynchronous code look and behave like synchronous code, it reduces the cognitive load on developers and makes codebases easier to maintain.

This is all for today. I will continue to write about Swift and Swift Concurrency. I’ll link all other concurrency-related posts below. Stay tuned for more on Swift!
