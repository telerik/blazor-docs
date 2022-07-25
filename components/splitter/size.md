---
title: Size
page_title: Splitter and Panes Size
description: Splitter and Panes Size
slug: splitter-size
tags: telerik,blazor,splitter,panes,size
published: True
position: 6
---

# Splitter and Panes Size

The Splitter respects the dimensions you set to its `Width` and `Height` parameters, and distributes the available space according to the `Size` of the individual panes.

If you set the `Width` and `Height` in percent, make sure that the parent element provides the desired dimensions and layout first.

The individual panes use <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis" target="_blank">CSS flex-basis</a> to set their dimensions and by default they have `flex: 1 1 auto` so they distribute the space evenly if there are no other settings.

If the `Size` of a pane is set to a larger value than `Max`, the pane cannot be resized even if its `Resizable` parameter is set to `true`.

>tip You must leave at least one `SplitterPane` *without* a set `Size`. This pane will absorb size changes from other panes when the user resizes them and provides you with some flexibility when defining strict sizes for the other panes so that you don't have to keep track of all the pane sizes, their sum and the container size.

>tip You can find a sample of creating a 100% height layout with a splitter that also offers a header, footer and sidebar in the following sample project: <a href="https://github.com/telerik/blazor-ui/tree/master/splitter/use-100-percent-viewport" target="_blank">How to make Splitter take 100% height of the viewport</a>.

````CSHTML
@*Configure the Splitter size*@

<TelerikSplitter Width="600px" Height="400px">
    <SplitterPanes>
        <SplitterPane Size="200px">
            <h4>Left Pane</h4>
            <div>Collapsible pane with initial size in px.</div>
        </SplitterPane>
        <SplitterPane Size="20%">
            <h4>Middle Pane</h4>
            <div>Collapsible pane with initial size in percent.</div>
        </SplitterPane>
        <SplitterPane>
            <h4>Right Pane</h4>
            <span>No size set, this pane will take the remaining space of the Splitter.</span>
        </SplitterPane>
    </SplitterPanes>
</TelerikSplitter>
````

## See Also

  * [Live Demo: Splitter](https://demos.telerik.com/blazor-ui/splitter/overview)