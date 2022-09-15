---
title: Wai-Aria Support
page_title: Telerik UI for Blazor TimePicker Documentation | TimePicker  Accessibility
description: "Get started with the Telerik UI for Blazor TimePicker and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: timepicker-wai-aria-support 
position: 50 
---

# Blazor TimePicker Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor TimePicker is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

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
|  | `aria-invalid=true` | Attribute is rendered only when the picker is in form and announces the valid state of the component. |
| .k-disabled .k-input-inner | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the DatePicker is disabled. |
| .k-input-button | `role=button` or `nodeName=button` | The element must either be a `<button>` element or must have `role=button` assigned. |
|  | `aria-label` | The button needs an accessible name to be assigned to it. |
|  | `tabindex=-1` | Button element must not be focusable. |

### SpinButton Elements on the Popup

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-time-list | `role=spinbutton` | The timelist elements must have `spinbutton` role assigned. |
|  | `aria-label` | The spinbutton needs an accessible name to be assigned to it. |
|  | `aria-valuetext` | The current selected value in the spinbutton as a text representation. |
|  | `aria-valuenow` | The current selected value in the spinbutton. |
|  | `aria-valuemin` | The minimum allowed value in the spinbutton. |
|  | `aria-valuemax` | The maximum allowed value in the spinbutton. |
| .k-time-container | `role=none/presentation` | The immediate children elements of the spinbuttons should not be available for the assistive technologies. |

### AM/PM chooser in the Popup

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-time-list-wrapper:last-child .k-time-list | `role=listbox` | The element role indicates it is a listbox. |
|  | `aria-label` | The listbox needs an accessible name to be assigned to it. |
| .k-time-list-wrapper:last-child .k-reset | `role=none/presentation` | The semantic role of the element must be negated. |
| .k-time-list-wrapper:last-child .k-item | `role=option` | The two available options in the listbox must be marked as such. |

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