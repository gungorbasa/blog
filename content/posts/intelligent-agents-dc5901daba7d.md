---
title: "Intelligent Agents"
description: "We call anything as an agent that can perceive its environment through sensors and acts upon an environment using its actuators. They direct their activity…"
date: "2018-04-28T20:22:03.265Z"
author: "Gungor Basa"
tags: ["Artificial Intelligence"]
originalUrl: "https://medium.com/@gbasa/intelligent-agents-dc5901daba7d"
mediumId: "dc5901daba7d"
featureimage: "/images/posts/intelligent-agents-dc5901daba7d/01-b2610de3.png"
images: ["/images/posts/intelligent-agents-dc5901daba7d/01-b2610de3.png"]
---
We call anything as an agent that can perceive its environment through sensors and acts upon an environment using its actuators. They direct their activity to achieve their goals.

We use the term **percept** to refer agent’s perception at any given time through its sensors. A **percept sequence** is the whole history of whatever the agent perceived from the environment. Based on the whole history or a perceived input, agent decides about what to do. However, it will never act on anything it hasn’t perceived.

As you may remember from the definition, agents perceive the environment and act with their actuators. But we haven’t said how they decide how to act. In other words, what is the behavior of an agent given a percept sequence. **For a simple agent** the answer is agent function(There are more advanced agents but lets start with this one). **Agent function** maps any given percept sequence to an action. Its like a huge table(might as well infinite) that any possible percept sequence has an act. Since the table may get infinitely large, we put a bound on the length of percept sequence we are really interested in.

A simple agent program can be defined mathematically as an agent function. In other words, for our simple agent an **agent program** implements the agent function. Keep in mind, agent function is an abstract mathematical definition, however an agent program is a concrete implementation which runs on some systems.

Everything seems pretty cool by now. But seriously, how does an agent act? How do we fill this infinitely large table? The answer is, an agent should act rationally :) I am not kidding by the way. It should. It is a good behavior. It should be as rational as possible so that we call it a **rational agent**(Please, don’t ask me, if there is an irrational one :) probably, yes. A bad one).

![](/images/posts/intelligent-agents-dc5901daba7d/02-b9ad6885.jpg)

Pink Panther An Irrational Agent :)

A rational agent is one that does the right thing at the right time. Conceptually, every entry of our agent table is filled out correctly. But, still how do we decide that. Doing a good job seems like an objective concept. Let me explain a little bit more. An agent perceives the environment and it generates a sequence of actions. This sequence of actions have effect on the environment state. If this state is desirable, that means the agent performed well. This is captured by a **performance measure** that evaluates any given sequence of environment states. Given percept sequence and agent’s builtin knowledge, a rational agent tries to maximize its performance measure. This performance measure changes based on the nature of the problem. However, as a general rule, its better to design this performance measurement based on the environment state, not according to one thinks how an agent performs(By the way, even though it seems like an easy task to design a performance measure, it is not).

Any given time concept of rationality depends on four things.

1.  The performance measure
2.  The agent’s prior knowledge
3.  Capability of agent(Actions that agent can perform).
4.  The agent’s percept sequence to date

All these four things bring us to the official definition of a rational agent. Finally, we can define it :)

> **For each possible percept sequence, a rational agent should select an action that is expected to maximize its performance measure, given the evidence provided by the percept sequence and whatever builtin knowledge that the agent has.**

One important thing to remember, a rational agent in one environment might be irrational in the other one.

Also, a rational agent should be autonomous. After some sufficient time, autonomous agent’s behavior might be independent of its prior knowledge. This is learning.

This is the end of today’s blog post. Wait for the next one :) Peace out.
