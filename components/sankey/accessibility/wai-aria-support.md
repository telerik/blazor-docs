---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Sankey Documentation | Sankey Accessibility
description: "Get started with the Telerik UI for Blazor Sankey and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: sankey-wai-aria-support 
position: 50 
---

# Blazor Sankey Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor Sankey provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Sankey is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Sankey Chart is an interactive Graphics Document (https://www.w3.org/TR/graphics-aria-1.0/#graphics-document). All actions available for mouse users are also available via keyboard shortcuts.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-sankey` | `role=graphics-document` | Indicates that the Sankey element is a Graphics Document. |
|  | `aria-roledescription` | User-set value that clarifies the type of Chart to screen reader users. |
|  | `aria-label` | Announces the user-set title of the Sankey Chart. |
| `.k-sankey-node` | `role=graphics-symbol` | Specifies the role of the Sankey node elements. |
|  | `aria-roledescription=Node` | Describes the role of the Sankey node elements. |
| `.k-sankey-legend-item` | `role=checkbox` | Specifies the role of the legend item element. |
|  | `aria-label` | Specifies the name of the node associated with this legend item. |
|  | `aria-roledescription=Legend item` | Specifies the name of the node associated with this legend item. |

## Resources

[WAI-ARIA Graphics Module](https://www.w3.org/TR/graphics-aria-1.0/)

[Accessibility Style Guide: SVGs](https://a11y-style-guide.com/style-guide/section-media.html#kssref-media-svgs)

## Section 508


The Sankey is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Sankey has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Sankey has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the keyboard navigation works in Telerik UI for Blazor, refer to the [Accessibility Overview]({%slug accessibility-overview%}#keyboard-navigation) article.

## See Also

* [Blazor Sankey Demos](https://demos.telerik.com/blazor-ui/sankey/overview)
* [Accessibility in Telerik UI for Blazor]({%slug accessibility-overview%})