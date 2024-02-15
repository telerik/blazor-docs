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

I would like to add [Tooltips]({%slug tooltip-overview%}) to the [Drawer's]({%slug drawer-overview%}) navigation icons.

## Solution

To add a tooltip to the drawer navigation icons you have to use the [ItemTemplate]({%slug drawer-templates%}#itemtemplate) to set a `title` attribute to the desired element (like the `span` that contains the icon).

If using a [TelerikTooltip](https://demos.telerik.com/blazor-ui/tooltip/overview), add a suitable CSS selector, which targets the span with the icon, to the `TargetSelector` parameter of the component.

>caption Add a tooltip to the Drawer navigation icons

````CSHTML
<TelerikTooltip TargetSelector=".k-drawer-items span.icon-container[title]" />

<p>
    <TelerikButton OnClick="@( () => DrawerRef.ToggleAsync() )" Icon="@SvgIcon.Menu">Toggle drawer</TelerikButton>
</p>

<TelerikDrawer Data="@Data"
               MiniMode="true"
               Mode="@DrawerMode.Push"
               @ref="@DrawerRef">
    <ItemTemplate Context="item">
        <span class="icon-container" title="@item.Title">
            <TelerikSvgIcon Icon="@item.Icon" />
        </span>
        <span class="k-item-text">@item.Text</span>
    </ItemTemplate>
</TelerikDrawer>

@code {
    private TelerikDrawer<DrawerItem>? DrawerRef { get; set; }

    private IEnumerable<DrawerItem> Data { get; set; } = new List<DrawerItem>
    {
        new DrawerItem { Title="Counter Title", Text = "Counter", Icon = SvgIcon.Plus, Url = "counter" },
        new DrawerItem { Title="FetchData Title", Text = "FetchData", Icon = SvgIcon.GridLayout, Url = "fetchdata" },
    };

    public class DrawerItem
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public string Url { get; set; }
    }
}
````
