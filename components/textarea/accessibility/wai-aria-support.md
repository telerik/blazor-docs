---
title: Wai-Aria Support
page_title: Telerik UI for Blazor TextArea Documentation | TextArea  Accessibility
description: "Get started with the Telerik UI for Blazor TextArea and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: textarea-wai-aria-support 
position: 50 
---

# Blazor TextArea Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor TextArea component is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-input-inner | `role=textbox` or `nodeName=textarea` | Describes the role of the component. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-multiline=true` | Announces the multiline behaviour of the textarea. |
|  | `aria-invalid=true` | Attribute is rendered only when the textarea is in form and announces the valid state of the component. |
| .k-disabled .k-input-inner | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the textarea is disabled. |

## Resources

[WAI-ARIA specification for textbox](https://www.w3.org/TR/wai-aria-1.2/#textbox)

## Section 508


The TextArea is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor TextArea Overview (Demo)](https://demos.telerik.com/blazor-ui/textarea/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})