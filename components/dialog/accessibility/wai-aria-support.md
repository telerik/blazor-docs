---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Dialog Documentation | Dialog  Accessibility
description: "Get started with the Telerik UI for Blazor Dialog and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: dialog-wai-aria-support 
position: 50 
---

# Blazor Dialog Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



The Telerik UI for Blazor Dialog component is [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

### Dialog component

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-dialog | `role=dialog` | Announces the dialog role of the component. |
|  | `aria-labelledby=.k-dialog-titlebar id` | Associate the title of the dialog. |
|  | `aria-describedby=.k-dialog-content id` | Associate the dialog content to the wrap element. |
| .k-overlay + .k-dialog | `aria-modal=true` | Announces that the dialog is modal. Attribute is added only when the dialog is modal. |

### Predefined dialogs

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-dialog.k-prompt,.k-dialog.k-alert,.k-dialog.k-confirm | `role=alertdialog` | Announces the dialog role of the component. |

## Resources

[ARIA practices Modal Dialog Example](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/dialog)

## Section 508


The Dialog is compliant with the [Section 508](http://www.section508.gov/) requirements

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

* [Blazor Dialog Overview (Demo)](https://demos.telerik.com/blazor-ui/dialog/overview)
* [Accessibility in Telerik UI for Blazor]({% slug accessibility-overview %})
* [Accessibility Theme]({% slug themes-accessibility-swatch %})