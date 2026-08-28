---
title: "Anaconda Python Tutorial"
description: "Lately, I have been having major changes in my life. Quitted my job, moved from Berlin to my home country, worked on very interesting projects and found…"
date: "2020-10-28T19:20:45.250Z"
author: "Gungor Basa"
tags: ["iOS","Artificial Intelligence","Python"]
originalUrl: "https://medium.com/@gbasa/anaconda-python-tutorial-971e2cd9ef9c"
mediumId: "971e2cd9ef9c"
featureimage: "/images/posts/anaconda-python-tutorial-971e2cd9ef9c/01-28f0e15d.png"
images: ["/images/posts/anaconda-python-tutorial-971e2cd9ef9c/01-28f0e15d.png"]
---
> It’s a new dawn, it’s a new day, it’s a new life for me  
> Ouh  
> And I’m feeling good

Lately, I have been having major changes in my life. Quitted my job, moved from Berlin to my home country, worked on very interesting projects and found another remote iOS developer job at a SF based startup. As it wasn’t enough, today I got enrolled to `Udacity Deep Learning Nanodegree Program`. Hooraayyyyyyy 👊💪🍾

As a part of the program, I had to refresh my knowledge about Anaconda. It’s very easy to install. Go to the [website](https://www.anaconda.com/products/individual), and download appropriate version and install it.

**Create New Virtual Environment with** `**Python3**`

```
conda create -n env_name python=3
```

**Start Using Specific Virtual Environment**

```
conda activate env_name
```

**Stop Using An Environment**

```
conda deactivate
```

**Remove Existing Virtual Environment**

```
conda env remove -n env_name
```

**Install A Package**

```
conda install package_name
```

**Remove A Package**

```
conda remove package_name
```

Now that, you know most widely used commands, let’s shift the gear and learn how to export and import environments to use it in our later. This will be useful if we share our codebase with others.

**Exporting An Environment**

```
conda env export > environment.yaml
```

This command will create a file named `environment.yaml` which contains all installed conda packages with installed versions.

On top of conda, we might be also using `pip` to install some of our pacakages. If we do that, it would be good to export/import it as well.

```
pip freeze > requirements.txt
```

**Importing An Environment**

```
conda env create -f environment.yaml
```

Now, lets import `pip` environment as well.

```
pip install -r requirements.txt
```

Hope, this little tutorial is helpful for you peeps. 😉 See ya! 👋
