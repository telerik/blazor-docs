---
title: Open, Close and Hide
page_title: Notification - Open, Close and Hide
description: Open, Close and Hide the Notification component
slug: notification-open-close-hide
tags: telerik,blazor,notification,open,close,hide
published: True
position: 20
components: ["notification"]
---
# Open, Close and Hide Notifications


This article explains how to open, close and hide the Notification component. For brevity, it will be divided in the following sections:

* [Open](#open)
    * [Use Only the Text and ThemeColor Properties](#use-only-the-text-and-themecolor-properties)
    * [Pass a NotificationModel to the Method](#pass-a-notificationmodel-to-the-method)
* [Close and Hide](#close-and-hide)
    * [Automatically Closing a Notification](#automatically-closing-a-notification)
    * [Manually Closing a Notification](#manually-closing-a-notification)

## Open

You can open (show) the Notification component by using the `Show` method of its reference.

You can use it in two ways:

* [Use Only the Text and ThemeColor Properties](#use-only-the-text-and-themecolor-properties)
* [Pass a NotificationModel to the Method](#pass-a-notificationmodel-to-the-method)

You can also [show all notifications for your app from a single instance](#show-from-anywhere) so they all [stack together](slug:notification-stacked-notifications) and also stay between page navigations.

### Use Only the Text and ThemeColor Properties

If you do not need to customize the [closing](#close-and-hide) or the icon of the component you can quickly create them by passing only what text and [theme color](slug:notification-appearance#themecolor) should the Notification have.

````RAZOR
@* At minimum, you can pass a text message and a color to the Show() method *@

<TelerikButton OnClick="@OpenNotification">Open a notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference" />

@code {
    private TelerikNotification NotificationReference { get; set; }

    private void OpenNotification()
    {
        NotificationReference.Show("My notification", "success");
    }
}
````

### Pass a NotificationModel to the Method

You can pass the entire [NotificationModel](slug:notification-overview#notificationmodel-class-properties) to provide detailed information for the component - whether it should be closable or specify the icon. 

````RAZOR
@* You can pass the entire NotificationModel with all its features for complete control over the message settings *@

<TelerikButton OnClick="@OpenNotification">Open a notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference" />

@code {
    private TelerikNotification NotificationReference { get; set; }

    private void OpenNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "My Notification",
            ThemeColor = "success",
            ShowIcon = true,
            Icon = SvgIcon.Star,
            Closable = false
        });
    }
}
````

### Show From Anywhere

@[template](/_contentTemplates/notification/templates.md#one-instance-per-app-link)

## Close and Hide

There are two separate ways to close a notification:

* [Automatically Closing Notification](#automatically-closing-a-notification)
* [Manually Closing a Notification](#manually-closing-a-notification)

### Automatically Closing a Notification

By default each notification is an automatically closing one. You can define the time it stays visible by adjusting the `CloseAfter` parameter of the [NotificationModel](slug:notification-overview#notificationmodel-class-properties). It defaults to `5000ms`.

You can also let the user dismiss a notification message before that timer elapses through a closing button by setting the `Closable` parameter of the `NotificationModel` to `true` (its default value).

>caption Automatically Closing Notification

````RAZOR
@* By default, notification messages close on their own after 5 seconds *@

<TelerikButton OnClick="@AddAutoClosingNotification">Add Auto closing notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference" />

@code {
    private TelerikNotification NotificationReference { get; set; }

    private void AddAutoClosingNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "My Notification",
            ThemeColor = "success",
            Closable = false,
            CloseAfter = 2000,
            Icon = SvgIcon.Star
        });
    }
}
````

### Manually Closing a Notification

You can prevent the notification from closing automatically and let the user close it with the close button only. To do so, in the `NotificationModel` instance, set the `Closable` parameter to `true` and the `CloseAfter` parameter to `0`.

>caption Manually Closing Notification

````RAZOR
@* This notification will not disappear automatically, the user must close it on their own *@

<TelerikButton OnClick="@AddManuallyClosingNotification">Add manually closing notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference" />

@code {
    private TelerikNotification NotificationReference { get; set; }

    private void AddManuallyClosingNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "My Notification",
            ThemeColor = "success",
            Closable = true,
            CloseAfter = 0,
            Icon = SvgIcon.Star
        });
    }
}
````

## Hide All Notifications

To hide all notifications, you use the `HideAll` method. This function enables you to easily and quickly close all notifications at once.

>caption Hide All Notifications

````RAZOR
@* Hide all the notifications at once *@

<TelerikButton OnClick="@AddTwoNotifications">Add two notifications</TelerikButton>
<TelerikButton OnClick="@HideAllNotification">Hide All Notifications</TelerikButton>

<TelerikNotification @ref="@NotificationReference" />

@code {
    private TelerikNotification NotificationReference { get; set; }

    private void AddTwoNotifications()
    {
        AddFirstNotification();
        AddSecondNotification();
    }

    private void HideAllNotification()
    {
        NotificationReference.HideAll();
    }

    private void AddFirstNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "My First Notification",
            ThemeColor = "success",
            Closable = true,
            Icon = SvgIcon.Star
        });
    }

    private void AddSecondNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "My Second Notification",
            ThemeColor = "error",
            Closable = true,
            Icon = SvgIcon.Star
        });
    }
}
````

## See Also

* [Keep Notifications Visible on Hover](slug:notification-kb-keep-on-hover)
* [Notification Overview](slug:notification-overview)
