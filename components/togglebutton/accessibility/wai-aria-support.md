---
title: Wai-Aria Support
page_title: Telerik UI for Blazor ToggleButton Documentation | ToggleButton  Accessibility
description: "Get started with the Telerik UI for Blazor ToggleButton and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: togglebutton-wai-aria-support 
position: 50 
---

# Blazor ToggleButton Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor ToggleButton component is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-button | `aria-pressed=true/false` | Announced the toggle behaviour of the button. |

## Resources

[ARIA practices Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Section 508


The ToggleButton is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor ToggleButton Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/togglebutton/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})