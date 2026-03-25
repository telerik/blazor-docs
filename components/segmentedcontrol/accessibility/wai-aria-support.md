---
title: Wai-Aria Support
page_title: Telerik UI for Blazor SegmentedControl Documentation | SegmentedControl Accessibility
description: "Get started with the Telerik UI for Blazor SegmentedControl and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag
slug: segmentedcontrol-wai-aria-support 
position: 50 
tag: new
---

# Blazor SegmentedControl Accessibility

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)


Out of the box, the Telerik UI for Blazor SegmentedControl provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The SegmentedControl is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-segmented-control` | `role=group` | Indicates that the component is a group of related buttons representing mutually exclusive options. |
| `.k-segmented-control-thumb` | `aria-hidden=true` | The animated selection indicator (thumb) is hidden from assistive technologies as it is purely decorative. |
| `.k-segmented-control-button` | `role=button` | Each option is rendered as a `<button>` HTML element. |
|  | `type=button` | Prevents the button from submitting a form when clicked. |
| `.k-segmented-control-button.k-selected` | `aria-pressed` | Indicates that the button is the currently selected option. |
| `.k-segmented-control-button-icon` | `aria-hidden=true` | Icon elements inside buttons are hidden from assistive technologies when accompanied by visible text. |

Disabled items use the native `disabled` attribute so they are excluded from the tab sequence and cannot be activated.

## Resources

[WAI-ARIA Specification for the Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

[WAI-ARIA Specification for the `group` role](https://www.w3.org/TR/wai-aria-1.2/#group)

## Section 508

The SegmentedControl is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The SegmentedControl has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The SegmentedControl has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

## Keyboard Navigation

The Blazor SegmentedControl supports the following keyboard shortcuts:

| Key | Action |
| --- | ------ |
| `Tab` | Move focus to the next item in the group. |
| `Shift` + `Tab` | Move focus to the previous item in the group. |
| `Space` / `Enter` | Activate the focused item. |

## See Also

* [Accessibility in Telerik UI for Blazor](slug:accessibility-overview)
* [SegmentedControl Overview](slug:segmentedcontrol-overview)
