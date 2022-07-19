---
title: Panes
page_title: Splitter Panes
description: Overview of the Splitter Panes - size, orientation, collapsing, resizing of panes, state and events.
slug: splitter-panes
tags: telerik,blazor,splitter,panes
published: True
position: 3
---

# Splitter Panes

The Splitter consists of individual sections called Panes. The Splitter Panes allow you to add any desired content - be that simple text, other components or HTML elements. Declare a `<SplitterPane>` instance inside the `<SplitterPanes>` child tag of the Splitter for each Pane you want to include in the component.

Each Splitter Pane (section) is individually configured and offers the following features:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `ChildContent` | `RenderFragment` | the standard `RenderFragment` for Blazor that lets you define your content directly between the opening and closing tags of the pane.
| `Class` | `string` | the CSS class that renders on the top element of the pane. Lets you apply styling such as changing the `overflow` for the content.
| `Collapsed` | `bool` <br/> `false` | whether the pane will be collapsed (not visible). Supports two-way binding.
| `Collapsible` | `bool` <br/> `false`| whether the user can collapse (hide) the pane to provide more room for other panes. When enabled, the adjacent splitbar (the drag handle between the panes) will offer a collapse button for the pane.
| `Max` | `string` | the maximum size the pane can have in pixels or percentages. When it is reached, the user cannot expand its size further.
| `Min` | `string` |  the minimum size the pane can have in pixels or percentages. When it is reached, the user cannot reduce its size further.
| `Resizable` | `bool` <br/> `true`| whether the user can resize the pane by dragging the resize handle (splitbar) between two panes. Resizing means that the adjacent pane will take up the difference in size.
| `Size` | `string`  | the size the pane in pixels or percentages. Must be between `Min` and `Max`. Supports two-way binding.

````CSHTML
@*Configure the Splitter Panes*@

<TelerikSplitter Width="600px" Height="400px">
    <SplitterPanes>

        <SplitterPane Collapsible="true" Size="200px" Min="100px" Max="300px">
            <h4>Left Pane</h4>
            <div>Collapsible pane with initial size in px that can be resized between 100px and 200px.</div>
        </SplitterPane>

        <SplitterPane Collapsible="true" Size="20%">
            <h4>Middle Pane</h4>
            <div>Collapsible pane with initial size in percent.</div>
        </SplitterPane>

        <SplitterPane Collapsible="false" >
            <h4>Right Pane</h4>
            <span>Non-collapsible pane. No size set, it will take the remaining space of the component.</span>
        </SplitterPane>
        
    </SplitterPanes>
</TelerikSplitter>
````

## See Also

  * [Live Demo: Splitter](https://demos.telerik.com/blazor-ui/splitter/overview)
  * [Splitter and Panes Size]({%slug splitter-size%})