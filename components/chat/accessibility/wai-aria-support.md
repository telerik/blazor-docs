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

The Chat component implements WAI-ARIA roles and attributes to ensure accessibility for users with assistive technologies.

## ARIA Roles
- `role="log"` for the message list
- `role="textbox"` for the input area
- `role="button"` for actionable elements (send, upload, speech-to-text)

## ARIA Attributes
- `aria-live` for dynamic message updates
- `aria-label` and `aria-labelledby` for descriptive labeling
- `aria-disabled` for disabled actions

## Screen Reader Support
- All messages, actions, and input areas are announced
- Status indicators and quick actions are accessible

## Keyboard Navigation
- Tab, arrow keys, and shortcuts are supported for navigation and actions

## Compliance
- Designed to meet WCAG 2.1 AA requirements
- Tested with NVDA and JAWS

Refer to the [Accessibility Overview](./overview.md) for more details.
