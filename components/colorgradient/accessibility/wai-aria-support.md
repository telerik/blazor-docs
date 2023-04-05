---
title: Wai-Aria Support
page_title: Telerik UI for Blazor ColorGradient Documentation - ColorGradient  Accessibility
description: "Get started with the Telerik UI for Blazor ColorGradient and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: colorgradient-wai-aria-support
position: 50
---

# Blazor ColorGradient Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor ColorGradient component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

### ColorGradient wrapper

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-colorgradient | `role=textbox` | The focusable wrapper of the component should be considered a `textbox`. That signifies it has a value that could be submitted. |
|  | `aria-label` or `aria-labelledby` | The component needs an accessible name to be assigned to it. Must also include the currently selected value in the component. |
|  | `aria-invalid=true` | Attribute is rendered only when the selected value in the component is not valid against the current validation rules. |
|  | `tabindex=0` | The element must be focusable. |
| .k-colorgradient.k-disabled | `aria-disabled=true` | Attribute is rendered only when the ColorPalette is disabled. |

### Drag handles


All the `k-draghandle` elements implement the **Slider** specification.

[Slider accessibility specification]({{slider_a11y_link}})


Apart from that the HSV draghandle must also cover the following additional requirements:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-hsv-draghandle | `aria-orientation=undefined` | The implicit orientation for the `role="slider"` must be removed. |
|  | `aria-label` | Must provide information about the purpose of the `slider` (for example: "Color well with two-dimensional slider for selecting saturation and lightness") and the currently selected color (for example: "X: 142, Y: 93"). |
|  | `aria-valuetext` | Must specify the values on both X and Y axis. |

### NumericTextBoxes


The Numeric inputs must implement the **NumericTextBox** specification.

[NumericTextBox accessibility specification]({{numerictextbox_a11y_link}})


Here is one additional requirement for those numerics as their visible labels have only a single letter as a tex:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-numerictextbox>.k-input-inner | `aria-label` | Must provide information about the numeric input purpose - the name of the chanel it is aimed at (`red chanel`, `green chanel`, `blue chanel`, or `alpha chanel`). |

## Section 508


The ColorGradient is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor ColorGradient Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/colorgradient/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})
