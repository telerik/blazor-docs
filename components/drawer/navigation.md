---
title: Navigation
page_title: Drawer - Navigation
description: Using the Blazor Drawer for navigating between pages.
slug: drawer-navigation
tags: telerik,blazor,drawer,navigation
published: True
position: 3
components: ["drawer"]
---
# Drawer for Navigation

The Drawer is a different kind of a [menu](slug:components/menu/overview) that is commonly used to navigate between pages in the app - it can generate the needed links for you through its `UrlField` when [data binding](slug:drawer-data-binding).

To use the Drawer for navigating between pages:

* Add the Drawer to the `MainLayout.razor` of your app.
* Put the `@Body` tag in the `<DrawerContent>` tag of the drawer.
* Provide a collection of models that describe the pages you want the user to navigate to.

@[template](/_contentTemplates/common/navigation-components.md#navman-used)
@[template](/_contentTemplates/common/navigation-components.md#double-navigation)

>caption Use the Drawer for Navigation in `MainLayout.razor`

<div class="skip-repl"></div>

````RAZOR
@* This is a very basic layout to showcase the concept. You may want to add a header, footer, 
    collapse/expand button and add desired heights to the layout and drawer *@

@inherits LayoutComponentBase

<TelerikRootComponent>

    <TelerikDrawer Data="@NavigablePages" Expanded="true" MiniMode="true" Mode="@DrawerMode.Push">
        <DrawerContent>
            @Body
        </DrawerContent>
    </TelerikDrawer>

</TelerikRootComponent>

@code{ 
    List<DrawerItem> NavigablePages { get; set; } = new List<DrawerItem>
    {
        new DrawerItem { Text = "Home", Url = "/", Icon = SvgIcon.Home },
        new DrawerItem { Separator = true },
        new DrawerItem { Text = "Counter", Url = "counter", Icon = SvgIcon.PlusOutline },
        new DrawerItem { Text = "FetchData", Url = "fetchdata", Icon = SvgIcon.Grid }
    };

    public class DrawerItem
    {
        public string Text { get; set; }
        public string Url { get; set; }
        public ISvgIcon Icon { get; set; }
        public bool Separator { get; set; }
    }
}
````

## Additional Examples

* A GitHub sample project that showcases [Drawer as side navigation](https://github.com/telerik/blazor-ui/tree/master/drawer/sidenav).
* KB article on [how to select a Drawer item when the page loads](slug:drawer-kb-sync-selected-item).


## See Also

* [Drawer Data Binding](slug:drawer-data-binding)
* [Drawer Templates](slug:drawer-templates)
* [Drawer Demos](https://demos.telerik.com/blazor-ui/drawer/overview)
