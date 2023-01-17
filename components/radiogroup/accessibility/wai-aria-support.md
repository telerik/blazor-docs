---
title: Wai-Aria Support
page_title: Telerik UI for Blazor RadioGroup Documentation | RadioGroup  Accessibility
description: "Get started with the Telerik UI for Blazor RadioGroup and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: radiogroup-wai-aria-support 
position: 50 
---

# Blazor RadioGroup Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor RadioGroup component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-radio-list | `role=radiogroup` | Announces the radiogroup role of the element. |
| .k-radio-item | `role=none` | Force no role due to nesting items issue. |
| .k-radio | `readonly` or `aria-readonly` | Attribute is rendered only when the radio is readonly. |
|  | `aria-invalid=true` | Attribute is rendered only when the radio is in form and announces the valid state of the component. |
| .k-disabled>.k-radio | `disabled` or `aria-disabled` | Attribute is rendered only when the radio is disabled. |

## Resources

[WAI-ARIA specification for radiogroup](https://www.w3.org/TR/wai-aria-1.2/#radiogroup)

[ARIA practices Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/)

## Section 508


The RadioGroup is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor RadioGroup Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/radiogroup/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})