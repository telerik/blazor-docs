---
title: Events
page_title: Dialog - Events
description: Events of the Dialog for Blazor.
slug: dialog-events
tags: telerik,blazor,dialog,events
published: True
position: 10
components: ["dialog"]
---

# Dialog Events

This article explains the events available in the Telerik Dialog for Blazor:

* [VisibleChanged](#visiblechanged)

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async) 


## VisibleChanged

You can use the `VisibleChanged` event to get notifications when the user tries to close the Dialog. You can effectively cancel the event by *not* propagating the new visibility state to the variable the `Visible` property is bound to. This is the way to cancel the event and keep the dialog open.

>caption React to the user closing the Dialog.

<demo metaUrl="client/dialog/events/closing-2/" height="420"></demo>

>caption Prevent the user from closing the Dialog based on a condition.

<demo metaUrl="client/dialog/events/prevent-close-1/" height="420"></demo>


## See Also

* [Focus TextBox on Dialog Open](slug:window-kb-focus-button-textbox-on-open)
