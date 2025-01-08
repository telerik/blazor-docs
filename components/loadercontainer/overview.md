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

The <a href = "https://www.telerik.com/blazor-ui/loader-container" target="_blank">Blazor LoaderContainer</a> provides an animated indicator, a panel, and an overlay that can be used when the application is performing a time-consuming background operation, for example loading data.


## Comparison with the Loader

The **LoaderContainer** is designed to cover a whole component, HTML element, or the whole page. On the other hand, the [**Loader** component](slug://loader-overview) is more suitable for showing a loading indicator in a smaller area of the page and without an overlay.


## Creating LoaderContainer

1. Use the `<TelerikLoaderContainer>` tag.
1. Set the `Visible` parameter to a `bool` property or expression.
1. (optional) Set the `Text` parameter to a `string`.

>caption Basic LoaderContainer

````RAZOR
<p> Data Count: @Data?.Count </p>

<TelerikLoaderContainer Visible="@( Data == null )" Text="Please wait..." />

@code {
    List<string> Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await Task.Delay(3000); // simulate slow loading of data

        Data = Enumerable.Range(1, 10).Select(x => $"data item {x}").ToList();
    }
}
````

> Do not show or hide the LoaderContainer in a method, which is blocking the UI thread with synchronous operations. If this happens, the LoaderContainer may not appear when expected. A possible workaround is to use `await Task.Delay(...)` to give Blazor time to refresh the UI.

>note By default, the Loader Container will fill up the browser viewport. To overlay only a specific element, see the [Fill a Parent Container](#fill-a-parent-container) section below.


## Appearance

The Blazor LoaderContainer provides various [settings for its visual appearance](slug://loadercontainer-appearance):

* overlay color
* graphic and text position
* loading animation type
* size
* text and graphic color


## Templates

The LoaderContainer can display different nested content. Read more in the [LoaderContainer Template article](slug://loadercontainer-template).


## Fill a Parent Container

The Blazor LoaderContainer can expand to fill only a specific parent container. To restrict the LoaderContainer within the parent's boundaries, set a `position: relative` CSS style to the parent element.

>caption Use the LoaderContainer to fill a parent element

````RAZOR
<div style="position: relative; width: 600px; height: 400px;">
    <TelerikLoaderContainer />
</div>
````


## LoaderContainer Parameters

The following table lists the LoaderContainer parameters. Also check the [LoaderContainer API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikLoaderContainer).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-loader-container">` element. Use it to [override theme styles](slug://themes-override). See an example at [Custom LoaderContainer Colors](slug://loadercontainer-appearance#custom-loadercontainer-colors). |
| `OverlayThemeColor` | `string`<br />(`"dark"`) | Sets the [color of the semi-transparent overlay](slug://loadercontainer-appearance#overlaythemecolor). Use `"light"` or ``"dark"``. |
| `Size` | `string`<br />(`"md"`) | Sets the [size of the animated graphic](slug://loadercontainer-appearance#size). For convenience, use the members of the static class [`ThemeConstants.Loader.Size`](/blazor-ui/api/Telerik.Blazor.ThemeConstants.Loader.Size). |
| `Text` | `string`<br />(`"Loading..."`) | Sets the text below the loading animation. Set to `null` or `String.Empty` to remove the text and its containing HTML element. |
| `ThemeColor` | `string`<br />(`"primary"`) | Sets the [color of the animated graphic and text](slug://loadercontainer-appearance#themecolor). For convenience, use the members of the static class [`ThemeConstants.Loader.ThemeColor`](/blazor-ui/api/Telerik.Blazor.ThemeConstants.Loader.ThemeColor). |
| `LoaderPosition`| `LoaderPosition` enum<br />(`Top`) | Defines the [loading animation position](slug://loadercontainer-appearance#loaderposition) in relation to the loading text. |
| `LoaderType`| `LoaderType` enum<br />(`Pulsing`) | Defines the [loading animation shape](slug://loadercontainer-appearance#loadertype). |
| `Visible` | `bool`<br />(`true`) | Controls if the LoaderContainer is rendered on the page. |


## Examples

* [Block All Content](#block-all-content)
* [Remove the Panel from the LoaderContainer](#remove-the-panel-from-the-loadercontainer)

### Block All Content

By default, the Loader Container fills up the browser viewport, because this is the only certain size it can use - the application layout can change dimensions and where the scrollbars appear and there isn't a way for the component to know that and cater for all possible layouts.

So, if you want to make the loader container block all content on the app while it is shown, you must ensure the total app size fits the viewport and scrollbars appear inside it on an element that you can define.

>note Since the exact CSS rules and elements will vary depending on the layout, you need to examine the rendering in order to define them.
>
> You can find one example in the following **sample project**: <a href="https://github.com/telerik/blazor-ui/tree/master/loader/block-all-content" target="_blank">Disable All Content with Telerik Loader</a>

### Remove the Panel from the LoaderContainer

The panel is the white rectangular area that surrounds the animated loader indicator and the `Text`. Its purpose is to increase contrast and improve readability. To remove the white rectangle, use custom CSS code:

````RAZOR
@* LoaderContainer with transparent panel *@

<TelerikLoaderContainer Class="no-panel"
                        ThemeColor="@ThemeConstants.Loader.ThemeColor.Dark" />

<style>
    .no-panel .k-loader-container-panel {
        background-color: transparent;
        border-width: 0;
    }
</style>
````

>note The panel is not rendered when using a [LoaderContainer Template](slug://loadercontainer-template).


## Next Steps

* [Check the LoaderContainer appearance settings](slug://loadercontainer-appearance)
* [Experiment with LoaderContainer templates](slug://loadercontainer-template)


## See Also

* [Live Demo: LoaderContainer](https://demos.telerik.com/blazor-ui/loadercontainer/overview)
* [LoaderContainer API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikLoaderContainer)
