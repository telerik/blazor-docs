---
title: Overview
page_title: TabStrip Overview
description: Discover the Blazor TabStrip. Explore the features and examples.
slug: tabstrip-overview
tags: telerik,blazor,tab,strip,tabstrip,overview
published: True
position: 0
components: ["tabstrip"]
previous-url: /components/tabstrip/active-tab-index, /knowledge-base/tabstrip-activate-by-index, /components/tabstrip/sizing
---
# Blazor TabStrip Overview

The <a href = "https://www.telerik.com/blazor-ui/tabstrip" target = "_blank">Blazor TabStrip component</a> displays a collection of tabs, containing associated content, which enable the user to switch between different views inside a single component.

## Comparison with ButtonGroup and SegmentedControl

@[template](/_contentTemplates/segmentedcontrol/notes.md#comparison-with-buttongroup-tabstrip)

## Creating Blazor TabStrip

1. Use the `<TelerikTabStrip>` tag.
1. Add a nested `<TabStripTab>` tag for each tab you want to include in the component.
1. Set tab titles through the `Title` parameter of the `<TabStripTab>` tags.
1. Optionally, configure other tab settings such as `Disabled` - read more in the [Tabs Configuration](slug:tabstrip-tabs-configuration) article.
1. Place the desired content in the tabs - it can be any content, including other components.

>caption TabStrip with specified tab position and a disabled tab

<demo metaUrl="client/tabstrip/overview/" height="420"></demo>

## ActiveTabId Parameter

The `ActiveTabId` parameter allows you to manage the active tab by its ID. It supports two-way binding, allowing seamless updates between the component and the application state.

To deactivate all tabs, set the ActiveTabId parameter to `string.Empty`.

>caption Using the `ActiveTabId` parameter to manage dynamic tabs

````RAZOR
<TelerikTabStrip @bind-ActiveTabId="@ActiveTabId">
    @{
        foreach (var tab in Tabs)
        {
            <TabStripTab @key="@tab.Id" Id="@tab.Id" Title="@tab.Title" Visible="@tab.Visible" Disabled="@tab.Disabled">
                <HeaderTemplate>
                    <span>@tab.Title</span>
                </HeaderTemplate>
                <Content>
                    @if (tab.Id == "home")
                    {
                        <p>Welcome back! Check out the latest updates and news here.</p>
                    }
                    else if (tab.Id == "profile")
                    {
                        <p>Update your personal information and preferences in this section.</p>
                    }
                    else if (tab.Id == "settings")
                    {
                        <p>Customize your experience by adjusting your settings here.</p>
                    }
                </Content>
            </TabStripTab>
        }
    }
</TelerikTabStrip>

@code {
    private string ActiveTabId { get; set; } = string.Empty;

    private List<Tab> Tabs { get; set; } = new List<Tab>
    {
        new Tab { Id = "home", Title = "🏠 Home", Visible = true, Disabled = false },
        new Tab { Id = "profile", Title = "👤 Profile", Visible = true, Disabled = false },
        new Tab { Id = "settings", Title = "⚙️ Settings", Visible = true, Disabled = false }
    };

    public class Tab
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public bool Visible { get; set; }
        public bool Disabled { get; set; }
    }
}
````

## Tabs Configuration

The Tabs are the building blocks of the TabStrip. The component allows individual configuration of the declared `<TabStripTab>` tags - you can set their title and visibility or put them in disabled state. [Read more about the available Tabs configuration options...](slug:tabstrip-tabs-configuration)

## Position of the Tabs

The Blazor TabStrip component allows you to control the position of the tabs. [Read more about the Tabs Position...](slug:tabstrip-position-alignment)

## Alignment of the Tabs

The Blazor TabStrip component allows you to control the alignment of the tabs. [Read more about the Tabs Alignment...](slug:tabstrip-tabs-alignment)

## Tab Size

The Blazor TabStrip component allow you to set different size of the tabs and scroll buttons. [Read more about the TabStrip Sizing...](slug:tabstrip-tabs-size)

## Persist Content

The Blazor TabStrip component can persist the content of the tabs. When the user navigates between the tabs, their content will be hidden with CSS only to avoid re-initialization. [Read more about the Persist Content...](slug:tabstrip-persist-content)

## Tab Overflow

When you define more tabs than the available space allows, the Blazor TabStrip can handle the overflow with scroll buttons or a dropdown menu. [Read more about the Tab Overflow...](slug:tabstrip-scrolling-overflow)

## Closeable Tabs

