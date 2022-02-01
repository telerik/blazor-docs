---
title: Overview
page_title: LoaderContainer Overview
description: Overview of the LoaderContainer for Blazor.
slug: loadercontainer-overview
tags: telerik,blazor,loader,container,loadercontainer,overview
published: True
position: 0
---

# Blazor LoaderContainer Overview

The <a href = "https://www.telerik.com/blazor-ui/loader-container" target="_blank">Blazor LoaderContainer</a> provides an animated indicator, a panel, and an overlay that can be used when the application is performing a time-consuming operation, for example, loading data.

#### In This Article

* [Basic Loader Container](#basic-loadercontainer)
* [Features](#features)
* [Examples](#examples)
    * [Block All Content](#block-all-content)
    * [Remove the Panel from the LoaderContainer](#remove-the-panel-from-the-loadercontainer)
    * [Fill a Parent Container](#fill-a-parent-container)

## Basic LoaderContainer

To add a Telerik LoaderContainer to your Blazor application, use the `<TelerikLoaderContainer>` tag and show it when needed by your app by using its `Visible` parameter. You can also control its [visual appearance]({%slug loadercontainer-appearance%}) through parameters and customize it by using the [Template]({%slug loadercontainer-template%}).

![](images/loadercontainer-overview-basic-example.gif)

````CSHTML
@*Show the LoaderContainer until the initial data for the Grid is loaded. The grid has its own loading animation for subsequent slow data operations*@

<TelerikLoaderContainer Visible="@(GridData == null ? true: false)"></TelerikLoaderContainer>

<TelerikGrid Data="@GridData" AutoGenerateColumns="true"
             Pageable="true" PageSize="4" Width="700px">
</TelerikGrid>

@code {
    public List<GridDataModel> GridData { get; set; }
    public class GridDataModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string EmailAddress { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public DateTime? LocalTime { get; set; }
    }

    public List<GridDataModel> GenerateGridData()
    {
        var data = Enumerable.Range(1, 15).Select(i => new GridDataModel()
        {
            Id = i,
            Username = $"Username {i}",
            EmailAddress = $"user{i}@mail.com",
            RegistrationDate = DateTime.Now.AddDays(-2),
            LocalTime = DateTime.Now
        }).ToList();

        return data;
    }

    protected override async Task OnInitializedAsync()
    {
        await Task.Delay(3000); // simulate slow loading of the initial data
        GridData = GenerateGridData();
    }
}
````

>note By default the loader container will fill up the browser viewport. If you want to hide only a specific element, see the [Fill a Parent Container](#fill-a-parent-container) section below.

## Features

The LoaderContainer provides the following features:

* `Class` - `string` - the custom CSS class that will be rendered on the main wrapping element of the LoaderContainer component. You can use this parameter to make the cascading of CSS rules easier.

* `Visible` - `bool`, defaults to `true` - controls whether the LoaderContainer is visible. 

* `Text` - `string`, defaults to `Loading...` - the text that will appear next to the loading indicator. If this parameter is set to `null` or `String.Empty` the HTML element that hosts the string will not be rendered.

* `ThemeColor` - `string` - controls the color of the loader indicator. See the [Appearance]({%slug loadercontainer-appearance%}) article for more information and examples.

* `OverlayThemeColor` - `string` - configures the color of the overlay. See the [Appearance]({%slug loadercontainer-appearance%}) article for more information and examples.

* `LoaderType` - `enum` - controls the shape of the loader indicator. Takes a member of the `Telerik.Blazor.Component.LoaderType` enum. See the [Appearance]({%slug loadercontainer-appearance%}) article for more information and examples.

* `Size` - `string` - controls the size of the loader indicator, when a `Template` is *not* used. Use a static property from the `ThemeConstants.Loader.Size` class - `Size.Small`, `Size.Medium` (default) or `Size.Large`. See the [Appearance]({%slug loadercontainer-appearance%}) article for more information and examples.

* `LoaderPosition` - `enum` - configures the position of the loader indicator against the `Text` parameter. Takes a member of the `Telerik.Blazor.Components.LoaderPosition`. You can find more information and examples in the [Appearance]({%slug loadercontainer-appearance%}) article.


>caption Component namespace and reference

````CSHTML
@*Get a reference to the LoaderContainer*@

<TelerikLoaderContainer @ref="@telerikLoaderReference"></TelerikLoaderContainer>

@code{
    Telerik.Blazor.Components.TelerikLoaderContainer telerikLoaderReference { get; set; }
}
````

## Examples

* [Block All Content](#block-all-content)
* [Remove the Panel from the LoaderContainer](#remove-the-panel-from-the-loadercontainer)
* [Fill a Parent Container](#fill-a-parent-container)

### Block All Content

By default, the Loader Container fills up the browser viewport, because this is the only certain size it can use - the application layout can change dimensions and where the scrollbars appear and there isn't a way for the component to know that and cater for all possible layouts.

So, if you want to make the loader container block all content on the app while it is shown, you must ensure the total app size fits the viewport and scrollbars appear inside it on an element that you can define.

>note Since the exact CSS rules and elements will vary depending on the layout, you need to examine the rendering in order to define them.
>
> You can find one example in the following **sample project**: <a href="https://github.com/telerik/blazor-ui/tree/master/loader/block-all-content" target="_blank">Disable All Content with Telerik Loader</a>

### Remove the Panel from the LoaderContainer

The panel is the white rectangular area that surrounds the loader indicator and the `Text` parameter of the component. By default, it is rendered to increase the contrast between the overlay and the rest of the component. In order to remove it, you can use some CSS rules as shown in the example below.

>note The panel will be rendered by default if you are using the [Template]({%slug loadercontainer-template%}).

````CSHTML
@*LoaderContainer with its most common features and removed panel with CSS.*@

<style>
    .myLoaderContainer .k-loader-container-panel {
        background-color: transparent;
        border: 0px;
    }
</style>

<TelerikLoaderContainer Class="myLoaderContainer"
                        Visible="@(GridData == null ? true: false)"
                        Size="@ThemeConstants.Loader.Size.Large"
                        Text="My custom loading text"
                        ThemeColor="light">
</TelerikLoaderContainer>

<TelerikGrid Data="@GridData" AutoGenerateColumns="true"
             Pageable="true" PageSize="4" Width="700px">
</TelerikGrid>

@code {
    public List<GridDataModel> GridData { get; set; }
    public class GridDataModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string EmailAddress { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public DateTime? LocalTime { get; set; }
    }

    public List<GridDataModel> GenerateGridData()
    {
        var data = Enumerable.Range(1, 15).Select(i => new GridDataModel()
        {
            Id = i,
            Username = $"Username {i}",
            EmailAddress = $"user{i}@mail.com",
            RegistrationDate = DateTime.Now.AddDays(-2),
            LocalTime = DateTime.Now
        }).ToList();

        return data;
    }

    protected override async Task OnInitializedAsync()
    {
        await Task.Delay(6000);
        GridData = GenerateGridData();
    }
}
````

### Fill a Parent Container

The LoaderContainer for Blazor can fill a parent container, for example a `div` or another wrapping HTML element. In order to signify to the component that it should fill its parent container you have to add the `position: relative` to the wrapping element.

````CSHTML
@*Wrap the LoaderContainer inside a div with fixed height and width*@

<div style="height: 300px; width: 300px; position: relative">
    <TelerikLoaderContainer></TelerikLoaderContainer>

    The LoaderContainer will fill the parent div container
</div>
````

>caption The result from the code snippet above

![](images/loadercontainer-fill-parent.png)







## See Also

  * [Live Demo: LoaderContainer](https://demos.telerik.com/blazor-ui/loadercontainer/overview)
  * [Appearance Settings]({%slug loadercontainer-appearance%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikLoaderContainer)
   
