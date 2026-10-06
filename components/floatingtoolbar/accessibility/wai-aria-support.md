---
title: Wai-Aria Support
page_title: Telerik UI for Blazor Floating Toolbar Documentation | Floating Toolbar Accessibility
description: "Get started with the Telerik UI for Blazor Floating Toolbar and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: floatingtoolbar-wai-aria-support
position: 50
---

# Blazor Floating Toolbar Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

The Telerik UI for Blazor Floating Toolbar inherits the accessibility behavior of the [ToolBar](slug:toolbar-wai-aria-support). It supports keyboard navigation, roving tabindex, accessible tool roles and states, and right-to-left navigation.

The Floating Toolbar is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements. It follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for the `toolbar` role.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements.

| Selector | Attribute | Usage |
| --- | --- | --- |
| Floating Toolbar hosted element | `role=toolbar` | Identifies the component as a toolbar. |
|  | `aria-label` or `aria-labelledby` | Provides an accessible name. Set `AriaLabel` when the surrounding context does not provide an accessible name. |
| Overflow menu button | `aria-haspopup=menu` | Indicates that the button opens an overflow menu. |
|  | `aria-expanded=true/false` | Indicates whether the overflow menu is open. |
|  | `aria-controls` | Identifies the overflow content that the button controls. |
|  | `aria-label` or `title` | Provides a descriptive name for an icon-only overflow button. |
| Overflow menu | `role=menu` | Identifies the wrapper of overflowed tools. |
| Drag handle | Accessible name | Identifies the handle that starts pointer drag or keyboard Move mode when `Draggable` is `true`. |

## Resources

[WAI-ARIA Specification for the ToolBar](https://www.w3.org/TR/wai-aria-1.2/#toolbar)

## Section 508

The Floating Toolbar is compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The Floating Toolbar is tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

## Keyboard Navigation

The Floating Toolbar inherits the ToolBar keyboard navigation behavior:

| Shortcut | Behavior |
| --- | --- |
| `Tab` and `Shift+Tab` | Moves focus into or out of the toolbar through its current roving-tabindex element. |
| `ArrowLeft` and `ArrowRight` | Moves focus between toolbar controls. The direction follows right-to-left behavior when applicable. |
| `Home` and `End` | Moves focus to the first or last reachable toolbar control. |

When `Draggable` is `true`, the focused drag handle supports keyboard Move mode:

| Shortcut | Behavior |
| --- | --- |
| `M` | Fires `OnDragStart` and enters Move mode unless the event is canceled. |
| Arrow keys | Repositions the Floating Toolbar in the selected direction while Move mode is active. |
| `Enter` | Commits the position, fires `OnDragEnd`, and exits Move mode. |

## See Also

* [Floating Toolbar Overview](slug:floatingtoolbar-overview)
* [Floating Toolbar Drag Support](slug:floatingtoolbar-drag-and-drop)
* [ToolBar Accessibility](slug:toolbar-wai-aria-support)
* [Accessibility in Telerik UI for Blazor](slug:accessibility-overview)