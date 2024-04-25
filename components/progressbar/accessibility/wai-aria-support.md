---
title: Wai-Aria Support
page_title: Telerik UI for Blazor ProgressBar Documentation | ProgressBar Accessibility
description: "Get started with the Telerik UI for Blazor ProgressBar and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: progressbar-wai-aria-support 
position: 50 
---

# Blazor ProgressBar Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor ProgressBar provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ProgressBar is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-progressbar` | `role=progressbar` | Sets the proper role for ProgressBar. |
|  | `aria-label` or `aria-labelledby` | The Progressbar needs an accessible name to be assigned to it. |
|  | `aria-valuenow` | Only present and required if the value is not indeterminate. Set to a decimal value between 0, or aria-valuemin if present, and aria-valuemax indicating the current value of the progress bar. |
|  | `aria-valuemin` | Set to a decimal value representing the minimum value, and less than aria-valuemax. If not present, the default value is 0. |
|  | `aria-valuemax` | Set to a decimal value representing the maximum value, and greater than aria-valuemin. If not present, the default value is 100. |

## Resources

[WAI-ARIA specification for progressbar](https://www.w3.org/TR/wai-aria-1.2/#progressbar)

[MDN reference for the progressbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role#associated_wai-aria_roles_states_and_properties)

## Section 508


The ProgressBar is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ProgressBar has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ProgressBar has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## See Also

* [Blazor ProgressBar Overview (Demo)](https://demos.telerik.com/blazor-ui/progressbar/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})