---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Breadcrumb Documentation | Breadcrumb  Accessibility
description: "Get started with the Telerik UI for Blazor Breadcrumb and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: breadcrumb-wai-aria-support 
position: 50 
---

# Blazor Breadcrumb Accessibility



The Telerik UI for Blazor Breadcrumb component is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria


The Breadcrumb component renders the semantic `nav` html element that automatically associated navigation role.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-breadcrumb | `aria-label=Breadcrumb` | Indicates the type of navigation provided by the `nav` element. |
| .k-breadcrumb-item .k-breadcrumb-link,.k-breadcrumb-item .k-breadcrumb-root-link | `role=link` or `nodeName=a` | The breadcrumb item should render either an `<a>` element, or should have `role="link"` assigned. |
| .k-breadcrumb-last-item .k-breadcrumb-link,.k-breadcrumb-last-item .k-breadcrumb-root-link | `aria-current=page` | The last breadcrumb item that points to the active page should have `aria-current="page"`. |
| .k-breadcrumb-last-item .k-breadcrumb-link | `aria-disabled=true` | Indicates that the last breadcrumb item is disabled. |
| .k-breadcrumb-delimiter-icon | `aria-hidden=true` | The breadcrumb delimiter icon should not be accessed through assistive technology. |

## Resources

[ARIA practices: BreadCrumb Example](https://www.w3.org/WAI/ARIA/apg/example-index/breadcrumb/index.html)

## Section 508


The Breadcrumb is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Breadcrumb Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/breadcrumb/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug accessibility-swatch %})