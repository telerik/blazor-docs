---
title: Adding Tooltips for Chips in a ChipList
description: Learn how to display tooltips for chips in the Telerik Blazor ChipList component.
type: how-to
page_title: How to Display Tooltips for Chips in Telerik Blazor ChipList
meta_title: How to Display Tooltips for Chips in Telerik Blazor ChipList
slug: chiplist-kb-add-chip-tooltips
tags: blazor, chiplist, tooltip, itemtemplate
res_type: kb
ticketid: 1691888
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Telerik UI for Blazor ChipList</td>
        </tr>
    </tbody>
</table>

## Description

You can display additional information for each chip in the [ChipList](slug:chiplist-overview) by showing a Tooltip. This approach helps you keep the chip text concise while providing more details on hover.

This article answers the following questions:
- How do you show extra details for chips in a ChipList?
- Can you display a TelerikTooltip for each chip in the ChipList?
- How do you use `ItemTemplate` in Telerik Blazor ChipList?

## Solution

To add tooltips to chips in the ChipList, use the `ItemTemplate` to customize chip rendering and set a tooltip for each chip. Follow these steps:

1. Add a `Description` property to the model used for the ChipList.
2. Use the `ItemTemplate` to render each chip and set the `title` attribute for a native tooltip.
3. Optionally, use the `TelerikTooltip` component for enhanced tooltip appearance and behavior.

**Example: Displaying Tooltips for Chips**

```razor
<TelerikChipList Data="@ChipListSource">
    <ItemTemplate>
        <div title="@context.Description" class="chip-description">
            <TelerikSvgIcon Icon="@context.Icon"></TelerikSvgIcon>
            @context.Text
        </div>
    </ItemTemplate>
</TelerikChipList>

<TelerikTooltip TargetSelector=".chip-description" />

@code {
    private List<ChipModel> ChipListSource { get; set; } = new List<ChipModel>
    {
        new ChipModel
        {
            Text = "Audio",
            Icon = SvgIcon.FileAudio,
            Description = "Audio file chip."
        },
        new ChipModel
        {
            Text = "Video",
            Icon = SvgIcon.FileVideo,
            Description = "Video file chip."
        }
    };

    public class ChipModel
    {
        public string Text { get; set; }
        public object? Icon { get; set; }
        public string Description { get; set; }
    }
}
```

## See Also
- [ChipList Overview](slug:chiplist-overview)
- [ChipList Templates](slug:chiplist-templates#item-template)
- [Tooltip Overview](slug:tooltip-overview)