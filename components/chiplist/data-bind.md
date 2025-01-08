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

The ChipList has features that map to properties in the component model class. The following example uses property names that will work automatically, with no additional ChipList configuration.

>caption Using default property names in the ChipList model class

````RAZOR
<TelerikChipList Data="@ChipListData"></TelerikChipList>

@code {
    private List<ChipModel> ChipListData { get; set; } = new List<ChipModel>() {
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
            Disabled = false,
            Removable = false
        },
        new ChipModel()
        {
            Text = "Image",
            Icon = SvgIcon.FileImage,
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

The table below lists the available data binding parameters for the Blazor ChipList component. Use them when your model property names are different from the default values.

| ChipList Parameter | Default Value | Description |
|----------|----------|----------|
| `DisabledField`| `"Disabled"` | Defines if the chip is disabled (non-clickable). |
| `IconField` | `"Icon"` | The icon that renders in the chip. |
| `TextField` | `"Text"` | The text that renders in the chip. |
| `RemovableField`| `"Removable"` | Defines if the users can remove the chip. |

#### Icons

The `IconField` model property can hold:

* A property of the static `SvgIcon` class;
* A member of the `FontIcon` enum;
* A `string` that is a CSS class for a custom icon.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption ChipList with custom model property names

````RAZOR
<TelerikChipList Data="@ChipListData"
                 TextField="@nameof(ChipModel.ChipText)"
                 IconField="@nameof(ChipModel.ChipIcon)"
                 DisabledField="@nameof(ChipModel.ChipDisabled)"
                 RemovableField="@nameof(ChipModel.ChipRemovable)">
</TelerikChipList>

@[template](/_contentTemplates/common/icons.md#font-icons-css-code)

@code {
    private List<ChipModel> ChipListData { get; set; } = new List<ChipModel>() {
        new ChipModel()
        {
            ChipText = "Audio (SVG icon)",
            ChipIcon = SvgIcon.FileAudio,
            ChipDisabled = false,
            ChipRemovable = true
        },
        new ChipModel()
        {
            ChipText = "Video (Font icon)",
            ChipIcon = FontIcon.FileVideo,
            ChipDisabled = false,
            ChipRemovable = false
        },
        new ChipModel()
        {
            ChipText = "Image (disabled)",
            ChipIcon = SvgIcon.FileImage,
            ChipDisabled = true,
            ChipRemovable = false
        }
    };

    public class ChipModel
    {
        public string ChipText { get; set; }
        public object ChipIcon { get; set; }
        public bool ChipDisabled { get; set; }
        public bool ChipRemovable { get; set; }
    }
}
````

## See Also

* [ChipList Overview](slug://chiplist-overview)
* [Live Demo: ChipList](https://demos.telerik.com/blazor-ui/chiplist/overview)
