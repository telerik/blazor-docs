---
title: Overview
page_title: Splitter Overview
description: Overview of the Splitter for Blazor - size, orientation, collapsing, resizing of panes, state and events.
slug: splitter-overview
tags: telerik,blazor,splitter,overview
published: True
position: 0
---

# Blazor Splitter Overview

The <a href="https://www.telerik.com/blazor-ui/splitter" target="_blank">Blazor Splitter component</a> lets you divide a portion of the page into several pieces that the user can resize and collapse. This provides real estate management for the app and the end user so they can focus on the content that is important in their current task. You can also [save and load its state](slug://splitter-state), and respond to [events](slug://splitter-events).

## Creating Blazor Splitter

1. Add the `<TelerikSplitter>` tag.
1. Set the `Width` and `Height` parameters in any valid CSS unit. See [Splitter Parameters](#splitter-parameters) for more information about the component behavior when dimensions are not set.
1. Inside the `<SplitterPanes>` child tag, add the desired `<SplitterPane>` tags to create sections of content.
1. Inside each `<SplitterPane>`, add the desired content as HTML markup or other components.
1. Configure the panes. For example, [set their `Size`, `Min`, `Max`, `Collapsible`, and `Resizable` parameters](slug://splitter-panes#pane-parameters). By default, Splitter panes are resizable, but not collapsible.

>caption Basic Splitter

````RAZOR
<TelerikSplitter Orientation="@SplitterOrientation.Horizontal"
                 Width="80%"
                 Height="200px">
    <SplitterPanes>

        <SplitterPane Size="100px" Min="50px" Max="150px" Collapsible="true">
            Left pane. Users can collapse it or resize it between 50px and 150px.
        </SplitterPane>

        <SplitterPane Collapsible="false">
            Middle pane, which cannot be collapsed.
        </SplitterPane>

        <SplitterPane Collapsed="true" Collapsible="true" Resizable="false" Size="100px">
            Right pane that is 100px wide and initially collapsed. Users cannot resize it.
        </SplitterPane>

    </SplitterPanes>
</TelerikSplitter>
````

>tip The following sample app shows how to create a 100%-high page layout with a Splitter that includes a header, footer, and sidebar: <a href="https://github.com/telerik/blazor-ui/tree/master/splitter/use-100-percent-viewport" target="_blank">How to make the Splitter take up 100% of the viewport</a>.

## Panes

Тhe Panes are the building blocks of the Splitter. Each pane controls its own behaviors such as the ability to change its size and collapse. [Read more about the Splitter Panes...](slug://splitter-panes)

## Orientation

The Splitter panes can stack horizontally or vertically. [Read more about how to configure the Splitter orientation...](slug://splitter-orientation)

## State

The Splitter allows you to save its state and programmatically control it. [Read more about the Splitter state...](slug://splitter-state)

## Events

The Splitter fires events that you can handle to further customize the component behavior and respond to the user actions. [Read more about the Blazor Splitter events...](slug://splitter-events)

## Splitter Parameters

The Blazor Splitter provides various parameters for its configuration. The following table lists Splitter parameters on component level. Explore the [Splitter Panes](slug://splitter-panes) article for details on the individual Panes configuration.

Check the [Splitter API Reference ](/blazor-ui/api/Telerik.Blazor.Components.TelerikSplitter) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --- | --- | --- |
| `AriaLabel` | `string` | The `aria-label` attribute of the splitbars elements (`<div class="k-splitbar">`). |
| `Class` | `string` | The CSS class that renders on the Splitter element (`<div class="k-splitter">`). |
| `Height` | `string` | The height style of the Splitter. See the [Dimensions](slug://common-features/dimensions) article for details on what units you can use and how percentage dimensions work. If not set, the Splitter will shrink and expand, according to the [pane sizes](slug://splitter-panes#pane-size) and content. |
| `Orientation` | `SplitterOrientation` enum <br/> (`SplitterOrientation.Horizontal`) | Whether the content will be split up (how the panes will stack) horizontally or vertically. |
| `Width`| `string` | The width style of the Splitter in any [valid CSS unit](slug://common-features/dimensions). If not set, the Splitter will expand horizontally to 100%. |

## Splitter Reference and Methods

Add a reference to the component instance to use the [Splitter methods](/blazor-ui/api/Telerik.Blazor.Components.TelerikSplitter#methods).

| Method | Description |
| --- | --- |
| `GetState` | Gets the current [state](slug://splitter-state) of the Splitter.
| `SetState` | Sets the current [state](slug://splitter-state) of the Splitter.

````RAZOR
<TelerikButton OnClick="@GetSplitterState">Get Splitter State</TelerikButton>

<TelerikSplitter @ref="@SplitterRef"
                 Height="200px">
    <SplitterPanes>
        <SplitterPane>
            <div>left sidebar</div>
        </SplitterPane>
        <SplitterPane>
            <div>right hand side pane - content.</div>
        </SplitterPane>
    </SplitterPanes>
</TelerikSplitter>

@code {
    private TelerikSplitter? SplitterRef { get; set; }

    private void GetSplitterState()
    {
        var splitterState = SplitterRef?.GetState();
    }
}
````

## Next Steps

* [Explore the Splitter pane settings](slug://splitter-panes)
* [Set the Splitter orientation](slug://splitter-orientation)
* [Manage the Splitter state](slug://splitter-state)
* [Handle Splitter events](slug://splitter-events)

## See Also

* [Live Demo: Splitter](https://demos.telerik.com/blazor-ui/splitter/overview)
* [Splitter API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSplitter)
* [SplitterPane API Reference](/blazor-ui/api/Telerik.Blazor.Components.SplitterPane)
