---
title: Templates
page_title: Drawer for Blazor | Templates
description: Templates in the Drawer for Blazor
slug: drawer-templates
tags: telerik,blazor,drawer,templates
published: True
position: 12
---


# Drawer Templates

The Drawer can be customized by using Templates. This article explains the available layout templates for the component.

* [Template](#template)
* [ItemTemplate](#itemtemplate)

## Template

The template allows you to control the whole rendering of the Drawer. To set it, provide the
`<Template>` tag. The component is rendered as `<ul>` with `<li>`.

When using this template the item selection is disabled and must be implemented by the application as shown in the example below. The changing of the state of the component (expanded or collapsed) will happen, but the content has to be controlled by the application too.

>caption Using a row template with manual item selection

````CSHTML
@* This example shows how to create header and footer for the Drawer and select an item manually. *@

<TelerikDrawer @bind-Expanded="Expanded"
               Data="Data"
               MiniMode="MiniMode"
               Mode="DrawerMode.Push"
               @bind-SelectedItem="SelectedItem"
               @ref="DrawerRef">
    <Template>
        <div>
            <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@IconName.Menu" />
            @if (Expanded)
            {
                <div class="text-info" style="border-bottom:solid; font-weight: bold;">
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
        <div class="k-drawer-items" role="menubar" aria-orientation="vertical">
            <ul>
                @if (SelectedItem != null && Expanded)
                {
                    <div>
                        <div>
                            <p><strong>@SelectedItem.Text</strong></p>
                            <p>@SelectedItem.Description</p>
                        </div>
                    </div>
                }

                @foreach (var item in Data)
                {
                    @*Use the onclick to handle manual item selection*@
                    <li class="k-drawer-item" @onclick="@(() => SelectedItem = item)">
                        <span class="k-icon k-i-@item.Icon" style="margin-right: 8px;"></span>
                        @if (Expanded)
                        {
                            <div>
                                <div>@item.Text</div>
                            </div>
                        }
                    </li>
                }
            </ul>
        </div>
    </Template>
</TelerikDrawer>


@code {
    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    public DrawerItem SelectedItem { get; set; }
    public bool Expanded { get; set; } = true;
    public bool MiniMode { get; set; } = true;
    public IEnumerable<DrawerItem> Data { get; set; } = new List<DrawerItem>
{
        new DrawerItem {Text = "Shopping Cart", Icon = IconName.Cart, Description = "Items in shopping cart"},
        new DrawerItem {Text = "Settings", Icon = IconName.Gear, Description = "My profile settings"},
        new DrawerItem {Text = "Notifications", Icon = IconName.Notification, Description = "My profile notifications"},
        new DrawerItem {Text = "Calendar", Icon = IconName.Calendar, Description = "My events"},
    };

    public class DrawerItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
        public string Description { get; set; }
    }
}
````
>caption The result of the code snippet above

![drawer template example](images/drawer-templates-template-example.gif)

>note Using <Template> and <ItemTemplate> together is not available.

## ItemTemplate

The `<ItemTemplate>` controls the rendering of the items in the menu of the Drawer.
