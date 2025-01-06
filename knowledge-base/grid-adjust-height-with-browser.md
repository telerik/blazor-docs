---
title: Adjust Grid Height to Match the Browser Viewport Height
description: Learn different ways to adjust the height of the Telerik Grid for Blazor, so that the component expands and its height takes up all the available free space, depending on the container and the browser window (viewport size).
type: how-to
page_title: How to Adjust the Grid Height to Fill the Browser Window Size
slug: grid-kb-adjust-height-with-browser
position:
tags: telerik, blazor, grid, css, styles, height
ticketid: 1672046, 1656595, 1643200, 1605768, 1608504, 1549435
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                FileManager for Blazor, <br />
                Grid for Blazor, <br />
                Scheduler for Blazor, <br />
                Splitter for Blazor, <br />
                Spreadsheet for Blazor, <br />
                TreeList for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to autosize the Telerik Blazor Grid to match the browser window height?
* How to change Grid page size, according to the available height? How make the Grid `PageSize` dynamic based on screen size?
* How to configure a resizeable Grid?
* How to use several Grids that expand and fill the height of the browser?
* How to set the `TelerikGrid` `Height` relative to the browser viewport size?
* How to make the Grid height adjust by itself when user resizes the browser? The user should not get a scroll bar of the browser.
* How to expand the Grid to the maximum available height during browser resizing?
* How to adjust the Grid `Height` to the remaining space?

## Solution

The Grid will obey its `Height` parameter value in the same way as a regular HTML `<div>`. The component can apply any [valid CSS dimension unit]({%slug common-features/dimensions%}). If the app layout and CSS styles can make a plain `<div>` resize with the browser viewport or the parent element, then the Grid can behave in the same way too.

