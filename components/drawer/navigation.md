---
title: Navigation
page_title: Drawer - Navigation
description: Using the Blazor Drawer for navigating between pages.
slug: drawer-navigation
tags: telerik,blazor,drawer,navigation
published: True
position: 3
---

# Drawer for Navigation

The Drawer is a different kind of a [menu]({%slug components/menu/overview%}) that is commonly used to navigate between pages in the app - it can generate the needed links for you through its `UrlField` when [data binding]({%slug drawer-data-binding%}).

To use the Drawer for navigating between pages:

* Add the Drawer to the `MainLayot.razor` of your app.
* Put the `@Body` tag in the `<Content>` tag of the drawer.
* Provide a collection of models that describe the pages you want the user to navigate to.

>tip You can find a runnable sample that showcases this in the [Drawer as Side Navigation](https://github.com/telerik/blazor-ui/tree/master/drawer/sidenav) sample project.

>caption Use the Drawer for Navigation in `MainLayout.razor`

````CSHTML
@* This is a very basic layout to showcase the concept. You may want to add a header, footer, 
    collapse/expand button and add desired heights to the layout and drawer *@

@inherits LayoutComponentBase

<TelerikRootComponent>

    <TelerikDrawer Data="@NavigablePages" Expanded="true" MiniMode="true" Mode="@DrawerMode.Push">
        <Content>
            @Body
        </Content>
    </TelerikDrawer>

</TelerikRootComponent>

@code{ 
    List<DrawerItem> NavigablePages { get; set; } =
        new List<DrawerItem>
        {
            new DrawerItem { Text = "Home", Url = "/", Icon = "home" },
            new DrawerItem { IsSeparator = true },
            new DrawerItem { Text = "Counter", Url = "counter", Icon = IconName.PlusOutline },
            new DrawerItem { Text = "FetchData", Url = "fetchdata", Icon = IconName.Grid }
        };

    public class DrawerItem
    {
        public string Text { get; set; }
        public string Url { get; set; }
        public string Icon { get; set; }
        public bool IsSeparator { get; set; }
    }
}
````


## Notes

@[template](/_contentTemplates/common/navigation-components.md#navman-used)
@[template](/_contentTemplates/common/navigation-components.md#double-navigation)


## See Also

* [Drawer Overview]({% slug drawer-overview%})
* [Drawer Data Binding]({%slug drawer-data-binding%})
* [Drawer Templates]({%slug drawer-templates%})
