---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Form Documentation | Form Accessibility
description: "Get started with the Telerik UI for Blazor Form and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: form-wai-aria-support 
position: 50 
---

# Blazor Form Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor Form provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Form is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### Form Component


The Form component provides a structured way to collect user inputs. It is designed to ensure accessibility and usability for all users, including those with disabilities.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-form` | `role=form` or `nodeName=form` | Omitted if the `<form>` DOM element is used. |

### Input elements


The Form field input element of the component should indicate if it is required and announce any hints or error messages.

## Section 508


The Form is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Form has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Form has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the keyboard navigation works in Telerik UI for Blazor, refer to the [Accessibility Overview]({%slug accessibility-overview%}#keyboard-navigation) article.

## See Also

* [Blazor Form Demos](https://demos.telerik.com/blazor-ui/form/overview)
* [Accessibility in Telerik UI for Blazor]({%slug accessibility-overview%})