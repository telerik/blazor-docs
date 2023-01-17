---
title: Wai-Aria Support
page_title: Telerik UI for Blazor ButtonGroup Documentation | ButtonGroup  Accessibility
description: "Get started with the Telerik UI for Blazor ButtonGroup and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: buttongroup-wai-aria-support 
position: 50 
---

# Blazor ButtonGroup Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor ButtonGroup component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-button-group:not(.k-split-button) | `role=group` | Sets the proper role for the group. |
| .k-button-group.k-disabled | `aria-disabled=true` | Attribute is rendered only when the entire button group is disabled. |
| .k-button-group:not(.k-split-button) .k-button | `aria-pressed` | Specifies the current state of the Button. Only the selected button in the Group would have this attribute set to `true`. |

## Resources

[WAI-ARIA specification for button](https://www.w3.org/TR/wai-aria-1.2/#button)

[WAI-ARIA specification for group](https://www.w3.org/TR/wai-aria-1.2/#group)

## Section 508


The ButtonGroup is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor ButtonGroup Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/buttongroup/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})