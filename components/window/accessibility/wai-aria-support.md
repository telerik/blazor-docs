---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Window Documentation - Window  Accessibility
description: "Get started with the Telerik UI for Blazor Window and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: window-wai-aria-support
position: 50
---

# Blazor Window Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor Window component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-window | `role=dialog` | Announces the dialog role of the component. |
|  | `aria-labelledby=.k-window-title id` | Associate the title of the dialog. |
| .k-overlay + .k-window | `aria-modal=true` | Announces that the dialog is modal. Attribute is added only when the dialog is modal. |


Action buttons follow the **Button** specification.

[Button accessibility specification]({{button_a11y_link}})

## Resources

[ARIA practices Modal Dialog Example](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/dialog)

## Section 508


The Window is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Window Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/window/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})
