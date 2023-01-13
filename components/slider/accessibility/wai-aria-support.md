---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Slider Documentation | Slider  Accessibility
description: "Get started with the Telerik UI for Blazor Slider and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: slider-wai-aria-support 
position: 50 
---

# Blazor Slider Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor Slider component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

### Slider Drag Handle

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-draghandle | `role=slider` | Sets the proper role for Slider. |
|  | `aria-label` or `aria-labelledby` or `title` | The Slider needs an accessible name to be assigned to it. |
|  | `aria-valuetext` | Specifies the text that would be announced based on the currently selected value in the Slider. |
|  | `aria-readonly=true` | Attribute is rendered only when the Slider is readonly. |
|  | `aria-invalid=true` | Attribute is rendered only when the Slider is in form and announces the valid state of the component. |
|  | `tabindex=0` | The element must be focusable. |
| .k-draghandle:not(.k-hsv-draghandle) | `aria-valuenow` | Specifies the currently selected value in the Slider. |
|  | `aria-valuemin` | Specifies the minimum available value in the Slider. |
|  | `aria-valuemax` | Specifies the maximum available value in the Slider. |
| .k-slider-vertical .k-draghandle | `aria-orientation=vertical` | Present only when slider is vertical. |
| .k-disabled .k-draghandle | `aria-disabled=true` | Attribute is rendered only when the Slider is disabled. |

> Note that using an `<a>` element for `role="slider"` is not allowed.

### Slider Buttons


When present, the Slider Buttons must implement the specification for the **Button** component.

[Button accessibility specification]({{button_a11y_link}})

## Resources

[WAI-ARIA specification for slider](https://www.w3.org/TR/wai-aria-1.2/#slider)

## Section 508


The Slider is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Slider Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/slider/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})