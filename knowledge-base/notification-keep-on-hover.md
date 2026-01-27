---
title: Prevent Notification Hiding on Hover
description: How to stop a notification from closing automatically when the user hovers it?
type: how-to
page_title: How to Prevent Notification Hiding on Mouse Over
slug: notification-kb-keep-on-hover
position: 
tags: telerik, blazor, notification
ticketid: 1630136
res_type: kb
components: ["notification"]
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

This KB article answers the following questions:

* Is it possible to stop a notification from closing on `mouseover`?
* How to keep a notification from hiding automatically when the user moves their mouse over it?
* How to persist a visible notification on the screen when the user hovers it?
* How to prevent the hiding of a notification when the mouse cursor is over it?


## Solution

1. [`Show()` notifications](slug:notification-open-close-hide) that don't close automatically. To achieve this, set `CloseAfter` to `0` in the `NotificationModel`.
1. Define a collection that will store the currently open `NotificationModel` instances and the `DateTime` values that determine when they will be hidden.
1. Implement a `System.Timers.Timer` that will [`Hide()` notifications](slug:notification-open-close-hide) according to the times from the previous step.
1. Define a [Notification `Template`](slug:notification-templates).
1. Wrap the template content in a `<div>` with [`@onmouseenter` and `@onmouseleave` directives](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/event-handling). The event handlers must enable or disable the hiding of that specific notification instance by the `Timer`.

>caption Keep notifications visible on hover

````RAZOR
@implements IDisposable

@using System.Timers

<h2>Prevent Notification Hide on Hover</h2>

<TelerikButton OnClick="@ShowNotification">Show Notification</TelerikButton>

<TelerikNotification @ref="@NotificationRef"
                     HorizontalPosition="@NotificationHorizontalPosition.Right"
                     VerticalPosition="@NotificationVerticalPosition.Top">
    <Template>
        <div @onmouseenter="@( () => DisableNotificationHide(context) )"
             @onmouseleave="@( () => EnableNotificationHide(context) )"
             style="padding:1em;">
            Notification Text: @context.Text
        </div>
    </Template>
</TelerikNotification>

@if (!string.IsNullOrEmpty(NotificationToKeep))
{
    <p><strong>Will not hide: @NotificationToKeep</strong></p>
}

@code {
    private TelerikNotification NotificationRef { get; set; } = null!;

    #region Notification Show and Hide Logic

    private Dictionary<Guid, NotificationLog> OpenNotifications { get; set; } = new Dictionary<Guid, NotificationLog>();

    public class NotificationLog
    {
        public DateTime CloseTime { get; set; } = DateTime.Now.AddSeconds(5);

        public bool ShouldHide { get; set; } = true;

        public NotificationModel Model { get; set; } = new NotificationModel()
        {
            Closable = false,
            CloseAfter = 0
        };
    }

    private void ShowNotification()
    {
        var guid = Guid.NewGuid();

        var notificationLog = new NotificationLog();
        notificationLog.Model.Text = $"{(char)Rnd.Next(65, 91)}{(char)Rnd.Next(65, 91)}{(char)Rnd.Next(65, 91)} " +
            $"{Rnd.Next(0, 10)}{Rnd.Next(0, 10)}{Rnd.Next(0, 10)}";
        notificationLog.Model.ThemeColor = NotificationThemeColors[Rnd.Next(0, NotificationThemeColors.Count)];

        NotificationRef.Show(notificationLog.Model);
        OpenNotifications.Add(guid, notificationLog);

        Timer.Start();
    }

    private void CloseExpiredNotifications()
    {
        var notificationsToClose = new List<Guid>();
        var now = DateTime.Now;

        foreach (var item in OpenNotifications)
        {
            if (item.Value.CloseTime < now && item.Value.ShouldHide)
            {
                notificationsToClose.Add(item.Key);
            }
        }

        foreach (var guid in notificationsToClose)
        {
            var notificationInstance = OpenNotifications[guid].Model;
            NotificationRef.Hide(notificationInstance);
            OpenNotifications.Remove(guid);
        }

        if (!OpenNotifications.Any())
        {
            Timer.Stop();
        }
    }

    private void DisableNotificationHide(NotificationModel model)
    {
        var log = OpenNotifications.First(x => x.Value.Model == model);
        log.Value.ShouldHide = false;
    }

    private void EnableNotificationHide(NotificationModel model)
    {
        var log = OpenNotifications.First(x => x.Value.Model == model);
        log.Value.CloseTime = DateTime.Now.AddSeconds(3);
        log.Value.ShouldHide = true;
    }

    #endregion Notification Show and Hide Logic

    #region Timer Related

    private Timer Timer { get; set; } = new Timer(1000);

    private void OnTimerElapsed(object? source, ElapsedEventArgs e)
    {
        InvokeAsync(CloseExpiredNotifications);

        // Call StateHasChanged only if necessary.
        //InvokeAsync(StateHasChanged);
    }

    protected override void OnInitialized()
    {
        Timer.Elapsed -= OnTimerElapsed;
        Timer.Elapsed += OnTimerElapsed;
    }

    public void Dispose()
    {
        Timer?.Stop();
        Timer?.Close();
    }

    #endregion Timer Related

    #region Example Helpers

    private Random Rnd { get; set; } = new Random();

    private string? NotificationToKeep => OpenNotifications.FirstOrDefault(x => !x.Value.ShouldHide).Value?.Model.Text;

    private List<string> NotificationThemeColors { get; set; } = new List<string>() {
        ThemeConstants.Notification.ThemeColor.Primary,
        ThemeConstants.Notification.ThemeColor.Secondary,
        ThemeConstants.Notification.ThemeColor.Tertiary,
        ThemeConstants.Notification.ThemeColor.Success,
        ThemeConstants.Notification.ThemeColor.Warning,
        ThemeConstants.Notification.ThemeColor.Error,
        ThemeConstants.Notification.ThemeColor.Info,
        ThemeConstants.Notification.ThemeColor.Dark,
        ThemeConstants.Notification.ThemeColor.Light,
        ThemeConstants.Notification.ThemeColor.Inverse
    };

    #endregion Example Helpers
}
````


## Notes

* Visible notifications can move on the screen when other notifications are hidden. As a result, a notification may no longer be under the mouse cursor.
* You can set `Closable` to `true` in the `NotificationModel` and show notifications that have a close button. However, the close button is not part of the Notification `<Template>` and hovering it will not prevent the notification from hiding.
* Be aware of [thread safety when changing the page UI](https://blazor-university.com/components/multi-threaded-rendering/invokeasync/) with a `Timer`.


## See Also

* [Notification Template](slug:notification-templates)
* [Show and Hide Notifications Programmatically](slug:notification-open-close-hide)
