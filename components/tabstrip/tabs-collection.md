---
title: Dynamic Tabs
page_title: TabStrip - Dynamic Tabs
description: Learn how to use the ActiveTabId parameter in the Telerik TabStrip for Blazor to manage dynamic tabs.
slug: tabstrip-dynamic-tabs
tags: telerik,blazor,tabstrip,dynamic tabs
published: True
position: 60
components: ["tabstrip"]
previous_url: /components/tabstrip/tabs-configuration
---

# TabStrip Dynamic Tabs

*Dynamic tabs* signify the ability to add and remove tabs at runtime, or change their configuration. The Telerik Blazor TabStrip allows you to define tabs by iterating a collection of objects. This article describes the implementation milestones of such scenarios.

## Hiding and Showing Tabs

The TabStrip tabs can be hidden or shown by setting their `Visible` boolean parameter. Setting `Visible` to `false` hides the tab from the tab list, but keeps it in the tab collection. Changing the tab visibility at runtime preserves the tab order. This is in contrast to adding a new tab at runtime, which adds it at the last position.

The `TabStripTab` component has a `Closeable` parameter with a `false` default value. When `Closeable` is enabled, the tab renders a built-in Close button next to the tab title. Closing a tab sets its `Visible` parameter to `false`. In this case, you must either use the `Visible` parameter with two-way binding (`@bind-Visible="..."`), or handle the [`VisibleChanged` event](slug:tabstrip-events#visiblechanged) that fires when a tab is closed. Either approach ensures that the tab state matches the app state. You can use the `VisibleChanged` event to intercept close actions, for example, show a [confirmation dialog](slug:dialog-predefined).

Showing hidden tabs is possible with custom UI.

>caption Using the tab Closeable and Visible parameters, and the VisibleChanged event

<demo metaUrl="client/tabstrip/tabs-collection/example-2/" height="420"></demo>

Also see the [more comprehensive example](#example) below.

## Adding and Removing Tabs

The TabStrip uses declarative tab definitions and is not a databound component. To change the actual number of tab objects in the component (no matter their visibility), you need to:

* Render the tabs in a loop, based on a collection of objects. Always set a [`@key` attribute](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/element-component-model-relationships) to the `<TabStripTab>` tags.

    <demo metaUrl="client/tabstrip/tabs-collection/example-1/" height="420"></demo>

* Change the number of members in the looped collection through custom UI and application logic. See the [comprehensive example](#example) below.

## Changing Tab Settings

The app can change the `TabStripTab` parameter values at any time.

Some [`TabStripTab` parameters](slug:telerik.blazor.components.tabstriptab) support two-way binding, for example, [`Visible`](#hiding-and-showing-tabs) and [`Pinned`](slug:tabstrip-reordering-pinning). If users can change these tab properties at runtime, you must use two-way parameter binding or the respective [`Changed` event](slug:tabstrip-events). Otherwise the TabStrip state may become invalid and reset unexpectedly when the UI refreshes.

## Example

The following sample shows how to:

* Define the TabStrip tab configuration through a collection of custom descriptors. Some tabs are closed, pinned, disabled or not closable.
* Use a `@key` when rendering Blazor components in a loop, which is a [standard Blazor requirement](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/element-component-model-relationships).
* Synchronize the `Pinned` and `Visible` state of the tabs with the underlying tab descriptor collection.
* [Display scroll buttons automatically](slug:tabstrip-scrolling-overflow) when the tabs no longer fit the available space.
* Use a [`TabStripSuffixTemplate`](slug:tabstrip-templates) to add custom buttons in the tab row.
* Use the [`VisibleChanged` event](slug:tabstrip-events#visiblechanged) to hide closed tabs (default) or completely remove them from the tab collection. Tab removal can also be implemented through the [`OnStateChanged` event](slug:tabstrip-events#onstatechanged).
* Add more tabs at runtime.
* Show closed (hidden) tabs.

<demo metaUrl="client/tabstrip/tabs-collection/example-3/" height="420"></demo>

## Next Steps

* [Manage TabStrip state](slug:tabstrip-state)
* [Handle TabStrip events](slug:tabstrip-events)

## See Also

* [TabStrip Events](slug:tabstrip-events)
