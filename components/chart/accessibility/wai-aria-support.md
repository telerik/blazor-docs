---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Chart Documentation | Chart Accessibility
description: "Get started with the Telerik UI for Blazor Chart and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: chart-wai-aria-support 
position: 50 
---

# Blazor Chart Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

Out of the box, the Telerik UI for Blazor Chart provides accessibility support to enable users with disabilities to have better awareness of its features.

The Chart is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### Chart Wrapping Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-foo` | `role=foo` | The element should follow the `foo` specification. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |

## Resources

[WAI ARIA specification for combobox](https://www.w3.org/TR/wai-aria-1.2/#combobox)

[ARIA practices Date Picker Dialog Example](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/datepicker-dialog.html)

## Section 508

The Chart is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The Chart has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Chart has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

## See Also

* [Blazor Chart Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/chart/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})
