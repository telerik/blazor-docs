---
title: Wai-Aria Support
page_title: Telerik UI for Blazor TabStrip Documentation | TabStrip  Accessibility
description: "Get started with the Telerik UI for Blazor TabStrip and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: tabstrip-wai-aria-support 
position: 50 
---

# Blazor TabStrip Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor TabStrip component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-tabstrip-items | `role=tablist` | Indicates the tablist role for the ul element of the TabStrip. |
| .k-tabstrip.k-tabstrip-left .k-tabstrip-items,.k-tabstrip.k-tabstrip-right .k-tabstrip-items | `aria-orientation=vertical` | Indicates the orientation of the tablist container element. The attribute is rendered only when the orientation of the component is vertical as the `tablist` role comes with default horizontal orientation. |
| .k-tabstrip-item | `role=tab` | The tab `li` element. |
|  | `aria-controls=.k-tabstrip-content id` | Announces the relation between the panel and tab. |
| .k-tabstrip-item.k-state-active | `aria-selected=true` | Announces the selected state of the tab. |
| .k-tabstrip-content | `role=tabpanel` | The content `div` of the tab. |
|  | `aria-hidden=true` | Only if the component implements a feature to control whether the content should be persisted. |
|  | `aria-labelledby=.k-tabstrip-item id` | Refers to the tab element that controls the panel. |
| .k-tabstrip .k-button | `aria-hidden=true` | Introduce aria-hidden attribute for the scrollable buttons. The buttons are not included in the tabsequence. Navigating through arrow keys would  |

## Resources

[WAI-ARIA specification for tablist](https://www.w3.org/TR/wai-aria-1.2/#tablist)

## Section 508


The TabStrip is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor TabStrip Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/tabstrip/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})