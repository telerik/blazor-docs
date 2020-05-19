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

* [Popups Do Not Work](#popups-do-not-work)
* [Wrong Popup Position](#wrong-popup-position)

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


## Wrong Popup Position

The position of popups (Window, various dropdowns such as DropDownList, ComboBox, DatePicker) can be wrong or offset.

The most common reason for such a problem is that the [`<TelerikRootComponent>`]({%slug getting-started/what-you-need%}#project-configuration) does not match the `<body>` and the browser viewport - this is required because that component is the topmost element our components can access in order to render popups/dropdowns. 

There are several common cases when such a mismatch occurs:

* The position and size of the `<app>` element (or however the root component of your Blazor app is called) does not match the `<body>`.

* There are CSS rules that offset the `<app>` element or its parent element (such as `position: absolute` or `margin: auto`, or placing it in some form of popup like a jQuery dialog).

* There are CSS rules that alter the positioning of an element or class used in the Telerik popup elements.

* There is more than one `<TelerikRootComponent>` in the app (for example, a certain Razor Component has its own) - there should be only one instance in the main layout.

You can check the application for such issues and ensure that the `<app>` element size and position matches the `<body>` and the browser viewport, and that the `<TelerikRootComponent>` is a direct child of the `<app>` element and encompasses the `@Body` in the main layout.

## See Also

* [JavaScript Errors Troubleshooting]({%slug troubleshooting-js-errors%})
* [Content Security Policy]({%slug troubleshooting-csp%})