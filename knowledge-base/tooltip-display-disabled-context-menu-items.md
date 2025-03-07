---
title: Display Tooltip on Disabled Context Menu Items
description: Learn how to show tooltips over menu items that appear disabled in a Blazor application, using CSS for visual effects and conditional rendering.
type: how-to
page_title: How to Show Tooltips on Visually Disabled Context Menu Items with Blazor
slug: tooltip-kb-display-disabled-context-menu-items
tags: tooltip, context menu, blazor, disabled items
res_type: kb
ticketid: 1678456
---
## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Tooltip for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

This knowledge base article answers the following questions:
- How can I display tooltips on disabled context menu items in Blazor?
- Is it possible to make menu items appear disabled but still interact with tooltips in Blazor?
- How to apply conditional tooltips on visually disabled elements in a Blazor application?

## Solution

By default, disabled elements are not interactive and don’t trigger events like hover or click. Thus they don't integrate with tooltips. However, you can achieve the desired behavior by making them appear visually disabled while keeping them interactive for tooltips with the CSS code below.

`````RAZOR
<style>
    .disabled-item {
        opacity: 0.5; /* Make it look disabled */
        cursor: not-allowed;
    }

        .disabled-item > * {
            pointer-events: none; /* Prevent clicks on inner content but allow hover on parent */
        }
</style>

<div class="context-menu-target" style="width:200px; height: 100px; background: yellow;">
    Right-click (or tap and hold on a touch device) for a Context Menu.
</div>

<TelerikSwitch Value="@DisabledElements" ValueChanged="@((bool val) => SwitchHandler(val))" />
Disable Menu Items

<TelerikContextMenu Selector=".context-menu-target" Data="@MenuItems">
    <ItemTemplate>
        <div class="menu-item @(context.ItemDisabled ? "disabled-item" : "")" title="@($"{context.Text} is disabled!")" data-disabled="@context.ItemDisabled">
            @context.Text
        </div>
    </ItemTemplate>
</TelerikContextMenu>

<TelerikTooltip TargetSelector=".menu-item.disabled-item" />

@code {
    private List<ContextMenuItem> MenuItems { get; set; }

    private bool DisabledElements = false;

    public void SwitchHandler(bool value)
    {
        DisabledElements = value;
        foreach (ContextMenuItem menuItem in MenuItems.Where(p => p.ItemType == "A"))
        {
            menuItem.ItemDisabled = DisabledElements;
        }
    }

    protected override void OnInitialized()
    {
        var itemTypes = new[] { "A", "B" };
        MenuItems = Enumerable.Range(1, 4)
            .Select(i => new ContextMenuItem
                {
                    Text = $"Item {i}",
                    ItemType = itemTypes[(i - 1) / 2]
                })
            .ToList();

        base.OnInitialized();
    }

    public class ContextMenuItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public bool ItemDisabled { get; set; }
        public string ItemType { get; set; }
    }
}
`````

## See Also

- [Telerik UI for Blazor Tooltip Documentation](slug:tooltip-overview)
- [Telerik UI for Blazor ContextMenu Documentation](slug:contextmenu-overview)
