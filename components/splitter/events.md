---
title: Events
page_title: Splitter - Events
description: Events in the Splitter for Blazor.
slug: splitter-events
tags: telerik,blazor,splitter,events
published: true
position: 20
components: ["splitter"]
---
# Events

This article explains the events available in the Telerik Splitter for Blazor:

* Splitter
    * [OnCollapse](#oncollapse)
    * [OnExpand](#onexpand)
    * [OnResize](#onresize)
* Pane
    * [SizeChanged](#sizechanged)
    * [CollapsedChanged](#collapsedchanged)

## OnCollapse

The `OnCollapse` event fires when a pane is collapsed. It receives the index of the pane that was collapsed in its event arguments.

@[template](/_contentTemplates/common/general-info.md#rerender-after-event)

>caption Handling the OnCollapse event of the splitter

````RAZOR
Try collapsing any of the panes by clicking the corresponding arrow on the adjacent splitbar

<div style="width: 500px; border: 1px solid red;">
    <TelerikSplitter Width="100%"
                     Height="200px"
                     OnCollapse="@OnCollapseHandler">
        <SplitterPanes>

            <SplitterPane Size="200px" Collapsible="true">
                <div>pane 0</div>
            </SplitterPane>

            <SplitterPane Size="250px" Collapsible="true">
                <div>pane 1</div>
            </SplitterPane>

            <SplitterPane Collapsible="true">
                <div>pane 2</div>
            </SplitterPane>

        </SplitterPanes>
    </TelerikSplitter>
</div>

@code{
    void OnCollapseHandler(SplitterCollapseEventArgs args)
    {
        Console.WriteLine($"pane with index: {args.Index} was just collapsed.");
    }
}
````


## OnExpand

The `OnExpand` event fires when a pane is expanded. It receives the index of the pane that was expanded in its event arguments.

@[template](/_contentTemplates/common/general-info.md#rerender-after-event)

>caption Handling the OnExpand event of the splitter

````RAZOR
Try collapsing and expanding any of the panes by clicking the corresponding arrow on the adjacent splitbar

<div style="width: 500px; border: 1px solid red;">
    <TelerikSplitter Width="100%"
                     Height="200px"
                     OnExpand="@OnExpandHandler">
        <SplitterPanes>

            <SplitterPane Size="200px" Collapsible="true">
                <div>pane 0</div>
            </SplitterPane>

            <SplitterPane Size="250px" Collapsible="true">
                <div>pane 1</div>
            </SplitterPane>

            <SplitterPane Collapsible="true">
                <div>pane 2</div>
            </SplitterPane>

        </SplitterPanes>
    </TelerikSplitter>
</div>

@code{
    void OnExpandHandler(SplitterExpandEventArgs args)
    {
        Console.WriteLine($"pane with index: {args.Index} was just expanded.");
    }
}
````


## OnResize

The `OnResize` event fires after the user has finished resizing a pane (after the mouse button is released). It fires for each resized pane and receives the index and new size in its event arguments.

@[template](/_contentTemplates/common/general-info.md#rerender-after-event)

>caption Handle the OnResize event of the splitter

````RAZOR
Try resizing any of the panes by dragging the splitbars

<div style="width: 500px; border: 1px solid red;">
    <TelerikSplitter Width="100%"
                     Height="200px"
                     OnResize="@OnResizeHandler">
        <SplitterPanes>

            <SplitterPane Size="200px" Collapsible="true">
                <div>pane 0</div>
            </SplitterPane>

            <SplitterPane Size="250px" Collapsible="true">
                <div>pane 1</div>
            </SplitterPane>

            <SplitterPane Collapsible="true">
                <div>pane 2</div>
            </SplitterPane>

        </SplitterPanes>
    </TelerikSplitter>
</div>

@code{
    void OnResizeHandler(SplitterResizeEventArgs args)
    {
        Console.WriteLine($"pane with index: {args.Index} was just resized to {args.Size}.");
    }
}
````

## SizeChanged

The `SizeChanged` event is triggered when the `Size` parameter of the corresponding pane is changed.

>caption Handle the SizeChanged event of a Splitter Pane

````RAZOR
@* Try resizing Pane 1 *@ 

<div style="width: 500px; border: 1px solid red;">
    <TelerikSplitter Width="100%"
                     Height="200px">
        <SplitterPanes>

            <SplitterPane Size="200px" Collapsible="true">
                <div>pane 0</div>
            </SplitterPane>

            <SplitterPane Size="@PaneSize" 
                          SizeChanged="@SizeChangedHandler" 
                          Collapsible="true">
                <div>pane 1</div>
            </SplitterPane>

            <SplitterPane Collapsible="true">
                <div>pane 2</div>
            </SplitterPane>

        </SplitterPanes>
    </TelerikSplitter>
</div>

@code{
    public string PaneSize { get; set; } = "250px";

    void SizeChangedHandler(string size)
    {
        PaneSize = size;
        Console.WriteLine("Pane 1 size was changed. Current size: " + PaneSize);
    }
}
````


## CollapsedChanged

The `CollapsedChanged` event is triggered when the `Collapsed` parameter of the corresponding pane is changed.

>caption Handle the CollapsedChanged event of a Splitter Pane

````RAZOR
@* Try collapsing Pane 1 *@ 

<div style="width: 500px; border: 1px solid red;">
    <TelerikSplitter Width="100%"
                     Height="200px">
        <SplitterPanes>

            <SplitterPane Size="200px" Collapsible="true">
                <div>pane 0</div>
            </SplitterPane>

            <SplitterPane Collapsed="@IsCollapsed"
                          CollapsedChanged="@CollapsedChangedHandler"
                          Size="250px"
                          Collapsible="true">
                <div>pane 1</div>
            </SplitterPane>

            <SplitterPane Collapsible="true">
                <div>pane 2</div>
            </SplitterPane>

        </SplitterPanes>
    </TelerikSplitter>
</div>

@code{
    public bool IsCollapsed { get; set; }

    void CollapsedChangedHandler(bool collapsed)
    {
        IsCollapsed = collapsed;

        Console.WriteLine("Collapsed state of Pane 1 was changed. Current state: " + IsCollapsed);
    }
}
````

## See Also

* [Splitter Overview](slug:splitter-overview)
