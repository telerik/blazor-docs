---
title: Wai-Aria Support
page_title: Telerik UI for Blazor NumericTextBox Documentation | NumericTextBox  Accessibility
description: "Get started with the Telerik UI for Blazor NumericTextBox and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: numerictextbox-wai-aria-support 
position: 50 
---

# Blazor NumericTextBox Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor NumericTextBox component is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-input-inner | `role=spinbutton` | Announces the spinbutton capabilities of the numerictextbox. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-valuemnow` | Announces the value for the component. |
|  | `aria-valuemin` | Announces the minimum value allowed for the component. |
|  | `aria-valuemax` | Announces the maximum value allowed for the component. |
|  | `aria-invalid=true` | Attribute is rendered only when the numerictextbox is in form and announces the valid state of the component. |
| .k-disabled .k-input-inner | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the numerictextbox is disabled. |
| .k-spin-button>.k-button | `role=button` or `nodeName=button` | Announces the spinbutton capabilities of the numerictextbox. |
|  | `aria-label` | Button element must have discernible text. |

## Resources

[ARIA practices Spinbutton](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/)

## Section 508


The NumericTextBox is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor NumericTextBox Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/numerictextbox/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})