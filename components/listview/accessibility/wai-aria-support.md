---
title: Wai-Aria Support
page_title: Telerik UI for Blazor ListView Documentation | ListView Accessibility
description: "Get started with the Telerik UI for Blazor ListView and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: listview-wai-aria-support 
position: 50 
---

# Blazor ListView Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor ListView provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ListView is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AAA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-listview:not(.k-selectable) .k-listview-content` | `role=list` | Specifies the role of non selectable ListView content element. |
| `.k-listview.k-selectable .k-listview-content` | `role=listbox` | Specifies the role of selectable ListView content element. |
| `.k-listview:not(.k-selectable) .k-listview-item` | `role=listitem` | Specifies the role of each item in a non selectable ListView. |
| `.k-listview.k-selectable .k-listview-item` | `role=option` | Specifies the role of each item in a selectable ListView. |
| `.k-listview-item` | `aria-setsize` | Specifies the total number of items present in the ListView. |
|  | `aria-posinset` | Specifies the position of the current item in the entire list of items present in the ListView. Value must be greated than or equal to 1 and smaller than or equal to the total number of items in the ListView. |
| `.k-listview-item:nth-child(1)` | `tabindex=0` | The first item in the ListView must be focusable by default. |

## Resources

[WAI-ARIA Specification: List](https://www.w3.org/TR/wai-aria-1.2/#list)

[WAI-ARIA Specification: Listitem](https://www.w3.org/TR/wai-aria-1.2/#listitem)

## Section 508


The ListView is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ListView has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ListView has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the keyboard navigation works in Telerik UI for Blazor, refer to the [Accessibility Overview](slug://accessibility-overview#keyboard-navigation) article.

## See Also

* [Blazor ListView Demos](https://demos.telerik.com/blazor-ui/listview/overview)
* [Accessibility in Telerik UI for Blazor](slug://accessibility-overview)