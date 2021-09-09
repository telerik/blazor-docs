---
title: Navigation
page_title: Breadcrumb - Navigation
description: Using the Blazor Breadcrumb for navigating between pages.
slug: breadcrumb-navigation
tags: telerik,blazor,breadcrumb,navigation
published: True
position: 7
---

# Breadcrumb for Navigation

The Breadcrumb can be used to navigate between different pages in the application. It can generate the needed links for you through its `UrlField` when [data binding]({%slug breadcrumb-data-binding%}).

In some cases you might prefer to dynamically generate the breadcrumbs based on the current application `Url`. For this scenario you can use the [`NavigationManager`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.navigationmanager) that the component supports and subscribe to its [`LocationChanged`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.navigationmanager.locationchanged) event. Thus, you can set new Breadcrumb items on every location change.

>caption To use the Breadcrumb and dynamically generate its items:

* Add the Breadcrumb to your application.
    * You may want to add it in the `MainLayout.razor` outside of the `@Body`, for example, in the `main` container of your app.

* Introduce a `NavigationManager` instance by injecting it in the file you would like to build the breadcrumbs.

* Create an event handler and subscribe it to the `LocationChanged` event of the `NavigationManager` to handle every change in the location.

* Dynamically generate the Breadcrumb items based on the `Url` provided by the `Location` field of the `LocationChangedEventArgs`.

An example of such a configuration you may find in our public repository - [SubScribeToLocationChanged]().


## Notes

@[template](/_contentTemplates/common/navigation-components.md#navman-used)
@[template](/_contentTemplates/common/navigation-components.md#double-navigation)


## See Also

* [Live Demo: Breadcrumb Navigation](https://demos.telerik.com/blazor-ui/breadcrumb/navigation)

