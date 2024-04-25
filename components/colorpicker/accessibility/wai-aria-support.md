---
title: Wai-Aria Support
page_title: Telerik UI for Blazor ColorPicker Documentation | ColorPicker Accessibility
description: "Get started with the Telerik UI for Blazor ColorPicker and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: colorpicker-wai-aria-support 
position: 50 
---

# Blazor ColorPicker Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor ColorPicker provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ColorPicker is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The ColorPicker popup contains in itself ColorGradient, ColorPalette, a UI to switch between them, and a button to reset its value. All the containing elements must implement their own specification apart from the ColorGradient element where some changes are required.

### ColorPicker Wrapping Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-colorpicker` | `role=combobox` | The focusable element of the component should have role `combobox` (an input with popup). |
|  | `aria-label` or `aria-labelledby` | The component needs an accessible name to be assigned to it. Must also include the currently selected value in the component. |
|  | `aria-haspopup=dialog` | Indicates the component has a Dialog Popup. |
|  | `aria-expanded` | Announces the state of the visibility of the popup. |
|  | `aria-controls=.k-colorpicker-popup id` | Points to the popup element. Signifies that the `combobox` element controls the `dialog`. |
|  | `tabindex=0` | The element must be focusable. |
| `.k-invalid,.ng-invalid` | `aria-invalid=true` | Attribute is rendered only when the picker is in form and announces the valid state of the component. |
| `.k-colorpicker.k-disabled` | `aria-disabled=true` | Attribute is rendered only when the picker is disabled. |

### ColorGradient in the Popup

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-colorgradient` | `role=none/undefined` | The ColorGradient element must have its role removed. |
|  | `aria-label=undefined` | The ColorGradient element must have its `aria-label` attribute removed. |
|  | `tabindex=-1/undefined` | The ColorGradient must be removed from the page tab sequence. |

## Section 508


The ColorPicker is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ColorPicker has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ColorPicker has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## See Also

* [Blazor ColorPicker Overview (Demo)](https://demos.telerik.com/blazor-ui/colorpicker/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})