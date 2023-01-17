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



The Telerik UI for Blazor Tooltip component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-tooltip | `role=tooltip` | Specifies the tooltip role of the tooltip container. |
|  | `id` | The element needs an id to be associated with the aria-describedby attribute of the trigger element. |
|  | `aria-describedby=.k-tooltip id` | Link the tooltip trigger/anchor element with its corresponding tooltip container. |

## Resources

[WAI-ARIA specification for tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

[MDN description for tooltip role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)

## Section 508


The Tooltip is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Tooltip Overview (Demo)](https://demos.telerik.com/blazor-ui/tooltip/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})