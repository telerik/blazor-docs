---
title: Scrolling and Overflow
page_title: TabStrip Tab Scrolling and Overflow
description: Learn how to configure overflow behavior for tabs in the Blazor TabStrip component.
slug: tabstrip-scrolling-overflow
tags: telerik,blazor,tab,strip,tabstrip,scroll,overflow,tabs
published: True
position: 20
tag: updated
components: ["tabstrip"]
---

# TabStrip Scrollable Tabs and Overflow Menu

The Telerik TabStrip for Blazor provides three built-in mechanisms to handle scenarios in which the tabs do not fit in the available space. This article describes how to set up tab scrolling and how to use a dropdown menu to display the overflowing tabs.

## Basics

The TabStrip provides an `OverflowMode` parameter, which controls how the component handles scenarios with too many tabs that don't fit in a single row in the available space. The parameter expects a [`TabStripOverflowMode` enum](slug:telerik.blazor.components.tabstripoverflowmode) value:

* `None` (default)&mdash;Tabs wrap to multiple rows.
* `Scroll`&mdash;All tabs remain on a single row or column, and scroll buttons appear.
* `Menu`&mdash;The TabStrip displays a dropdown menu after the last tab that fits in the available space. The dropdown lists all the other [visible tabs](slug:dynamic-tabs#hiding-and-showing-tabs).

> The TabStrip `Scrollable` parameter is deprecated and must be replaced by `OverflowMode` in Telerik UI for Blazor 13.1.0 and later versions.

## Tab Scrolling

The built-in tab scrolling is enabled when the TabStrip `OverflowMode` parameter is set to `Scroll`. The tab scrolling UX depends on two additional TabStrip parameters:

* [`ScrollButtonsVisibility`](slug:telerik.blazor.tabstripscrollbuttonvisibility)&mdash;Sets whether the scroll buttons display always, never or only when necessary (default).
* [`ScrollButtonsPosition`](slug:telerik.blazor.tabstripscrollbuttonsposition)&mdash;Sets whether the scroll buttons display before the tabs, after the tabs, or one on each side (default).

The `Start` and `End`  values of `ScrollButtonsPosition` take into account if [right-to-left mode](slug:rtl-support) is being used.

>caption Using scrollable TabStrip tabs

````RAZOR
<div style="display: flex; gap: 2em; flex-wrap: wrap; margin: 0 0 2em;">
    <label>
        <strong>TabStrip Width:</strong>
        <TelerikNumericTextBox @bind-Value="@TabStripWidth" Format="# '%'" Min="10" Max="100" Step="10" Width="120px" />
    </label>
    <div>
        <strong>Button Position:</strong>
        <TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
            @foreach (TabStripScrollButtonsPosition position in TabStripScrollButtonsPositions)
            {
                <ButtonGroupToggleButton Selected="@(TabStripScrollButtonsPosition == position)"
                                         SelectedChanged="@((bool selected) => { if (selected) TabStripScrollButtonsPosition = position; })">
                    @position
                </ButtonGroupToggleButton>
            }
        </TelerikButtonGroup>
    </div>
    <div>
        <strong>Button Visibility:</strong>
        <TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
            @foreach (TabStripScrollButtonsVisibility visibility in TabStripScrollButtonsVisibilities)
            {
                <ButtonGroupToggleButton Selected="@(TabStripScrollButtonsVisibility == visibility)"
                                         SelectedChanged="@((bool selected) => { if (selected) TabStripScrollButtonsVisibility = visibility; })">
                    @visibility
                </ButtonGroupToggleButton>
            }
        </TelerikButtonGroup>
    </div>
</div>

<TelerikTabStrip @bind-ActiveTabId="@TabStripActiveTabId"
                 OverflowMode="@TabStripOverflowMode.Scroll"
                 ScrollButtonsPosition="@TabStripScrollButtonsPosition"
                 ScrollButtonsVisibility="@TabStripScrollButtonsVisibility"
                 Width="@($"{TabStripWidth}%")">
    @for (int i = 1; i <= TabStripTabs; i++)
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

    private int TabStripWidth { get; set; } = 100;
    private int TabStripTabs { get; set; } = 9;

    private TabStripScrollButtonsPosition TabStripScrollButtonsPosition { get; set; } = TabStripScrollButtonsPosition.Split;
    private TabStripScrollButtonsVisibility TabStripScrollButtonsVisibility { get; set; } = TabStripScrollButtonsVisibility.Auto;

    private readonly TabStripScrollButtonsPosition[] TabStripScrollButtonsPositions = new[]
    {
        TabStripScrollButtonsPosition.End,
        TabStripScrollButtonsPosition.Split,
        TabStripScrollButtonsPosition.Start
    };

    private readonly TabStripScrollButtonsVisibility[] TabStripScrollButtonsVisibilities = new[]
    {
        TabStripScrollButtonsVisibility.Auto,
        TabStripScrollButtonsVisibility.Hidden,
        TabStripScrollButtonsVisibility.Visible
    };
}
````

## Overflow Menu

The TabStrip tab overflow menu is a [DropDownButton](slug:dropdownbutton-overview) that renders when the TabStrip `OverflowMode` parameter is set to `Menu`. The menu collects tabs that do not fit and lets users activate them from the dropdown. If there are no overflowing tabs, the DropDownButton is disabled.

