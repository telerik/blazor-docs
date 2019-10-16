---
title: General Issues
page_title: General Issues
description: Troubleshooting general issues in the UI for Blazor suite
slug: troubleshooting-general-issues
tags: general,issues,troubleshoot,fix
published: True
position: 1
---

# General Issues

This page provides solutions for common issues you may encounter while working with Telerik UI for Blazor components.

## Popups Do Not Work

There are three common reasons for this
* Missing [`<TelerikRootComponent>`]({%slug getting-started/what-you-need%}#project-configuration) from the app.
* [Missing JS Interop file]({%slug troubleshooting-js-errors%}#microsoftjsinteropjsexception-could-not-find-)
* Special positioning on the `<app>` element.

The `<app>` element is the topmost component that a developer has access to in Blazor. This means that we cannot place our popups higher than that in the DOM. Thus, their position and visibility depend on the position of the `<app>` element matching the position of the `<body>` element.

The default application template has a `position: relative` rule for the `app` element that can break the appearance and positions of our popups (most notably in Firefox). The solution is to remove such special positioning. For example, modify the default `site.css` file like this:

````CSS
app {
    /* remove this line */
    /* position: relative; */
    
    /*
    if you continue experiencing issues, try removing these lines as well
    make sure that the app element positioning matches the body element and is visible
    */
    display: flex;
    flex-direction: column;
}
````


## See Also

* [JavaScript Errors Troubleshooting]({%slug troubleshooting-js-errors%})
* [Content Security Policy]({%slug troubleshooting-csp%})