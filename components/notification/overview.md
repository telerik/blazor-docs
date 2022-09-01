---
title: Overview
page_title: Notification Overview
description: Overview of the Notification component for Blazor.
slug: notification-overview
tags: telerik,blazor,notification,overview
published: True
position: 0
---

# Blazor Notification Overview

This article provides information about the <a href = "https://www.telerik.com/blazor-ui/notification" target="_blank">Blazor Notification component</a> and its main features.

The Notification component renders a brief message to the user which holds information regarding the status of a process in the application. Using its settings you can customize its position, animation options and rendering. 


## Creating Blazor Notification

1. Add the `<TelerikNotification>` tag to your razor page.
1. Obtain the component reference via `@ref`.
1. Setup an instance of the [`NotificationModel` class](#notificationmodel-class) (provided by the Telerik Blazor package), and pass it to the `Show()` method of the component instance.

````CSHTML
@* This shows a simple text message that hides automatically *@

<TelerikButton OnClick="@AddNotification">Add a basic notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference" Class="MyTelerikNotification"></TelerikNotification>

@code {
    public TelerikNotification NotificationReference { get; set; }

    public void AddNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "Auto Closable Notification",
            ThemeColor = ThemeConstants.Notification.ThemeColor.Primary
        });
    }
}

<style>
    .MyTelerikNotification .k-notification-container .k-notification-wrap {
        width: 300px;
        height: 50px;
        font-size: 1.5em;
        text-align: center;
        align-items: center;
    }
</style>
````

>caption Simple Notification

![notification overview](images/notification-overview-basic-example.gif)

## Show Method

The `Show()` method is accessible through the component's reference. This method allows you to add the Notification to the page. 
You can find more information on opening, closing and hiding the Notification in the [Open, Close and Hide]({%slug notification-open-close-hide%}) article.

>caption Get a reference to the Notification and use the Show method

````CSHTML
@* The fully qualified class name of the notification component so you can use its reference *@

<TelerikButton OnClick="@AutoCloseNotification">Add auto close notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference"></TelerikNotification>

@code {
    Telerik.Blazor.Components.TelerikNotification NotificationReference { get; set; }

    void AutoCloseNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "Auto Closable Notification",
            ThemeColor = "primary",
            Closable = false
        });
    }
} 
````

## Notification Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default value | Description |
|-----------|------------------------|-------------|
| `Class`  | `string` | The CSS class that will be rendered on the main wrapping element of the Notification component - `<div class="k-notification-container">`. You could use that class to to control things like the size or the z-index of the component. You can find more infomation and examples in the [Appearance]({%slug notification-appearance%}) article. |
| `OnChange`  | `EventCallback<bool>` |  This event indicates whether the media query string provided to the `Media` parameter matches the current browser size. It fires when it matches, and when it stops matching. See the [Events]({%slug mediaquery-events%}) article for more information.  |
| `AnimationType`  | `AnimationType` enum <br /> `Fade` | Allows you to customize the animation of the Notifications. You can find more infomation and examples in the [Appearance]({%slug notification-appearance%}) article.  |
| `AnimationDuration`  | `int` <br /> `300` | Defines the duration of the animation in milliseconds.|
| `VerticalPosition`  | `NotificationVerticalPosition` enum <br /> `Bottom` | Defines the vertical position of the Notification.|
| `HorizontalPosition`  | `NotificationHorizontalPosition` enum <br /> `Right` | Defines the horizontal position of the Notification. |


## NotificationModel Class Properties

The `NotificationModel` class is used to add new notifications to the page. You can use it to set settings for each individual message you want to show. The class contains the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type and Default value | Description |
|-----------|------------------------|-------------|
| `ThemeColor`  | `string` | The color of the notification is controlled through this parameter. You can find more infomation and examples in the [Appearance]({%slug notification-appearance%}) article. |
| `Closable`  | `bool` <br /> `true` | If set to `true` a close button will appear which will enable the user to close the Notificaion. If you want the Notification to not close automatically you should set the `Closable` paramter to `true` and the `CloseAfter` to `0`. |
| `CloseAfter`  | `int` <br /> `5000` | Allows you to configure after how much time the Notification component will close automatically. Set it to `0` to prevent it from closing automatically. |
| `ShowIcon`  | `bool` <br /> `true` | Allows you to specify whether an icon should appear in the component. |
| `Icon`  | `string` | Specifies the icon that will render in the component if the `ShowIcon` parameter is set to `true`. You can find more information on adding an icon to a Telerik Component in [Telerik Font Icons article]({%slug general-information/font-icons%}#icon-in-telerik-component). |
| `Text`  | `string` | the text that will be rendered in the Notification component. |


>tip @[template](/_contentTemplates/notification/templates.md#one-instance-per-app-link)

## Next Steps

* [Learn more about the Notification Templates]({%slug notification-templates%})
* [Customize the Notification Appearance]({%slug notification-appearance%})
* [Explore the Stacked Notifications]({%slug notification-stacked-notifications%})

## See Also

  * [Live Demo: Notification](https://demos.telerik.com/blazor-ui/notification/overview)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikNotification)
  * [One Notification Instance for All Components Sample Project](https://github.com/telerik/blazor-ui/tree/master/notification/single-instance-per-app)
   
