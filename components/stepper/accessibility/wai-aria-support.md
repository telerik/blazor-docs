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



Out of the box, the Telerik UI for Blazor Stepper provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Stepper is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.1  AA](https://www.w3.org/TR/WCAG21/) standards](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Stepper component is a landmark `<nav>` element or an element with `role="navigation"`(https://www.w3.org/TR/wai-aria-1.2/#navigation). It contains an ordered list of navigation items. Each navigation item contains a link.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-stepper` | `role=navigation` or `nodeName=nav` | The landmark role `navigation` must be assigned to the component. |
| `.k-step-disabled>.k-step-link` | `aria-disabled=true` | A disabled (inactive) link. |
| `.k-step-current>.k-step-link` | `aria-current=step` | The currently selected link. |
|  | `tabindex=0` | Removes the element from the page Tab sequence. Set when a tab is not selected so that only the selected tab is in the page Tab sequence. |
| `.k-step:not(.k-step-current) .k-step-link` | `tabindex=-1` | Removes the element from the page Tab sequence. Set when a tab is not selected so that only the selected tab is in the page Tab sequence. |


No aria attributes should be applied to the Stepper as the ProgressBar serves a purely aesthetic purpose.

## Resources

[WAI-ARIA specification for navigation](https://www.w3.org/TR/wai-aria-1.2/#navigation)

## Section 508


The Stepper is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Stepper has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Stepper has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## See Also

* [Blazor Stepper Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/stepper/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})