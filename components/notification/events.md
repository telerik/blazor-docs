---
title: Events
page_title: Notification Events
description: Learn about the Telerik Notification component events and event arguments.
slug: notification-events
tags: blazor,notification,events
components: ["notification"]
published: True
position: 100
---

# Notification Events

This article describes the available events in the Telerik Notification for Blazor:

* [`OnHide`](#onhide)

## OnHide

The Notification `OnHide` event fires when a visible notification popup disappears as a result of a [Close button click](slug:notification-open-close-hide#manually-closing-a-notification) or the elapse of the [`CloseAfter` timeout period](slug:notification-open-close-hide#automatically-closing-a-notification).

The event handler receives a [`NotificationHideEventArgs`](slug:Telerik.Blazor.Components.NotificationHideEventArgs) argument.

>caption Using the Notification OnHide event

````RAZOR
<TelerikButton OnClick="@ShowNotification">Show Notification</TelerikButton>

<p>Last <code>OnHide</code> event: @NotificationEventLog</p>

<TelerikNotification @ref="@NotificationRef"
                     OnHide="@OnNotificationHide" />

@code {
    private TelerikNotification? NotificationRef;

    private string NotificationEventLog { get; set; } = string.Empty;

    private void OnNotificationHide(NotificationHideEventArgs args)
    {
        NotificationEventLog = $"Fired at {DateTime.Now.ToString("HH:mm:ss.fff")}. Hide action: {args.HideAction}. Text: \"{args.Model.Text}\"";
    }

    private void ShowNotification()
    {
        NotificationRef?.Show($"Notification Text {Random.Shared.Next(1, 100)}", ThemeConstants.Notification.ThemeColor.Primary);
    }
}
````

## See Also

* [Live Demos: Notification](https://demos.telerik.com/blazor-ui/notification/overview)
* [Notification API Reference](slug:Telerik.Blazor.Components.TelerikNotification)
