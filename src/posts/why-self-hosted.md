---
title: Why I self-host everything
date: '2026-10-16'
summary: Owning the hardware changes what you are allowed to learn.
---

Every service I run sits on hardware I own. Not because managed hosting is bad, but because
owning the machine changes what you are allowed to learn.

When a managed platform breaks, you read a status page and wait. When your own box breaks, you
read logs, kernel messages and your own bad decisions from three months ago. The second one is
slower and teaches more.

It also keeps the cost flat. A prediction market, a few websites and a model server run on
hardware that was paid for once. There is no bill that scales with curiosity, which means I can
leave things running just to see what happens over a month.

The tradeoff is real: uptime is my problem, backups are my problem, and a bad deploy at midnight
is still my problem at midnight. So everything gets a deploy script, a health check, and an undo
path written down before it goes live.
