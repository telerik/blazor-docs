---
title: Templates
page_title: Notification - Templates
description: Templates in the Notification for Blazor.
slug: notification-templates
tags: telerik,blazor,notification,template,templates
published: True
position: 10
---

# Notification Templates

The Notification allows you to customize its rendering by using Templates. This article explains the available layout templates for the component.

* [Template](#template)


## Template

The Template allows you to control the rendering of all Notifications which originate from the same reference. It provides a context - object of type `NotificationModel` (the model you pass to the `Show()` method). To apply different templates to different notifications you should provide different references too. 

This section gives examples that show how to:

* [Customize All Notifications From The Same Reference](#customize-all-notifications-from-the-same-reference)
* [Use Different Templates](#use-different-templates)
* [Get a Click Event for Notification Body](#get-a-click-event-for-notification-body)


### Customize All Notifications From The Same Reference

````CSHTML
@* Customize the notification template *@

<TelerikButton OnClick="@AddNotification">Add a notification</TelerikButton>

<TelerikNotification @ref="@NotificationReference">
    <Template>
        The current text is: @context.Text
    </Template>
</TelerikNotification>

@code {
    public TelerikNotification NotificationReference { get; set; }

    public void AddNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "Primary notification",
            ThemeColor = "primary"
        });

        NotificationReference.Show(new NotificationModel()
        {
            Text = "Secondary Notification",
            ThemeColor = "secondary"
        });
    }
}
````

### Use Different Templates

When you are using different references in order to provide multiple templates the Notifications will not [stack]({%slug notification-stacked-notifications%}).

````CSHTML
@* Use different templates for different content and notifications *@

<TelerikButton OnClick="@AddNotifications">Add notifications</TelerikButton>

<TelerikNotification @ref="@NotificationReference1">
    <Template>
        The current text is: @context.Text
    </Template>
</TelerikNotification>

<TelerikNotification @ref="@NotificationReference2">
    <Template>
        Different templated text: @context.Text
    </Template>
</TelerikNotification>

@code {
    public TelerikNotification NotificationReference1 { get; set; }
    public TelerikNotification NotificationReference2 { get; set; }

    public void AddNotifications()
    {
        NotificationReference1.Show(new NotificationModel()
        {
            Text = "Primary notification",
            ThemeColor = "primary"
        });

        NotificationReference2.Show(new NotificationModel()
        {
            Text = "Secondary Notification",
            ThemeColor = "secondary"
        });
    }
}
````


### Get a Click Event for Notification Body

You can handle events in the template of the notification like with any other Blazor template. This lets you achieve interactivity in the templates. For example, you can know when the user clicks the notification text.

````CSHTML
@* Get click event for the notifications *@

<TelerikNotification @ref="@NotificationReference">
    <Template>
        <div @onclick="@( (MouseEventArgs e) => MyNotificationClick(context, e) )">
            The current text is: @context.Text
        </div>
    </Template>
</TelerikNotification>

@code {
    async Task MyNotificationClick(NotificationModel notificationMetadata, MouseEventArgs e)
    {
        Console.WriteLine(
            $"The user clicked in notification: {notificationMetadata.Text}, " +
            $"is color is: {notificationMetadata.ThemeColor}"
        );
    }

    public TelerikNotification NotificationReference { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            AddNotification();
        }
    }

    void AddNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = "Primary notification",
            ThemeColor = "primary"
        });

        NotificationReference.Show(new NotificationModel()
        {
            Text = "Secondary Notification",
            ThemeColor = "secondary"
        });

        NotificationReference.Show("Plain text notification, tertiary color", "tertiary");
    }
}
````


## See Also

  * [Live Demo: Notification Overview](https://demos.telerik.com/blazor-ui/notification/overview)
  * [Live Demo: Notification Template](https://demos.telerik.com/blazor-ui/notification/template)
