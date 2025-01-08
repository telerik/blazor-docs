---
title: Add tooltips to the Drawer items
description: How to add tooltips to the Drawer items.
type: how-to
page_title: Drawer tooltips
slug: drawer-kb-tooltips
position:
tags:
ticketid: 1640720
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

I would like to add [Tooltips](slug://tooltip-overview) to the [Drawer's](slug://drawer-overview) navigation icons.

## Solution

To add a tooltip to the drawer navigation icons you have to use the [ItemTemplate](slug://drawer-templates#itemtemplate) to set a `title` attribute to the desired element (like the `span` that contains the icon).

If using a [TelerikTooltip](https://demos.telerik.com/blazor-ui/tooltip/overview), add a suitable CSS selector, which targets the span with the icon, to the `TargetSelector` parameter of the component.

When using an `ItemTemplate`, the Drawer can still [navigate automatically if the `UrlField` parameter is set, or if the Drawer data items have a populated `Url` property](slug://drawer-navigation).

>caption Add a tooltip to the Drawer navigation icons

````RAZOR
<TelerikTooltip TargetSelector=".k-drawer-items span.icon-container[title]" />

<p>
    <TelerikButton OnClick="@ToggleDrawer" Icon="@SvgIcon.Menu">Toggle Drawer</TelerikButton>
</p>

<TelerikDrawer @ref="@DrawerRef"
               Data="@DrawerData"
               MiniMode="true"
               Mode="@DrawerMode.Push">
    <ItemTemplate Context="item">

        @* When UrlField is set or there is Url property, the Drawer will navigate automatically. *@

        <span class="icon-container" title="@item.Title">
            <TelerikSvgIcon Icon="@item.Icon" />
        </span>
        <span class="k-item-text">@item.Text</span>

        @* *** *@

        @* When UrlField is not set and there is no Url property, navigate manually with NavLink or NavigationManager. *@

        @*<NavLink>
            <TelerikSvgIcon Icon="@item.Icon" />
        </NavLink>
        <NavLink class="k-item-text drawer-navlink">
            <span>@item.Text</span>
        </NavLink>*@

    </ItemTemplate>
</TelerikDrawer>

<style>
    .drawer-navlink {
        color: inherit;
        text-decoration: none;
    }
</style>

@code {
    private TelerikDrawer<DrawerItem>? DrawerRef { get; set; }

    private IEnumerable<DrawerItem> DrawerData { get; set; } = new List<DrawerItem>
    {
        new DrawerItem { Title="Counter Title", Text = "Counter", Icon = SvgIcon.Plus, Url = "counter" },
        new DrawerItem { Title="FetchData Title", Text = "FetchData", Icon = SvgIcon.GridLayout, Url = "fetchdata" },
    };

    private async Task ToggleDrawer()
    {
        await DrawerRef?.ToggleAsync();
    }

    public class DrawerItem
    {
        public string Title { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public ISvgIcon? Icon { get; set; }
        public string Url { get; set; } = string.Empty;
    }
}
````
