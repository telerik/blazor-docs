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
1. Place the desired content in each tab, including HTML markup and Razor components.

>caption Basic Blazor TabStrip

<demo metaUrl="client/tabstrip/overview/" height="420"></demo>

## ActiveTabId Parameter

The TabStrip `ActiveTabId` parameter allows you to manage the active tab by its `string` ID. The parameter supports two-way binding through an [`ActiveTabIdChanged` `EventCallback`](slug:tabstrip-events#activetabidchanged), allowing seamless updates between the component and the application state.

To deactivate all tabs, set the ActiveTabId parameter to `string.Empty`.

>caption Using the TabStrip `ActiveTabId` parameter

````RAZOR
<TelerikButton OnClick="@(() => TabStripActiveTabId = string.Empty)">Deactivate Tab</TelerikButton>

<TelerikTabStrip @bind-ActiveTabId="@TabStripActiveTabId">
    <TabStripTab Id="tab1"
                 Title="Tab 1">
        First tab content.
    </TabStripTab>
    <TabStripTab Id="tab2"
                 Title="Tab 2">
        Second tab content.
    </TabStripTab>
    <TabStripTab Id="tab3"
                 Title="Tab 3">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>

@code {
    private string TabStripActiveTabId { get; set; } = "tab1";
}
````

## Tab Position and Alignment

The TabStrip can position tabs on any side of the component. Tab alignment controls how tabs are distributed in the selected position.

For more details, see the [TabStrip Position and Alignment](slug:tabstrip-position-alignment) article.

## Tab Overflow and Scrolling

When tabs do not fit in the available space, the TabStrip provides three built-in behaviors: wrapping to multiple rows (default), scrolling, or collapsing overflowing tabs into a dropdown menu.

For more details, see the [TabStrip Scrollable Tabs and Overflow Menu](slug:tabstrip-scrolling-overflow) article.

## Persist Content

By default, the TabStrip destroys the content of inactive tabs when the user switches tabs and re-initializes it when the tab becomes active again. To keep all tab content in the DOM and hide inactive tabs with CSS only, see the [TabStrip Persist Content](slug:tabstrip-persist-content) article.

## Tab Reordering and Pinning

The TabStrip lets users reorder tabs by drag-and-drop and pin important tabs to a fixed position. See [Tab Reordering and Pinning] for details.

## Templates

The TabStrip allows you to replace the plain text in the tab headers with custom HTML markup or components. You can also add custom content next to the tabs, for example, and **Add** button. For more details, see the [TabStrip Templates](slug:tabstrip-templates) article.

## Dynamic Tabs

The TabStrip supports dynamic tab management, allowing you to add, remove, show, or hide tabs at runtime by iterating a collection of objects. For more details, see the [TabStrip Dynamic Tabs](slug:tabstrip-dynamic-tabs) article.

## More TabStrip Features

* [State Management](slug:tabstrip-state)&mdash;Save, restore, and programmatically control the TabStrip state to persist it across page visits.
* [Events](slug:tabstrip-events)&mdash;Handle events such as `ActiveTabIdChanged`, `OnTabReorder`, `PinnedChanged`, and `VisibleChanged` to respond to user interactions.

## TabStrip API

Get familiar with all TabStrip parameters, methods, and events in the [TabStrip API Reference](slug:Telerik.Blazor.Components.TelerikTabStrip) and the [`TabStripTab` API Reference](slug:Telerik.Blazor.Components.TabStripTab).

## TabStrip Reference and Methods

The Blazor TabStrip component exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute.

>caption Get a reference to the TabStrip instance and use its methods

````RAZOR.skip-repl
<TelerikTabStrip @ref="@TabStripRef" />

@code {
    private TelerikTabStrip? TabStripRef { get; set; }
}
````

## Next Steps

* [Set the TabStrip tab position and alignment](slug:tabstrip-position-alignment)
* [Enable tab scrolling or overflow](slug:tabstrip-scrolling-overflow)
* [Persist tab content on active tab change](slug:tabstrip-persist-content)
* [Reorder and pin tabs](slug:tabstrip-reordering-pinning)
* [Customize TabStrip UI with templates](slug:tabstrip-templates)
* [Change the number of tabs at runtime](slug:tabstrip-dynamic-tabs)
* [Manage TabStrip state](slug:tabstrip-state)
* [Handle TabStrip events](slug:tabstrip-events)


## See Also

* [Live Demo: TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/overview)
* [TabStrip API Reference](slug:Telerik.Blazor.Components.TelerikTabStrip)
* [TabStripTab API Reference](slug:Telerik.Blazor.Components.TabStripTab)
