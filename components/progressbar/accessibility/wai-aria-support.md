---
title: Wai-Aria Support
page_title: Telerik UI for Blazor ProgressBar Documentation | ProgressBar  Accessibility
description: "Get started with the Telerik UI for Blazor ProgressBar and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: progressbar-wai-aria-support 
position: 50 
---

# Blazor ProgressBar Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor ProgressBar component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-progressbar | `role=progressbar` | Sets the proper role for ProgressBar. |
|  | `aria-label` or `aria-labelledby` | The Progressbar needs an accessible name to be assigned to it. |
|  | `aria-valuenow` | Only present and required if the value is not indeterminate. Set to a decimal value between 0, or aria-valuemin if present, and aria-valuemax indicating the current value of the progress bar. |
|  | `aria-valuemin` | Set to a decimal value representing the minimum value, and less than aria-valuemax. If not present, the default value is 0. |
|  | `aria-valuemax` | Set to a decimal value representing the maximum value, and greater than aria-valuemin. If not present, the default value is 100. |

## Resources

[WAI-ARIA specification for progressbar](https://www.w3.org/TR/wai-aria-1.2/#progressbar)

[MDN reference for the progressbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role#associated_wai-aria_roles_states_and_properties)

## Section 508


The ProgressBar is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor ProgressBar Overview (Demo)](https://demos.telerik.com/blazor-ui/progressbar/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})