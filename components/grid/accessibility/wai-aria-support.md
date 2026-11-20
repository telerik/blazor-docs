---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Grid Documentation | Grid Accessibility
description: "Reference the Telerik UI for Blazor Grid selectors, ARIA roles, attributes, and accessibility behavior for keyboard navigation and screen readers."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: grid-wai-aria-support
position: 50
---

# Blazor Grid WAI-ARIA Support

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



By default, the Telerik UI for Blazor Grid provides extensive accessibility support and helps users with disabilities interact with its features.


The Grid meets the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements. It follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for [keyboard navigation](#keyboard-navigation) for its `component` role. It provides options for managing focus and is tested with popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Grid is a composite component that consists of four logically separated structural elements:


- Toolbar (`role=toolbar`).
- Group header (`role=toolbar`).
- Data Grid (`role=grid`).
- Pager (`role=application`).

### Grid Toolbar


The Grid Toolbar follows the accessibility specification of the ToolBar component.

[ToolBar accessibility specification]({{toolbar_a11y_link}})

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-toolbar` | `role=toolbar` | The toolbar is a collection of command buttons and inputs. |
| `.k-grid-toolbar` | `aria-label` | Clarifies the purpose of the toolbar. |
| `.k-grid-toolbar` | `aria-controls=.k-grid-aria-root id` | Points to the ID of the element with `role=grid`. |

### Grid Grouping Header


The Grid Grouping Header follows the accessibility specification of the ToolBar component.

[ToolBar accessibility specification]({{toolbar_a11y_link}})

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grouping-header` | `role=toolbar` | The grouping header is a ToolBar that contains buttons. |
| `.k-grouping-header` | `aria-label` | Clarifies the purpose of the header. |
| `.k-grouping-header` | `aria-controls=.k-grid-aria-root id` | Points to the ID of the element with `role=grid`. |
| `.k-grouping-header .k-chip-list .k-chip` | `role=button` | If the element used is not `<button>`, then the role must be specified. |
| `.k-grouping-header .k-chip-list` | `role=none` | Removes the default ChipList listbox role to preserve the toolbar-to-button role hierarchy. |
| `.k-grouping-header .k-chip-list` | `title` | Present on the element or its child if sorting is enabled for that field. |

### Data Grid (excluding Toolbars and Pager)


The element with `role=grid` must not include the ToolBar and the Pager elements as those do not belong to the `role=grid` element itself.

#### Grid Element Attributes

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid:not(.k-treelist) .k-grid-aria-root` | `role=grid` | The role specifies the element is a Data Grid. |
| `.k-grid-aria-root` | `aria-colcount` | The total number of columns in the Grid. This attribute is needed for virtual or hidden columns when not all columns are rendered in the DOM. If the total number of columns is unknown, set `aria-colcount` to `-1`. |
| `.k-grid-aria-root` | `aria-rowcount` | The total number of rows in the table, including header, master, detail, data, footer, and aggregate rows. This attribute is needed when paging has more than one page, virtual rows are enabled, or master/detail rows are present. If the data is grouped, the correct row count cannot be calculated. In that case, set `aria-rowcount` to `-1`. |


When master and detail rows are present in the Grid, such as in a Hierarchical Grid or Detail Template Grid, calculate `aria-rowcount` as follows: `2 * (total number of items) + header rows + footer rows`. Each item has one master row and one detail row.


If the Grid uses a single table with no separate `<table>` element for its header, do not set `role` attributes on its inner elements (`<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>`). Their native semantic meaning is used instead.

#### Grid Header Attributes

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-header-wrap>table` | `role=presentation/none` | Negates the default semantic role of the `<table>` element. |
| `.k-grid-header-wrap>table>thead` | `role=rowgroup` | Required as the owner `<table>` element has its semantic role removed. |
| `.k-grid-header-wrap>table>thead>tr` | `role=row` | Required because the owner `<table>` element has its semantic role removed. |
| `.k-grid-header-wrap>table>thead>tr` | `aria-rowindex` | The row number, including all header, data, and footer rows, starting from 1. This attribute is needed when paging has more than one page, virtual rows are enabled, or master/detail rows are present. If the data is grouped, the correct index cannot be calculated, so do not set the attribute. |
| `.k-grid-header-wrap>table>thead>tr>th:not(.k-hierarchy-cell):not(.k-group-cell):not(.k-drag-cell)` | `role=columnheader` | Required as the owner `<table>` element has its semantic role removed. |
| `.k-grid-header-wrap>table>thead>tr>th:not(.k-hierarchy-cell):not(.k-group-cell):not(.k-drag-cell)` | `aria-sort=none/ascending/descending` | Present if sorting is enabled for that column. |
| `.k-grid-header-wrap>table>thead>tr>th:not(.k-hierarchy-cell):not(.k-group-cell):not(.k-drag-cell)` | `title` or `aria-label` | Present on the element or its child if sorting is enabled for that field. |
| `.k-grid-header-wrap>table>thead>tr>th:not(.k-hierarchy-cell):not(.k-group-cell):not(.k-drag-cell)` | `aria-colindex` | The column number, based on leaf columns, starting from 1. This attribute is needed for virtual or hidden columns when not all columns are rendered in the DOM. Otherwise, the column number can be inferred from the DOM structure. Calculate it by summing the colspans of previous columns. |
| `.k-grid-header-wrap>table>thead>tr>th:not(.k-hierarchy-cell):not(.k-group-cell):not(.k-drag-cell)` | `aria-haspopup=dialog` | Present if the column has a Column Menu. |
| `.k-grid-header-wrap>table>thead>tr>th:not(.k-hierarchy-cell):not(.k-group-cell):not(.k-drag-cell)` | `aria-haspopup=dialog` | Present if the column has a Filter Menu and no Column Menu. |

#### Grid Filter Row


Even if part of the `<thead>`, the Filter row must be composed of `<td>` elements.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-header-wrap>table>thead>tr.k-filter-row>td` | `role=gridcell` | Required because the owner `<table>` element has its semantic role removed. |
| `.k-grid-header-wrap>table>thead>tr.k-filter-row>td` | `aria-label` | Provides a label indicating that the cell is part of a filter row. |

#### Grid Filter Menu


Implements the FilterMenu specification.

[FilterMenu accessibility specification]({{filtermenu_a11y_link}})

#### Grid Column Menu


Implements the ColumnMenu specification.

[ColumnMenu accessibility specification]({{columnmenu_a11y_link}})

#### Grid Content Attributes

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-content>table` | `role=none/presentation` | Negates the default semantic role of the `<table>` element. |
| `.k-grid-content>table>tbody` | `role=rowgroup` | Required as the owner `<table>` element has its semantic role removed. |
| `.k-grid-content>table>tbody>tr` | `role=row` | Required because the owner `<table>` element has its semantic role removed. |
| `.k-grid-content>table>tbody>tr` | `aria-rowindex` | The row number, including all header, data, and footer rows, starting from 1. This attribute is needed when paging has more than one page, virtual rows are enabled, or master/detail rows are present. If the data is grouped, the correct index cannot be calculated, so do not set the attribute. When master and detail rows are present, index both rows. For example, if the first master row has `aria-rowindex=2` and its detail row is not in the DOM, the next master row must have `aria-rowindex=4`. When rendered, the detail row receives the missing index, `aria-rowindex=3`. |
| `.k-grid-content tr.k-selected` | `aria-selected=true` | Set on the currently selected row or rows. Used only when the selection mode is set to `row`. |
| `.k-grid-content>table>tbody>tr>td` | `role=gridcell` | Required because the owner `<table>` element has its semantic role removed. |
| `.k-grid-content>table>tbody>tr>td` | `aria-colindex` | The column number, based on leaf columns, starting from 1. This attribute is needed for virtual or hidden columns when not all columns are rendered in the DOM. Otherwise, the column number can be inferred from the DOM structure. Calculate it by summing the colspans of previous columns. |
| `td.k-selected` | `aria-selected=true` | Set on the currently selected cell(s). Only used when selection mode is set to cell. |
| `.k-master-row .k-hierarchy-cell,.k-grouping-row>td` | `aria-expanded=true/false` | Optionally for cells holding grouping criteria values and for Master row cells in Detail template scenario. |
| `.k-drag-cell` | `aria-label` | Must be present in a Drag Row scenario on the cell containing the drag handle. |
| `.k-grid-header-locked .k-grid-header-table .k-table-row` | `aria-owns` | When locked columns are present, the rows from the locked header table own the cells from the corresponding non-locked header table rows. The value is a space-separated list of IDs. |
| `.k-grid-content-locked .k-grid-table .k-table-row` | `aria-owns` | When locked columns are present, the rows from the locked content table own the cells from the corresponding non-locked content table rows. The value is a space-separated list of IDs. |
| `.k-grid-header-wrap .k-grid-header-table .k-table-row` | `role=presentation/none` | When locked columns are present, the rows from the non-locked header table have their default semantic role removed because their children are owned by the corresponding row from the locked table. |
| `.k-grid-content .k-grid-table .k-table-row` | `role=presentation/none` | When locked columns are present, the rows from the non-locked content table have their default semantic role removed because their children are owned by the corresponding row from the locked table. |

#### Grid Popup Editor


The popup editor consists of a Window component containing a Form component.

[Window accessibility specification]({{window_a11y_link}})

[Form accessibility specification]({{form_a11y_link}})

#### Grid Footer Attributes


Aggregate totals are placed within a `<tfoot>` element in the content `<table>`.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `tfoot` | `role=rowgroup` | Required as the owner `<table>` element has its semantic role removed. |
| `tfoot>tr` | `role=row` | Required because the owner `<table>` element has its semantic role removed. |
| `tfoot>tr` | `aria-rowindex` | The row number, including all header, data, and footer rows, starting from 1. Footer rows are always the last rows in a Grid. This attribute is needed when paging has more than one page, virtual rows are enabled, or master/detail rows are present. If the data is grouped, the correct index cannot be calculated, so do not set the attribute. |
| `tfoot>tr>td` | `role=gridcell` | Required because the owner `<table>` element has its semantic role removed. |
| `tfoot>tr>td` | `aria-colindex` | The column number, based on leaf columns, starting from 1. This attribute is needed for virtual or hidden columns when not all columns are rendered in the DOM. Otherwise, the column number can be inferred from the DOM structure. Calculate it by summing the colspans of previous columns. |

### Grid Pager Accessibility


For the Grid Pager WAI-ARIA specification, refer to the Pager component.

[Pager accessibility specification]({{pager_a11y_link}})

### Grid Selection Aggregates


The selection aggregates are placed within a `.k-grid-selection-aggregates` element after the Grid `.k-grid-aria-root` element.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-selection-aggregates` | `aria-live=polite` | Ensures that changes in the calculated selection aggregates are announced by assistive technologies. |

### Data Grid Stacked Layout


The element is a regular Grid cell (`td`) that holds stacked layout content representing all available column headers and content for the row. All internal "stacked cell" elements become focusable when focus moves within the cell.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-grid-stack-cell` | `tabindex=0` | "Stacked cell" elements receive `tabindex=0` when focus is within their parent `.k-grid-stack-row` element. This allows users to navigate through the content with Tab. The `tabindex` attribute is removed when focus leaves the `.k-grid-stack-row` element. |

## Grid WAI-ARIA Resources

[WAI-ARIA specification for grid](https://www.w3.org/TR/wai-aria-1.2/#grid)

## Section 508


The Grid is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing Grid Accessibility


The Grid has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

>note To report accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Grid has been tested with the following screen reader and browser combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the Grid keyboard navigation works, refer to the [Blazor Grid Accessibility and Keyboard Navigation Demo](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation).

## See Also

* [Accessibility in Telerik UI for Blazor](slug:accessibility-overview)