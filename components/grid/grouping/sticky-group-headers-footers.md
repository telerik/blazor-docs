---
title: Sticky Group Headers and Footers
page_title: Grid - Sticky Group Headers and Footers
description: How to enable sticky group header and footer rows in the Grid for Blazor so they remain visible while scrolling.
slug: sticky-groups
tags: telerik,blazor,grid,grouping,sticky,headers,footers,pinned
published: True
position: 15
components: ["grid"]
---

# Sticky Group Headers and Footers

The Grid supports sticky (pinned) group headers and footers. When the user scrolls past a group header, the header remains fixed at the top of the Grid scrollable area. Similarly, group footers stay pinned at the bottom of the scrollable area while the group data rows are partially visible.

The sticky group header and footer rows display the same content as the original rows, including group field values, aggregates, and any custom cell content from [templates](slug:grid-templates-group-header).

## Enabling Sticky Group Headers

To pin group headers at the top of the Grid scroll container:

1. Set `Groupable="true"` on the Grid.
1. Set `Height` on the Grid to enable scrolling.
1. Add a `<GridGroupableSettings>` tag inside `<GridSettings>` and set `StickyHeaders="true"`.

When the user scrolls past a group header row, a duplicate of that header renders in a fixed overlay at the top of the Grid. The sticky header hides when the original group header scrolls back into view.

With multiple group levels (for example, Team and then Active Projects), all ancestor group headers that are scrolled out of view stack in the top overlay. The shallowest (outermost) level displays at the top, and the deepest level displays at the bottom. As the scroll position approaches the end of a group, the sticky header for that group is pushed upward, making room for the next group header.

>caption Enable sticky group headers

````RAZOR.skip-repl
<TelerikGrid>
    <GridSettings>
        <GridGroupableSettings StickyHeaders="true" />
    </GridSettings>
</TelerikGrid>
````

## Enabling Sticky Group Footers

To pin group footers at the bottom of the Grid scroll container:

1. Set `Groupable="true"` on the Grid.
1. Set `Height` on the Grid to enable scrolling.
1. Add a `<GridGroupableSettings>` tag inside `<GridSettings>` and set `StickyFooters="true"`.
1. Define [aggregates](slug:grid-aggregates) and use a `GroupFooterTemplate` to render content in the group footer row.

The footer overlay appears at the bottom of the scrollable area while the group data rows are partially visible. It disappears once the last row of the group scrolls out of view.

>caption Enable sticky group footers with aggregates

````RAZOR.skip-repl
<TelerikGrid>
    <GridSettings>
        <GridGroupableSettings StickyFooters="true" />
    </GridSettings>
</TelerikGrid>
````

## Example

The following example enables both sticky group headers and sticky group footers. Scroll the Grid to observe how the group header remains pinned at the top and the group footer remains pinned at the bottom of the scrollable area.

>caption Grid with sticky group headers and footers

<demo metaUrl="client/grid/grouping-sticky/" height="500"></demo>

## Limitations

* The feature is not available when the Grid uses [virtual scrolling]({%slug components/grid/virtual-scrolling%}), because grouping is not supported with virtualization.
* Sticky group headers and footers do not work with [`LoadGroupsOnDemand`](slug:grid-group-lod), because load-on-demand mode does not support [aggregates](slug:grid-aggregates).

## See Also

* [Grid Grouping Overview](slug:components/grid/features/grouping)
* [Grid Group Header Template](slug:grid-templates-group-header)
