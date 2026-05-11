---
title: Detect When the User Closes a Notification
description: Learn how to detect a user-initiated close action in Telerik Notification for Blazor by using a custom close button in the Notification template.
type: how-to
page_title: How to Detect When the User Closes a Notification
slug: notification-kb-detect-user-close
tags: telerik, blazor, notification, close, template
ticketid: 1711522
res_type: kb
components: ["notification"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Notification for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How can you detect when a user closes a Telerik Notification for Blazor?
* Is there an `OnClose` event in the Notification component?

## Solution

The Notification does not expose an `OnClose` event. To detect a close action from the user, use a custom close button in the Notification template:

1. Hide the built-in close button by setting `Closable` to `false`.
1. Add a custom **Close** button in the [Notification `Template`](slug:notification-templates) and handle its `@onclick` event.
1. In the click handler, call [`Hide(model)`](slug:notification-open-close-hide#hide) for the current `NotificationModel`.

This approach allows you to detect the user action in the custom button click handler and then close only that notification instance.

>caption Detect user close action in a Notification template

````RAZOR
<TelerikButton OnClick="@ShowNotification">Show Notification</TelerikButton>

<TelerikNotification @ref="@NotificationRef">
    <Template>
        <div style="display:flex; align-items:center; gap:.75rem;">
            <span>@context.Text</span>
            <button type="button"
                    style="margin-left:auto;"
                    aria-label="Close notification"
                    @onclick="@( () => OnCloseClicked(context) )">
                ✕
            </button>
        </div>
    </Template>
</TelerikNotification>

@if (CloseLog.Count > 0)
{
    <ul>
        @foreach (var logEntry in CloseLog)
        {
            <li>@logEntry</li>
        }
    </ul>
}

@code {
    private TelerikNotification NotificationRef { get; set; } = null!;

    private readonly List<string> CloseLog = new();
    private int Counter { get; set; }

    private void ShowNotification()
    {
        Counter++;
        NotificationRef.Show(new NotificationModel
        {
            Text = $"Notification #{Counter} — click ✕ to detect close",
            ThemeColor = ThemeConstants.Notification.ThemeColor.Info,
            Closable = false,
            CloseAfter = 0
        });
    }

    private void OnCloseClicked(NotificationModel model)
    {
        CloseLog.Insert(0, $"[{DateTime.Now:HH:mm:ss.fff}] Closed → \"{model.Text}\"");
        NotificationRef.Hide(model);
    }
}
````

## See Also

* [Notification Overview](slug:notification-overview)
* [Notification Templates](slug:notification-templates)
* [Show and Hide Notifications Programmatically](slug:notification-open-close-hide)
