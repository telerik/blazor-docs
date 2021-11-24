---
title: Pass Custom Fields and Data to the Notification
description: How to extend the NotificationModel and pass custom fields with dynamic data to each notification popup.
type: how-to
page_title: Pass Custom Fields and Data to the Notification
slug: notification-custom-model-data
position: 
tags: notification, custom, model, data
ticketid: 1543051
res_type: kb
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

I need to get a custom field with different value to each notification (i.e. the ID of a database record). How to pass custom data and use it in the notification popup template?

## Solution

1. Implement a `class` that inherits from [`Telerik.Blazor.Components.NotificationModel`](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.NotificationModel). For example, `MyExtendedNotificationModel`.
1. Add the required properties to the new class.
1. Pass a `MyExtendedNotificationModel` instance to the Notification [`Show` method]({%slug notification-open-close-hide%}). This will allow you to set the custom properties.
1. In the [Notification `<Template>`]({%slug notification-templates%}), cast the `context` to `MyExtendedNotificationModel`. This will allow you to access and consume the additional data.
1. If you use [both overloads of `Show()`]({%slug notification-open-close-hide%}#open), make sure to check if the cast is successful, otherwise you may get a `NullReferenceException`.

````CSHTML
<TelerikNotification @ref="@NotificationReference">
    <Template>
        @{
            var myContext = context as MyExtendedNotificationModel;

            // This check is needed only if using both overloads of the Show() method.
            if (myContext != null)
            {
                <span>@myContext.CustomID :</span>
                <a style="color:inherit;" target="_blank"
                    href="@( $"{myContext.CustomUrl}{myContext.CustomID}" )">
                    @myContext.Text
                </a>
            }
            else
            {
                <span>@context.Text</span>
            }
        }

    </Template>
</TelerikNotification>

@code {
    TelerikNotification NotificationReference { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            ShowNotifications();
        }
    }

    void ShowNotifications()
    {
        NotificationReference.Show(new MyExtendedNotificationModel()
        {
            Text = "Tasks in development",
            ThemeColor = "primary",
            CustomID = 6,
            CustomUrl = "https://feedback.telerik.com/blazor?listMode=Popular&statusId=",
            CloseAfter = 0
        });

        NotificationReference.Show(new MyExtendedNotificationModel()
        {
            Text = "Completed tasks",
            ThemeColor = "secondary",
            CustomID = 2,
            CustomUrl = "https://feedback.telerik.com/blazor?listMode=Popular&statusId=",
            CloseAfter = 0
        });

        // will use the default NotificationModel
        NotificationReference.Show("plain notication", "tertiary");
    }

    public class MyExtendedNotificationModel : NotificationModel
    {
        public int CustomID { get; set; }
        public string CustomUrl { get; set; }
    }
}
````