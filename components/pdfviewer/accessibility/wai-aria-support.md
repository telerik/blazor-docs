---
title: Wai-Aria Support
page_title: Telerik UI for Blazor PDFViewer Documentation | PDFViewer Accessibility
description: "Get started with the Telerik UI for Blazor PDFViewer and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: pdfviewer-wai-aria-support 
position: 50 
---

# Blazor PDFViewer Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor PDF Viewer provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The PDF Viewer is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The PDF Viewer component contains two inner elements - a toolbar and a page container.

[ToolBar accessibility specification]({{toolbar_a11y_link}})

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-pdfviewer .k-canvas` | `tabindex=0` | Defines the focusable page container element. |
|  | `aria-label` | Describes the purpose of the focusable container. Translatable message. |
|  | `role=document` | Defines that content should be evaluated in reader mode by assistive technologies. |
| `.k-pdfviewer .k-toolbar .k-button:has(.k-svg-i-search, .k-i-search)` | `aria-haspopup=dialog` | Describes that the Search tool button opens a dialog element. |
| `.k-pdfviewer .k-canvas .k-search-panel` | `role=dialog` | Describes the role of the Search panel. |
|  | `aria-label` | Translatable message, same label as the one, used to describe the Toolbar Search tool. |

## Section 508


The PDF Viewer is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The PDF Viewer has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The PDF Viewer has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the keyboard navigation works in Telerik UI for Blazor, refer to the [Accessibility Overview](slug://accessibility-overview#keyboard-navigation) article.

## See Also

* [Blazor PDFViewer Demos](https://demos.telerik.com/blazor-ui/pdfviewer/overview)
* [Accessibility in Telerik UI for Blazor](slug://accessibility-overview)