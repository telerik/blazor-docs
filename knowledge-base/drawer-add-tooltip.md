---
title: Add tooltips to the Drawer items
description: How to add tooltips to the Drawer items
type: how-to
page_title: Drawer tooltips
slug: drawer-kb-tooltips
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

I would like to add [Tooltips]({%slug tooltip-overview%}) to the [Drawer's]({%slug drawer-overview%}) navigation icons.


## Solution

To add a tooltip to the drawer navigation icons you have to use the [ItemTemplate]({%slug drawer-templates%}#itemtemplate) to set a `title` attribute to the span that contains the icon.4

If using a TelerikTooltip, add a suitable CSS selector, which targets the span with the icon, to the `TargetSelector` parameter of the component.

>caption Add a tooltip to the Drawer navigation icons

````CSHTML
@* Add a Telerik Tooltip to the Drawer *@

<TelerikTooltip TargetSelector=".k-drawer-items span.k-icon[title]" />

<p>
    <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@IconName.Menu">Toggle drawer</TelerikButton>
</p>

<TelerikDrawer Data="@Data"
               MiniMode="true"
               Mode="@DrawerMode.Push"
               @ref="@DrawerRef">
    <ItemTemplate Context="item">
        <span class="k-icon k-i-@item.Icon" title="@item.Title"></span>
        <span class="k-item-text">@item.Text</span>
    </ItemTemplate>
</TelerikDrawer>



@code {
    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    public IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
        {
            new DrawerItem { Title="Counter Title", Text = "Counter", Icon = IconName.Plus},
            new DrawerItem { Title="FetchData Title", Text = "FetchData", Icon = IconName.GridLayout},
        };

    public class DrawerItem
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public string Icon { get; set; }
    }
}
````
