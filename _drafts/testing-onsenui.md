---
layout: post
title:  "The rocky path to testing React-flavoured OnsenUI components with Mocha & JSDOM"
categories: blog
excerpt: |
  "The way was long, and littered with polyfills" 
  
---



OnsenUI is heavily based on web components, which are not at all supported by JSDOM. It's polyfill time! Two npm packages, [webcomponentsjs](https://www.npmjs.com/package/webcomponentsjs) and [document-register-element](https://www.npmjs.com/package/document-register-element), claim to polyfill web components. Choose [document-register-element](https://www.npmjs.com/package/document-register-element), as it supplies `customElements.define()`, without which your alleged web components are no good to anybody.



