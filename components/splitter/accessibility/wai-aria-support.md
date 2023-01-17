---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Splitter Documentation | Splitter  Accessibility
description: "Get started with the Telerik UI for Blazor Splitter and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: splitter-wai-aria-support 
position: 50 
---

# Blazor Splitter Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor Splitter component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

### Slitter Pane

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-pane | `role=group` | Sets the proper role for the Splitter pane that identifies a set of user interface objects that is not intended to be included in the page's summary or table of contents. |

> Note: The value of the `aria-label` attribute of the split-bar elements will be provided to their respective preceding pane element through the API.

### SplitBar

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-splitbar | `role=separator` | Sets the proper role for the Splitter split-bar element. |
|  | `aria-label` | An accessible name, with aria-label should be included if there is more than one focusable separator. The value is set through the corresponding SplitterPane API. |
| .k-splitbar-horizontal | `aria-orientation=vertical` | When a splitbar separates two panes horizontally, its aria-orientation must be explicitly set to 'vertical'. |

> Note: Setting the value-now attribute of the separator element is not applicable, as the Splitter is a complex layout component allowing splitting the content into multiple panes across any number and level of nested Splitters and panes, thus announcing a value would not convey any meaningful information.

## Resources

[WAI-ARIA specification for separator](https://www.w3.org/TR/wai-aria-1.2/#separator)

[MDN reference for the separator role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role)

## Section 508


The Splitter is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Splitter Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/splitter/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})