If the user activates a tab from the overflow menu, it moves to the list of visible tabs, and one tab from the visible list moves to the overflow menu.

The TabStrip exposes the built-in overflow menu as a separate [`TabStripOverflowMenu` component](#tabstripoverflowmenu-component) that you can use inside the [`TabStripSuffixTemplate`](slug:tabstrip-templates#suffix-template).

>caption Using the TabStrip overflow menu

````RAZOR
<div style="margin: 0 0 2em;">
    <label>
        <strong>TabStrip Width:</strong>
        <TelerikNumericTextBox @bind-Value="@TabStripWidth" Format="# '%'" Min="10" Max="100" Step="10" Width="120px" />
    </label>
</div>

<TelerikTabStrip @bind-ActiveTabId="@TabStripActiveTabId"
                 OverflowMode="@TabStripOverflowMode.Menu"
                 Width="@($"{TabStripWidth}%")">
    @for (int i = 1; i <= TabStripTabs; i++)
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

    private int TabStripWidth { get; set; } = 100;
    private int TabStripTabs { get; set; } = 9;
}
````

## TabStripOverflowMenu Component

The [TabStrip Overflow Menu](#overflow-menu) renders in the default [`TabStripSuffixTemplate`](slug:tabstrip-templates#suffix-template). To use a custom Suffix Template together with `Menu` `OverflowMode`, you must:

1. Define a `TabStripOverflowMenu` component in the `<TabStripSuffixTemplate>` child content.
1. Obtain the reference to the `TabStripOverflowMenu` component instance with a `@ref` atttribute.
1. Call the `Refresh()` method of the Overflow Menu instance whenever the [visible tabs or tab count change](slug:tabstrip-dynamic-tabs).

See the [TabStriptOverflowMenu component API reference](slug:telerik.blazor.components.tabstripoverflowmenu) for all available parameters and methods.

>caption Using TabStripOverflowMenu component in TabStripSuffixTemplate

````RAZOR
<TelerikTabStrip @bind-ActiveTabId="@TabStripActiveTabId"
                 OverflowMode="@TabStripOverflowMode.Menu">
    <TabStripSuffixTemplate>
        <TelerikButton Icon="@SvgIcon.Plus"
                       OnClick="@OnAddTabButtonClick"
                       Title="Add New Tab" />
        <TabStripOverflowMenu @ref="@TabStripOverflowMenuRef" />
    </TabStripSuffixTemplate>
    <ChildContent>
        @foreach (TabDescriptor tab in TabDescriptors)
        {
            <TabStripTab @key="@tab"
                         Closeable="@tab.Closeable"
                         Id="@tab.Id"
                         Pinnable="@tab.Pinnable"
                         @bind-Pinned="@tab.Pinned"
                         Title="@tab.Title"
                         Visible="@tab.Visible"
                         VisibleChanged="@((bool newVisible) => TabStripTabVisibleChanged(tab, newVisible))">
                <p>Content of tab <strong>@tab.Title</strong></p>
            </TabStripTab>
        }
    </ChildContent>
</TelerikTabStrip>

@code {
    private string TabStripActiveTabId { get; set; } = string.Empty;
    private int LastId { get; set; }

    private List<TabDescriptor> TabDescriptors { get; set; } = new();

    private TabStripOverflowMenu? TabStripOverflowMenuRef { get; set; }

    private void OnAddTabButtonClick()
    {
        TabDescriptors.Add(new TabDescriptor
        {
            Id = $"tab{++LastId}",
            Title = $"Tab {LastId}",
            Closeable = true,
            Pinnable = true,
        });

        TabStripOverflowMenuRef?.Refresh();
    }

    private void TabStripTabVisibleChanged(TabDescriptor tabDescriptor, bool newVisible)
    {
        tabDescriptor.Visible = newVisible;

        TabStripOverflowMenuRef?.Refresh();
    }

    protected override void OnInitialized()
    {
        TabDescriptors = Enumerable.Range(1, 7).Select(x => new TabDescriptor
        {
            Id = $"tab{++LastId}",
            Title = $"Tab {LastId}",
            Closeable = true,
            Pinnable = true,
            Pinned = LastId == 5
        }).ToList();

        TabStripActiveTabId = TabDescriptors.First().Id;
    }

    public class TabDescriptor
    {
        public bool Closeable { get; set; }
        public bool Disabled { get; set; }
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public bool Pinnable { get; set; }
        public bool Pinned { get; set; }
        public string Title { get; set; } = "Tab Title";
        public bool Visible { get; set; } = true;
    }
}
````

## Next Steps

* [Persist tab content on active tab change](slug:tabstrip-persist-content)
* [Reorder and pin tabs](slug:tabstrip-reordering-pinning)
* [Customize TabStrip UI with templates](slug:tabstrip-templates)
* [Change the number of tabs at runtime](slug:tabstrip-dynamic-tabs)
* [Manage TabStrip state](slug:tabstrip-state)
* [Handle TabStrip events](slug:tabstrip-events)

## See Also

* [Live Demo: TabStrip Scrollable Tabs](https://demos.telerik.com/blazor-ui/tabstrip/scrollable-tabs)
* [Live Demo: TabStrip Overflow Menu](https://demos.telerik.com/blazor-ui/tabstrip/tab-overflow)

