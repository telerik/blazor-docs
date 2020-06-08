---
title: Prevent Drawer from collapsing on item click
description: How to prevent the Drawer from collapsing when item is clicked
type: how-to
page_title: Prevent Drawer collapse
slug: drawer-kb-prevent-collapse
position:
tags:
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Drawer for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I would like to prevent the Drawer from collapsing when an item from the navigation is clicked and switch between the collapsed and expanded state by the click of a button.


## Solution

Use the [Template]({%slug drawer-templates%}#template) to take control over the rendering of the entire component. The Drawer renders as `ul` with `li`. In order to stop the component from collapsing on item click you need to add the `@onclick:stopPropagation` to the `<li>` tag.

>caption Stop the Drawer from collapsing on item click

````CSHTML
@* Toggle the expanded or collapsed state only by a button click *@

<TelerikDrawer @bind-Expanded="@DrawerExpanded"
               Data="@Data"
               MiniMode="true"
               Mode="@DrawerMode.Push"
               @bind-SelectedItem="@SelectedItem"
               @ref="@DrawerRef">
    <Template>
        @* the header *@
        <div>
            <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@IconName.Menu" />
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
                        class="k-drawer-item @GetSelectedItemClass(item)" @onclick:stopPropagation style="white-space:nowrap">
                        <span class="k-icon k-i-@item.Icon" style="margin-right: 8px;"></span>
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
                <TelerikButton Icon="@IconName.Logout" Primary="true">Log Out</TelerikButton>
            </div>
        }
    </Template>
    <Content>
        <div class="m-5">Content for @SelectedItem?.Text - @SelectedItem?.Description</div>
    </Content>
</TelerikDrawer>

@code {
    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    public DrawerItem SelectedItem { get; set; }
    public bool DrawerExpanded { get; set; } = true;
    public IEnumerable<DrawerItem> Data { get; set; } = new List<DrawerItem>
{
        new DrawerItem {Text = "Shopping Cart", Icon = IconName.Cart, Description = "Items in shopping cart"},
        new DrawerItem {Text = "Settings", Icon = IconName.Gear, Description = "My profile settings"},
        new DrawerItem {Text = "Notifications", Icon = IconName.Notification, Description = "My profile notifications"},
        new DrawerItem {Text = "Calendar", Icon = IconName.Calendar, Description = "My events"},
    };

    public string GetSelectedItemClass(DrawerItem item)
    {
        if (SelectedItem == null) return string.Empty;
        return SelectedItem.Text.ToLowerInvariant().Equals(item.Text.ToLowerInvariant()) ? "text-info" : "";
    }

    public class DrawerItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
        public string Description { get; set; }
    }
}
````
