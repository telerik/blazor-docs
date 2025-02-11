---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Card Documentation | Card Accessibility
description: "Get started with the Telerik UI for Blazor Card and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: card-wai-aria-support 
position: 50 
---

# Blazor Card Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor Card provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Card is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### Card Component


The Card component is a UI container with styles for organized content. It does not have WAI ARIA and keyboard navigation unless used in a Card List.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-card-list .k-card` | `role=listitem` | When the card is located in a list, it should accept the listitem role. |
|  | `tabindex=0` | The card component is focusable. By enabling navigatable setting in the card component, it is focusable and all inner elements are not until Enter key is pressed. |
|  | `aria-describedby=.k-card-title id` | Associate the card to the title element when going through the cards. |
|  | `aria-keyshortcuts=Enter` | Announces the bound Enter key for the Card component that will enable the navigation inside the card. |

## Section 508


The Card is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Card has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Card has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the keyboard navigation works in Telerik UI for Blazor, refer to the [Accessibility Overview](slug:accessibility-overview#keyboard-navigation) article.

## See Also

* [Blazor Card Demos](https://demos.telerik.com/blazor-ui/card/overview)
* [Accessibility in Telerik UI for Blazor](slug:accessibility-overview)