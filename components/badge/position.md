---
title: Position
page_title: Badge Position
description: Explore the position and alignment settings of the Badge for Blazor. The example in the bottom of the page lets you experiment with the available parameters.
slug: badge-position-alignment
tags: telerik,blazor,badge,position,align,alignment
published: True
position: 35
---

# Position Settings

This article outlines the available Badge parameters, which control its position and alignment.

## Position

The `Position` parameter accepts a member of the `BadgePosition` enum and controls where the badge displays based on the parent container:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Enum member | Description |
|---------------|--------|
| `Edge` <br /> (default) | The center of the Badge will touch the edge of the parent container. |
| `Inside` | The Badge renders entirely inside the parent container. |
| `Outside`   | The Badge renders entirely outside the parent container. | 

See the [example](#example) below to customize the available parameters and see how they affect the Badge component.

## Alignment

Use the available parameters to control which side of the Badge touches the parent container.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Enum Members |
| ----------- | ----------- | ----------- |
| `HorizontalAlign` | `BadgeHorizontalAlign` | `Start` <br /> `End` (default value) |
| `VerticalAlign` | `BadgeVerticalAlign` | `Top` (default value) <br /> `Bottom` |

See the [example](#example) below to customize the available parameters and see how they affect the Badge component.

## Example

The following example lets you experiment with the available settings that control the position and alignment of the Badge. It starts with the default component behavior.

````CSHTML
<div class="container">
    <div class="row">
        <div class="col-md-4">
            <label>
                Position
                <TelerikDropDownList Data="@Positions" @bind-Value="@Position"></TelerikDropDownList>
            </label>
        </div>
        <div class="col-md-4">
            <label>
                Horizontal Position
                <TelerikDropDownList Data="@BadgeHorizontalAlignSettings" @bind-Value="@BadgeHorizontalAlignSetting"></TelerikDropDownList>
            </label>
        </div>
        <div class="col-md-4">
            <label>
                Vertical Position
                <TelerikDropDownList Data="@BadgeVerticalAlignSettings" @bind-Value="@BadgeVerticalAlignSetting"></TelerikDropDownList>
            </label>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 text-center">
            <TelerikButton>
                Notifications
                <TelerikBadge Position="@Position"
                              HorizontalAlign="@BadgeHorizontalAlignSetting"
                              VerticalAlign="@BadgeVerticalAlignSetting">
                    10
                </TelerikBadge>
            </TelerikButton>
        </div>
    </div>
</div>

@code {
    private BadgePosition Position { get; set; } = BadgePosition.Edge;
    private List<BadgePosition> Positions { get; set; } = new List<BadgePosition>()
    {
        BadgePosition.Edge,
        BadgePosition.Inside,
        BadgePosition.Outside
    };

    private BadgeHorizontalAlign BadgeHorizontalAlignSetting { get; set; } = BadgeHorizontalAlign.End;
    private List<BadgeHorizontalAlign> BadgeHorizontalAlignSettings { get; set; } = new List<BadgeHorizontalAlign>()
    {
        BadgeHorizontalAlign.Start,
        BadgeHorizontalAlign.End
    };

    private BadgeVerticalAlign BadgeVerticalAlignSetting { get; set; } = BadgeVerticalAlign.Top;
    private List<BadgeVerticalAlign> BadgeVerticalAlignSettings { get; set; } = new List<BadgeVerticalAlign>()
    {
        BadgeVerticalAlign.Top,
        BadgeVerticalAlign.Bottom
    };
}
````

## See Also

  * [Live Demo: AppBar Position](https://demos.telerik.com/blazor-ui/appbar/position)