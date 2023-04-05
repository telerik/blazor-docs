---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Signature Documentation - Signature  Accessibility
description: "Get started with the Telerik UI for Blazor Signature and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: signature-wai-aria-support
position: 50
---

# Blazor Signature Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor Signature component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

### Signature canvas

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-signature-canvas | `role=img` | Sets canvas `role` to `img`. |
| .k-signature-canvas | `aria-label` | Announces the purpose of the Signature. |
| .k-signature-canvas:nth-child(1) | `tabindex=0` | Makes the Signature canvas the first focusable element. |

### Signature action buttons

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-signature-action | `nodeName=button` | Renders button. |
| .k-signature-action | `aria-label` | Announces the purpose of the button. |

## Section 508


The Signature is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Signature Overview (Demo)](https://demos.telerik.com/blazor-ui/signature/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})
