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



The Telerik UI for Blazor Menu component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-menu:not(.k-context-menu) | `role=menubar` | Announces the Menu menubar role |
| .k-menu.k-menu-vertical | `aria-orientation=vertical` | Announces the Menu orientation when vertical. |
| .k-menu-item | `role=menuitem` | Announces the Menu item role. |
|  | `tabindex=0/-1` | The focused item has tabindex '0', the rest - '-1' |
| .k-menu-item[aria-expanded] | `aria-haspopup=true` | Indicates that there is a popup, associated with the item. Applicable to expandable items only. |
| .k-menu-item[aria-haspopup] | `aria-controls=ul.k-menu-group id` | Indicates that there is a popup, associated with the item. Applicable to expandable items only. |
| .k-menu-item[aria-haspopup] | `aria-expanded=true/false` | Indicates whether the item is expanded. |
| .k-menu-item.k-disabled | `aria-disabled=true` | Informs assistive technologies that a Menu item is disabled. |
| .k-menu-expand-arrow | `aria-hidden=true` | The Menu item expand arrow elements are hidden from the assistive technologies. |
| .k-menu-popup .k-menu-group | `role=menu` | The role of the nested (not root-level) menu displayed in a popup. |
|  | `id` | Each nested menu has a deterministic id attribute that is linked to the aria-controls attribute ot its parent. |

## Resources

[ARIA patterns Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)

## Section 508


The Menu is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Menu Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/menu/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})