---
title: Wai-Aria Support
page_title: Telerik UI for Blazor ToggleButton Documentation | ToggleButton Accessibility
description: "Get started with the Telerik UI for Blazor ToggleButton and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: togglebutton-wai-aria-support 
position: 50 
---

# Blazor ToggleButton Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor ToggleButton provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ToggleButton is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-button` | `aria-pressed=true/false` | Announced the toggle behaviour of the button. |

## Resources

[ARIA practices Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Section 508


The ToggleButton is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ToggleButton has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ToggleButton has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the ToggleButton keyboard navigation works, refer to the [Blazor ToggleButton Accessibility and Keyboard Navigation Demo](https://demos.telerik.com/blazor-ui/togglebutton/keyboard-navigation).

## See Also

* [Accessibility in Telerik UI for Blazor](slug://accessibility-overview)