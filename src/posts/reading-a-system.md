---
title: Reading a system instead of using it
date: '2026-10-10'
summary: What editing game memory in 2011 taught me about everything after.
---

I learned to program backwards. Before I wrote anything, I spent a couple of years taking games
apart on a slow laptop, watching numbers in memory change and guessing which one was health,
which one was ammo, and which one would crash everything if I touched it.

That is a strange way to start, but it leaves you with one useful habit: you assume every system
has an inside, and the inside is knowable. A running program stops being a black box and becomes a
place with addresses in it.

The second habit came later, when I started asking how games defend themselves. Anti-cheat,
integrity checks, obfuscation. Once you have tried to get past those, you understand why they are
built the way they are, and you build yours differently.

Both habits carried straight into everything since: engines, trading systems, security work. Read
the system. Find out what it actually does, not what the documentation claims.
