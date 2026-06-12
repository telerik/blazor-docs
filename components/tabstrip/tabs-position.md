---
title: Position and Alignment
page_title: TabStrip Tab Position and Alignment
description: The TabPosition parameter in the TabStrip component allows you to control the positioning of the tabs. By default, tabs are positioned at the top of the TabStrip.
slug: tabstrip-position-alignment
tags: telerik,blazor,tab,strip,tabstrip,position
published: True
position: 10
components: ["tabstrip"]
previous_url: /components/tabstrip/tabs-alignment
---
# TabStrip Tab Position and Alignment

The TabStrip allows you to customize the placement and layout of the tabs.

## Tab Position

The clickable TabStrip tabs can appear on any side of the component. By default, the tabs display at the top.

To set a custom tab position, use the TabStrip `TabPosition` parameter and use a [`TabPosition` enum](slug:telerik.blazor.tabposition) value.

>caption Setting TabStrip TabPosition

````RAZOR.skip-repl
<TelerikTabStrip TabPosition="@TabPosition.Bottom" />
````

When using the TabStrip `Height` parameter together with `Left` or `Right` tab position, make sure the component is high enough to fit the tabs. Otherwise, enable [tab scrolling or overflow](slug:tabstrip-scrolling-overflow).

When using [right-to-left mode](slug:rtl-support), the `Left` and `Right` tab positions result in the same UI as in left-to-right layouts.

## Tab Alignment

The TabStrip tab alignment determines the tab size and layout in the context of a given [tab position](#tab-position).

To customize the alignment, set the TabStrip `TabAlignment` parameter to a [`TabStripTabAlignment` enum](slug:telerik.blazor.tabstriptabalignment). The default value is `Start`, which means that the tabs render:

* On the left side of the component header when using a horizontal tab layout with [`Top` or `Bottom` tab position].
* At the top side of the component header when using a vertical tab layout with `Left` or `Right` tab position.

The `Start` and `End` alignment values take into account the [right-to-left mode](slug:rtl-support), if the latter is being used.

>caption Setting TabStrip TabAlignment

````RAZOR.skip-repl
<TelerikTabStrip TabAlignment="@TabStripTabAlignment.Center" />
````

## Example

>caption Using TabStrip Alignment and Position

````RAZOR
<div style="display: flex; gap: 2em; flex-wrap: wrap; margin: 0 0 2em;">
    <div>
        <strong>Tab Alignment:</strong>
        <TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
            @foreach (TabStripTabAlignment alignment in TabStripTabAlignments)
            {
                <ButtonGroupToggleButton Selected="@(TabStripTabAlignment == alignment)"
                                         SelectedChanged="@((bool selected) => { if (selected) TabStripTabAlignment = alignment; })">
                    @alignment
                </ButtonGroupToggleButton>
            }
        </TelerikButtonGroup>
    </div>
    <div>
        <strong>Tab Position:</strong>
        <TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
            @foreach (TabPosition position in TabPositions)
            {
                <ButtonGroupToggleButton Selected="@(TabStripTabPosition == position)"
                                         SelectedChanged="@((bool selected) => { if (selected) TabStripTabPosition = position; })">
                    @position
                </ButtonGroupToggleButton>
            }
        </TelerikButtonGroup>
    </div>
</div>

<TelerikTabStrip @bind-ActiveTabId="@TabStripActiveTabId"
                 TabAlignment="@TabStripTabAlignment"
                 TabPosition="@TabStripTabPosition"
                 Height="300px">
    @for (int i = 1; i <= 5; i++)
    {
        string tabId = $"tab{i}";
        string tabTitle = $"Tab {i}";
        <TabStripTab @key="@tabId"
                     Id="@tabId"
                     Title="@tabTitle">
            <p>Content of @tabTitle</p>
        </TabStripTab>
    }
</TelerikTabStrip>

@code {
    private string TabStripActiveTabId { get; set; } = "tab1";

    private TabStripTabAlignment TabStripTabAlignment { get; set; } = TabStripTabAlignment.Start;
    private TabPosition TabStripTabPosition { get; set; } = TabPosition.Top;

    private readonly TabStripTabAlignment[] TabStripTabAlignments = new[]
    {
        TabStripTabAlignment.Center,
        TabStripTabAlignment.End,
        TabStripTabAlignment.Justify,
        TabStripTabAlignment.Start,
        TabStripTabAlignment.Stretched
    };

    private readonly TabPosition[] TabPositions = new[]
    {
        TabPosition.Bottom,
        TabPosition.Left,
        TabPosition.Right,
        TabPosition.Top
    };
}
````

## Next Steps

* [Enable tab scrolling or overflow](slug:tabstrip-scrolling-overflow)

## See Also

* [Live Demo: TabStrip - Tabs Position and Alignment](https://demos.telerik.com/blazor-ui/tabstrip/tab-positions)