---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Carousel Documentation - Carousel  Accessibility
description: "Get started with the Telerik UI for Blazor Carousel and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: carousel-wai-aria-support
position: 50
---

# Blazor Carousel Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor Carousel component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-scrollview | `role=application` | Specifies the role of the Carousel element. |
|  | `aria-roledescription=carousel` | Clarifies the role of the Carousel element. |
|  | `tabindex=0` | Carousel element must be focusable. |
| .k-scrollview-wrap | `role=list` | Clarifies the scrollview wrap as a list of items (images). |
| .k-scrollview>.k-sr-only | `aria-live=polite` | Identifies a hidden element as a live region in the `polite` state, meaning assistive technology users are informed about changes to the region at the next available opportunity. |
|  | `aria-live=off` | Identifies a hidden element as a live region that is in the `off` state, meaning assistive technology users are not informed about changes to the region. |
| .k-scrollview-wrap>* | `role=listitem` | Specifies the role of each Carousel item. |
|  | `aria-roledescription=slide` | Clarifies the role of the Carousel item. |
| .k-scrollview-prev,.k-scrollview-next | `role=button` or `nodeName=button` | Specifies the role of the element as a Button. |
|  | `aria-label` | Specifies label for the Previous/Next button. |
|  | `aria-controls=.k-scrollview-wrap id` | Points to the id of the items container element. |

## Resources

[ARIA Practices: Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)

[ARIA Practices: Carousel Example with Buttons](https://www.w3.org/WAI/ARIA/apg/example-index/carousel/carousel-1-prev-next.html)

## Section 508


The Carousel is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Carousel Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/carousel/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})
