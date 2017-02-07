---
layout: post
title:  "Rails Shortcuts"
categories: tech
excerpt: |
  "Stuff I use all the time in Rails, but not often enough to not need to look it up." 
  
---

###Get all the Things but exclude this one thing

```ruby
not_this_thing = Thing.find_by_identifier('this_thing')
things_I_want = Thing.where.not(id: not_this_thing)
things_I_want.include? not_this_thing
 => false
```

Bonus: exclude multiple things

```ruby
Thing.count
 => 24 
not_these_things = Thing.find(1,2,3)
things = Thing.where.not(id: not_these_things)
things.count
 => 21
```