The Blazor TabStrip allows tabs to render a close button so users can hide individual tabs. [Read more about the Tabs Configuration...](slug:tabstrip-tabs-configuration#closeable)

## Pinnable Tabs

The Blazor TabStrip supports pinning tabs to the start of the tab list. Pinned tabs stay fixed and cannot be mixed with unpinned tabs during reordering. [Read more about Pinnable and Pinned tabs...](slug:tabstrip-tabs-configuration#pinnable-and-pinned)

## Tab Reorder

The Blazor TabStrip allows users to reorder tabs by dragging and dropping them to new positions. [Read more about Tab Reordering...](slug:tabstrip-reordering-pinning)

## State Management

The Blazor TabStrip exposes state management capabilities through events and methods. You can save, restore, and programmatically manipulate the component state. [Read more about State Management...](slug:tabstrip-state)

## Dynamic Tabs

The Blazor TabStrip component allows you to create TabStrip tabs dynamically. [Read more about the Dynamic Tabs...](slug:tabstrip-dynamic-tabs)

## Events

The TabStrip fires an event when the user changes the active tab (`ActiveTabIdChanged`), reorders tabs (`OnTabReorder`), or when its state changes (`OnStateInit`, `OnStateChanged`). [Read more about the TabStrip events...](slug:tabstrip-events)

## TabStrip Parameters

The TabStrip provides the following features to allow further customization of its behavior:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `ActiveTabId` | `string` | The ID of the currently active tab. If not set, the first tab is active. Supports two-way binding. |
| `EnableTabReorder` | `bool` | Whether users can reorder tabs via drag-and-drop. See [Tab Reordering](slug:tabstrip-reordering-pinning). |
| `OnStateInit` | `EventCallback<TabStripStateEventArgs>` | Fires when the TabStrip initializes its state. Use this to inspect or restore the initial state. See [State Management](slug:tabstrip-state). |
| `OnStateChanged` | `EventCallback<TabStripStateEventArgs>` | Fires whenever the TabStrip state changes. See [State Management](slug:tabstrip-state). |
| `OnTabReorder` | `EventCallback<TabStripTabReorderEventArgs>` | Fires when a tab is reordered via drag-and-drop. See [Tab Reordering](slug:tabstrip-reordering-pinning). |
| `OverflowMode` | `TabStripOverflowMode` enum <br/> (`TabStripOverflowMode.None`) | Controls the behavior of tabs when they exceed the available space. The available options are `None`, `Scroll`, and `Menu`. See [Tab Overflow](slug:tabstrip-scrolling-overflow). |
| `PersistTabContent` | `bool` | Whether to remove the content of inactive tabs from the DOM (if `false`), or just hide it with CSS (if `true`). See [Persist Content](slug:tabstrip-persist-content). |
| `Scrollable` | `bool` | **Obsolete.** Use `OverflowMode="@TabStripOverflowMode.Scroll"` instead. |
| `ScrollButtonsPosition` | `TabStripScrollButtonsPosition` enum <br/> (`TabStripScrollButtonsPosition.Split`) | Specifies the position of the scroll buttons when `OverflowMode` is `Scroll`. |
| `ScrollButtonsVisibility` | `TabStripScrollButtonsVisibility` enum <br/> (`TabStripScrollButtonsVisibility.Visible`) | Specifies the visibility of the scroll buttons when `OverflowMode` is `Scroll`. |
| `Size` | `string` <br/> (`ThemeConstants.TabStrip.Size.Medium`) | Controls the size of the tabs. |
| `TabAlignment` | `TabStripTabAlignment` enum <br/> (`TabStripTabAlignment.Start`) | Controls the alignment of the tabs. |
| `TabPosition` | `TabPosition` enum <br/> (`TabPosition.Top`) | Controls the position of the tabs. |


### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor TabStrip:.

| Parameter | Type     | Description                              |
|-----------|----------|------------------------------------------|
| `Class`   | `string` | The CSS class that will be rendered on the main wrapping element of the component. |
| `Width`   | `string` | The width of the component. You can set the Width parameter to any of the [supported units](slug:common-features/dimensions). |
| `Height`  | `string` | The height of the Component. You can set the `Height` parameter to any of the [supported units](slug:common-features/dimensions). |

### Templates

| Template | Description |
| --- | --- |
| `TabStripSuffixTemplate` | A `RenderFragment` rendered after the tab list, inside the TabStrip container. Use this to add custom content such as action buttons or navigation elements. When you use `OverflowMode.Menu`, include the `TabStripOverflowMenu` component inside this template to preserve overflow menu functionality. |

## TabStrip Reference and Methods

The `TabStrip` methods are accessible through its reference.

| Method | Return Type | Description |
| --- | --- | --- |
| `GetState` | `TabStripState` | Returns the current state of the TabStrip. See [State Management](slug:tabstrip-state). |
| `Refresh` | `void` | Redraws the component. |
| `SetState` | `void` | Accepts a `TabStripState` object and applies it to the TabStrip. See [State Management](slug:tabstrip-state). |

>caption Get a reference to the TabStrip and use its methods.

````RAZOR Index.razor
@* This code snippet demonstrates usage of the TabStrip Refresh() method. *@

<TelerikTabStrip @ref="@TabRef">
    <CityPopulation TabRef="TabRef" />
</TelerikTabStrip>

@code {
    public TelerikTabStrip TabRef { get; set; }
}
````
````RAZOR CityPopulation.razor
@* This code snippet demonstrates usage of the TabStrip Refresh() method. *@

<TabStripTab Title="Sofia">
    <Content>
        <div>
            <h2>City Population: @Count</h2>
        </div>
        <TelerikButton OnClick="IncreaseCount">Increase Count!</TelerikButton>
    </Content>
</TabStripTab>

@code {
    public int Count { get; set; } = 30;
    [Parameter] public TelerikTabStrip TabRef { get; set; }

    void IncreaseCount()
    {
        Count += 1;
        TabRef.Refresh();
    }
}
````

## Next Steps

* [Configure the Tabs](slug:tabstrip-tabs-configuration)
* Explore the supported Tab [positions](slug:tabstrip-position-alignment) and [alignments](slug:tabstrip-tabs-alignment)
* [Manage the TabStrip state](slug:tabstrip-state)
* [Handle the TabStrip events](slug:tabstrip-events)

## See Also

* [Live Demo: TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/overview)
* [Live Demo: Tabs Position and Alignment](https://demos.telerik.com/blazor-ui/tabstrip/tab-positions)
* [Events](slug:tabstrip-events)
* [State Management](slug:tabstrip-state)
* [Tab Reordering](slug:tabstrip-reordering-pinning)
* [TabStrip API Reference](slug:Telerik.Blazor.Components.TelerikTabStrip)
