---
title: Appearance
page_title: Notification Appearance
description: Appearance settings of the Notification component for Blazor.
slug: notification-appearance
tags: telerik,blazor,notification,appearance
published: True
position: 5
---

# Appearance Settings

The Notification component provides parameters and properties that allows you to customize its appearance. For brevity, this article will be divided in the following sections:

* [AnimationType](#animationtype)
* [Size](#size)
* [ThemeColor](#themecolor)


You can use all three together to get the desired appearance. This article will explain their effect one by one.

## AnimationType

The `AnimationType` parameter controls the way the Notification will appear on the screen. It takes a member of the `Telerik.Blazor.AnimationType` enum:

* `Fade` - the default animation
* `None`
* `PushUp`
* `PushDown`
* `PushLeft`
* `PushRight`
* `RevealVertical`
* `SlideIn`
* `SlideDown`
* `SlideLeft`
* `SlideRight`
* `ZoomIn`
* `ZoomOut`

You can see them in action in the [Notification Animation](https://demos.telerik.com/blazor-ui//notification/animation) Live Demo.

>caption Set an animation for the Notification component

![notification animation types gif](images/notification-animationtype-gif.gif)

````CSHTML
<TelerikButton OnClick="@AddNotification">Add a basic notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference"              AnimationType="@AnimationType.ZoomOut"></TelerikNotification>

@code {
    public TelerikNotification NotificationReference { get; set; }

    public void AddNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "Auto Closable Notification",
            ThemeColor = "primary"
        });
    }
} 
````

## Size

You can control the Size of the Notification by using CSS. To make the cascading of the styles easier and target a single instance of the component you should use the [`Class`]({%slug notification-overview%}#features) parameter exposed for the <TelerikNotification>.

>caption Control the size of the Notiication component

````CSHTML
<style>
    .MyTelerikNotification .k-notification-container .k-notification-wrap {
        width: 300px;
        height: 200px;
    }
</style>

<TelerikButton OnClick="@AddNotification">Add a basic notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference" Class="MyTelerikNotification"></TelerikNotification>

@code {
    public TelerikNotification NotificationReference { get; set; }

    public void AddNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "Auto Closable Notification",
            ThemeColor = "primary",
            Closable = true,
            CloseAfter = 0
        });
    }
}
````

## ThemeColor

The color of the animated loading icon is controlled through the `ThemeColor` parameter. You can set it to a member of the `Telerik.Blazor.ThemeColor` class:

* `Primary`
* `Secondary`
* `Tertiary`
* `Success`
* `Info`
* `Warning`
* `Error`
* `Dark`
* `Light`
* `Inverse`

These predefined options match the main [Telerik Theme]({%slug general-information/themes%}) and you can see that in action in the [Notification Appearance](https://demos.telerik.com/blazor-ui//notification/appearance) Live Demo.

>caption Built-in Theme Colors

![Notification Theme Colors](images/notification-themecolor-screenshot.png)

````CSHTML
<TelerikButton OnClick="@AddColoredNotifications">Add colored notifications</TelerikButton>

<TelerikNotification @ref="@NotificationReference" AnimationType="@AnimationType.ZoomOut"></TelerikNotification>

@code {
    public TelerikNotification NotificationReference { get; set; }

    public void AddColoredNotifications()
    {
        var fields = typeof(Telerik.Blazor.ThemeColors)
                .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static |
                   System.Reflection.BindingFlags.FlattenHierarchy)
                .Where(fi => fi.IsLiteral && !fi.IsInitOnly).ToList();

        for (int i = 0; i < fields.Count; i++)
        {
            var currentField = fields[i];
            var color = currentField.GetValue(null).ToString();

            NotificationReference.Show(new NotificationModel()
            {
                Text = $"Notification with color theme - {color}",
                ThemeColor = $"{color}"
            });
        }
    }
}
````

The `ThemeColor` parameter renders as the `k-notification-<ThemeColor>` CSS class on the specific notification HTML element and you can set it to a custom value to cascade through and set the color to a setting of your own without customizing the entire theme.

>caption Custom Notification color without customizing the Telerik Theme

````CSHTML
<style>
    .k-notification-custom-color {
        background-color: cyan;
    }
</style>

<TelerikButton OnClick="@AddNotification">Add a notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference"></TelerikNotification>

@code {
    public TelerikNotification NotificationReference { get; set; }

    public void AddNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "Auto Closable Notification",
            ThemeColor = "custom-color"
        });
    }
}
````

## See Also

  * [Live Demo: Notification Overview](https://demos.telerik.com/blazor-ui/notification/overview)
  * [Live Demo: Notification Appearance](https://demos.telerik.com/blazor-ui/notification/appearance)
  * [Live Demo: Notification Animation](https://demos.telerik.com/blazor-ui/notification/animation)
