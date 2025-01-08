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

````RAZOR
<p>
    Configure the Splitter Orientation:

    <TelerikRadioGroup Data="@OrientationOptions" Layout="RadioGroupLayout.Horizontal"
                       @bind-Value="@SelectedSplitterOrientation.Value" />
</p>

<TelerikSplitter Orientation="@SelectedSplitterOrientation.Value"
                 Width="400px" Height="200px">
    <SplitterPanes>
        <SplitterPane>
            <div>First Pane content</div>
        </SplitterPane>
        <SplitterPane>
            <div>Second Pane content</div>
        </SplitterPane>
    </SplitterPanes>
</TelerikSplitter>

@code {
    public Orientation SelectedSplitterOrientation { get; set; }

    protected override void OnInitialized()
    {
        SelectedSplitterOrientation = OrientationOptions[0];
        base.OnInitialized();
    }

    public List<Orientation> OrientationOptions { get; set; } = new List<Orientation>()
    {
        new Orientation() { Text = "Horizontal", Value = SplitterOrientation.Horizontal },
        new Orientation() { Text = "Vertical", Value = SplitterOrientation.Vertical},
    };

    public class Orientation
    {
        public string Text { get; set; }
        public SplitterOrientation Value { get; set; }
    }

}
````

## Nested Splitters With Different Orientation

Sometimes you need to create a more complex layout that includes both horizontal and vertical panes. To do that, you can nest Telerik Splitter components inside the panes of other splitters. When you do that, set the `Class` parameter of the nested splitter to `k-pane-flex`.

>caption Nested splitters that create a complex layout with both horizontal and vertical panes

````RAZOR
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

## Next Steps

* [Manage the Splitter state](slug://splitter-state)
* [Handle Splitter events](slug://splitter-events)

## See Also

* [Live Demo: Splitter Orientation](https://demos.telerik.com/blazor-ui/splitter/orientation)
