---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Signature Documentation | Signature Accessibility
description: "Get started with the Telerik UI for Blazor Signature and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: signature-wai-aria-support 
position: 50 
---

# Blazor Signature Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor Signature provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Signature is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### Signature canvas

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-signature-canvas` | `role=img` | Sets canvas `role` to `img`. |
| `.k-signature-canvas` | `aria-label` | Announces the purpose of the Signature. |
| `.k-signature-canvas:nth-child(1)` | `tabindex=0` | Makes the Signature canvas the first focusable element. |

### Signature action buttons

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-signature-action` | `nodeName=button` | Renders button. |
| `.k-signature-action` | `aria-label` | Announces the purpose of the button. |

## Section 508


The Signature is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Signature has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Signature has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the keyboard navigation works in Telerik UI for Blazor, refer to the [Accessibility Overview]({%slug accessibility-overview%}#keyboard-navigation) article.

## See Also

* [Blazor Signature Demos](https://demos.telerik.com/blazor-ui/signature/overview)
* [Accessibility in Telerik UI for Blazor]({%slug accessibility-overview%})