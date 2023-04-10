---
title: Wai-Aria Support
page_title: Telerik UI for Blazor FlatColorPicker Documentation - FlatColorPicker  Accessibility
description: "Get started with the Telerik UI for Blazor FlatColorPicker and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: flatcolorpicker-wai-aria-support
position: 50
---

# Blazor FlatColorPicker Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor FlatColorPicker component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria


The FlatColorPicker contains in itself ColorGradient, ColorPalette, a UI to switch between them, Cancel, Apply, and a button to reset its value. All the containing elements must implement their own specification apart from the ColorGradient element where some changes are required.

### FlatColorPicker wrapper

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-flatcolorpicker | `role=textbox` | The focusable wrapper of the component should be considered a `textbox`. That signifies it has a value that could be submitted. |
|  | `aria-label` or `aria-labelledby` | The component needs an accessible name to be assigned to it. Must also include the currently selected value in the component. |
|  | `aria-invalid=true` | Attribute is rendered only when the selected value in the component is not valid against the current validation rules. |
|  | `tabindex=0` | The element must be focusable. |
| .k-flatcolorpicker.k-disabled | `aria-disabled=true` | Attribute is rendered only when the ColorPalette is disabled. |

### ColorGradient

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-colorgradient | `role=none/` | The ColorGradient element must have its role removed. |
|  | `aria-label` | The ColorGradient element must have its `aria-label` attribute removed. |
|  | `tabindex=-1/` | The ColorGradient must be removed from the page tab sequence. |

## Section 508


The FlatColorPicker is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor FlatColorPicker Overview (Demo)](https://demos.telerik.com/blazor-ui/flatcolorpicker/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})
