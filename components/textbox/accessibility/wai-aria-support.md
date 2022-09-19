---
title: Wai-Aria Support
page_title: Telerik UI for Blazor TextBox Documentation | TextBox  Accessibility
description: "Get started with the Telerik UI for Blazor TextBox and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: textbox-wai-aria-support 
position: 50 
---

# Blazor TextBox Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor TextBox is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria


No role attribute is implemented as the  `html input type="text"` element is sufficient for definining purpose of the component.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-input-inner | `role=textbox` or `nodeName=input` | Describes the role of the component. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-invalid=true` | Attribute is rendered only when the textbox is in form and announces the valid state of the component. |
| .k-disabled .k-input-inner | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the textbox is disabled. |

## Resources

[WAI-ARIA specification for textbox](https://www.w3.org/TR/wai-aria-1.2/#textbox)

## Section 508


The TextBox is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Live Demo: TextBox](https://demos.telerik.com/blazor-ui/textbox/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})
