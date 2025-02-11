---
title: Reuse One Notification Instance in the App
description: Learn how to define and use a single Telerik Notification component instance in a Blazor application.
type: how-to
page_title: How to Reuse a Single Notification Component Instance in the App
slug: notification-kb-single-instance
tags: telerik, blazor, notification
ticketid: 1627975, 1602587, 1591578, 1579647
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

This KB article answers the following questions:

* How to use a single Telerik Notification component for Blazor in multiple other Razor files?
* How to reuse one Notification instance in the whole Blazor application?

## Solution

There are two possible ways to implement a reusable Notification component instance:

* [Pass the Notification in a Cascading Value](#pass-the-notification-in-a-cascading-value)
* [Use the Notification as a Service](#use-the-notification-as-a-service)

The Notification component in both scenarios must be defined:

1. As a descendant (or child) of the [`<TelerikRootComponent>`](slug:rootcomponent-overview).
1. In a `.razor` file with enabled interactive render mode. The `MainLayout` is interactive only if the Blazor app has **Global** interactivity location.

### Pass the Notification in a Cascading Value

1. [Define a Telerik Notification component](slug:notification-overview#creating-blazor-notification) in `MainLayout.razor`.
1. [Set the Notification `@ref` attribute](slug:notification-overview#notifications-reference-and-methods). Use an `internal` or `public` accessor.
1. Wrap the `@Body` in `MainLayout` in a `<CascadingValue>` that passes the `MainLayout` instance itself. This avoids potential issues with missing Notification instance in child components on initial app load. Set `IsFixed="true"` to the `CascadingValue` to avoid unnecessary renders.
1. Consume the `MainLayout` instance in child Razor components as a `[CascadingParameter]` and access the Notification instance methods through the `MainLayout` instance.

>caption Reuse a Notification as a CascadingValue

<div class="skip-repl"></div>

````RAZOR MainLayout.razor
@inherits LayoutComponentBase

<TelerikRootComponent>

    <TelerikNotification @ref="@NotificationRef" />

    <CascadingValue Value="@this" Name="MainLayoutRef" IsFixed="true">
        @Body
    </CascadingValue>

</TelerikRootComponent>

@code {
    internal TelerikNotification? NotificationRef { get; set; }
}
````
````RAZOR _Imports.razor
@using YourAppName.Components.Layout
````
````RAZOR Home.razor
@page "/"

<PageTitle>Home</PageTitle>

<TelerikButton OnClick="@ShowNotification">Show Notification</TelerikButton>

<TelerikButton OnClick="@HideNotifications">Hide All Notifications</TelerikButton>

@code {
    [CascadingParameter(Name = "MainLayoutRef")]
    public MainLayout? MainLayoutRef { get; set; }

    private void ShowNotification()
    {
        MainLayoutRef?.NotificationRef?.Show(new NotificationModel()
        {
            Text = $"Notification at {DateTime.Now.ToString("HH:mm:ss.fff")}"
        });
    }

    private void HideNotifications()
    {
        MainLayoutRef?.NotificationRef?.HideAll();
    }
}
````

### Use the Notification as a Service

1. Implement a service that holds a Notification component instance as a property and executes component methods.
1. Register the service in `Program.cs`.
1. [Define a Telerik Notification component](slug:notification-overview#creating-blazor-notification) in `MainLayout.razor`.
1. Inject the service in `MainLayout.razor` and [set the Notification `@ref` attribute](slug:notification-overview#notifications-reference-and-methods) to a property of the service.
1. Inject and use the service in other Razor components.

>caption Reuse a Notification in a service

<div class="skip-repl"></div>

````C# NotificationService.cs
using Telerik.Blazor.Components;

namespace YourAppName.Services
{
    public class NotificationService
    {
        public TelerikNotification? NotificationRef { get; set; }

        public void Show(string text, string? themeColor = null)
        {
            NotificationRef?.Show(new NotificationModel()
            {
                Text = text,
                ThemeColor = themeColor
            });
        }

        public void Show(NotificationModel notificationModel)
        {
            NotificationRef?.Show(notificationModel);
        }

        public void HideAll()
        {
            NotificationRef?.HideAll();
        }
    }
}
````
````C# Program.cs
builder.Services.AddSingleton<NotificationService>();
````
````RAZOR _Imports.razor
@using YourAppName.Services
````
````RAZOR MainLayout.razor
@inherits LayoutComponentBase

@inject NotificationService NotificationService

<TelerikRootComponent>

    <TelerikNotification @ref="@NotificationService.NotificationRef" />

    <CascadingValue Value="@this" Name="MainLayoutRef" IsFixed="true">
        @Body
    </CascadingValue>

</TelerikRootComponent>
````
````RAZOR Home.razor
@page "/"

@inject NotificationService NotificationService

<PageTitle>Home</PageTitle>

<TelerikButton OnClick="@ShowTextNotification">Show Simple Notification</TelerikButton>

<TelerikButton OnClick="@ShowIconNotification">Show Rich Notification</TelerikButton>

<TelerikButton OnClick="@HideNotifications">Hide All Notifications</TelerikButton>

@code {
    private void ShowTextNotification()
    {
        NotificationService.Show($"Notification at {DateTime.Now.ToString("HH:mm:ss.fff")}");
    }

    private void ShowIconNotification()
    {
        NotificationService.Show(new NotificationModel()
        {
            Icon = SvgIcon.Check,
            Text = $"Notification at {DateTime.Now.ToString("HH:mm:ss.fff")}",
            ThemeColor = ThemeConstants.Notification.ThemeColor.Success
        });
    }

    private void HideNotifications()
    {
        NotificationService.HideAll();
    }
}
````

## See Also

* [Notification Overview](slug:notification-overview)
