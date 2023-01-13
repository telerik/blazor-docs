---
title: Wai-Aria Support
page_title: Telerik UI for Blazor TileLayout Documentation | TileLayout  Accessibility
description: "Get started with the Telerik UI for Blazor TileLayout and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: tilelayout-wai-aria-support 
position: 50 
---

# Blazor TileLayout Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor TileLayout component is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-tilelayout | `role=list` | Sets list role to the TileLayout wrapper. |
| .k-tilelayout-item | `role=listitem` | Sets listitem role to the TileLayout items. |
|  | `aria-labelledby` | Associates the focusable item wrapper with the respective header text element (.k-tilelayout-item-header .k-card-title). |
|  | `tabindex=0` | Makes the item wrapper element focusable. |
|  | `aria-keyshortcuts=Enter` | Announces Enter as an available key shortcut when the item is focused. |
|  | `aria-dropeffect=execute` | Announces that an action, supported by the drop-target (resizing or reordering) will be executed when the item is dropped. |
|  | `aria-grabbed=true/false` | The aria-grabbed state indicates an element's 'grabbed' state in a drag-and-drop operation. |
| .k-tilelayout-item-header .k-card-title | `id` | Unique and deterministic identifier to link the header text element to the focusable wrapper. |

## Section 508


The TileLayout is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor TileLayout Overview (Demo)](https://demos.telerik.com/blazor-ui/tilelayout/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})