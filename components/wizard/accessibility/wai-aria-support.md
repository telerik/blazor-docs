---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Wizard Documentation | Wizard Accessibility
description: "Get started with the Telerik UI for Blazor Wizard and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: wizard-wai-aria-support 
position: 50 
---

# Blazor Wizard Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor Wizard provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Wizard is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Wizard component represents a [`tablist`](https://www.w3.org/TR/wai-aria-1.2/#tablist) containing [`tabs`](https://www.w3.org/TR/wai-aria-1.2/#tab) with related [`tabpanels`](https://www.w3.org/TR/wai-aria-1.2/#tabpanel).

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-step-list` | `role=tablist` | Indicates the role of the tablist container element. |
| `.k-step` | `role=none` | The implicit semantics of the `li` element must be removed. |
| `.k-step-link` | `role=tab` | Specifies the role for the step links. |
|  | `aria-controls=.k-wizard-step id` | Refers to the tabpanel element associated with the tab. |
| `.k-step-disabled>.k-step-link` | `aria-disabled=true` | A disabled (inactive) tab. |
| `.k-step-current .k-step-link` | `aria-selected` | Indicates whether the tab control is activated and its associated panel is displayed, or not. |
|  | `aria-current=true` | Indicates whether the tab control is activated and its associated panel is displayed, or not. |
|  | `tabindex=0` | Removes the element from the page Tab sequence. Set when a tab is not selected so that only the selected tab is in the page Tab sequence. |
| `.k-step:not(.k-step-current) .k-step-link` | `tabindex=-1` | Removes the element from the page Tab sequence. Set when a tab is not selected so that only the selected tab is in the page Tab sequence. |
| `.k-wizard-step` | `role=tabpanel` | Specifies the role of the element. |
|  | `aria-label` | Specifies a label tor the panel. As the Wizard represents a step-by-step process, that is usually the pager text (e.g. "Step 2 of 4") |
|  | `tabindex=0` | Keeps the tabpanel in the page tab sequence. |


No aria attributes should be applied to the ProgressBar element as it serves a purely aesthetic purpose.

## Resources

[WAI-ARIA specification for tablist](https://www.w3.org/TR/wai-aria-1.2/#tablist)

## Section 508


The Wizard is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Wizard has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Wizard has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the Wizard keyboard navigation works, refer to the [Blazor Wizard Accessibility and Keyboard Navigation Demo](https://demos.telerik.com/blazor-ui/wizard/keyboard-navigation).

## See Also

* [Accessibility in Telerik UI for Blazor](slug:accessibility-overview)