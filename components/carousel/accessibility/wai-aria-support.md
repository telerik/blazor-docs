---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Carousel Documentation | Carousel Accessibility
description: "Get started with the Telerik UI for Blazor Carousel and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: carousel-wai-aria-support 
position: 50 
---

# Blazor Carousel Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor Carousel provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Carousel is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-scrollview` | `role=application` | Specifies the role of the Carousel element. |
|  | `aria-roledescription=carousel` | Clarifies the role of the Carousel element. |
|  | `tabindex=0` | Carousel element must be focusable. |
| `.k-scrollview-wrap` | `role=list` | Clarifies the scrollview wrap as a list of items (images). |
| `.k-scrollview-nav-wrap>.k-scrollview-nav .k-button` | `aria-label` | The buttons need an accessible name |
| `.k-scrollview>.k-sr-only` | `aria-live=polite` | Identifies a hidden element as a live region in the `polite` state, meaning assistive technology users are informed about changes to the region at the next available opportunity. |
|  | `aria-live=off` | Identifies a hidden element as a live region that is in the `off` state, meaning assistive technology users are not informed about changes to the region. |
| `.k-scrollview-wrap>*` | `role=listitem` | Specifies the role of each Carousel item. |
|  | `aria-roledescription=slide` | Clarifies the role of the Carousel item. |
| `.k-scrollview-prev,.k-scrollview-next` | `role=button` or `nodeName=button` | Specifies the role of the element as a Button. |
|  | `aria-label` | Specifies label for the Previous/Next button. |
|  | `aria-controls=.k-scrollview-wrap id` | Points to the id of the items container element. |

## Resources

[ARIA Practices: Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)

[ARIA Practices: Carousel Example with Buttons](https://www.w3.org/WAI/ARIA/apg/example-index/carousel/carousel-1-prev-next.html)

## Section 508


The Carousel is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Carousel has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Carousel has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the Carousel keyboard navigation works, refer to the [Blazor Carousel Accessibility and Keyboard Navigation Demo](https://demos.telerik.com/blazor-ui/carousel/keyboard-navigation).

## See Also

* [Accessibility in Telerik UI for Blazor](slug://accessibility-overview)