---
title: Wai-Aria Support
page_title: Telerik UI for Blazor DockManager Documentation | DockManager Accessibility
description: "Get started with the Telerik UI for Blazor DockManager and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: dockmanager-wai-aria-support 
position: 50 
---

# Blazor DockManager Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)



Out of the box, the Telerik UI for Blazor DockManager provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The DockManager is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The DockManager component consists of multiple inner panes, each containing tools, tabs, and content that can be resized, rearranged, and interacted with.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-dock-manager` | `role=application` | Indicates that the DockManager has its own keyboard navigation implemented. |
|  | `aria-live=polite` | Defines dynamic content changes within the DockManager container that need to be announced by screen readers. |
| `.k-dock-navigator` | `aria-hidden=true` | The navigator needs to be hidden from the readers as it appears only on drag. |

### DockManager Toolbar


The Toolbar in the DockManager element of the component should implement the specification for the **Toolbar** component.

[Toolbar accessibility specification]({{Toolbar_a11y_link}})

### DockManager TabStrip


The TabStrip in the DockManager element of the component should implement the specification for the **TabStrip** component.

[TabStrip accessibility specification]({{TabStrip_a11y_link}})

### DockManager Splitter


The Splitter in the DockManager element of the component should implement the specification for the **Splitter** component.

[Splitter accessibility specification]({{Splitter_a11y_link}})

### DockManager Window


The Window elements in the DockManager element of the component should implement the specification for the **Window** component.

[Window accessibility specification]({{Window_a11y_link}})

## Section 508


The DockManager is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The DockManager has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The DockManager has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



## Keyboard Navigation

For details on how the keyboard navigation works in Telerik UI for Blazor, refer to the [Accessibility Overview](slug:accessibility-overview#keyboard-navigation) article.

## See Also

* [Blazor Dock Manager Demos](https://demos.telerik.com/blazor-ui/dockmanager/overview)
* [Accessibility in Telerik UI for Blazor](slug:accessibility-overview)