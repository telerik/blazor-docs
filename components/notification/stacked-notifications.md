---
title: Stacked
page_title: Notification - Stacked Notifications
description: Notification stacking in Telerik UI for Blazor
slug: notification-stacked-notifications
tags: telerik,blazor,notification,stacked,stacking,notifications
published: True
position: 15
---

# Stacked Notifications

When you declare multiple notifications from the same component reference they will be stacked on the screen. Notification which derive from different references will be rendered on top of one another.

>caption Stacked Notifications in Telerik UI for Blazor

![stacked notifications](images/notification-stacked-notifications.png)

````CSHTML
<TelerikButton OnClick="@AddStackedNotifications">Add stacked notifications</TelerikButton>

<TelerikNotification @ref="@NotificationReference" />

@code {
    public TelerikNotification NotificationReference { get; set; }
    public string[] ColorOptions = new string[4] { "primary", "secondary", "success", "info" };

    public void AddStackedNotifications()
    {
        foreach (var color in ColorOptions)
        {
            NotificationReference.Show(new NotificationModel()
            {
                Text = $"Stacked {color} notification",
                ThemeColor = $"{color}"
            });
        }
    }
}
````

## See Also

  * [Live Demo: Notification Overview](https://demos.telerik.com/blazor-ui/notification/overview)
  * [Notification Overview]({%slug notification-overview%})
