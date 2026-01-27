---
title: Orientation
page_title: Splitter Orientation
description: Splitter Orientation
slug: splitter-orientation
tags: telerik,blazor,splitter,orientation,horizontal,vertical
published: True
position: 8
components: ["splitter"]
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

You can create more complex layouts that include both horizontal and vertical Splitters. To do that, add a Telerik Splitter as a child of another Splitter's pane. Usually, the nested Splitter should be 100% high.

>caption Layout with nested Splitters

````RAZOR
<TelerikSplitter Orientation="@SplitterOrientation.Horizontal"
                 Height="100vh"
                 Width="100vw">
    <SplitterPanes>
        <SplitterPane Size="120px">
            <div>Spltter 1 (horizontal), Left Pane</div>
        </SplitterPane>
        <SplitterPane>

            <TelerikSplitter Height="100%"
                             Orientation="@SplitterOrientation.Vertical">
                <SplitterPanes>
                    <SplitterPane Size="20%">
                        <div>Splitter 2 (vertical), Top Pane</div>
                    </SplitterPane>
                    <SplitterPane>
                        <TelerikSplitter Height="100%"
                                         Orientation="@SplitterOrientation.Horizontal">
                            <SplitterPanes>
                                <SplitterPane>
                                    <div>Splitter 3 (horizontal), Left Pane</div>
                                </SplitterPane>
                                <SplitterPane>
                                    <div>Splitter 3 (horizontal), Right Pane</div>
                                </SplitterPane>
                            </SplitterPanes>
                        </TelerikSplitter>
                    </SplitterPane>
                </SplitterPanes>
            </TelerikSplitter>

        </SplitterPane>
    </SplitterPanes>
</TelerikSplitter>
````

## Next Steps

* [Manage the Splitter state](slug:splitter-state)
* [Handle Splitter events](slug:splitter-events)

## See Also

* [Live Demo: Splitter Orientation](https://demos.telerik.com/blazor-ui/splitter/orientation)
