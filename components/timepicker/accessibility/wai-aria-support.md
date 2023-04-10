---
title: Wai-Aria Support
page_title: Telerik UI for Blazor TimePicker Documentation - TimePicker  Accessibility
description: "Get started with the Telerik UI for Blazor TimePicker and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: timepicker-wai-aria-support
position: 50
---

# Blazor TimePicker Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor TimePicker component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

### TimePicker wrapper

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-input-inner | `role=combobox` | The input element should follow the `combobox` specification. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-expanded=true/false` | Announces whether the Popup is visible or not. |
|  | `aria-haspopup=dialog` | Indicates the component has a Dialog Popup. |
|  | `aria-controls=.k-animation-container id` |  Points to the popup element. Signifies that the `combobox` element controls the `dialog` popup. |
|  | `readonly` or `aria-readonly` | Attribute is rendered only when the DatePicker is readonly. |
| .k-invalid .k-input-inner,.ng-invalid .k-input-inner | `aria-invalid=true` | Attribute is rendered only when the picker is in form and announces the valid state of the component. |
| .k-disabled .k-input-inner | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the DatePicker is disabled. |
| .k-input-button | `role=button` or `nodeName=button` | The element must either be a `<button>` element or must have `role=button` assigned. |
|  | `aria-label` | The button needs an accessible name to be assigned to it. |
|  | `tabindex=-1` | Button element must not be focusable. |

### List Elements on the Popup

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-time-list | `role=listbox` | The timelist elements must have `listbox` role assigned. |
|  | `aria-label` or `aria-labelledby` | The listbox needs an accessible name to be assigned to it. |
| .k-reset | `role=none/presentation` | The k-rest `<ul>` element semantic meaning must be removed from the accessibility tree. |
| .k-item | `role=option` | The available options in the listbox must be marked as such. |
|  | `aria-selected=true` | Selected option must have its `aria-selected` attribute set to `true`. |

## Resources

[WAI-ARIA specification for combobox](https://www.w3.org/TR/wai-aria-1.2/#combobox)

[WAI-ARIA specification for spinbutton](https://www.w3.org/TR/wai-aria-1.2/#spinbutton)

## Section 508


The TimePicker is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor TimePicker Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/timepicker/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})
