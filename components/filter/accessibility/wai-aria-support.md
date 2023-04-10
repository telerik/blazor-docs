---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Filter Documentation - Filter  Accessibility
description: "Get started with the Telerik UI for Blazor Filter and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: filter-wai-aria-support
position: 50
---

# Blazor Filter Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor Filter component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria


The Filter component represents visually the structure of a filter object. As the filter object can contain nested objects, that hierarchical structure must be represented in the accessibility tree by the `role=tree` assigned to the component.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-filter-container | `role=tree` | Describes the hierarchical structure of the Filter component. |
|  | `aria-label` | Specifies a label for the Filter component. |
| .k-filter-group-main,.k-filter-item | `role=treeitem` | Each FilterGroup and FilterExpression represent a separate `treeitem` in the Filter component structure. |
| .k-filter-lines | `role=group` | Represents a group if items in the Filter component. |
| .k-toolbar | `role=toolbar` | The role represents a collection of tools. |
|  | `aria-label` | Specifies a label for the toolbar. |


Each toolbar in the Filter should follow the specification for a ToolBar component. The elements inside the FilterGroup follow the ARIA specification applicable to their specific roles.

## Resources

[WAI-ARIA specification for toolbar](https://www.w3.org/TR/wai-aria-1.2/#toolbar)

## Section 508


The Filter is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Filter Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/filter/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})
