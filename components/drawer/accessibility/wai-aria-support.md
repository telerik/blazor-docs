---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Drawer Documentation | Drawer  Accessibility
description: "Get started with the Telerik UI for Blazor Drawer and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: drawer-wai-aria-support 
position: 50 
---

# Blazor Drawer Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor Drawer is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria


The Drawer component allows rendering a whole template inside of it. Thus, the accessibility roles are applied only when the built-in data-binding is used.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-drawer ul | `role=menubar` | Indicates that the list of drawer items is a menubar. |
|  | `aria-orientation=vertical` | Indicates that the orientation of the drawer is vertical. |
| .k-drawer-item | `role=menuitem` | Indicates that the item of a drawer serves as a menuitem. |
|  | `aria-label` | The drawer item requires an `aria-label` attribute when in mini mode and no content is rendered in the item. The `aria-label` points to the text field value of the item. |
| .k-drawer-item.k-drawer-separator | `role=separator` | Indicates that the item of a drawer serves as a separator. |

## Section 508


The Drawer is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Drawer Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/drawer/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})