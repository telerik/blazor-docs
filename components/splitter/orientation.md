---
title: Orientation
page_title: Splitter Orientation
description: Splitter Orientation
slug: splitter-orientation
tags: telerik,blazor,splitter,orientation,horizontal,vertical
published: True
position: 8
---

# Splitter Orientation

You can customize the Splitter orientation through the its `Orientation` parameter. It takes a member of the `SplitterOrientation` enum:

* `Horizontal` (the default)
* `Vertical`

>caption Splitter with vertical orientation

````CSHTML
@*Configure the Splitter Orientation*@

<TelerikSplitter Orientation="@SplitterOrientation.Vertical"
                 Width="400px" Height="200px">
    <SplitterPanes>
        <SplitterPane>
            <div>Top Pane content</div>
        </SplitterPane>
        <SplitterPane>
            <div>Bottom Pane content</div>
        </SplitterPane>
    </SplitterPanes>
</TelerikSplitter>
````

## Nested Splitters With Different Orientation

Sometimes you need to create a more complex layout that includes both horizontal and vertical panes. To do that, you can nest Telerik Splitter components inside the panes of other splitters. When you do that, set the `Class` parameter of the nested splitter to `k-pane-flex`.

>caption Nested splitters that create a complex layout with both horizontal and vertical panes

````CSHTML
<div style="width: 500px; height: 300px; border: 2px solid red;">

    <TelerikSplitter Width="100%" Height="100%">
        <SplitterPanes>
            <SplitterPane Size="100px">
                <div>left sidebar</div>
            </SplitterPane>
            <SplitterPane>

                <TelerikSplitter Class="k-pane-flex"
                                 Width="100%" Height="100%"
                                 Orientation="@SplitterOrientation.Vertical">
                    <SplitterPanes>
                        <SplitterPane Size="20%">
                            <div>TOP content</div>
                        </SplitterPane>
                        <SplitterPane>
                            <div>Bottom content</div>
                        </SplitterPane>
                    </SplitterPanes>
                </TelerikSplitter>

            </SplitterPane>
        </SplitterPanes>
    </TelerikSplitter>

</div>
````

>caption The result from the code snippet above

![Nested splitters can create complex layout](images/nested-splitter-result.png)

## See Also

  * [Live Demo: Splitter Orientation](https://demos.telerik.com/blazor-ui/splitter/orientation)
