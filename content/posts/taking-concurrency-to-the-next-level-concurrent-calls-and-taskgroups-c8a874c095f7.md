---
title: "Taking Concurrency to the Next Level: Concurrent Calls and TaskGroups"
description: "Summary of the post, so you don’t have to read everything if you’re in a hurry."
date: "2024-09-22T12:39:24.244Z"
author: "Gungor Basa"
tags: ["Swift"]
originalUrl: "https://medium.com/@gbasa/taking-concurrency-to-the-next-level-concurrent-calls-and-taskgroups-c8a874c095f7"
mediumId: "c8a874c095f7"
---
Summary of the post, so you don’t have to read everything if you’re in a hurry.

**Key Concepts:**  
**1\. Concurrency vs. Parallelism:**  
Concurrency is about handling multiple tasks at once, but they don’t necessarily run simultaneously. Parallelism involves running tasks at the same time.

**2\. Sequential Execution:**  
Running tasks one after the other leads to slow and inefficient performance, especially when tasks are long or depend on external resources like network requests.

**3\. async let:**  
A concurrency tool that allows you to run a fixed, small number of asynchronous tasks concurrently, improving performance by reducing the total execution time.

**4\. TaskGroup:**  
A more flexible concurrency tool for handling a dynamic or large number of tasks, where tasks can be added and managed at runtime.

**5\. Task Scheduling:**  
Swift’s automatic task scheduling optimizes the order in which tasks are executed based on system resources like CPU availability.

**Benefits:**  
**1\. Improved Performance:**  
Concurrency can drastically reduce the overall execution time compared to sequential task handling.

**2\. Efficient Task Management:**  
`async let` is great for predictable, small sets of tasks, while `TaskGroup` handles dynamic, unpredictable workloads with ease.

**3\. Flexibility:**  
TaskGroup allows for dynamic task creation, making it a superior choice when dealing with unknown or varying numbers of tasks.

**4\. Optimized Task Execution:**  
Swift automatically manages task scheduling to ensure efficient use of system resources, leading to faster completion times.

* * *

In my previous post, I introduced the basics of `async/await` and how it effectively solves the infamous callback hell, simplifying asynchronous programming in Swift. If you haven’t read it yet, I highly recommend starting [there](/basics-of-async-await-in-swift-a-new-era-of-asynchronous-programming-6bf851ce18ac), as it lays the foundation for understanding Swift’s modern concurrency model.

Today, we’ll take the next step and dive into **task groups** and the concept of concurrent asynchronous calls. I’ll show you how to structure your code to perform multiple asynchronous tasks concurrently. As an important side note, I want to clarify: we’re talking about **concurrency**, not **parallelism** — there’s a subtle but crucial difference. Concurrency is about dealing with multiple tasks at once, but it doesn’t necessarily mean they’re all running at the same time (parallel). In Swift, task groups allow you to perform asynchronous work concurrently, in a clean and manageable way, while Swift takes care of optimizing task execution under the hood.

* * *

Imagine a scenario where you need to download multiple files from a server. In real-world applications, this could involve fetching essential assets like images, documents, or other large resources that your app relies on. Handling these downloads sequentially would result in a slow, inefficient process that degrades the overall user experience.

To focus solely on the structure of handling these tasks and to avoid introducing external factors like network latency or server response times, we’ll simplify our example. Instead of making actual network requests, we’ll use the `sleep` function to simulate file downloads. This allows us to replicate the time it takes to complete each download without worrying about external variables.

```swift
func networking(delay: Int, id: Int) async throws -> Int {
    print("Task id=\(id) which takes \(delay)seconds started.")
    
    let seconds: UInt64 = 1_000_000_000
    try await Task.sleep(nanoseconds: UInt64(delay) * seconds)
    
    print("Task with \(id) which takes \(delay)seconds ended.")
    
    return delay
}
```

In this code, `networking(delay:id:)` simulates a file download where each task takes a certain amount of time. Now, given the above function, let’s look at how slow the process can be when we handle these downloads one by one in a sequence.

```swift
let delays = [3, 1, 5]

func downloadFilesSequentially() async throws {
    let startTime = CFAbsoluteTimeGetCurrent()
    
    for (index, delay) in delays.enumerated() {
        _ = try await networking(delay: delay, id: index)
    }
    
    print("downloadFilesSequentially -> \(CFAbsoluteTimeGetCurrent() - startTime)seconds")
}
```

Now, let’s take a look at the console and observe the results:

```bash
Task id=0 which takes 3seconds started.
Task with 0 which takes 3seconds ended.
Task id=1 which takes 1seconds started.
Task with 1 which takes 1seconds ended.
Task id=2 which takes 5seconds started.
Task with 2 which takes 5seconds ended.
downloadFilesSequentially -> 9.600003957748413seconds
```

