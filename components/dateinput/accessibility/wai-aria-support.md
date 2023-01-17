---
title: Wai-Aria Support
page_title: Telerik UI for Blazor DateInput Documentation | DateInput  Accessibility
description: "Get started with the Telerik UI for Blazor DateInput and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: dateinput-wai-aria-support 
position: 50 
---

# Blazor DateInput Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor DateInput component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-input-inner | `role=textbox` or `nodeName=input` | The element should either be an `<input type="text">` element or should have `role="textbox"` assigned. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `readonly=readonly` or `aria-readonly=true` | Attribute is rendered only when the DateInput is readonly. |
|  | `tabindex=0` | The element should be focusable. |
| .k-disabled .k-input-inner | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the DateInput is disabled. |

## Resources

[ARIA practices Date Picker Dialog Example](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/datepicker-dialog.html)

## Section 508


The DateInput is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor DateInput Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/dateinput/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})