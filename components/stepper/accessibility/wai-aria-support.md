---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Stepper Documentation | Stepper  Accessibility
description: "Get started with the Telerik UI for Blazor Stepper and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: stepper-wai-aria-support 
position: 50 
---

# Blazor Stepper Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor Stepper component is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria


The Stepper component is a landmark `<nav>` element or an element with `role="navigation"`(https://www.w3.org/TR/wai-aria-1.2/#navigation). It contains an ordered list of navigation items. Each navigation item contains a link.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-stepper | `role=navigation` or `nodeName=nav` | The landmark role `navigation` must be assigned to the component. |
| .k-step-disabled>.k-step-link | `aria-disabled=true` | A disabled (inactive) link. |
| .k-step-current>.k-step-link | `aria-current=true` | Indicates whether the tab control is activated and its associated panel is displayed, or not. |
|  | `aria-current=true` | The currently selected link. |
|  | `tabindex=0` | Removes the element from the page Tab sequence. Set when a tab is not selected so that only the selected tab is in the page Tab sequence. |
| .k-step:not(.k-step-current) .k-step-link | `tabindex=-1` | Removes the element from the page Tab sequence. Set when a tab is not selected so that only the selected tab is in the page Tab sequence. |


No aria attributes should be applied to the Stepper as the ProgressBar serves a purely aesthetic purpose.

## Resources

[WAI-ARIA specification for navigation](https://www.w3.org/TR/wai-aria-1.2/#navigation)

## Section 508


The Stepper is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Stepper Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/stepper/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})