As you can see, each task runs sequentially in the order it was started, and the total time is the sum of the individual task durations, plus a small overhead. Regardless of how long or short each task is, they all execute one after the other, resulting in a total time of around 9.6 seconds for just three tasks.

That’s quite a lot of time — almost 10 seconds! You wouldn’t want your users to wait that long when these tasks could be completed in nearly half the time. Let’s use some concurrency techniques to speed this up.

One of the simplest ways to achieve concurrency in Swift is by using `async let`. This allows you to start multiple asynchronous tasks concurrently and wait for their results. Instead of running the tasks one after another, you can execute them concurrently and significantly reduce the total execution time.

`async let` is especially useful when you have a small, limited number of tasks you want to run concurrently. Here’s how we can modify our example to use `async let`:

```swift
func download3FilesConcurrently() async throws {
    let startTime = CFAbsoluteTimeGetCurrent()
    
    async let first = networking(delay: delays[0], id: 1)
    async let second = networking(delay: delays[1], id: 2)
    async let third = networking(delay: delays[2], id: 3)
    
    _ = try await [first, second, third]
    
    print("download3FilesConcurrently -> \(CFAbsoluteTimeGetCurrent() - startTime)seconds")
}
```

Let’s look at the console results one more time:

```bash
Task id=1 which takes 3seconds started.
Task id=2 which takes 1seconds started.
Task id=3 which takes 5seconds started.
Task with 2 which takes 1seconds ended.
Task with 1 which takes 3seconds ended.
Task with 3 which takes 5seconds ended.
downloadFirst3FilesConcurrently -> 5.170604944229126seconds
```

With the introduction of `async let`, the total execution time is reduced by almost half. Instead of running each task sequentially, all tasks are started concurrently. Notice how all tasks begin at the same time and then finish based on their individual durations. Given that we have 3 available cores, the operation completes in just a little more than the time of the longest task. The overall time for all tasks to finish is around 5.17 seconds, demonstrating the efficiency of concurrency with multiple cores.

As I mentioned earlier, `async let` is great when you have a small, fixed number of tasks. However, when the number of tasks is unknown or large, `TaskGroup` becomes a much better choice. Let’s use the exact times we used for `async let` example so that we can compare.

Now, let’s take a look at how we can achieve very similar results using **TaskGroup**:

```typescript
func downloadFilesConcurrently() async throws {
    let startTime = CFAbsoluteTimeGetCurrent()
    
    try await withThrowingTaskGroup(of: Int.self) { [weak self] group in
        guard let self else { return }
        for (id, delay) in delays.enumerated() {
            group.addTask {
                try await self.networking(delay: delay, id: id)
            }
        }
        
        for try await delay in group {
            // Now you can start using your results
            _ = delay
        }
    }
    print("downloadFilesConcurrently -> \(CFAbsoluteTimeGetCurrent() - startTime)seconds")
}
```

Let’s check the console output:

```typescript
Task id=1 which takes 1seconds started.
Task id=0 which takes 3seconds started.
Task id=2 which takes 5seconds started.
Task with 1 which takes 1seconds ended.
Task with 0 which takes 3seconds ended.
Task with 2 which takes 5seconds ended.
downloadFilesConcurrently -> 5.174337029457092seconds
```

One key aspect to highlight is how Swift’s concurrency model automatically manages task scheduling to optimize performance. Tasks can start in a non-sequential order based on system resources, such as available CPU cores, ensuring efficient execution.

For instance, in our **TaskGroup** results, **Task id=1** started first, despite being added after **Task id=0**. This illustrates that **tasks within a task group execute concurrently and can be scheduled in any order.**

As you can see, the results are nearly identical to the **async let** example, with a total execution time of around **5.17 seconds**. Both methods initiate tasks concurrently, allowing them to run in parallel when possible, with the overall completion time dictated by the longest task.

So, why opt for **TaskGroup** if the results are so similar to **async let**? The primary advantage of **TaskGroup** becomes evident when dealing with a dynamic or large number of tasks. While **async let** works well for a small, fixed set of tasks, **TaskGroup** offers greater flexibility by enabling you to add and manage tasks dynamically at runtime. This makes it the superior choice for scenarios where the number of tasks is uncertain or can vary based on user input or other factors.

### **In Short:**

Swift’s concurrency model, with features like `async let` and `TaskGroup`, provides powerful tools to handle asynchronous tasks in a clean and efficient way. Using these features can significantly improve performance compared to sequential execution. While `async let` is ideal for situations with a small, fixed number of tasks, `TaskGroup` offers the flexibility to dynamically manage and scale tasks when the workload is unknown or variable.

Both methods highlight the strengths of Swift’s automatic task scheduling, ensuring tasks are executed concurrently for optimal performance. By knowing when to use `async let` for simpler cases and `TaskGroup` for more complex, dynamic scenarios, you can fully harness Swift's modern concurrency capabilities to write faster, more efficient code.
