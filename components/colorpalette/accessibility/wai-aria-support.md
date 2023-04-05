---
title: Wai-Aria Support
page_title: Telerik UI for Blazor ColorPalette Documentation - ColorPalette  Accessibility
description: "Get started with the Telerik UI for Blazor ColorPalette and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: colorpalette-wai-aria-support
position: 50
---

# Blazor ColorPalette Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor ColorPalette component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-colorpalette | `role=grid` | The focusable wrapper of the component should announce its role as a `grid`. |
|  | `aria-label` or `aria-labelledby` | The component needs an accessible name to be assigned to it. Must also include the currently selected value in the component. |
|  | `aria-activedescendant=.k-colorpalette-tile.k-focus id` | Points to the focused cell in the table. The focused cell is changed via keyboard navigation. |
|  | `tabindex=0` | The element must be focusable. |
| .k-colorpalette.k-disabled | `aria-disabled=true` | Attribute is rendered only when the ColorPalette is disabled. |
| .k-colorpalette-table | `role=none/presentation` | Negates the default role of the element, as it is wrapped within a `role="grid"` element. |
| .k-colorpalette-table>tbody>tr | `role=row` | Required as the semantic role of its parent `<table>` has been removed. |
| .k-colorpalette-tile | `role=gridcell` | Required as the semantic role of its parent `<table>` has been removed. |
|  | `aria-label` or `title` | The text representation of the color value for the current cell. |
| .k-colorpalette-tile.k-selected | `aria-selected=true` | Present on the currently selected cell in the component. |

## Section 508


The ColorPalette is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor ColorPalette Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/colorpalette/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})
