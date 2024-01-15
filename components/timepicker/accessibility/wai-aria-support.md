---
title: Wai-Aria Support
page_title: Telerik UI for Blazor TimePicker Documentation | TimePicker Accessibility
description: "Get started with the Telerik UI for Blazor TimePicker and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: timepicker-wai-aria-support 
position: 50 
---

# Blazor TimePicker Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor TimePicker provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The TimePicker is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### TimePicker Wrapping Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=combobox` | The input element should follow the `combobox` specification. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-expanded=true/false` | Announces whether the Popup is visible or not. |
|  | `aria-haspopup=dialog` | Indicates the component has a Dialog Popup. |
|  | `aria-controls=.k-animation-container id` | Points to the popup element. Signifies that the `combobox` element controls the `dialog` popup. |
|  | `readonly` or `aria-readonly` | Attribute is rendered only when the DatePicker is readonly. |
| `.k-invalid .k-input-inner,.ng-invalid .k-input-inner` | `aria-invalid=true` | Attribute is rendered only when the picker is in form and announces the valid state of the component. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the DatePicker is disabled. |
| `.k-input-button` | `role=button` or `nodeName=button` | The element must either be a `<button>` element or must have `role=button` assigned. |
|  | `aria-label` | The button needs an accessible name to be assigned to it. |
|  | `tabindex=-1` | Button element must not be focusable. |

### List Elements on the Popup

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-time-list` | `role=listbox` | The timelist elements must have `listbox` role assigned. |
|  | `aria-label` or `aria-labelledby` | The listbox needs an accessible name to be assigned to it. |
| `.k-reset` | `role=none/presentation` | The k-rest `<ul>` element semantic meaning must be removed from the accessibility tree. |
| `.k-item` | `role=option` | The available options in the listbox must be marked as such. |
|  | `aria-selected=true/false` | Selected option must have its `aria-selected` attribute set to `true`. |

## Resources

[WAI-ARIA specification for combobox](https://www.w3.org/TR/wai-aria-1.2/#combobox)

[WAI-ARIA specification for listbox](https://www.w3.org/TR/wai-aria-1.2/#listbox)

## Section 508


The TimePicker is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The TimePicker has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The TimePicker has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## See Also

* [Blazor TimePicker Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/timepicker/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})