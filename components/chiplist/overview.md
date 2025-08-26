---
title: Overview
page_title: ChipList Overview
description: Overview of the ChipList for Blazor.
slug: chiplist-overview
tags: telerik,blazor,chiplist,overview
published: True
position: 0
---

# Blazor ChipList Overview

The <a href="https://www.telerik.com/blazor-ui/chiplist" target="_blank">Blazor ChipList component</a> shows pieces of information in a compact form. The individual chips can be [selected](slug:chiplist-selection), removed, or disabled. You can respond to various user interactions through the exposed [events](slug:chiplist-events), customize the [appearance](slug:chiplist-appearance) of the chips, or define custom content for the chip with the [ItemTemplate](slug:chiplist-templates).

## Creating Blazor ChipList


1. Add the `TelerikChipList` tag
1. Set the `Data` parameter to a collection of models that will be rendered as chips.
1. Set the `TextField` parameter to point to the corresponding name in the model that holds the text that will be rendered in the individual chip. Read the [Data Binding article](slug:chiplist-bound) for more information on other binding options.

>caption Basic ChipList for Blazor

````RAZOR
<TelerikChipList Data="@ChipListSource"
                 TextField="@(nameof(ChipModel.ChipText))"
                 IconField="@(nameof(ChipModel.ChipIcon))">
</TelerikChipList>

@code {
    private List<ChipModel> ChipListSource { get; set; } = new List<ChipModel>()
    {
        new ChipModel()
        {
            ChipText = "Audio",
            ChipIcon = SvgIcon.FileAudio
        },
        new ChipModel()
        {
            ChipText = "Video",
            ChipIcon = SvgIcon.FileVideo
        }
    };

    public class ChipModel
    {
        public string ChipText { get; set; }
        public ISvgIcon ChipIcon { get; set; }
    }
}
````

## Data Binding

The Blazor ChipList requires a data source so that it can display items to the user. To provide a data source, use the `Data` property. Some properties of the ChipList model can enhance the behavior and appearance of each chip. [Read more about the Blazor ChipList data binding](slug:chiplist-bound).

## Selection

The Blazor ChipList supports single and multiple selection of chips. [Read more about the Blazor ChipList selection...](slug:chiplist-selection)  

## Templates 

You can use the functionality of the built-in templates and customize the default rendering of the component. [Read more about the Blazor ChipList templates...](slug:chiplist-templates)

## Events

You can use the built-in events of the Blazor ChipList to react to chip selection and removal. [Read more about the Blazor ChipList events...](slug:chiplist-events)

## Appearance

You can customize the [appearance of the Blazor ChipList](slug:chiplist-appearance) via a variety of built-in customization options. Also see how to [set `ThemeColor`](slug:chip-appearance#themecolor) for each [chip in the ChipList](slug:chiplist-bound).

## ChipList Parameters

The table below lists the ChipList parameters. Also check the [ChipList API Reference](slug:Telerik.Blazor.Components.TelerikChipList-1) for all parameters, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AriaLabel` | `string` | Maps to the `aria-label` attribute. Use  this parameter if the text that labels the component is not visible. |
| `AriaLabelledBy` | `string` | Maps to the `area-labelledby` attribute. Use this parameter to reference another element to define its accessible name. |
| `Class` | `string` | An additional CSS class for the `<div class="k-chip-list">` element. Use it to [customize the component styles and override the theme](slug:themes-override). |
| `Data` | `IEnumerable<TItem>` | The collection of the items that will be rendered as chips. |
| `Removable` | `bool` | Specifies if the chips can be removed by the user. If set to `true` a remove icon will be rendered on each available chip. |
| `RemoveIcon` | `object` | Defines the icon that will be rendered if the `Removable` parameter is set to `true`. |

## Next Steps

* [Binding the ChipList to Data](slug:chiplist-bound)
* [Handle the ChipList events](slug:chiplist-events)
* [Handle Chip Selection](slug:chiplist-selection)


## See Also

  * [Live Demo: ChipList Overview](https://demos.telerik.com/blazor-ui/chiplist/overview)
  * [ChipList API Reference](slug:Telerik.Blazor.Components.TelerikChipList-1)
