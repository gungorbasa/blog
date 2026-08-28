---
title: "Intelligent Agents: Agent Programs & Main Type of Agents"
description: "In my previous post, I mentioned about agent programs. In this post, I will get into more details. To quick recap, an agent program is a real implementation…"
date: "2018-06-10T14:39:57.957Z"
author: "Gungor Basa"
tags: ["Artificial Intelligence"]
originalUrl: "https://medium.com/@gbasa/intelligent-agents-agent-programs-main-type-of-agents-58395d3c1733"
mediumId: "58395d3c1733"
featureimage: "/images/posts/intelligent-agents-agent-programs-main-type-of-agents-58395d3c1733/01-37bfac20.png"
images: ["/images/posts/intelligent-agents-agent-programs-main-type-of-agents-58395d3c1733/01-37bfac20.png"]
---
In my previous post, I mentioned about agent programs. In this post, I will get into more details. To quick recap, an agent program is a real implementation of an agent function. In other words, it implements an agent function which maps percepts to actions.

Despite the agent function can hold all history of percepts, an agent program can only take one input (current input) at a time cause there is nothing available at the time. (Think about it, an agent program takes snapshots of the environment. Even though it takes multiple snapshots at the same time, they will be identical.) However, they may hold state inside of the program. Let’s deep dive.

There are four basic types of agent programs. These almost embody the all intelligent agent systems.

1.  **Simple Reflex Agents**

This is the simplest type of all four. This type of agents are admirably simple but they have very limited intelligence. Their actions are based on the current percept. They only looks at the current state and decides what to do. Neither they hold nor consider any part of the history during their decision process.

In some cases like smart thermostats, this type of agent might be useful, however, in most cases its not. Especially, if the environment is partially observable, it might be the recipe of a disaster 🤔 As I said, they have very limited intelligence. Their intelligence is only based on the given static table. No learning capacity. Below is a pseudo code for a simple reflex agent.

Simple reflex agent holds a static table for rules. It gets a percept as an input and returns an action. First, based on the input tries to understand the state of the environment. Then in the static table, finds the corresponding rule to this state. At last, returns the action of the rule.

2\. **Model-based Reflex Agents**

![](/images/posts/intelligent-agents-agent-programs-main-type-of-agents-58395d3c1733/02-2cbcbb00.png)

This type of agents is little bit more complicated than the reflex based agents. A model based agent holds an internal state based on the percept history. This internal state helps agent to handle a partially observable environment. It consider both internal state and current percept to take an action. Also, each step it updates the internal state.

Updating internal state requires two kinds of knowledge.

1.  Agent needs to know how the world evolves independently from the agent.
2.  How the agent’s actions affect the environment.

Both of these knowledge is embedded to the agent’s program and they help agent to understand how the world works. Implementation of this, is called the model of the world and the agent that uses this model to decide what action to take called model based agent.  
A model based reflex agent takes the current percept and combine it with the internal state, model, and most recent action’s effect then decides about what action to take. Below is a pseudo code for it.

**P.S.** It is rarely possible to determine exact state of a partially observable environment.

3\. **Goal-Based Agents**

![](/images/posts/intelligent-agents-agent-programs-main-type-of-agents-58395d3c1733/03-69fd6b19.png)

For some tasks, its not always enough to know how the world works. In some cases, its desirable to define a **goal** information to describe a desirable situations. A goal-based agent combines model-based agent’s model with a goal. To reach its goal. it often uses **Search** and **Planning** algorithms.

Goal based agents usually less efficient but more flexible than reflex-based agents. A goal based-agent can suit itself based on the environment. For example, a goal-based agent can adapt its behavior based on the sensor data.

4\. **Utility-Based Agents**

![](/images/posts/intelligent-agents-agent-programs-main-type-of-agents-58395d3c1733/04-21584b97.png)

Goal-Based agents seems pretty cool and seems like we don’t need another one. Is that so? No, no no no. That’s not correct. If we look at the goal based agents, we see they select the action based on the goal. End result is we achieve our goal and we are happy 🤗🤠👻. But how happy are we? Just imagine that, we want to go from point A to point B. There are 2 paths. One is 10-miles long and the other is 100. Unfortunately, our goal based agent may or may not choose the path 2(100 miles long). At the end whichever path we take, we will reach our destination but how happy will we be if we take the longer path? Probably, not so much. That’s the problem for goal-based agents. They don’t consider the journey 😞. How do we fix this? Well we try to fix this with **Utility-Based Agents** 😀

With Utility-Based agents we use utility function which is essentially an internationalization of the performance measurement (It kinda defines how happy will we be if we choose this path). Also, if there are multiple goals(yes, you heard me right. Might be multiple goals.) and these goals conflicts in some cases, utility function specifies the appropriate tradeoff. Also, if non of these goals can be achieved with certainty, utility may provide likelihood of success.

Technically speaking, a rational utility based agent chooses its action to maximize the performance.

**P.S.** There is actually one really important type of agents. Its learning agents. I decide to go over that in another post 😉 At the end of the day, learning is important.
