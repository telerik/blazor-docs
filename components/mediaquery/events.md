---
title: Events
page_title: MediaQuery Events
description: MediaQuery for Blazor - Events.
slug: mediaquery-events
tags: telerik,blazor,mediaquery,events
published: True
position: 30
---

# Events

The TelerikMediaQuery component for Blazor exposes events that allow you to respond to user actions and provide custom logic.

* [OnChange](#onchange)

## OnChange

The `OnChange` event fires to notify you whether the media query string provided to the `Media` parameter is matched by the browser. It fires when it matches, and when it stops matching


>caption Use the OnChange event to resize a parent container

````CSHTML
@* Resize the parent container *@

<TelerikMediaQuery Media="@MediaQuery" OnChange="@OnChange"></TelerikMediaQuery>

<div style="width: @(IsSmallScreen ? "500px" : "100%"); height: 400px; border: 1px solid black">
    Shrink the browser to less than 767px to resize the container.
</div>

@code {
    private bool IsSmallScreen { get; set; }

    private string MediaQuery { get; set; } = "(max-width: 767px)";

    private void OnChange(bool doesMatch)
    {
        IsSmallScreen = doesMatch;
    }
} 
````

## See Also

  * [Overview]({%slug mediaquery-overview%})
  * [Integration]({%slug mediaquery-integration%})
   
