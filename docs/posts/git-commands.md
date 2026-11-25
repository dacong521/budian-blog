---
title: Git 日常命令清单
date: 2026-11-16
category: 技术笔记
tags: [Git, 命令行]
summary: 从初始化到推送、改错、回退，写博客真正会用到的那些命令。
---

# Git 日常命令清单

博客的源码我放在 GitHub 上，本地改完推上去，Vercel 会自动重新构建。日常其实就下面这几条。

## 第一次：把仓库接上

```bash
git init                          # 在当前目录建仓库
git add -A                        # 把所有改动放进暂存区
git commit -m "初始化博客"          # 提交
git branch -M main                # 主分支叫 main
git remote add origin https://github.com/你的账号/仓库名.git
git push -u origin main           # 第一次推送并建立跟踪
```

## 平时：改完就推

```bash
git status                        # 看看改了哪些文件
git add -A
git commit -m "新增一篇文章"
git push
```

## 想看看历史

```bash
git log --oneline -10             # 最近 10 条提交，一行一条
git diff                          # 工作区相对上次提交改了什么
```

## 改错了怎么办

```bash
git checkout -- 文件名             # 丢掉这个文件还没提交的改动
git reset --soft HEAD~1           # 撤销上一次提交，改动留在暂存区
git revert 提交号                  # 生成一次反向提交，适合已经推送出去的
```

## 拉别人的改动

```bash
git pull                          # 把远端更新拉下来
git clone 仓库地址                # 换台电脑时直接克隆
```

## 几个习惯

- 每写完一篇就提交一次，提交信息写清楚改了什么；
- 推送前先 `git status` 看一眼，确认没把大文件、密码之类的东西带上去；
- 仓库根目录的 `.gitignore` 已经忽略了 `node_modules` 和构建产物，不用手动排除。
