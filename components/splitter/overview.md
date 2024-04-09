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

The <a href="https://www.telerik.com/blazor-ui/splitter" target="_blank">Blazor Splitter component</a> lets you divide a portion of the page into several pieces that the user can resize and collapse. This provides real estate management for the app and the end user so they can focus on the content that is important in their current task. You can also [save and load its state]({%slug splitter-state%}), and respond to [events]({%slug splitter-events%}).

## Creating Splitter for Blazor

1. Declare the `<TelerikSplitter>` tag

1. Optionally, set the `Width` and `Height` parameters to the desired values. Otherwise, the component size will be controlled by the content and [size]({%slug splitter-size%}) of the panes.

    * You can use values in percent (setting them to `100%` is very common) so that the splitter will take up the entire size of its container. See the [Dimensions]({%slug common-features/dimensions%}) article for more details on what units you can use and how dimensions in percent work.

1. Inside the `<SplitterPanes>` child tag, add the desired [`<SplitterPane>`]({%slug splitter-panes%}) tags to create the sections of content.

1. Inside each `<SplitterPane>`, add the desired content - be that HTML or components.

1. Optionally, set the desired settings for the individual Panes - such as initial, min and max size, whether the user can collapse and resize the pane.

>caption Splitter that takes 100% of its container and shows the main features of its panes

````CSHTML
This example shows how the splitter can fill up the entire container (marked with a red border) and the main features of the component and its panes.

<div style="width: 500px; height: 300px; border: 1px solid red;">

    <TelerikSplitter Width="100%" Height="100%" Orientation="@SplitterOrientation.Horizontal">
        <SplitterPanes>
        
            <SplitterPane Size="100px" Min="50px" Max="150px" Collapsible="true">
                <div>left sidebar. Can be collapsed and can be resized between 50px and 150px.</div>
            </SplitterPane>
            
            <SplitterPane Collapsible="false">
                <div>right hand side pane - content. You cannot collapse this pane so it is always visible.</div>
            </SplitterPane>
            
            <SplitterPane Collapsed="true" Collapsible="true" Resizable="false" Size="100px">
                <div>Third pane that is initially collapsed and is not resizable.</div>
            </SplitterPane>
            
        </SplitterPanes>
    </TelerikSplitter>
    
</div>
````

>caption Splitter functionality in action

![overview of the splitter functionality](images/splitter-overview.gif)


## Panes

Тhe Panes are the building blocks of the Splitter. Each Pane controls its own behaviors such as the ability to change its size and collapse. [Read more about the Splitter Panes...]({%slug splitter-panes%})

## Size

You can control the Splitter size through its `Width` and `Height` parameters. Additionally, the component allows you specify the desired size for each pane. [Read about for the Splitter sizing specifics...]({%slug splitter-size%})

## Orientation

The Splitter Panes can be stacked in horizontal or vertical direction. [Read more about how to configure the Splitter orientation...]({%slug splitter-orientation%})

## State

The Splitter allows you to save its state and programmatically control it. [Read more about the Splitter State...]({%slug splitter-state%})

## Events

The Splitter generates events that you can handle to further customize the component behavior and respond to the user actions. [Read more about the Blazor Menu events...]({%slug splitter-events%})

## Splitter Parameters

The Blazor Splitter provides various parameters for its configuration. The following table lists Splitter parameters on component level. Explore the [Splitter Panes]({%slug splitter-panes%}) article for details on the individual Panes configuration.

Check the [Splitter API Reference ](/blazor-ui/api/Telerik.Blazor.Components.TelerikSplitter) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
|  `Class` | `string` | The CSS class that renders on the main wrapping element of the component.
|  `Height` | `string` | The height of the Splitter. See the [Dimensions]({%slug common-features/dimensions%}) article for more details on what units you can use and how dimensions in percent work.
|  `Orientation` | `SplitterOrientation` enum <br/> (`SplitterOrientation.Horizontal`) | Whether the content will be split up (how the panes will stack) horizontally or vertically.
|  `Width`| `string` | The width of the Splitter. See the [Dimensions]({%slug common-features/dimensions%}) article for more details on what units you can use and how dimensions in percent work.

## Splitter Reference and Methods

Add a reference to the component instance to use the [Splitter methods](/blazor-ui/api/Telerik.Blazor.Components.TelerikSplitter#methods).

| Method | Description |
| --- | --- |
| `GetState` | Gets the current [state]({%slug splitter-state%}) of the Splitter.
| `SetState` | Sets the current [state]({%slug splitter-state%}) of the Splitter.

````CSHTML
<TelerikButton OnClick="@GetSplitterState">Get Splitter State</TelerikButton>

<TelerikSplitter @ref="@SplitterRef"
                 Width="400px" 
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
    Telerik.Blazor.Components.TelerikSplitter SplitterRef { get; set; }

    void GetSplitterState()
    {
        var currState = SplitterRef.GetState();
    }
}
````

## Next Steps

* [Explore the various Splitter Pane options]({%slug splitter-panes%})
* [Configure the Splitter Size]({%slug splitter-size%})

## See Also

  * [Live Demo: Splitter](https://demos.telerik.com/blazor-ui/splitter/overview)
  * [Splitter API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSplitter)
  * [SplitterPane API Reference](/blazor-ui/api/Telerik.Blazor.Components.SplitterPane)
