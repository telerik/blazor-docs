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

The ChipList has features that map to properties in the component model class.

### Schema

The table below lists the available data binding parameters for the Blazor ChipList component. Use them when your model property names are different from the default values.

| ChipList Parameter | Default Value | Description |
|----------|----------|----------|
| `DisabledField`| `"Disabled"` | Defines if the chip is disabled (non-clickable). |
| `FillModeField`| `"FillMode"` | Defines the [`FillMode` of each chip](slug:chip-appearance#fillmode). |
| `IconField` | `"Icon"` | The icon that renders in the chip. See [Icons](#icons) below. |
| `RemovableField`| `"Removable"` | Defines if the users can remove the chip. |
| `TextField` | `"Text"` | The text that renders in the chip. |
| `ThemeColorField`| `"ThemeColor"` | Defines the [`ThemeColor` of each chip](slug:chip-appearance#themecolor). |

#### Icons

The `IconField` model property can hold:

* A property of the static `SvgIcon` class;
* A member of the `FontIcon` enum;
* A `string` that is a CSS class for a custom icon.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

## Examples

### Default Property Names

The following example uses property names that work automatically with no additional ChipList configuration.

>caption Using default property names in the ChipList model class

````RAZOR
<TelerikChipList Data="@ChipListData" />

@code {
    private List<ChipModel> ChipListData { get; set; } = new()
    {
        new ChipModel()
        {
            Text = "Solid Base",
            Icon = SvgIcon.Sparkles
        },
        new ChipModel()
        {
            Text = "Outline Info",
            Icon = SvgIcon.QuestionCircle,
            ThemeColor = ThemeConstants.Chip.ThemeColor.Info,
            FillMode = ThemeConstants.Chip.FillMode.Outline
        },
        new ChipModel()
        {
            Text = "Solid Success",
            Icon = SvgIcon.Star,
            ThemeColor = ThemeConstants.Chip.ThemeColor.Success
        },
        new ChipModel()
        {
            Text = "Outline Warning Removable",
            Icon = SvgIcon.ExclamationCircle,
            ThemeColor = ThemeConstants.Chip.ThemeColor.Warning,
            FillMode = ThemeConstants.Chip.FillMode.Outline,
            Removable = true
        },
        new ChipModel()
        {
            Text = "Solid Error Disabled",
            Icon = SvgIcon.XOutline,
            ThemeColor = ThemeConstants.Chip.ThemeColor.Error,
            Disabled = true
        }
    };

    public class ChipModel
    {
        public bool Disabled { get; set; }
        public string FillMode { get; set; } = string.Empty;
        public object? Icon { get; set; }
        public bool Removable { get; set; }
        public string Text { get; set; } = string.Empty;
        public string ThemeColor { get; set; } = string.Empty;
    }
}
````

### Custom Property Names

The following example uses custom property names that need explicit ChipList configuration.

>caption ChipList with custom model property names

````RAZOR
<TelerikChipList Data="@ChipListData"
                 DisabledField="@nameof(ChipModel.ChipDisabled)"
                 FillModeField="@nameof(ChipModel.ChipFillMode)"
                 IconField="@nameof(ChipModel.ChipIcon)"
                 RemovableField="@nameof(ChipModel.ChipRemovable)"
                 TextField="@nameof(ChipModel.ChipText)"
                 ThemeColorField="@nameof(ChipModel.ChipThemeColor)" />

@code {
    private List<ChipModel> ChipListData { get; set; } = new()
    {
        new ChipModel()
        {
            ChipText = "Solid Base",
            ChipIcon = SvgIcon.Sparkles
        },
        new ChipModel()
        {
            ChipText = "Outline Info",
            ChipIcon = SvgIcon.QuestionCircle,
            ChipThemeColor = ThemeConstants.Chip.ThemeColor.Info,
            ChipFillMode = ThemeConstants.Chip.FillMode.Outline
        },
        new ChipModel()
        {
            ChipText = "Solid Success",
            ChipIcon = SvgIcon.Star,
            ChipThemeColor = ThemeConstants.Chip.ThemeColor.Success
        },
        new ChipModel()
        {
            ChipText = "Outline Warning Removable",
            ChipIcon = SvgIcon.ExclamationCircle,
            ChipThemeColor = ThemeConstants.Chip.ThemeColor.Warning,
            ChipFillMode = ThemeConstants.Chip.FillMode.Outline,
            ChipRemovable = true
        },
        new ChipModel()
        {
            ChipText = "Solid Error Disabled",
            ChipIcon = SvgIcon.XOutline,
            ChipThemeColor = ThemeConstants.Chip.ThemeColor.Error,
            ChipDisabled = true
        }
    };

    public class ChipModel
    {
        public bool ChipDisabled { get; set; }
        public string ChipFillMode { get; set; } = string.Empty;
        public object? ChipIcon { get; set; }
        public bool ChipRemovable { get; set; }
        public string ChipText { get; set; } = string.Empty;
        public string ChipThemeColor { get; set; } = string.Empty;
    }
}
````

## See Also

* [ChipList Overview](slug:chiplist-overview)
* [Live Demo: ChipList](https://demos.telerik.com/blazor-ui/chiplist/overview)
