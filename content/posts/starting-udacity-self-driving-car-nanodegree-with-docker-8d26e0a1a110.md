---
title: "Starting Udacity Self Driving Car Nanodegree with Docker"
description: "I just realized there are still a lot of people having problem with Docker and starter kit for Self Driving Car Nanodegree program. In this post, I will…"
date: "2017-03-18T20:40:49.505Z"
author: "Gungor Basa"
tags: ["Artificial Intelligence"]
originalUrl: "https://medium.com/@gbasa/starting-udacity-self-driving-car-nanodegree-with-docker-8d26e0a1a110"
mediumId: "8d26e0a1a110"
featureimage: "/images/posts/starting-udacity-self-driving-car-nanodegree-with-docker-8d26e0a1a110/01-556be065.png"
images: ["/images/posts/starting-udacity-self-driving-car-nanodegree-with-docker-8d26e0a1a110/01-556be065.png"]
---
I just realized there are still a lot of people having problem with Docker and starter kit for Self Driving Car Nanodegree program. In this post, I will give you a step by step guide.

For this post, I assume you have successfully install Docker to your local machine. If you haven’t, please go to [https://www.docker.com/community-edition](https://www.docker.com/community-edition) and pick a compatible version for your OS.

Let’s start the actual part;

First, we need to pick the project we want to work on. I assume if you are here, you need Project-1. So, let’s clone Project-1 repo to our local and change our directory into the folder. If you want to work on a different project, please clone that project.

```
git clone https://github.com/udacity/CarND-LaneLines-P1.git
cd CarND-LaneLines-P1
```

Now, lets download the Docker image for Self Driving Car Starting Kit.

```
docker pull udacity/carnd-term1-starter-kit
```

Now, everything is almost good to go. Last step is running Docker image with ipython notebook. Based on your OS, one of below commands should work.

```
docker run -it -p 8888:8888 -v `pwd`:/src udacity/carnd-term1-starter-kit
```

or

```
docker run -it -p 8888:8888 -v ${pwd}:/src udacity/carnd-term1-starter-kit
```

Above command mount your current directory to the“src” in your vm and starts running ipython notebook on Docker. Your output should be something like below.

![](/images/posts/starting-udacity-self-driving-car-nanodegree-with-docker-8d26e0a1a110/02-bf433335.png)

As a last step, please open your browser and type the address provided in your command line. (It will be something similar to above output, but it is different. Directly copy it from your terminal and paste it to your browser)
