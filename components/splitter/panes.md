---
title: Panes
page_title: Splitter Panes
description: Overview of the Splitter Panes - size, orientation, collapsing, resizing of panes, state and events.
slug: splitter-panes
tags: telerik,blazor,splitter,panes
published: True
position: 3
previous_url: /components/splitter/size
---

# Splitter Panes

Panes are containers that serve as the building blocks of the Splitter. The panes allow you to add any content, for example, text, HTML markup, or other components. Declare a `<SplitterPane>` instance inside the `<SplitterPanes>` child tag of the Splitter for each pane you want to include in the component.

## Pane Parameters

Each Splitter pane is configured individually and offers the following parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | The custom CSS class that renders on the pane element (`<div class="k-pane">`). Use it to [apply custom styling](slug:themes-override). |
| `Collapsed` | `bool` | Defines if the pane content renders or not. Supports two-way binding. Collapsed panes still show their splitbar and available actions, for example, expand icon or resize handle. Compare with the `Visible` parameter. |
| `Collapsible` | `bool` | Whether the user can collapse (hide) the pane to provide more room for other panes. When enabled, the adjacent splitbar (the drag handle between the panes) will offer a collapse button for the pane. |
| `Max` | `string` | The maximum size the pane can have in pixels or percentages. When it is reached, the user cannot expand its size further. |
| `Min` | `string` |  The minimum size the pane can have in pixels or percentages. When it is reached, the user cannot reduce its size further. |
| `Resizable` | `bool` <br /> (`true`) | Whether users can resize the pane with a resize handle (splitbar) or the keyboard. Pane resizing always affects two panes. To enable resizing for a specific pane, at least one adjacent pane must be resizable too. |
| `Scrollable` | `bool` | Whether the browser automatically shows scrollbars in panes which do not fit their current content. |
| `Size` | `string` | The pane `width` CSS style in [horizontal Splitters](slug:splitter-orientation), or the pane `height` in [vertical Splitters](slug:splitter-orientation). Supports two-way binding. The `Size` must be between the `Min` and `Max` values. See [Pane Size](#pane-size) below for more details on pane dimensions and behavior. |
| `Visible` | `bool` | Defines if the pane element and splitbar render or not. When toggled at runtime, the pane's index remains unchanged, unlike when adding a pane with a conditional statement, which appends it at the end. Compare with the `Collapsed` parameter. |

>caption Configure Splitter Panes

````RAZOR
<TelerikSplitter Width="600px" Height="300px">
    <SplitterPanes>

        <SplitterPane Collapsible="true" @bind-Size="@PaneSize1" Min="100px" Max="300px">
            <h4>Left Pane</h4>
            <div>Collapsible pane with initial size in px. It can be resized between 100px and 300px.</div>
        </SplitterPane>

        <SplitterPane Collapsible="true" @bind-Size="@PaneSize2">
            <h4>Middle Pane</h4>
            <div>Collapsible pane with initial size in percentage.</div>
        </SplitterPane>

        <SplitterPane Collapsible="false" Scrollable="true">
            <h4>Right Pane</h4>
            <div style="height:150%">Non-collapsible and scrollable pane with no size. It will take up the remaining space in the component.</div>
        </SplitterPane>

        <SplitterPane Visible="false">
            <h4>Invisible Pane</h4>
            <span>This pane will not render.</span>
        </SplitterPane>

    </SplitterPanes>
</TelerikSplitter>

@code {
    private string PaneSize1 { get; set; } = "200px";

    private string PaneSize2 { get; set; } = "20%";
}
````

## Pane Dimensions

The dimensions of a Splitter pane depend on:

* The [pane `Size`](#pane-size) parameter
* The [pane `Collapsible` and `Resizable`](#pane-collapsibility-and-resizability) parameters
* The [Splitter `Width`, `Height`, and `Orientation`](#splitter-width-and-height) parameters

The sections below provide more details and a [hands-on example](#example).

### Pane Size

The Splitter pane `Size` controls the pane width or height, depending on the [Splitter `Orientation`](slug:splitter-orientation).

There must be at least one `SplitterPane` without a `Size`. This pane will adjust automatically to occupy the remaining space, based on the other pane sizes.

If the pane `Size` is greater than `Max`, the pane cannot be resized even if its `Resizable` parameter is set to `true`.

### Pane Collapsibility and Resizability

Collapsibility and resizability have the following impact on the Splitter pane dimensions:

* Panes that are collapsible or resizable are called *flex panes*. When a flex pane has no `Size`, it expands to fill the available space. If multiple flex panes have no `Size`, they take up equal parts of the available space.
* Panes that are not collapsible and not resizable are called *static panes*. When a static pane has no `Size`, it expands and shrinks based on its content.

### Splitter Width and Height

In a [vertical Splitter](slug:splitter-orientation), the pane widths match the Splitter `Width`.

Here is how the Splitter `Height` affects the pane heights:

* If a [horizontal Splitter](slug:splitter-orientation) has no `Height`, then its panes do not expand vertically to fill up the Splitter element. The [example](#example) below shows how to work around this with a `height:auto` style on the `.k-pane` class.
* If a vertical Splitter has no `Height`, then all its panes ignore their `Size`. The panes expand or shrink, depending on their content. There is no pane scrolling.
* If a vertical Splitter has a `Height`, then:
    * All panes obey their set `Size`.
    * Static panes with no `Size` expand to match the Splitter `Height`, leading to content overflow.
    * Flex panes with no `Size` shrink to zero height, but only if there is a static pane with no `Size`.

See [Splitter Parameters](slug:splitter-overview#splitter-parameters) for more information about the component `Width` and `Height`.

### Example

The example below demonstrates:

* How the splitbars between the panes look like, depending on the panes' collapsibility and resizability.
* How panes with and without a `Size` behave when they are [static or flex](#pane-collapsibility-and-resizability).
* How the Splitter `Height` affects the height of static and flex panes.

>caption Behavior and dimensions of flex and static Splitter panes

````RAZOR
Splitter Orientation:
<TelerikRadioGroup Data="@SplitterOrientations"
                   @bind-Value="@SplitterOrientation"
                   Layout="@RadioGroupLayout.Horizontal" />

<label><TelerikCheckBox @bind-Value="@ShouldSetSplitterHeight" /> Set Splitter Height <code>@SplitterHeight</code></label>
<br />
<label><TelerikCheckBox @bind-Value="@ShouldExpandPanesVertically" /> Expand Panes without Splitter Height</label>

<br />
<br />

<TelerikSplitter Height="@SplitterHeight"
                 Orientation="@SplitterOrientation"
                 Class="custom-splitter">
    <SplitterPanes>
        <SplitterPane Collapsible="@FirstPaneCollapsible"
                      Resizable="@FirstPaneResizable"
                      Size="@FirstPaneSize"
                      SizeChanged="@FirstPaneSizeChanged"
                      Scrollable="true">
            <h2>First pane</h2>
            <ul style="list-style-type: disc;">
                <li>
                    Size: <TelerikNumericTextBox Value="@FirstPaneSizeNumber"
                                                 ValueChanged="@( (int? newValue) => FirstPaneSizeNumberChanged(newValue) )"
                                                 Format="# \%"
                                                 Min="20" Max="100"
                                                 ShowClearButton="true"
                                                 Width="110px" />
                </li>
                <li><label><TelerikCheckBox @bind-Value="@FirstPaneCollapsible" /> Collapsible</label></li>
                <li><label><TelerikCheckBox @bind-Value="@FirstPaneResizable" /> Resizable</label></li>
                <li><strong>@( !FirstPaneCollapsible && !FirstPaneResizable ? "Static" : "Flex" )</strong> pane</li>
            </ul>

            <p>Random content...</p>
            <p>Random content...</p>
            <p>Random content...</p>
        </SplitterPane>
        <SplitterPane Collapsible="@MiddlePaneCollapsible"
                      Resizable="@MiddlePaneResizable"
                      Size="@MiddlePaneSizе">
            <h3>Middle pane</h3>
            <ul style="list-style-type: disc;">
                <li>Size: @( string.IsNullOrEmpty(MiddlePaneSizе) ? "N/A" : MiddlePaneSizе )</li>
                <li><label><TelerikCheckBox @bind-Value="@MiddlePaneCollapsible" /> Collapsible</label></li>
                <li><label><TelerikCheckBox @bind-Value="@MiddlePaneResizable" /> Resizable</label></li>
                <li><strong>@( !MiddlePaneCollapsible && !MiddlePaneResizable ? "Static" : "Flex" )</strong> pane</li>
            </ul>
        </SplitterPane>
        <SplitterPane Collapsible="@LastPaneCollapsible"
                      Resizable="@LastPaneResizable"
                      Size="@LastPaneSize"
                      SizeChanged="@LastPaneSizeChanged"
                      Scrollable="true">
            <h3>Last pane</h3>
            <ul style="list-style-type: disc;">
                <li>
                    Size: <TelerikNumericTextBox Value="@LastPaneSizeNumber"
                                                 ValueChanged="@( (int? newValue) => LastPaneSizeNumberChanged(newValue) )"
                                                 Format="# \%"
                                                 Min="20" Max="100"
                                                 ShowClearButton="true"
                                                 Width="110px" />
                </li>
                <li><label><TelerikCheckBox @bind-Value="@LastPaneCollapsible" /> Collapsible</label></li>
                <li><label><TelerikCheckBox @bind-Value="@LastPaneResizable" /> Resizable</label></li>
                <li><strong>@( !LastPaneCollapsible && !LastPaneResizable ? "Static" : "Flex" )</strong> pane</li>
            </ul>
            <p>Random content...</p>
        </SplitterPane>
    </SplitterPanes>
</TelerikSplitter>

<style>
    @if (ShouldExpandPanesVertically)
    {
        <text>
        .custom-splitter.k-splitter-horizontal > .k-pane {
            height: auto;
        }
        </text>
    }

    /* Optional styles for this specific example */

    /* Make the pane dimensions easier to see */
    .k-pane {
        background: linear-gradient(120deg, #fff, var(--kendo-color-subtle));
    }

    /* Make the Splitter dimensions easier to see when using static panes */
    .k-splitter {
        background: var(--kendo-color-primary);
    }
</style>

@code {
    private List<SplitterOrientation> SplitterOrientations { get; set; } = new List<SplitterOrientation>() {
        SplitterOrientation.Horizontal,
        SplitterOrientation.Vertical
    };
    private SplitterOrientation SplitterOrientation { get; set; } = SplitterOrientation.Horizontal;

    private bool ShouldSetSplitterHeight { get; set; } = true;
    private string SplitterHeight => ShouldSetSplitterHeight ? "60vh" : string.Empty;

    private bool ShouldExpandPanesVertically { get; set; }

    private bool FirstPaneCollapsible { get; set; }
    private bool FirstPaneResizable { get; set; }
    private string FirstPaneSize { get; set; } = string.Empty;
    private int? FirstPaneSizeNumber { get; set; } = 30;

    private bool MiddlePaneCollapsible { get; set; }
    private bool MiddlePaneResizable { get; set; } = true;
    private string MiddlePaneSizе { get; set; } = string.Empty;

    private bool LastPaneCollapsible { get; set; } = true;
    private bool LastPaneResizable { get; set; } = true;
    private string LastPaneSize { get; set; } = string.Empty;
    private int? LastPaneSizeNumber { get; set; } = 20;

    private void FirstPaneSizeNumberChanged(int? newValue)
    {
        FirstPaneSizeNumber = newValue;

        if (FirstPaneSizeNumber.HasValue)
        {
            FirstPaneSize = $"{FirstPaneSizeNumber}%";
        }
        else
        {
            FirstPaneSize = string.Empty;
        }
    }

    private void LastPaneSizeNumberChanged(int? newValue)
    {
        LastPaneSizeNumber = newValue;

        if (LastPaneSizeNumber.HasValue)
        {
            LastPaneSize = $"{LastPaneSizeNumber}%";
        }
        else
        {
            LastPaneSize = string.Empty;
        }
    }

    private void FirstPaneSizeChanged(string newValue)
    {
        newValue = newValue.Replace("%", "").Replace("px", "");
        FirstPaneSizeNumberChanged(Convert.ToInt32(Math.Round(Convert.ToDecimal(newValue))));
    }

    private void LastPaneSizeChanged(string newValue)
    {
        newValue = newValue.Replace("%", "").Replace("px", "");
        LastPaneSizeNumberChanged(Convert.ToInt32(Math.Round(Convert.ToDecimal(newValue))));
    }

    protected override void OnInitialized()
    {
        FirstPaneSizeNumberChanged(FirstPaneSizeNumber);
        LastPaneSizeNumberChanged(LastPaneSizeNumber);

        base.OnInitialized();
    }
}
````

## Next Steps

* [Set the Splitter orientation](slug:splitter-orientation)
* [Manage the Splitter state](slug:splitter-state)
* [Handle Splitter events](slug:splitter-events)

## See Also

* [Live Demo: Splitter](https://demos.telerik.com/blazor-ui/splitter/overview)
