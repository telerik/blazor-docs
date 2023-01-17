---
title: Templates
page_title: ChipList - Templates
description: Templates in the ChipList for Blazor.
slug: chiplist-templates
tags: telerik,blazor,chiplist,templates
published: True
position: 25
---

# ChipList Templates

The ChipList component allows you to change what is rendered in the chip. This article explains the built-in templates in the Blazor ChipList.

* [Item Template](#item-template)

## Item Template

The `<ItemTemplate>` allows you to control the rendering of the chips in the ChipList. This template receives a `context` argument that represents the current item.

````CSHTML
<TelerikChipList Data="@ChipListSource">
    <ItemTemplate>
        @{
            <div>
                <TelerikFontIcon Icon="@context.Icon"></TelerikFontIcon>
                Item: @context.Text
            </div>
        }
    </ItemTemplate>
</TelerikChipList>

@code {
    private IEnumerable<ChipModel> ChipListSelectedItems { get; set; } = new List<ChipModel>();

    private List<ChipModel> ChipListSource { get; set; } = new List<ChipModel>()
    {
        new ChipModel()
        {
            Text = "Audio",
            Icon = FontIcon.FileAudio
        },
        new ChipModel()
        {
            Text = "Video",
            Icon = FontIcon.FileVideo
        }
    };

    public class ChipModel
    {
        public string Text { get; set; }
        public FontIcon? Icon { get; set; }
    }
}
````
## See Also

  * [ChipList Overview]({%slug chiplist-overview%})
   
  
