---
title: Templates
page_title: Drawer - Templates
description: Templates in the Drawer for Blazor.
slug: drawer-templates
tags: telerik,blazor,drawer,templates
published: True
position: 12
components: ["drawer"]
---
# Drawer Templates

The Drawer can be customized by using Templates. This article explains the available layout templates for the component.

* [ItemTemplate](#itemtemplate)
* [Template](#template)

## ItemTemplate

The `<ItemTemplate>` controls the rendering of the [data bound items](slug:drawer-data-binding) in the Drawer, in case you want to use a rendering different than the default one.

This template receives a `context` argument that is of the data model type and represents the current item.

When using an `ItemTemplate`, the Drawer can still [navigate automatically if the `UrlField` parameter is set, or if the Drawer data items have a populated `Url` property](slug:drawer-navigation).

>caption Use ItemTemplate to control the rendering of the items in the Drawer.

````RAZOR
@* This example shows how to control the rendering of the items in the Drawer menu *@

<style>
    .styled-icon {
        margin-right: 8px;
    }
</style>

<TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@SvgIcon.Menu" />

<TelerikDrawer @bind-Expanded="@Expanded"
               Data="@Data"
               MiniMode="true"
               Mode="@DrawerMode.Push"
               @bind-SelectedItem="@SelectedItem"
               @ref="@DrawerRef">
    <ItemTemplate Context="item">
        <TelerikSvgIcon Icon="@item.Icon" Class="styled-icon"></TelerikSvgIcon>
        @if (Expanded)
        {
            <div style="font-weight:bold;">@item.Text</div>
        }
    </ItemTemplate>
    <DrawerContent>
        <strong>@SelectedItem?.Description</strong>
    </DrawerContent>
</TelerikDrawer>


@code {
    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    public DrawerItem SelectedItem { get; set; }
    public bool Expanded { get; set; } = true;
    public IEnumerable<DrawerItem> Data { get; set; } = new List<DrawerItem>
    {
        new DrawerItem {Text = "Shopping Cart", Icon = SvgIcon.Cart, Description = "Items in shopping cart"},
        new DrawerItem {Text = "Notifications", Icon = SvgIcon.Bell, Description = "My profile notifications"},
        new DrawerItem {Text = "Calendar", Icon = SvgIcon.Calendar, Description = "My events"},
        new DrawerItem {Text = "Settings", Icon = SvgIcon.Gear, Description = "My profile settings"},
    };

    public class DrawerItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public string Description { get; set; }
    }
}
````

>caption The result of the code snippet above

![drawer template example](images/drawer-templates-itemtemplate-example.gif)



## Template

The `<Template>` allows you to control the whole rendering of the Drawer so you can add extra content and application logic. This template receives a `context` argument that is `IEnumerable<TItem>` - it is the `Data` collection of the component.

When using this template all built-in features of the Drawer are disabled and should be implemented by the application, for example the [item selection](slug:drawer-selection) and rendering, navigation to different pages, etc. Page navigation can be done with `<a>`, `<NavLink>`, `NavigationManager` and so on.

The drawer will expand and collapse as usual, but the content has to be controlled by the application entirely.

Make sure that the `<DrawerContent>` tag is outside of the `<Template>` - the `<DrawerContent>` is responsible for the rendering the application outside of the Drawer, whereas the `<Template>` controls only the rendering of the component. In the `<DrawerContent>` tag you can place the `@Body` when you are using the Drawer as a sidebar navigation. 

>tip You can find a runnable sample that showcases this in the [Drawer as Side Navigation using the Template](https://github.com/telerik/blazor-ui/tree/master/drawer/template) sample project.

Using the `<Template>` and `<ItemTemplate>` together is not possible - the Template removes any built-in rendering from the Drawer.

>important Using the template takes functionality away from the drawer because it no longer controls its own rendering. For example, appearance of the items, focused states, keyboard navigation, page navigation and clicks are no longer controlled by the Drawer component and need to be implemented by the application template.

>caption Using a template with manual item selection, header and footer

````RAZOR
@* This example shows how to create header and footer for the Drawer and select an item manually. *@

@using Telerik.FontIcons

<style>
    .styled-icon {
        margin-right: 8px;
    }
</style>

<TelerikDrawer @bind-Expanded="@DrawerExpanded"
               Data="@Data"
               MiniMode="true"
               Mode="@DrawerMode.Push"
               @bind-SelectedItem="@SelectedItem"
               @ref="@DrawerRef">
    <Template>
        @* the header *@
        <div>
            <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@SvgIcon.Menu" />
            @if (DrawerExpanded)
            {
                <div class="text-info" style="border-bottom:solid; font-weight: bold; margin-bottom: 3em; white-space:nowrap">
                    My Custom Navigation
                </div>
            }
            else
            {
                <div class="text-info" style="border-bottom:solid; font-weight: bold;">
                    Nav
                </div>
            }
        </div>

        @* custom items rendering and item selection *@

        <div class="k-drawer-items">
            <ul>
                @if (SelectedItem != null && DrawerExpanded)
                {
                    <li class="k-drawer-item" style="white-space:nowrap">
                        <div>
                            <p><strong>@SelectedItem.Text</strong></p>
                            <p>@SelectedItem.Description</p>
                        </div>
                    </li>
                }

                @foreach (var item in Data)
                {
                    @* Use onclick to handle manual item selection *@
                    <li @onclick="@(() => SelectedItem = item)"
                    class="k-drawer-item @GetSelectedItemClass(item)" style="white-space:nowrap">
                        <TelerikSvgIcon Icon="@item.Icon" Class="styled-icon"></TelerikSvgIcon>

                        @if (DrawerExpanded)
                        {
                            <div>
                                <div>@item.Text</div>
                            </div>
                        }
                    </li>
                }
            </ul>
        </div>

        @* the footer *@
        @if (DrawerExpanded)
        {
            <div style="text-align: center; margin-top: 3em; padding-top: 2em; border-top: 2px solid black; white-space:nowrap">
                <img src="user-avatar.png" alt="my avatar" style="border-radius: 50%; width: 50px; height: 50px;" />
                <br /><br />
                <TelerikButton Icon="@SvgIcon.Logout" ThemeColor="primary">Log Out</TelerikButton>
            </div>
        }
    </Template>
    <DrawerContent>
        <div class="m-5">Content for @SelectedItem?.Text - @SelectedItem?.Description</div>
    </DrawerContent>
</TelerikDrawer>

@code {
    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    public DrawerItem SelectedItem { get; set; }
    public bool DrawerExpanded { get; set; } = true;
    public IEnumerable<DrawerItem> Data { get; set; } = new List<DrawerItem>
    {
        new DrawerItem {Text = "Shopping Cart", Icon = SvgIcon.Cart, Description = "Items in shopping cart"},
        new DrawerItem {Text = "Settings", Icon = SvgIcon.Gear, Description = "My profile settings"},
        new DrawerItem {Text = "Notifications", Icon = SvgIcon.ExclamationCircle, Description = "My profile notifications"},
        new DrawerItem {Text = "Calendar", Icon = SvgIcon.Calendar, Description = "My events"},
    };

    public string GetSelectedItemClass(DrawerItem item)
    {
        if (SelectedItem == null) return string.Empty;
        return SelectedItem.Text.ToLowerInvariant().Equals(item.Text.ToLowerInvariant()) ? "text-info" : "";
    }

    public class DrawerItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public string Description { get; set; }
    }
}
````
>caption The result of the code snippet above

![drawer template example](images/drawer-templates-template-example.gif)


## See Also

* [Drawer Templates Demo](https://demos.telerik.com/blazor-ui/drawer/overview)
* [Drawer Data Binding](slug:drawer-data-binding)
* [Drawer Navigation](slug:drawer-navigation)
* [Hierarchical Drawer Demo](https://demos.telerik.com/blazor-ui/drawer/hierarchical-drawer)
