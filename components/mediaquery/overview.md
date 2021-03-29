---
title: Overview
page_title: MediaQuery Overview
description: Overview of the MediaQuery for Blazor.
slug: mediaquery-overview
tags: telerik,blazor,media,query,mediaquery
published: True
position: 0
---

# MediaQuery Overview

The MediaQuery component for Blazor allows you to react when the user changes the size of the browser. 

#### This article is separated in the following sections:

* [Basics](#basics)
* [Notes](#notes)
* [Features](#features)
* [Examples](#examples)

## Basics

>caption To use the TelerikMediaQuery on your page: 

1. Add the `<TelerikMediaQuery>` tag.

1. In the `Media` parameter provide a <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries" target="_blank">CSS media query</a> to be matched. 

1. Use the `OnChange` event to determine when the `Media` is matched. 


````CSHTML
@* Resize a container based on the browser size *@

<TelerikMediaQuery Media="@MediaQuery" OnChange="@((doesMatch) => IsSmallScreen = doesMatch)"></TelerikMediaQuery>

<div style="width: @(IsSmallScreen ? "500px" : "100%"); height: 400px; border: 1px solid black">
    Shrink the browser to less than 767px to resize the container.
</div>


@code {
    private bool IsSmallScreen { get; set; }

    private string MediaQuery { get; set; } = "(max-width: 767px)";
} 
````

## Notes

The MediaQuery component facilitates the usage of CSS media queries in your C# code. There are a few points to keep in mind:

* The MediaQuery component is not a replacement for responsive design, layout and CSS. You should use them to create your responsive application layouts like with any other web application.

* The MediaQuery component makes it easy to use C# logic based on the breakpoint that matches - such as changing parameter values, replacing a component with a different compnent or even not rendering a part of the layout (with CSS alone you can resize parts of the app or hide them visually, but they still render).

* You should have default values for the flags in your application that define the preferred state or layout. Depending on the browser and the media query setup, it is possible that no `OnChange` event will fire when the app initializes, so the app should have a reasonable default state.

## Features

The TelerikMediaQuery provides the following features:

* `Media` - `string` - the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries" target="_blank">media query string</a> that will be matched. 

* `OnChange` - `EventCallback<bool>` - This event indicates whether the media query string provided to the `Media` parameter matches the current browser size. It fires when it matches, and when it stops matching. See the [Events]({%slug mediaquery-events%}) article for more information. 

* Integration - you can integrate the TelerikMediaQuery with our components. See the [Integration]({%slug mediaquery-integration%}) article for more information.

## Examples

This section contains two basic examples to showcase the concept of using multiple breakpoints, reusing them throughout the app, and changing the rendering with C# in response to breakpoints being hit.

* [Reuse Multiple Breakpoints](#reuse-multiple-breakpoints)
* [Change Rendering with Blazor Code](#change-rendering-with-blazor-code)


### Reuse Multiple Breakpoints

The example below shows a few common CSS breakpoints and how you can easily extract them to a static class so you can reuse them throughout the entire application.

You can find more examples of common breakpoints from established design systems in the following links:
* <a href="https://material.io/archive/guidelines/layout/responsive-ui.html#responsive-ui-breakpoints" target="_blank">Material Design Breakpoints</a>
* <a href="https://getbootstrap.com/docs/5.0/layout/breakpoints/#available-breakpoints" target="_blank">Bootstrap 5 Breakpoints</a>

>caption Use a few common breakpoints to update the rendering

````CSHTML
@isExtraSmall <br />
@isSmall <br />
@isMedium <br />
@isLarge <br />
@isExtraLarge

@code{
    // you can move this static class to a common place in your app to reuse across the board
    // this is a sample list of a few common media queries
    public static class WindowBreakPoints
    {
        public static string ExtraSmall => "(max-width: 480px)";
        public static string Small => "(min-width: 481px) and (max-width: 720px)";
        public static string Medium => "(min-width: 721px) and (max-width: 1023px)";
        public static string Large => "(min-width: 1024px) and (max-width: 1199px)";
        public static string ExtraLarge => "(min-width: 1200px)";
    }
    
    bool isExtraSmall { get; set; }
    bool isSmall { get; set; }
    bool isMedium { get; set; }
    bool isLarge { get; set; }
    bool isExtraLarge { get; set; }
}

<TelerikMediaQuery Media="@WindowBreakPoints.ExtraSmall" OnChange="@( (matches) => isExtraSmall = matches )"></TelerikMediaQuery>
<TelerikMediaQuery Media="@WindowBreakPoints.Small" OnChange="@( (matches) => isSmall = matches )"></TelerikMediaQuery>
<TelerikMediaQuery Media="@WindowBreakPoints.Medium" OnChange="@( (matches) => isMedium = matches )"></TelerikMediaQuery>
<TelerikMediaQuery Media="@WindowBreakPoints.Large" OnChange="@( (matches) => isLarge = matches )"></TelerikMediaQuery>
<TelerikMediaQuery Media="@WindowBreakPoints.ExtraLarge" OnChange="@( (matches) => isExtraLarge = matches )"></TelerikMediaQuery>
````


### Change Rendering with Blazor Code

In this simplistic example, we just switch the background of an element, in a real case you would replace entire components or change their parameters.

>caption Use a few common media queries and breakpoints to execute sample logic in the C# side

````CSHTML
@* sample of a few common breakpoints and how you can use them. Unlike the previous example, many of these can match at the same time *@

@code{
    // you can move this static class to a common place in your app to reuse across the board
    // this is a sample list of a few of the most common media queries this example uses to create some sample logic
    public static class WindowBreakPoints
    {
        public static string ExtraSmall => "(max-width: 480px)";
        public static string Small => "(max-width: 767px)";
        public static string Medium => "(max-width: 1023px)";
        public static string Large => "(max-width: 1199px)";
        public static string ExtraLarge => "(min-width: 1200px)";
    }
}

<TelerikMediaQuery Media="@WindowBreakPoints.ExtraSmall" OnChange="@( (matches) => isExtraSmall = matches )"></TelerikMediaQuery>
<TelerikMediaQuery Media="@WindowBreakPoints.Small" OnChange="@( (matches) => isSmall = matches )"></TelerikMediaQuery>
<TelerikMediaQuery Media="@WindowBreakPoints.Medium" OnChange="@( (matches) => isMedium = matches )"></TelerikMediaQuery>
<TelerikMediaQuery Media="@WindowBreakPoints.Large" OnChange="@( (matches) => isLarge = matches )"></TelerikMediaQuery>
<TelerikMediaQuery Media="@WindowBreakPoints.ExtraLarge" OnChange="@( (matches) => isExtraLarge = matches )"></TelerikMediaQuery>

@* sample logic follows 
NOTE: this simple logic is best suited for plain CSS
    the power of the TelerkMediaQuery component is to let you employ more complex C# logic
    that cannot be done with CSS alone.
    The TelerikMediaQuery component is not a replacement for responsive CSS and design.
*@

<div class="@GetClassFromWindowSize()">
    Resize your browser and look at the background of this element - red for large screens, yellow for medium, green for small devices.
</div>

@code{
    bool isExtraSmall { get; set; }
    bool isSmall { get; set; }
    bool isMedium { get; set; }
    bool isLarge { get; set; }
    bool isExtraLarge { get; set; }

    string GetClassFromWindowSize()
    {
        if (isExtraSmall || isSmall) return "small";
        if (isMedium) return "medium";
        if (isLarge || isExtraLarge) return "large";
        return "";
    }
}

@* sample styles for this example *@
<style>
    .small {
        background-color: green;
    }

    .medium {
        background-color: yellow;
    }

    .large {
        background-color: red;
    }
</style>
````



## See Also
  
  * [Integration]({%slug mediaquery-integration%})
  * [Events]({%slug mediaquery-events%})
  * [Live Demo: MediaQuery](https://demos.telerik.com/blazor-ui/mediaquery/overview)
  * [Live Demo: MediaQuery - Grid Integration](https://demos.telerik.com/blazor-ui/grid-integration)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikMediaQuery)
   
