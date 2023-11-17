---
title: Data Binding
page_title: ChipList - Data Binding
description: Data Binding the ComboBox for Blazor.
slug: chiplist-bound
tags: telerik,blazor,chiplist,data,bind,binding,databind
published: True
position: 5
---

# ChipList Data Binding

This article explains how to provide data to a ChipList component, and the properties related to data binding.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

## Data Binding Features

The ChipList has features that map to properties in the model. The following model uses property names that will work automatically, with no additional ChipList configuration:

````CSHTML
<TelerikChipList Data="@ChipListSource"></TelerikChipList>

@code {
    private TelerikChipList<ChipModel> ChipListReference { get; set; }

    private List<ChipModel> ChipListSource { get; set; } = new List<ChipModel>()
    {
        new ChipModel()
        {
            Text = "Audio",
            Icon = SvgIcon.FileAudio,
            Disabled = false,
            Removable = true
        },
        new ChipModel()
        {
            Text = "Video",
            Icon = SvgIcon.FileVideo,
            Disabled = true,
            Removable = false
        }
    };

    public class ChipModel
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public bool Disabled { get; set; }
        public bool Removable { get; set; }
    }
}
````

### Data Binding Schema

The table below lists the available data binding parameters for the Blazor ChipList component. Use them when your model property names are different than the default values.

| ChipList Parameter | DEFAULT VALUE | Description |
|----------|----------|----------|
| `DisabledField`| `"Disabled"` | Defines if the chip is disabled (non-clickable). |
| `IconField`| `"Icon"` | The icon that renders in the chip. |
| `TextField`| `"Text"` | The text that renders in the chip. |
| `RemovableField`| `"Removable"` | Defines if the users can remove the chip. |

>caption Databound ChipList with custom model property names

````CSHTML
<TelerikChipList Data="@ChipListSource"
                 TextField="@nameof(ChipModel.ChipText)"
                 IconField="@nameof(ChipModel.ChipIcon)"
                 DisabledField="@nameof(ChipModel.isChipDisabled)"
                 RemovableField="@nameof(ChipModel.isChipRemovable)">
</TelerikChipList>

@code {
    private TelerikChipList<ChipModel> ChipListReference { get; set; }

    private List<ChipModel> ChipListSource { get; set; } = new List<ChipModel>()
    {
        new ChipModel()
        {
            ChipText = "Audio",
            ChipIcon = SvgIcon.FileAudio,
            isChipDisabled = false,
            isChipRemovable = true
        },
        new ChipModel()
        {
            ChipText = "Video",
            ChipIcon = SvgIcon.FileVideo,
            isChipDisabled = true,
            isChipRemovable = false
        }
    };

    public class ChipModel
    {
        public string ChipText { get; set; }
        public ISvgIcon ChipIcon { get; set; }
        public bool isChipDisabled { get; set; }
        public bool isChipRemovable { get; set; }
    }
}
````

## See Also

  * [ChipList Overview]({%slug chiplist-overview%})
  * [Live Demo: ChipList](https://demos.telerik.com/blazor-ui/chiplist/overview)
