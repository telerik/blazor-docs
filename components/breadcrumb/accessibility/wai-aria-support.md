---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Breadcrumb Documentation | Breadcrumb  Accessibility
description: "Get started with the Telerik UI for Blazor Breadcrumb and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: breadcrumb-wai-aria-support 
position: 50 
---

# Blazor Breadcrumb Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor Breadcrumb provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Breadcrumb is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.1  AA](https://www.w3.org/TR/WCAG21/) standards](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Breadcrumb component renders the semantic `nav` html element that automatically associated navigation role.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-breadcrumb` | `aria-label=Breadcrumb` | Indicates the type of navigation provided by the `nav` element. |
| `.k-breadcrumb-item .k-breadcrumb-link,.k-breadcrumb-item .k-breadcrumb-root-link` | `role=link` or `nodeName=a` | The breadcrumb item should render either an `<a>` element, or should have `role="link"` assigned. |
| `.k-breadcrumb-last-item .k-breadcrumb-link,.k-breadcrumb-last-item .k-breadcrumb-root-link` | `aria-current=page` | The last breadcrumb item that points to the active page should have `aria-current="page"`. |
| `.k-breadcrumb-last-item .k-breadcrumb-link` | `aria-disabled=true` | Indicates that the last breadcrumb item is disabled. |
| `.k-breadcrumb-delimiter-icon` | `aria-hidden=true` | The breadcrumb delimiter icon should not be accessed through assistive technology. |

## Resources

[ARIA practices: BreadCrumb Example](https://www.w3.org/WAI/ARIA/apg/example-index/breadcrumb/index.html)

## Section 508


The Breadcrumb is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Breadcrumb has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Breadcrumb has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## See Also

* [Blazor Breadcrumb Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/breadcrumb/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})