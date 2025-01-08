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

The <a href = "https://www.telerik.com/blazor-ui/mediaquery" target="_blank">MediaQuery component for Blazor</a> allows you to react when the user changes the size of the browser. 

## Creating Blazor MediaQuery

>caption To use the TelerikMediaQuery on your page: 

1. Add the `<TelerikMediaQuery>` tag to your razor page.
1. Set the `Media` parameter to a <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries" target="_blank">CSS media query</a> to be matched. Use one component instance for each media query.
1. Use the `OnChange` event to determine when the `Media` is matched. 


````RAZOR
@* Resize a container based on the browser size *@

<TelerikMediaQuery Media="@SmallScreenMediaQuery" OnChange="@((doesMatch) => IsSmallScreen = doesMatch)"></TelerikMediaQuery>
<TelerikMediaQuery Media="@LargeScreenMediaQuery" OnChange="@((doesMatch) => isLarge = doesMatch)"></TelerikMediaQuery>

<div style="width:@GetContainerWidth(); height: 400px; border: 1px solid black">
    Shrink the browser to resize the container.
</div>


@code {
    private bool IsSmallScreen { get; set; }
    private bool isLarge { get; set; }

    private string SmallScreenMediaQuery { get; set; } = "(max-width: 767px)";
    private string LargeScreenMediaQuery { get; set; } = "(min-width: 1199px)";

    private string GetContainerWidth()
    {
        string width = "900px";

        if (IsSmallScreen)
        {
            width = "500px";
        }
        if (isLarge)
        {
            width = "100%";
        }

        return width;
    }
} 
````

## MediaQuery Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
|---|---|---|
| `Media`  | `string` | The <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries" target="_blank">media query string</a> that will be matched. |

## Notes

The MediaQuery component facilitates the usage of CSS media queries in your C# code:

* The MediaQuery component makes it easy to use C# logic based on the matched media query breakpoints. For example, you can change parameter values, replace a component with a different component or even not render parts of the layout. With CSS alone you can resize parts of the app or hide them visually, but they still render.
* The MediaQuery component is not designed as a full replacement for responsive design, layout and CSS. You should use them to create your responsive application layouts like with any other web application.

## Next Steps

* [Explore the MediaQuery events](slug://mediaquery-events)
* [Integrate the MediaQuery with other Telerik Blazor components](slug://mediaquery-integration)

## See Also

* [Live Demo: MediaQuery](https://demos.telerik.com/blazor-ui/mediaquery/overview)
* [Live Demo: MediaQuery - Grid Integration](https://demos.telerik.com/blazor-ui/mediaquery/grid-integration)
* [MediaQuery API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikMediaQuery)
