---
layout: post
title:  "Adding a React/Babel/Webpack stack to a Cordova-wrapped hybrid app"
categories: blog
excerpt: | 
  
---

Approaching any of the JavaScript build-tool environments for the first time can feel to me a bit like this: 

"So all I need to do is to transplonk the snodules with a jetpack, but for production I'll need to mugglify the llamas with a map- except, when I run it I'm getting an error about an unexpected character in the acorn tree and I didn't even know this project involved trees, so where do I start with troubleshooting that?"

Complex development stacks are powerful for those familiar with the tools, and perilous environments full of unproductive rabbit-holes for those who are not. Complex development stacks make "let's try adding ${useful_sounding_thing} to the project" a time-consuming endeavour, because `useful_sounding_thing` brings both its own complexity and the complexity of the tools it depends on. "Get familiar with the tools first" is good advice, but is non-trivial when the tools themselves are built on top of other tools which are built on still others, and the reason the project is not building could lurk anywhere in that stack.

This is my attempt to document the process of learning enough about the React/Babel/Webpack stack - a popular one with a lot of evidence that it will be useful for my project- to add it to an already fairly complex Cordova-based hybrid app project.

My Cordova project consists of a "development" version of HTML/JS app (the AppName/www folder), a config.xml file & a pre-build environment-targeting hook script. When I build the app, Cordova replaces environment-specific strings with the ones specified, and builds platform-specific versions of the app for iOS and Android. The code that eventually runs on the phone is not the same code that I wrote- it has been transformed to work with a specified server environment and on a specified device. 

The first thing I've learnt about React/Babel/Webpack is that it works in a similar way- there is a "development" version of the React app, which is where I write my code. It looks like this: 


```
-- app
  --components
    a_component.jsx
  index.html
  main.css
  main.jsx
```

This then gets built into `bundle.js`, which is what I interact with in the browser. This is done either on-the-fly and served by `webpack-dev-server` (this is how my current `webpack.config.js` does it), or it's built into a file called `build/bundle.js` (as below), which is how my `webpack.production.config.js` builds it.

```
-- app
  - components
  -- build
    bundle.js
    bundle.js.map
    index.html
    main.css
```

By adding this stack to my Cordova app, I will be adding another stage to my build. Something I need to think about is at what stage of the process I will want to build the React app into bundle.js. I don't want to include the unbuilt files into the `/www/` directory which is then built to the devices. At this stage I probably need to consider the `/www/` directory a place for built files, and build it from a React development directory elsewhere.

--

A common feature of the "I need to learn some new tools" phase of development is being given magic commands to run- How To's and tutorials will often say something like "And now run `webpack -p --config ./webpack.production.config.js`". I think it pays to be curious about what's happening in a magic command, even if it is working as I believe it should. 

I assume that `--config ./webpack.production.config.js` means "run this command using the specified configuration file". What about `-p`? If I run `webpack --help`, I can see that the flag `-p` is a `shortcut for --optimize-minimize`. So I guess that I can run `webpack -p` without specifying a config file- this does in fact output built files `app/build`.


---

When I first downloaded this boilerplate and typed the magic command `npm start` (which I see is actually a shortcut for running `webpack-dev-server`), I ran into a whole console full of errors that pointed to an SVG font not being loaded: 

```
Module parse failed: /Repositories/WhatIsBabel/node_modules/onsenui/css/font_awesome/fonts/fontawesome-webfont.svg Unexpected token (1:0)
You may need an appropriate loader to handle this file type.
```

I commented out the references to the SVG font files, and the build started working. Now that I've figured out a little more about Webpack & what it does, I can try to get these SVG fonts working. I can see that it is suggesting that I need an appropriate loader, and I know that a loader is something I can add to Webpack. Maybe I can npm-install myself out of this mess?

It turns out that Webpack requires an explicit 'loader' for every type of file that it loads, as specified in its `loaders` module: 

```
module: {
    loaders:[
      { test: /\.(css)$/, include: path.resolve(__dirname, 'app'), loader: 'style-loader!css-loader' },
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'file-loader'},
    ]
  }
```

I ran `npm-install file-loader --save` and added the `file-loader` line above, and now it works.


package.json knows about Node.js things.
webpack.config.js knows about Webpack things.