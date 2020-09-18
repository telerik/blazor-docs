---
title: Overview
page_title: ProgressBar Overview
description: Overview of the ProgressBar component for Blazor.
slug: progressbar-overview
tags: telerik,blazor,progress,bar,progressbar,overview
published: True
position: 0
---

# Progress Bar Overview

The Progress Bar tracks the execution of time consuming operations and displays what portion of it is completed. 


## Basic Progress Bar

To add a Telerik Progress Bar to your Blazor application, use the `<TelerikProgressBar>` tag. 

![](images/progress-bar-overview.gif)

````CSHTML
Add basic progress bar config example here
````

## Features

The Progress Bar provides the following features:

* `Class` - the CSS class that will be rendered on the main wrapping element. You can use it to cascade styles more easily.
* `Min` - `double`, defaults to `0` - the minimum value of the Progress Bar.
* `Max` - `double`, defaults to `100` - the maximum value of the Progress Bar.
* `Value` - `double` - the value of the Progress bar. Must be between the `Min` and `Max` values.
* `Orientation` - you can control the orientation of the Progress Bar, through the `ProgressBarOrientation` enum, with members:
    * `Horizontal` - this is the default value
    * `Vertical`
* `Indeterminate` - `bool`, defaults to `false` - controls if the Progress Bar is in indeterminate state. This parameter might be used as indicator that a task is still in progress.
* `Labels` - see the [Labels]({%slug progress-bar-labels%}) article for more information.

## Examples

* []

## See Also

  * [Live Demo: Progress Bar](https://demos.telerik.com/blazor-ui/TODO)
  * [Labels]({%slug progress-bar-labels%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikProgressBar)
   
