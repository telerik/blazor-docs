---
title: Wai-Aria Support
page_title: Telerik UI for Blazor PivotGrid Documentation | PivotGrid Accessibility
description: "Get started with the Telerik UI for Blazor PivotGrid and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: pivotgrid-wai-aria-support 
position: 50 
---

# Blazor PivotGrid Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor PivotGrid provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The PivotGrid is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The PivotGrid is a composite component that consists of two logically separated structural elements:


 - Data Grid (`role="grid"`);
 - Configurator (`role="dialog"`);

### Data Grid


The element with `role="grid"` - includes the row headers, column headers, and data tables.

#### Grid element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-pivotgrid` | `role=grid` | The role specifies the element is a Data Grid. |

#### Column Headers

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-pivotgrid-column-headers>.k-pivotgrid-table` | `role=presentation/none` | Negates the default semantic role of the `<table>` element. |
| `.k-pivotgrid-empty-cell` | `role=columnheader` | Announces the empty cell role as a part of the programmatically constructed a11y tree. |
|  | `aria-colspan` | Sets the correct aria-colspan corresponding to the number of columns in the row headers table. |
|  | `aria-rowspan` | Sets the correct aria-rowspan corresponding to the number of rows in the column headers table. |
|  | `id` | Sets an unique identifier for the cell to be referenced from the first row in the column header table `aria-owns` attribute. |
| `.k-pivotgrid-empty-cell>.k-sr-only` | `undefined` | The empty cell should have a nested span.k-sr-only element containing the localizable text message that will be announced by screen readers when the empty cell is focused. |
| `.k-pivotgrid-column-headers>.k-pivotgrid-table>tbody` | `role=rowgroup` | Required as the owner `<table>` element has its semantic role removed. |
| `.k-pivotgrid-column-headers>.k-pivotgrid-table>tbody>.k-pivotgrid-row` | `role=row` | Required as the owner `<table>` element has its semantic role removed. |
| `.k-pivotgrid-column-headers>.k-pivotgrid-table>tbody>.k-pivotgrid-row:first-child` | `aria-owns` | Lists the IDs of the `.k-pivotgrid-empty-cell` element AND all TD elements, children of the first column headers row (in the correct order - `EmptyID td1ID td2ID ...`), to construct the a11y tree. |
| `.k-pivotgrid-column-headers>.k-pivotgrid-table>tbody>.k-pivotgrid-row>th` | `role=columnheader` | Required as the owner `<table>` element has its semantic role removed. |
|  | `aria-expanded=true/false` | Indicates the current expanded state of the header. |
|  | `id` | Unique and deterministic identifier, used to associate the header cell with respective data cells. |
| `.k-i-arrow-chevron-up,.k-svg-i-arrow-chevron-up` | `aria-hidden=true` | Excludes the collapse icon from the screen reader output. |
| `.k-i-arrow-chevron-down,.k-svg-i-arrow-chevron-down` | `aria-hidden=true` | Excludes the expand icon from the screen reader output. |

#### Row Headers

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-pivotgrid-row-headers>.k-pivotgrid-table` | `role=none/presentation` | Negates the default semantic role of the `<table>` element. |
| `.k-pivotgrid-row-headers>.k-pivotgrid-table>tbody` | `role=rowgroup` | Required as the owner `<table>` element has its semantic role removed. |
| `.k-pivotgrid-row-headers>.k-pivotgrid-table>tbody>.k-pivotgrid-row` | `role=row` | Required as the owner `<table>` element has its semantic role removed. |
|  | `aria-owns=[IDs of corresponding data cells]` | Used to associate row header cells with the corresponding data cells. |
| `.k-pivotgrid-row-headers>.k-pivotgrid-table>tbody>.k-pivotgrid-row>th` | `role=rowheader` | Required as the owner `<table>` element has its semantic role removed. |
|  | `aria-expanded=true/false` | Indicates the current expanded state of the header. |
| `.k-i-arrow-chevron-up,.k-svg-i-arrow-chevron-up` | `aria-hidden=true` | Excludes the collapse icon from the screen reader output. |
| `.k-i-arrow-chevron-down,.k-svg-i-arrow-chevron-down` | `aria-hidden=true` | Excludes the expand icon from the screen reader output. |

#### Grid Data Table

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-pivotgrid-values>.k-pivotgrid-table` | `role=none/presentation` | Negates the default semantic role of the `<table>` element. |
| `.k-pivotgrid-values>.k-pivotgrid-table>tbody` | `role=none/presentation` | The contained rows are associated with their headers through alternative mechanics. |
| `.k-pivotgrid-values>.k-pivotgrid-table>tbody>.k-pivotgrid-row` | `role=none/presentation` | The rows are associated with their headers through alternative mechanics. |
| `.k-pivotgrid-values>.k-pivotgrid-table>tbody>.k-pivotgrid-row>td` | `role=gridcell` | Required as the owner `<table>` element has its semantic role removed. |
|  | `id` | Unique and deterministic identifier, used to associate the data cell with respective row header cells. |
|  | `aria-describedby=[IDs of corresponding column header cells]` | Used to associate the data cells with the respective column header cells. |

### Configurator


The element with `role="dialog"` - includes the configurator header, content (fields, columns, rows, and values sub-sections), and actions (cancel and apply buttons) sections.

#### Configurator Button Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-pivotgrid-configurator-button` | `aria-hidden=true` | Hide the element from the assistive technologies, as it is not focusable, and there are designated shortcuts for opening and closing the configurator. |

#### Configurator Wrapping Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-pivotgrid-configurator` | `role=dialog` | The role specifies the element is a dialog. |
|  | `aria-hidden=true/false` | Specifies whether the configurator is visible if it is still in the DOM when closed. |
|  | `aria-labelledby=.k-pivotgrid-configurator-header-text id` | Associates the configurator wrapper with its internal header element. |

#### Configurator Internal Elements

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-pivotgrid-configurator-header-text` | `id` | Unique and deterministic identifier, used to associate the header text with elements that need to use it as a label. |
| `.k-pivotgrid-configurator-content .k-label` | `id` | Unique and deterministic identifier, used to associate the label text with elements that need to use it as a label. |
| `.k-pivotgrid-configurator-actions .k-button` | `aria-disabled=true/false` | Announces the disabled state of the configurator Cancel and Apply buttons. |
| `.k-fields-list-wrapper .k-treeview` | `aria-labelledby` | Associates the fields chooser TreeView with the Fields section and Configurator header texts by setting the aria-labelledby attribute to the id of the .k-pivotgrid-configurator-header-text element, followed by a space and the id of the Fields label element |
| `.k-pivotgrid-configurator-content .k-chip-list` | `aria-labelledby` | Associates the rows, columns and measures Chiplists with their respective section label and Configurator header texts by setting the aria-labelledby attribute to the id of the .k-pivotgrid-configurator-header-text element followed by a space and the id of the Rows/Columns/Values label element |

## Resources

[WAI-ARIA specification for grid](https://www.w3.org/TR/wai-aria-1.2/#grid)

[WAI-ARIA specification for dialog](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role)

## Section 508


The PivotGrid is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The PivotGrid has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The PivotGrid has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the keyboard navigation works in Telerik UI for Blazor, refer to the [Accessibility Overview](slug://accessibility-overview#keyboard-navigation) article.

## See Also

* [Blazor PivotGrid Demos](https://demos.telerik.com/blazor-ui/pivotgrid/overview)
* [Accessibility in Telerik UI for Blazor](slug://accessibility-overview)