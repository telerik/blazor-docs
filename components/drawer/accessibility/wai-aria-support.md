---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Drawer Documentation | Drawer Accessibility
description: "Get started with the Telerik UI for Blazor Drawer and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: drawer-wai-aria-support 
position: 50 
---

# Blazor Drawer Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor Drawer provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Drawer is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Drawer component allows rendering a whole template inside of it. Thus, the accessibility roles are applied only when the built-in data-binding is used.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-drawer ul` | `role=menubar` | Indicates that the list of drawer items is a menubar. |
|  | `aria-orientation=vertical` | Indicates that the orientation of the drawer is vertical. |
| `.k-drawer-item:not(.k-drawer-separator)` | `role=menuitem` | Indicates that the item of a drawer serves as a menuitem. |
|  | `aria-label` | The drawer item requires an `aria-label` attribute when in mini mode and no content is rendered in the item. The `aria-label` points to the text field value of the item. |
| `.k-drawer-item.k-drawer-separator` | `role=separator` | Indicates that the item of a drawer serves as a separator. |

## Section 508


The Drawer is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Drawer has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Drawer has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## See Also

* [Blazor Drawer Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/drawer/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})