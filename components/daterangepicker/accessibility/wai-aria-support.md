---
title: Wai-Aria Support
page_title: Telerik UI for Blazor DateRangePicker Documentation | DateRangePicker  Accessibility
description: "Get started with the Telerik UI for Blazor DateRangePicker and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: daterangepicker-wai-aria-support 
position: 50 
---

# Blazor DateRangePicker Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor DateRangePicker component is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

### Input elements

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-input-inner | `role=combobox` | The input element should follow the `combobox` specification. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-haspopup=grid` | Indicates the component has a Calendar Popup that implements `role="grid"`. |
|  | `aria-expanded=true/false` | Announces whether the Popup is visible or not. |
|  | `aria-controls=.k-calendar-container id` | Points to the popup element. Signifies that the `combobox` element controls the Calendar `grid`. |
|  | `aria-activedescendent=.k-calendar-td id` | Points to the focused item (date/month/year) in the Calendar Popup. Should only be present when the Popup is open. |
|  | `readonly=readonly` or `aria-readonly=true` | Attribute is rendered only when the DateRangePicker is readonly. |
|  | `aria-invalid=true` | Attribute is rendered only when the combobox is in form and announces the valid state of the component. |
|  | `tabindex=0` | The element should be focusable. |
| .k-disabled .k-input-inner | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the DateRangePicker is disabled. |

### Calendars Popup


The Calendars in the Popup element of the component should implement the specification for the **MultiViewCalendar** component.

[Calendar accessibility specification]({{calendar_a11y_link}})

## Resources

[WAI ARIA specification for combobox](https://www.w3.org/TR/wai-aria-1.2/#combobox)

[ARIA practices Date Picker Dialog Example](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/datepicker-dialog.html)

## Section 508


The DateRangePicker is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor DateRangePicker Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/daterangepicker/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})