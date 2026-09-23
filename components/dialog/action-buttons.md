---
title: Action Buttons
page_title: Dialog Action Buttons
description: How to setup action buttons of the Dialog for Blazor. Use different button layouts.
slug: dialog-action-buttons
tags: telerik,blazor,dialog,action,buttons
published: True
position: 7
components: ["dialog"]
---

# Dialog Action Buttons

The Dialog provides a dedicated area for action buttons. They enable the application to provide specific interaction to users.

To specify action buttons in the Dialog, use the `DialogButtons` tag.

## Button Layout

The Dialog action buttons can render in a few different layout configurations. This depends on the `ButtonsLayout` parameter of the component. It expects a member of the `DialogButtonsLayout` enum:

* `Start`
* `Center`
* `End`
* `Stretched` (default value)

## Example

The following example demonstrates all supported layout options for the Dialog action buttons.

>caption Using Dialog ButtonsLayout

<demo metaUrl="client/dialog/action-buttons/button-layout-1/" height="420"></demo>

## See Also

* [(KB) Keep Content in the DOM When the Window Is Closed](slug:window-kb-keep-content-when-closed)