The following sections demonstrate different ways to make a Grid resize vertically, depending on the available space. The information and samples are applicable to [other Telerik components for Blazor](#environment).

* [Use percent](#use-percent)
* [Use viewport units](#use-css-viewport-units)
* [Use CSS `calc()`](#use-css-calc)
* [Use Telerik layout components](#use-telerik-layout-components)
* [Use minimum or maximum height](#apply-minimum-or-maximum-height)
* [Set `PageSize` depending on the Grig height]()

> If the [Grid is using virtual columns]({%slug grid-columns-virtual%}), then its `Height` must be set in pixels and the techniques in this article are not applicable.

## Use Percent

Use percentage heights to define dimensions as a portion of the parent element.

When setting a `height` in percent, keep in mind the following rule: an element with a percentage `height` requires its parent to have an explicit height in any absolute or relative CSS unit. The rule applies recursively until a fixed (absolute) height is reached, or until the `<html>` element is reached.

>caption Set Grid Height in percent

````RAZOR
<style>
    html,
    body,
    /* Take into account any other app-specific containers
        that are in the layout file or App.razor */
    div.main,
    div.main > div.content
    {
        height: 100%;
        margin: 0;
    }
</style>

<div style="height:100%">
    <div style="height:100%">
        <TelerikGrid Data="@GridData"
                     Pageable="true"
                     PageSize="50"
                     Height="100%">
            <GridColumns>
                <GridColumn Field="@nameof(SampleModel.Name)" />
            </GridColumns>
        </TelerikGrid>
    </div>
</div>

@code {
    private IEnumerable<SampleModel> GridData { get; set; } =
        Enumerable.Range(1, 200).Select(x => new SampleModel() { Id = x, Name = $"Name {x}" });

    public class SampleModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````

## Use CSS Viewport Units

Use <a href="https://web.dev/blog/viewport-units" target="_blank">viewport units</a> to set dimensions as a portion of the browser viewport.

>caption Set Grid Height in viewport units (vh, dvh, and others)

````RAZOR
<TelerikGrid Data="@GridData"
             Pageable="true"
             PageSize="50"
             Height="100dvh">
    <GridColumns>
        <GridColumn Field="@nameof(SampleModel.Name)" />
    </GridColumns>
</TelerikGrid>

@code {
    private IEnumerable<SampleModel> GridData { get; set; } =
        Enumerable.Range(1, 200).Select(x => new SampleModel() { Id = x, Name = $"Name {x}" });

    public class SampleModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````

## Use CSS calc()

Use <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc" target="_blank"><code>calc()</code></a> to set dimensions as a calculation that depends on multiple known sizes. For example, `calc()` is suitable when a Telerik component must occupy the full viewport height minus a known fixed height of a header or footer.

>caption Set Grid Height using calc()

````RAZOR
<div style="height:50px;background:#ccc;text-align:center;">Header</div>

<TelerikGrid Data="@GridData"
             Pageable="true"
             PageSize="50"
             Height="calc(100vh - 150px)">
    <GridColumns>
        <GridColumn Field="@nameof(SampleModel.Name)" />
    </GridColumns>
</TelerikGrid>

<div style="height:100px;background:#ccc;text-align:center;">Footer</div>

<style>
    html, body {
        height: 100%;
    }
</style>

@code {
    private IEnumerable<SampleModel> GridData { get; set; } =
        Enumerable.Range(1, 200).Select(x => new SampleModel() { Id = x, Name = $"Name {x}" });

    public class SampleModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````

## Use Telerik Layout Components

Using Telerik layout components can spare the need to use custom CSS and make a 100% high nested component occupy the available space in its parent container.

>caption Set Grid Height to 100% of resizable container

````RAZOR
<TelerikSplitter Height="100vh"
                 Orientation="@SplitterOrientation.Vertical">
    <SplitterPanes>
        <SplitterPane Collapsible="false"
                      Resizable="false"
                      Size="50px">
            <div style="height:100%;background:#ccc;text-align:center;">Header</div>
        </SplitterPane>
        <SplitterPane>
            <TelerikGrid Data="@GridData"
                         Pageable="true"
                         PageSize="50"
                         Height="100%">
                <GridColumns>
                    <GridColumn Field="@nameof(SampleModel.Name)" />
                </GridColumns>
            </TelerikGrid>
        </SplitterPane>
        <SplitterPane Collapsible="false"
                      Resizable="false"
                      Size="100px">
            <div style="height:100%;background:#ccc;text-align:center;">Footer</div>
        </SplitterPane>
    </SplitterPanes>
</TelerikSplitter>

@code {
    private IEnumerable<SampleModel> GridData { get; set; } =
        Enumerable.Range(1, 200).Select(x => new SampleModel() { Id = x, Name = $"Name {x}" });

    public class SampleModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````

## Apply Minimum or Maximum Height

You can make the Grid resize automatically, but at the same time, limit how much the component can shrink or expand with some fixed dimensions. Set the Grid `Class` parameter and use `min-height` or `max-height` styles with a custom CSS class.

>caption Limit a dynamic Grid Height to minimum and maximum values

````RAZOR
<style>
    .responsive-grid-with-limits {
        min-height: 300px;
        max-height: 700px;
    }
</style>

<TelerikGrid Data="@GridData"
             Pageable="true"
             PageSize="50"
             Height="100vh"
             Class="responsive-grid-with-limits">
    <GridColumns>
        <GridColumn Field="@nameof(SampleModel.Name)" />
    </GridColumns>
</TelerikGrid>

@code {
    private IEnumerable<SampleModel> GridData { get; set; } =
        Enumerable.Range(1, 200).Select(x => new SampleModel() { Id = x, Name = $"Name {x}" });

    public class SampleModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````

## Set Grid PageSize Depending on the Height

You can change the Grid `PageSize` at runtime, so that it is consistent with the Grid height and the available space. Review the complete sample app in GitHub: [https://github.com/telerik/blazor-ui/tree/master/grid/adjust-height-with-browser](https://github.com/telerik/blazor-ui/tree/master/grid/adjust-height-with-browser).

## See Also

* [Using Dimensions in Telerik Blazor Components]({%slug common-features/dimensions%})
