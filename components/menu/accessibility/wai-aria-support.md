---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Menu Documentation | Menu  Accessibility
description: "Get started with the Telerik UI for Blazor Menu and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: menu-wai-aria-support 
position: 50 
---

# Blazor Menu Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor Menu provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Menu is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.1  AA](https://www.w3.org/TR/WCAG21/) standards](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-menu:not(.k-context-menu)` | `role=menubar` | Announces the Menu menubar role |
| `.k-menu.k-menu-vertical` | `aria-orientation=vertical` | Announces the Menu orientation when vertical. |
| `.k-menu-item` | `role=menuitem` | Announces the Menu item role. |
|  | `tabindex=0/-1` | The focused item has tabindex '0', the rest - '-1' |
| `.k-menu-item[aria-expanded]` | `aria-haspopup=true` | Indicates that there is a popup, associated with the item. Applicable to expandable items only. |
| `.k-menu-item[aria-haspopup]` | `aria-controls=ul.k-menu-group id` | Indicates that there is a popup, associated with the item. Applicable to expandable items only. |
| `.k-menu-item[aria-haspopup]` | `aria-expanded=true/false` | Indicates whether the item is expanded. |
| `.k-menu-item.k-disabled` | `aria-disabled=true` | Informs assistive technologies that a Menu item is disabled. |
| `.k-menu-expand-arrow` | `aria-hidden=true` | The Menu item expand arrow elements are hidden from the assistive technologies. |
| `.k-menu-popup .k-menu-group` | `role=menu` | The role of the nested (not root-level) menu displayed in a popup. |
|  | `id` | Each nested menu has a deterministic id attribute that is linked to the aria-controls attribute ot its parent. |

## Resources

[ARIA patterns Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)

## Section 508


The Menu is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Menu has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Menu has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## See Also

* [Blazor Menu Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/menu/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})