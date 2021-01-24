---
title: Events
page_title: Splitter - Events
description: Events in the Splitter for Blazor.
slug: splitter-events
tags: telerik,blazor,splitter,events
published: true
position: 20
---

# Events

This article explains the events available in the Telerik Splitter for Blazor:

* [OnCollapse](#oncollapse)
* [OnExpand](#onexpand)
* [OnResize](#onresize)

## OnCollapse

The `OnCollapse` event fires when a pane is collapsed. It receives the index of the pane that was collapsed in its event arguments.

>caption Handling the OnCollapse event of the splitter

````CSHTML
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

@[template](/_contentTemplates/common/issues-and-warnings.md#component-does-not-re-render)


## OnExpand

The `OnExpand` event fires when a pane is expanded. It receives the index of the pane that was expanded in its event arguments.

>caption Handling the OnExpand event of the splitter

````CSHTML
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

@[template](/_contentTemplates/common/issues-and-warnings.md#component-does-not-re-render)


## OnResize

The `OnResize` event fires after the user has finished resizing a pane (after the mouse button is released). It fires for each resized pane and receives the index and new size in its event arguments.

>caption Handle the OnResize event of the splitter

````CSHTML
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

@[template](/_contentTemplates/common/issues-and-warnings.md#component-does-not-re-render)



## See Also

* [Splitter Overview]({%slug splitter-overview%})
