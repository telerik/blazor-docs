---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Pager Documentation | Pager  Accessibility
description: "Get started with the Telerik UI for Blazor Pager and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: pager-wai-aria-support 
position: 50 
---

# Blazor Pager Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor Pager component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-pager | `role=application` | Indicates that the Pager element has its own keyboard navigation implemented. |
|  | `aria-roledescription=pager` | Clarifies the role of the Pager. |
|  | `aria-keyshortcuts=Enter ArrowRight ArrowLeft` | Announces the available keyboard shortcuts while the Pager element is focused. |
|  | `aria-label` | Announces the currently selected page and the number of available pages. |
|  | `aria-controls` | Points to the id of the element that is being controlled - for example a Grid. |
| .k-pager-nav | `role=button` or `nodeName=button` | Specifies the role of the element. |
|  | `aria-disabled=true` | Present when the arrow button is disabled (for example, present on the Previous button when the current page is the 1st one). |
|  | `title` | Specifies the purpose of each button. |
| .k-pager-numbers>.k-link | `role=button` or `nodeName=button` | Specifies the role of the element. |
|  | `aria-label` or `title` | Specifies the purpose of each link (for example "Page 6"). |
|  | `aria-current=page` | The attribute must be present on the currently selected page element. |
| .k-pager-sizes>.k-dropdownlist | `aria-label` | The element needs an `aria-label` specifying its purpose. |
| .k-pager-numbers-wrap>.k-dropdown | `aria-label` | The element needs an `aria-label` specifying its purpose. |
| .k-pager-input>.k-input>.k-input-inner | `aria-label` | The element needs an `aria-label` specifying its purpose. |


The PageSize select should be implemented as a DropDownList component with no filtering, or a native `<select>` element.


The Page select, which is present for mobile devices/smaller screens where there is not enough place for all page links, must be a native `<select>` element.

## Resources

[WAI-ARIA specification for navigation](https://www.w3.org/TR/wai-aria-1.2/#navigation)

## Section 508


The Pager is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Pager Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})