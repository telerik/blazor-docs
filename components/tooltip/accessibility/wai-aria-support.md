---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Tooltip Documentation | Tooltip  Accessibility
description: "Get started with the Telerik UI for Blazor Tooltip and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: tooltip-wai-aria-support 
position: 50 
---

# Blazor Tooltip Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor Tooltip provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Tooltip is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.1  AA](https://www.w3.org/TR/WCAG21/) standards](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-tooltip` | `role=tooltip` | Specifies the tooltip role of the tooltip container. |
|  | `id` | The element needs an id to be associated with the aria-describedby attribute of the trigger element. |
|  | `aria-describedby=.k-tooltip id` | Link the tooltip trigger/anchor element with its corresponding tooltip container. |

## Resources

[WAI-ARIA specification for tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

[MDN description for tooltip role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)

## Section 508


The Tooltip is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Tooltip has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Tooltip has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## See Also

* [Blazor Tooltip Overview (Demo)](https://demos.telerik.com/blazor-ui/tooltip/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})