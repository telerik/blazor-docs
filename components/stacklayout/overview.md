---
title: Overview
page_title: StackLayout Overview
description: Overview of the StackLayout for Blazor.
slug: stacklayout-overview
tags: telerik,blazor,stacklayout,overview
published: True
position: 0
---

# Blazor StackLayout Overview

The <a href="https://www.telerik.com/blazor-ui/stacklayout" target="_blank">StackLayout for Blazor</a> is a component that easily aligns multiple elements in a vertical or horizontal order.

## Creating Blazor StackLayout

1. Use the `<TelerikStackLayout>` tag to add the component to your razor page.

2. Inside the `<TelerikStackLayout>` tag, add the desired HTML containers (e.g. `<div>`) or components. Each immediate child element will represent one stack layout item.

3. Set `Width` and `Height`.

4. (optional) Set the `Orientation` parameter to determine the layouts direction.

>caption StackLayout basic configuration.

````RAZOR
@* This example showcases how the StackLayout fills the entire parent container and some of its core features. *@

<style>
    .parent-container {
        height: 500px;
        width: 500px;
        border: 1px solid black;
    }
</style>

<div class="parent-container">
    <TelerikStackLayout Orientation="@StackLayoutOrientation.Horizontal" 
                        Width="100%" 
                        Height="100%">
        <div style="background-color: aqua;">
            Aqua colored stack item
        </div>
        <div style="background-color: cornflowerblue;">
            Cornflowerblue colored stack item
        </div>
        <div style="background-color: blue;">
            Blue colored stack item
        </div>
    </TelerikStackLayout>
</div>
````

## Layout

The layout is the building block of the StackLayout component. Control its appearance via different parameters. [Read more about the Blazor StackLayout layout](slug:stacklayout-layout).

## StackLayout Parameters

The Blazor StackLayout provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class to be rendered on the main wrapping element of the StackLayout component, which is `<div class="k-stack-layout">`. Use for [styling customizations](slug:themes-override). |
| `Height` | `string` | The StackLayout height as a CSS unit. See the [Dimensions](slug:common-features/dimensions) article for more details on what units you can use and how percentage dimensions work. |
| `Width` | `string` | The StackLayout width as a CSS unit. See the [Dimensions](slug:common-features/dimensions) article for more details on what units you can use and how percentage dimensions work. |
| `Orientation` | `StackLayoutOrientation` enum <br/> (`StackLayoutOrientation.Horizontal`) | Whether the content will be aligned horizontally or vertically. See the [Layout Orientation](slug:stacklayout-layout#orientation) article for more information. |
| `Spacing` | `string` | The space between the elements in the StackLayout. See the [Layout Spacing](slug:stacklayout-layout#spacing) article for more information. |
| `HorizontalAlign` | `StackLayoutHorizontalAlign` enum <br/> (`StackLayoutHorizontalAlign.Stretch`) | The StackLayout items alignment based on the X axis. See the [Layout HorizontalAlign](slug:stacklayout-layout#horizontalalign) article for more information. |
| `VerticalAlign` | `StackLayoutVerticalAlign` enum <br/> (`StackLayoutVerticalAlign.Stretch`) | The StackLayout items alignment based on the Y axis. See the [Layout VerticalAlign](slug:stacklayout-layout#verticalalign) article for more information. |

## Nested StackLayouts

Sometimes you may need to create a more complex layout that includes both horizontal and vertical items. To do that, nest `TelerikStackLayout` components inside one another.

>caption Use nested StackLayout to create a page layout.

````RAZOR
<TelerikStackLayout Orientation="StackLayoutOrientation.Vertical" Height="100%">
    <div class="red">
        Header
    </div>
    <TelerikStackLayout Orientation="StackLayoutOrientation.Horizontal">
        <div class="green">
            Navigation
        </div>
        <div class="yellow">
            Content
        </div>
        <div class="orange">
            Right side content
        </div>
    </TelerikStackLayout>
    <div class="purple">
        Footer
    </div>
</TelerikStackLayout>

<style>
    .red {
        background-color: #dc3545;
    }

    .green {
        background-color: #198754;
    }

    .yellow {
        background-color: #ffc107;
    }

    .orange {
        background-color: #fd7e14;
    }

    .purple {
        background-color: #6f42c1;
    }

    body, html {
        height: 100%;
    }

    app {
        display: initial !important;
    }
</style>
````

## Next Steps

* [Configure StackLayout orientation, spacing and alignment](slug:stacklayout-layout)

## See Also

  * [Live StackLayout Demos](https://demos.telerik.com/blazor-ui/stacklayout/overview)
  * [StackLayout API Reference](slug:Telerik.Blazor.Components.TelerikStackLayout)