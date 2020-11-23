---
title: Open, Close and Hide
page_title: Notification - Open, Close and Hide
description: Open, Close and Hide the Notification component
slug: notification-open-close-hide
tags: telerik,blazor,notification,open,close,hide
published: True
position: 20
---

# Open, Close and Hide Notifications


This article explains how to open, close and hide the Notification component. For brevity, it will be divided in the following sections:

* [Open](#open)
    * [Use Only the Text and ThemeColor Properties](#use-only-the-text-and-themecolor-properties)
    * [Pass a NotificationModel to the Method](#pass-a-notificationmodel-to-the-method)
* [Close and Hide](#close-and-hide)
    * [Automatically Closing Notification](#automatically-closing-notification)
    * [Manually Closing Notification](#manually-closing-notification)

## Open

You can open (show) the Notification component by using the [`Show`]({%slug notification-overview%}#show-method) method of its reference.

* [Use Only the Text and ThemeColor Properties](#use-only-the-text-and-themecolor-properties)
* [Pass a NotificationModel to the Method](#pass-a-notificationmodel-to-the-method)


### Use Only the Text and ThemeColor Properties

If you do not need to customize the [closing](#close-and-hide) or the icon of the component you can quickly create them by passing only what text and [theme color]({%slug notification-appearance%}#themecolor) should the Notification have.

````CSHTML
<TelerikButton OnClick="@OpenNotification">Open a notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference" />

@code {
    public TelerikNotification NotificationReference { get; set; }

    public void OpenNotification()
    {
        NotificationReference.Show("My notification", "success");
    }
}
````

### Pass a NotificationModel to the Method

You can pass the entire [NotificationModel]({%slug notification-overview%}#notificationmodel-class) to provide detailed information for the component - whether it should be closable or specify the icon. 

````CSHTML
<TelerikButton OnClick="@OpenNotification">Open a notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference" />

@code {
    public TelerikNotification NotificationReference { get; set; }

    public void OpenNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "My Notification",
            ThemeColor = "success",
            Icon = IconName.Star
        });
    }
}
````

## Close and Hide

There are two separate ways to close a notification:

* [Automatically Closing Notification](#automatically-closing-notification)
* [Manually Closing Notification](#manually-closing-notification)

### Automatically Closing Notification

By default each notification is an automatically closing one. You can define the time it stays visible by adjusting the `CloseAfter` parameter of the [NotificationModel]({%slug notification-overview%}#notificationmodel-class). You could also provide the user with a closing button by setting the `Closable` parameter to `true`.

>caption Automatically Closing Notification


````CSHTML
<TelerikButton OnClick="@AddAutoClosingNotification">Add Auto closing notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference" />

@code {
    public TelerikNotification NotificationReference { get; set; }

    public void AddAutoClosingNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "My Notification",
            ThemeColor = "success",
            Closable = false,
            CloseAfter = 5000,
            Icon = IconName.Star
        });
    }
}
````

### Manually Closing Notification

You can prevent the notification from closing automatically and let the user close it wil the close button. In order to do so, you should set the `Closable` parameter to `true` and the `CloseAfter` parameter to `0`.

>caption Manually Closing Notification

````CSHTML
<TelerikButton OnClick="@AddManuallyClosingNotification">Add manually closing notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference" />

@code {
    public TelerikNotification NotificationReference { get; set; }

    public void AddManuallyClosingNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "My Notification",
            ThemeColor = "success",
            Closable = true,
            CloseAfter = 0,
            Icon = IconName.Star
        });
    }
}
````


## See Also

  * [Notification Overview]({%slug notification-overview%})
