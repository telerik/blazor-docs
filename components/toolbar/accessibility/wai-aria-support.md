---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Toolbar Documentation | Toolbar Accessibility
description: "Get started with the Telerik UI for Blazor Toolbar and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: toolbar-wai-aria-support 
position: 50 
---

# Blazor Toolbar Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor ToolBar provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ToolBar is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-toolbar` | `role=toolbar` | The component role. |
|  | `aria-label` or `aria-labelledby` | Must be supplied on each toolbar only when the application contains more than one toolbars. |
| `.k-toolbar .k-toolbar-overflow-button:has(.k-svg-i-more-vertical)` | `aria-haspopup=menu` | The value of the `aria-haspopup` attribute of the button that opens the overflow popup. |
|  | `aria-expanded=true/false` | The value of the `aria-expanded` attribute of the button that opens the overflow popup. |
|  | `aria-controls=.k-toolbar-popup .k-menu-group id` | Indicates the connection between the toggle button and the content it controls. |
|  | `aria-label` or `title` | The button that opens the overflow popup must have a descriptive text set, as it contains only an icon (no text). |
| `.k-toolbar-popup .k-menu-group` | `role=menu` | The role of the tools wrapper in the overflow section. |
|  | `aria-labelledby=.k-toolbar .k-toolbar-overflow-button:has(.k-svg-i-more-vertical) id` | Associates the title of the menu toggle button. |
| `.k-toolbar .k-toolbar-overflow-button:has(.k-svg-i-more-horizontal)` | `aria-expanded=true/false` | The value of the `aria-expanded` attribute of the button that opens the overflow section. |
|  | `aria-label` or `title` | The button that opens the overflow section must have a descriptive text set, as it contains only an icon (no text). |
|  | `aria-controls=.k-toolbar-popup .k-toolbar-items-list id` | Indicates the connection between the toggle button and the content it controls. |
| `.k-toolbar-popup .k-toolbar-items-list` | `role=toolbar` | The role of the tools wrapper in the overflow section. |
|  | `aria-labelledby=.k-toolbar .k-toolbar-overflow-button:has(.k-svg-i-more-horizontal) id` | Associates the title of the section toggle button. |

## Resources

[WAI-ARIA Specification for the ToolBar](https://www.w3.org/TR/wai-aria-1.2/#toolbar)

## Section 508


The ToolBar is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ToolBar has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ToolBar has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the Toolbar keyboard navigation works, refer to the [Blazor Toolbar Accessibility and Keyboard Navigation Demo](https://demos.telerik.com/blazor-ui/toolbar/keyboard-navigation).

## See Also

* [Accessibility in Telerik UI for Blazor](slug:accessibility-overview)