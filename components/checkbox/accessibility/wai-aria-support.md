---
title: Wai-Aria Support
page_title: Telerik UI for Blazor CheckBox Documentation - CheckBox  Accessibility
description: "Get started with the Telerik UI for Blazor CheckBox and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: checkbox-wai-aria-support
position: 50
---

# Blazor CheckBox Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor CheckBox component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-checkbox | `role=checkbox` or `type=checkbox` | Announces the checkbox role of the element. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-checked=true` or `checked=checked` | Announces the checked state of the checkbox. |
|  | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the checkbox is disabled. |
| .k-invalid,.ng-invalid | `aria-invalid=true` | Attribute is rendered only when the checkbox is in form and announces the valid state of the component. |

## Resources

[ARIA practices Checkbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

## Section 508


The CheckBox is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor CheckBox Overview (Demo)](https://demos.telerik.com/blazor-ui/checkbox/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})
