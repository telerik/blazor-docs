---
title: Overview
page_title: TreeList - Filtering Overview
description: Enable and configure filtering in TreeList for Blazor.
slug: treelist-filtering
tags: telerik,blazor,TreeList,filtering,filter
published: True
previous_url: /components/treelist/filtering
position: 0
components: ["treelist"]
---

# TreeList Filtering Overview

This article describes the basics of the filtering functionality of the Telerik TreeList for Blazor.

The TreeList provides two alternative user interfaces for filtering:

* [Filter Row](#filterrow)
* [Filter Menu](#filtermenu)

Filtering keeps an item's parent(s) in the list, so you may see item that do not match the criteria. This is required so you can actually navigate to and see the items that match.

Filtering keeps the expanded/collapsed state of items. For example, if filtering leaves a child whose parent is collapsed, you will only see the collapsed parent.

## FilterRow

The `FilterRow` filtering mode renders a row below the column headers, providing a UI where you can fill in the filter criteria. Read more about enabling and fine-tuning the filtering row in the [TreeList Filter Row](slug:treelist-filter-row) article.

## FilterMenu

The `FilterMenu` filter mode renders a button in the column header. Clicking the button opens a popup with filtering options, allowing you to apply two filter criteria, choose a filter operator, and use buttons to apply or clear the filter. Read more about enabling and fine-tuning the filtering menu in the [TreeList Filter Menu](slug:treelist-filter-menu) article.

## More Filtering Options

In addition to the two main filtering modes, the treelist offers two more features that can enhance the user experience when looking for data:

* A [searchbox in the toolbar](slug:treelist-searchbox) can amend the filters and let the user look up many fields at once

* The filter menu can show a [list of checkboxes](slug:treelist-checklist-filter) with the distinct values from the data to make filtering resemble Excel.

* You can customize the appearance and behavior of the filters through the [filter templates](slug:treelist-templates-filter).

## Filter Descriptors

You can get the applied filtering criteria for each filtered field. Use the [TreeList state](slug:treelist-state) to obtain the user input, the filter operator and other filtering properties. Find out how in the [Data Operation Descriptors article](slug:common-features-descriptors#filtering).

## Next Steps

* [Use TreeList Filter Row](slug:treelist-filter-row)
* [Use TreeList Filter Menu](slug:treelist-filter-menu)
* [Use TreeList Checkbox List Filtering](slug:treelist-checklist-filter)

## See Also

* [Live Demo: TreeList Filter Row](https://demos.telerik.com/blazor-ui/treelist/filter-row)
* [Live Demo: TreeList Filter Menu](https://demos.telerik.com/blazor-ui/treelist/filter-menu)
