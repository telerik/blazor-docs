---
title: Panes
page_title: Splitter Panes
description: Overview of the Splitter Panes - size, orientation, collapsing, resizing of panes, state and events.
slug: splitter-panes
tags: telerik,blazor,splitter,panes
published: True
position: 3
previous_url: /components/splitter/size
components: ["splitter"]
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

<demo metaUrl="client/splitter/panes/example-2/" height="570"></demo>

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

<demo metaUrl="client/splitter/panes/example-1/" height="550"></demo>

## Next Steps

* [Set the Splitter orientation](slug:splitter-orientation)
* [Manage the Splitter state](slug:splitter-state)
* [Handle Splitter events](slug:splitter-events)

## See Also

* [Live Demo: Splitter](https://demos.telerik.com/blazor-ui/splitter/overview)
