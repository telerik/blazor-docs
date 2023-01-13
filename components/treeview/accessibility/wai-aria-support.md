---
title: Wai-Aria Support
page_title: Telerik UI for Blazor TreeView Documentation | TreeView  Accessibility
description: "Get started with the Telerik UI for Blazor TreeView and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: treeview-wai-aria-support 
position: 50 
---

# Blazor TreeView Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor TreeView component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-treeview | `role=tree` | The root `div` element of the treeview. |
| .k-treeview-group:not(.k-treeview-lines) | `role=group` | The `ul` element that wraps child nodes. |
| .k-treeview-item | `role=treeitem` | The `li` element rendered for a tree node. |
|  | `aria-level` | Announces the level of the tree node item. The value of level is number-based(>=1). Should be added when only subsection of the TreeView is rendered in the DOM. |
|  | `aria-setsize` | Announces the total count of the items at this level. Helps the user understand the position of the navigation (ex: item 3 of 14). Should be added only when `load more` functionality of the tree is enabled and there are still nodes belonging to the group that are yet not loaded (rendered). |
|  | `aria-expanded=true/false` | Announces the expanded state of the node. It is true when expanded, and false when collapsed. |
|  | `aria-checked=true/false` | Rendered only when checkboxes are enabled and announces the checked state of the node. If the checkbox is indeterminate, the value is `mixed`. |
| .k-selected | `aria-selected=true` | Rendered only when selection is enabled and announces the selected state of the node. |
| .k-checkbox | `role=none/presentation` | Added to the wrapper element of the checkbox to prevent duplicated information announced to the user. The checked state is controlled by `aria-checked`. |
|  | `aria-hidden=true` | Added to the checkbox element to prevent duplicated information announced to the user. The checked state is controlled by `aria-checked`. |


If the tree supports **Load More** functionality, the load more button is rendered as `li.k-treeview-item` element and has `role="button"`. The list item does not implement any of the above attributes.

## Resources

[ARIA practices File Directory Treeview Example](https://www.w3.org/WAI/ARIA/apg/example-index/treeview/treeview-1/treeview-1a.html)

## Section 508


The TreeView is compliant with the [Section 508](http://www.section508.gov/) requirements

## Testing


The component has been extensively tested automatically with static code analyzers and manually with the most popular screen readers.

> Any Accessibility Issues could be reported in [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## See Also

* [Blazor TreeView Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/treeview/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})