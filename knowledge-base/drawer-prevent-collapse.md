---
title: Prevent Drawer from collapsing on item click
description: How to prevent the Drawer from collapsing when item is clicked.
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

1. Use the [Template]({%slug drawer-templates%}#template) to take control over the rendering of the entire component. The Drawer renders as `ul` with `li` elements for the individual items.
2. In order to stop the component from collapsing on item click you need to add the `@onclick:stopPropagation` to the `<li>` tag.

>caption Stop the Drawer from collapsing on item click

````CSHTML
@* Toggle the expanded or collapsed state only by a button click. Clicking on a Drawer item will navigate you to the value of the Text property of the DrawerItem class. See the SelectAndNavigate method for reference *@

@inject NavigationManager navManager

<TelerikDrawer @bind-Expanded="@DrawerExpanded"
               Data="@Data"
               MiniMode="true"
               Mode="@DrawerMode.Push"
               @bind-SelectedItem="@SelectedItem"
               @ref="@DrawerRef">
    <Template>
        <div class="k-drawer-items">
            <ul>
                @foreach (var item in Data)
                {
                    @* stop the propagation of the onclick event to prevent the drawer from collapsing *@
                    @* Use onclick to handle manual item selection and toggle the selected class *@
                    <li @onclick:stopPropagation
                        @onclick="@(() => SelectAndNavigate(item))"
                        class="k-drawer-item @GetSelectedItemClass(item)"
                        style="white-space:nowrap">
                        <span class="k-icon k-i-@item.Icon" style="margin-right: 8px;"></span>
                        @if (DrawerExpanded)
                        {
                            <span class="k-item-text">@item.Text</span>
                        }
                    </li>
                }
            </ul>
        </div>
    </Template>
    <Content>
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="menu" />
        <div class="m-5">Content for @SelectedItem?.Text - @SelectedItem?.Description</div>
    </Content>
</TelerikDrawer>

@code {
    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    public DrawerItem SelectedItem { get; set; }
    public bool DrawerExpanded { get; set; } = true;
    public IEnumerable<DrawerItem> Data { get; set; } = new List<DrawerItem>
    {
        new DrawerItem {Text = "Shopping Cart", Icon = "cart", Description = "Items in shopping cart"},
        new DrawerItem {Text = "Settings", Icon = "gear", Description = "My profile settings"},
        new DrawerItem {Text = "Notifications", Icon = "notification", Description = "My profile notifications"},
        new DrawerItem {Text = "Calendar", Icon = "calendar", Description = "My events"},
    };

    private void SelectAndNavigate(DrawerItem item)
    {
        SelectedItem = item;

        navManager.NavigateTo(SelectedItem.Text);
    }

    public string GetSelectedItemClass(DrawerItem item)
    {
        if (SelectedItem == null) return string.Empty;
        return SelectedItem.Text.ToLowerInvariant().Equals(item.Text.ToLowerInvariant()) ? "k-state-selected" : "";
    }

    public class DrawerItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
        public string Description { get; set; }
    }
}
````

