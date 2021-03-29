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

* [Features](#features)


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

## Features

The TelerikMediaQuery provides the following features:

* `Media` - `string` - the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries" target="_blank">media query string</a> that will be matched. 

* `OnChange` - `EventCallback<bool>` - This event fires when the browser size matches the media string provided to the `Media` parameter. See the [Events]({%slug mediaquery-events%}) article for more information. 

* Integration - you can integrate the TelerikMediaQuery with our components. See the [Integration]({%slug mediaquery-integration%}) article for more information.

## See Also
  
  * [Integration]({%slug mediaquery-integration%})
  * [Events]({%slug mediaquery-events%})
  * [Live Demo: MediaQuery](https://demos.telerik.com/blazor-ui/mediaquery/overview)
  * [Live Demo: MediaQuery - Grid Integration](https://demos.telerik.com/blazor-ui/grid-integration)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikMediaQuery)
   
