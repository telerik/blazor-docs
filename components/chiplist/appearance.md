---
title: Appearance
page_title: ChipList - Appearance
description: Appearance settings of the ChipList for Blazor.
slug: chiplist-appearance
tags: telerik,blazor,chiplist,appearance
published: True
position: 35
---

# ChipList Appearance Settings

You can control the appearance of the chips in the ChipList by setting the following parameters:

* [FillMode](#fillmode)
* [Rounded](#rounded)
* [Size](#size)

You can use all of them together to achieve the desired appearance. This article will explain their effect one by one.

Also see how to [set `ThemeColor`](slug:chip-appearance#themecolor) for each [chip in the ChipList](slug:chiplist-bound).

## FillMode

The `FillMode` controls how the individual chip is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Chip.FillMode` class:

| Class members | Manual declarations |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Outline`|`outline`|

>caption The built-in Fill modes

````RAZOR
@* These are all built-in fill modes *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Chip.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string fillmode = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikChipList Data="@ChipListSource"
                     FillMode="@fillmode">
            </TelerikChipList>
        </div>
    }
}

@code {
    private IEnumerable<ChipModel> ChipListSelectedItems { get; set; } = new List<ChipModel>();

    private List<ChipModel> ChipListSource { get; set; } = new List<ChipModel>()
    {
        new ChipModel()
        {
            Text = "Audio",
            Icon = SvgIcon.FileAudio
        },
        new ChipModel()
        {
            Text = "Video",
            Icon = SvgIcon.FileVideo
        }
    };

    public class ChipModel
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````

## Rounded

The `Rounded` parameter applies the `border-radius` CSS rule to the chip to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Chip.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium` <br /> default value |`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

````RAZOR
@* The built-in rounded edges of the chip.  *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Chip.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikChipList Data="@ChipListSource"
                     Rounded="@rounded">
            </TelerikChipList>
        </div>
    }
}

@code {
    private IEnumerable<ChipModel> ChipListSelectedItems { get; set; } = new List<ChipModel>();

    private List<ChipModel> ChipListSource { get; set; } = new List<ChipModel>()
    {
        new ChipModel()
        {
            Text = "Audio",
            Icon = SvgIcon.FileAudio
        },
        new ChipModel()
        {
            Text = "Video",
            Icon = SvgIcon.FileVideo
        }
    };

    public class ChipModel
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````

## Size

You can increase or decrease the size of the chips by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Chip.Size` class:

| Class members | Manual declarations |
|---------------|--------|
| `Small`   |`sm`|
| `Medium` <br /> default value  |`md`|
| `Large`   |`lg`|

>caption The built-in chip sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Chip.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikChipList Data="@ChipListSource"
                     Size="@size">
            </TelerikChipList>
        </div>
    }
}

@code {
    private IEnumerable<ChipModel> ChipListSelectedItems { get; set; } = new List<ChipModel>();

    private List<ChipModel> ChipListSource { get; set; } = new List<ChipModel>()
    {
        new ChipModel()
        {
            Text = "Audio",
            Icon = SvgIcon.FileAudio
        },
        new ChipModel()
        {
            Text = "Video",
            Icon = SvgIcon.FileVideo
        }
    };

    public class ChipModel
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Set ThemeColor for each chip in the ChipList](slug:chiplist-bound)
