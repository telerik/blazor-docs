---
title: Wai-Aria Support
page_title: Telerik UI for Blazor RangeSlider Documentation - RangeSlider  Accessibility
description: "Get started with the Telerik UI for Blazor RangeSlider and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: rangeslider-wai-aria-support
position: 50
---

# Blazor RangeSlider Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor RangeSlider component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

[Slider accessibility specification]({{slider_a11y_link}})


The two focusable elements of the RangeSlider must implement the specification for the **Slider** component. Here is just one clarification for the use of `aria-valuetext` attribute:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-draghandle | `aria-valuetext` | Specifies the text that would be announced based on the currently selected values in both handle elements (e.g. `aria-valuetext="10 - 50"`). |

## Resources

[WAI-ARIA specification for Slider](https://www.w3.org/TR/wai-aria-1.2/#slider)

## Section 508


The RangeSlider is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor RangeSlider Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/rangeslider/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})
