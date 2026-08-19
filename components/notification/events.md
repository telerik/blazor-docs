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

* [`OnClose`](#onclose)

## OnClose

The TaskBoard `OnClose` event fires when a visible notification popup disappears as a result of a [Close button click](slug:notification-open-close-hide#manually-closing-a-notification) or the elapse of the [`CloseAfter` timeout period](slug:notification-open-close-hide#automatically-closing-a-notification).

The event handler receives a [`NotificationCloseEventArgs`](slug:Telerik.Blazor.Components.NotificationCloseEventArgs) argument.

>caption Using the Notification OnClose event

<demo metaUrl="client/notification/events/on-close/" height="300"></demo>

## See Also

* [Live Demos: Notification](https://demos.telerik.com/blazor-ui/notification/overview)
* [Notification API Reference](slug:Telerik.Blazor.Components.TelerikNotification)
