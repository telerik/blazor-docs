---
title: Wai-Aria Support
page_title: Telerik UI for Blazor ColorGradient Documentation | ColorGradient Accessibility
description: "Get started with the Telerik UI for Blazor ColorGradient and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: colorgradient-wai-aria-support 
position: 50 
---

# Blazor ColorGradient Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor ColorGradient provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ColorGradient is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### ColorGradient Wrapping Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-colorgradient` | `role=textbox` | The focusable wrapper of the component should be considered a `textbox`. That signifies it has a value that could be submitted. |
|  | `aria-label` or `aria-labelledby` | The component needs an accessible name to be assigned to it. Must also include the currently selected value in the component. |
|  | `aria-invalid=true` | Attribute is rendered only when the selected value in the component is not valid against the current validation rules. |
|  | `tabindex=0` | The element must be focusable. |
| `.k-colorgradient.k-disabled` | `aria-disabled=true` | Attribute is rendered only when the ColorPalette is disabled. |

### Drag handles


All the `k-draghandle` elements implement the **Slider** specification.

[Slider accessibility specification]({{slider_a11y_link}})


Apart from that the HSV draghandle must also cover the following additional requirements:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-hsv-draghandle` | `aria-orientation=undefined` | The implicit orientation for the `role="slider"` must be removed. |
|  | `aria-label` | Must provide information about the purpose of the `slider` (for example: "Color well with two-dimensional slider for selecting saturation and lightness") and the currently selected color (for example: "X: 142, Y: 93"). |
|  | `aria-valuetext` | Must specify the values on both X and Y axis. |

### NumericTextBoxes


The Numeric inputs must implement the **NumericTextBox** specification.

[NumericTextBox accessibility specification]({{numerictextbox_a11y_link}})


Here is one additional requirement for those numerics as their visible labels have only a single letter as text:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-numerictextbox>.k-input-inner` | `aria-label` | Must provide information about the numeric input purpose - the name of the chanel it is aimed at (`red chanel`, `green chanel`, `blue chanel`, or `alpha chanel`). |

## Section 508


The ColorGradient is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ColorGradient has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ColorGradient has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the ColorGradient keyboard navigation works, refer to the [Blazor ColorGradient Accessibility and Keyboard Navigation Demo](https://demos.telerik.com/blazor-ui/colorgradient/keyboard-navigation).

## See Also

* [Accessibility in Telerik UI for Blazor](slug:accessibility-overview)