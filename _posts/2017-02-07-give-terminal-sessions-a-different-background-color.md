---
layout: post
title:  "Give production terminal sessions a unique background colour"
categories: tech
date:   2017-02-07
excerpt: |
  That time I learned a valuable life lesson from a joke Twitter account
  
---
About six months after I started my current job, the first one I've had that involves regular contact with production servers and live databases, I spotted this great hint-disguised-as-a-cautionary-tale from [@HonestStatusPage](http://twitter.com/honeststatuspage): 
![Being positive first, know that our production shells now have a red background for easy visual recognition. Now, about your data...]({{ site.baseurl }}/assets/terminal_colour/terminal_tweet.jpg)

Before my current job, I'd been working mostly on a freelance basis on mostly front-end-ish projects. My work involved a lot of files, a lot of source control, and only local servers & databases. In my new role, closer to the metal of the production servers, I was living with the quiet haunting fear of mistaking a production terminal session for development or staging, and doing something absent-minded, with [catastrophic results](https://twitter.com/gitlabstatus/status/826591961444384768). I was careful, but I still worried.

Obviously, giving each server environment a clear visual cue in the form of a background colour was a great idea to implement BEFORE any disasters occured. I decided to set up an orange background for my staging environment, and a red one for production. It turned out to be straightforward & I've been glad for it ever since.

### Give different environments their own Terminal background colours

1) Create two new profiles in Terminal > Preferences > Profiles by clicking the + button at the bottom of the profile list. Give each one a name and a background colour. I chose "Production" and "Staging".

![Shows the Terminal profile editor with a list of profile names. Arrows point towards the ones named Production and Staging]({{ site.baseurl }}/assets/terminal_colour/custom_profiles.jpg)

2) To use one of your new profiles right away, type `tabc profile_name`. `tabc Production` should now turn the background of the window red. `tabc Staging` should turn it orange. Typing just `tabc` will reset it to the default. 

But you don't want to have to do this manually each time you SSH into Production- a better idea is to set this up in an alias you will use to do your logins, so that it's automatic.

3) Edit `~/.bash_profile` to create aliases to set the terminal profile by name, run the usual SSH command for that server, and switch back to the default terminal profile when the session has ended:


```bash
> sublime ~/.bash_profile

Add these lines the file: 

alias ssh_staging="tabc Staging; ssh secret@secret.staging.com -p 123456; tabc"
alias ssh_production="tabc Production; ssh secret@secret.production.com -p 654321; tabc"
```

4) Reload your bash_profile either by typing `source ~/.bash_profile` or by closing & reopening the Terminal tab. 

5) Type `ssh_staging`: You should now have an orange terminal window. Exit your SSH session. You should be back to your default terminal window colour.

![Command prompt shows 'echo "I am a distinct colour that is less likely to be mistaken for a local environment"']({{ site.baseurl }}/assets/terminal_colour/echo.jpg)

I'm now a whole lot less worried about distracted terminal commands than I once was, because I have a strong visual cue of which environment I'm in.