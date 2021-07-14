---
title: Custom or Centered Notification Position
description: How to position the notifications more precisely at a specific custom location? How to center notifications on the screen?
type: how-to
page_title: Custom or Centered Notification Position
slug: notification-kb-custom-position
position: 
tags: notification, center, centre, custom, position
ticketid: 1504012, 1526682
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

I want to customize the position of the notification to be different from the default options that are relative to the viewport boundaries. I want the notifications in a page area I choose.

I'd like to vertically center the notifications and display them at the center of the screen.

I would like to adjust the notification, so it is displayed below the top menu.

## Solution

To display notifications at a custom position, follow these steps. The examples below demonstrate them in action.

* Place the `TelerikNotification` component in two nested `<div>` elements.
    * The outer `<div>` should have a `position:relative` style.
    * The inner `<div>` should have a `position:absolute` style.
    * The **absolute** positioning ensures that the notifications don't push other content on the page. In some cases the outer `<div>` may not be needed.
* Adjust the position of one or both `<div>`s. The exact approach and CSS styles will depend on the specific case.
* Set a `Class` to the `TelerikNotification` component, which applies `position:relative` and `flex-wrap: nowrap !important` CSS styles.

### Custom Notifications near the center-top of the page

Here is where the notifications will appear if the outer relative `<div>` is placed right below the top bar of a Blazor app.

![Custom positions of the notifications that respect their parent element](images/notifications-with-custom-position.png)

>caption Custom notification position through a wrapping element

````CSHTML
@* Use parent elements and CSS to set the custom position of the notifications *@

<style>
    .custom-notification-parent {
        position: absolute; /* lets the notifications use this parent for positioning */
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1234; /* depends on other z-indexes on the page */
        /* This example centers the notification container according to its own parent which is
        below the button.
        Centering approach based on https://css-tricks.com/centering-css-complete-guide/
        */
    }

    .custom-positioned-notifications {
        position: relative; /* force the individual notifications respect the position of their parent */
        flex-wrap: nowrap !important; /* display the individual notifications in a single column */
    }
</style>

<TelerikButton OnClick="@AddNotification">Add a notification that will be positioned according to its parent element</TelerikButton>

<div style="position: relative">
    <div class="custom-notification-parent">
        <TelerikNotification Class="custom-positioned-notifications"
                             @ref="@NotificationReference"
                             HorizontalPosition="@NotificationHorizontalPosition.Center"
                             VerticalPosition="@NotificationVerticalPosition.Top">
        </TelerikNotification>
    </div>
</div>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lacinia suscipit velit, ut lobortis lorem egestas a. Mauris lobortis imperdiet lacus, quis dictum lacus. Integer suscipit ultrices velit nec malesuada. Vestibulum sodales tellus in nibh feugiat maximus non a augue. Nunc eu nisl arcu. Donec vitae justo felis. Maecenas condimentum, risus quis vehicula cursus, elit nisi posuere dui, eget feugiat sapien lacus in leo. Morbi molestie et velit at egestas.</p>

@code {
    TelerikNotification NotificationReference { get; set; }
    int counter { get; set; }
    public void AddNotification()
    {
        NotificationReference.Show(new NotificationModel()
        {
            Text = $"Notification {counter++}",
            ThemeColor = "primary",
            Closable = true,
            CloseAfter = 0
        });
    }
}
````

### Center Notifications Vertically and Horizontally on the Screen

In this case, the `TelerikNotification` is wrapped in a single `<div>` with a `position:fixed` style. This will center the notifications on the screen, no matter the page scroll offset.

````CSHTML
<style>
    .centered-notification-parent {
        /* center this element on the screen, no matter the page scroll offset */
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1234; /* depends on other z-indexes on the page */
    }

    .custom-positioned-notifications {
        position: relative; /* force the individual notifications respect the position of their parent */
        flex-wrap: nowrap !important; /* display the individual notifications in a single column */
    }
</style>

<TelerikButton OnClick="@AddNotification">Display a vertically centered notification</TelerikButton>

<div class="custom-notification-parent">
    <TelerikNotification Class="custom-positioned-notifications"
                         @ref="@NotificationReference"
                         HorizontalPosition="@NotificationHorizontalPosition.Center"
                         VerticalPosition="@NotificationVerticalPosition.Top">
    </TelerikNotification>
</div>

@code {
    TelerikNotification NotificationReference { get; set; }
    int counter { get; set; }
    public void AddNotification()
    {
        var notificationText = counter % 5 == 0 ? "A Lot Longer Notification Content Here" : "Foo";
        NotificationReference.Show(new NotificationModel()
        {
            Text = $"{notificationText} {++counter}",
            ThemeColor = "primary",
            Closable = true,
            CloseAfter = 0
        });
    }
}
````

## Notes

* Keep in mind that the container for the notifications might consume mouse clicks, selection or otherwise interfere with the UX of your app. Thus, style and size it accordingly.

* You can inspect the rendered content to see what the built-in CSS rules and HTML structure are, so you can tweak this example further to fit your needs.

* @[template](/_contentTemplates/notification/templates.md#one-instance-per-app-link)
