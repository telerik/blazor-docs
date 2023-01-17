---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Toolbar Documentation | Toolbar  Accessibility
description: "Get started with the Telerik UI for Blazor Toolbar and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: toolbar-wai-aria-support 
position: 50 
---

# Blazor Toolbar Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor ToolBar component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-toolbar | `role=toolbar` | The component role. |
|  | `aria-label` or `aria-labelledby` | Must be supplied on each ToolBar only when the application contains more than one ToolBar. |

## Resources

[ARIA-ARIA specification for toolbar](https://www.w3.org/TR/wai-aria-1.2/#toolbar)

## Section 508


The ToolBar is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Toolbar Accessibility and Keyboard Navigation (Demo)](https://demos.telerik.com/blazor-ui/toolbar/keyboard-navigation)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})