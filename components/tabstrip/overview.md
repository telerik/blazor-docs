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

## See Also

* [Live Demo: TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/overview)
* [TabStrip API Reference](slug:Telerik.Blazor.Components.TelerikTabStrip)
