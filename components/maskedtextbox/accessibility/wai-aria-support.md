---
title: Wai-Aria Support
page_title: Telerik UI for Blazor MaskedTextBox Documentation | MaskedTextBox  Accessibility
description: "Get started with the Telerik UI for Blazor MaskedTextBox and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: maskedtextbox-wai-aria-support 
position: 50 
---

# Blazor MaskedTextBox Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor MaskedTextBox is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria


**`input` Element**

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-input-inner | `role=textbox` or `nodeName=input` | Specifies the role of the component. Not required if `<input type=text`> is used. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-placeholder` | Announces the mask/placeolder for the component. |
|  | `aria-invalid=true` | Attribute is rendered only when the maskedtextbox is in form and announces the valid state of the component. |
| .k-disabled .k-input-inner | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the maskedtextbox is disabled. |

## Section 508


The MaskedTextBox is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor MaskedTextBox Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/maskedtextbox/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})