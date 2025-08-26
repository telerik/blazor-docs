---
title: WAI-ARIA Support
page_title: Chat WAI-ARIA Support
slug: chat-wai-aria-support
position: 10
description: Learn about WAI-ARIA accessibility support in the Telerik UI for Blazor Chat component, including ARIA roles, attributes, and screen reader compatibility.
tags: telerik,blazor,chat,accessibility,wai-aria
published: True
---

# WAI-ARIA Support in Telerik UI for Blazor Chat

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

Out of the box, the Telerik UI for Blazor Chat provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Chat is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## ARIA Roles
- `role="log"` for the message list
- `role="textbox"` for the input area
- `role="button"` for actionable elements (send, upload, speech-to-text)

## ARIA Attributes
- `aria-live` for dynamic message updates
- `aria-label` and `aria-labelledby` for descriptive labeling
- `aria-disabled` for disabled actions

## Section 508

The Chat is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The Chat has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Chat has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

## Keyboard Navigation

For details on how the keyboard navigation works in Telerik UI for Blazor, refer to the [Accessibility Overview](slug:accessibility-overview#keyboard-navigation) article.

## See Also

* [Blazor Chat Demos](https://demos.telerik.com/blazor-ui/chat/overview)
* [Accessibility in Telerik UI for Blazor](slug:accessibility-overview)
