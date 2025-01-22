---
title: Position
page_title: Floating Action Button Position
description: Explore the position and alignment settings of the Floating Action Button for Blazor.
slug: fab-positions
tags: telerik,blazor,floating action button,position,align,alignment
published: True
position: 2
---

# Position Settings

You can position and align the Blazor Floating Action Button component relative to its parent container by using the available parameters. The example at the bottom of the page lets you experiment with the available parameters.

## Position

The `PositionMode` parameter accepts a member of the `FloatingActionButtonPositionMode` enum and controls the CSS position of the Floating Action Button:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Enum member | Description |
|---------------|--------|
| `Fixed` <br /> (default) | Positions the button relative to the viewport. |
| `Absolute` | Positions the button relative to the nearest positioned ancestor. |

## Alignment

Use the available alignment parameters to control which side of the Floating Action Button touches the parent element:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Enum Members |
| ----------- | ----------- | ----------- |
| `HorizontalAlign` | `FloatingActionButtonHorizontalAlign` | `End` (default) <br /> `Start` <br /> `Center` |
| `VerticalAlign` | `FloatingActionButtonVerticalAlign` | `Bottom` (default) <br /> `Middle` <br /> `Top` |

## Example

````RAZOR
<div class="custom-container">
    <label>
        Horizontal Alignment
        <br />
        <TelerikDropDownList Data="@HorizontalAligns" @bind-Value="@HorizontalAlign" Width="150px">
            <DropDownListSettings>
                <DropDownButtonPopupSettings MaxHeight="auto" />
            </DropDownListSettings>
        </TelerikDropDownList>
    </label>
    <label>
        Vertical Alignment
        <br />
        <TelerikDropDownList Data="@VerticalAligns" @bind-Value="@VerticalAlign" Width="150px">
            <DropDownListSettings>
                <DropDownButtonPopupSettings MaxHeight="auto" />
            </DropDownListSettings>
        </TelerikDropDownList>
    </label>
</div>

<TelerikFloatingActionButton HorizontalAlign="@HorizontalAlign"
                             VerticalAlign="@VerticalAlign"
                             Icon="SvgIcon.Pin" />

<style>
    .custom-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        column-gap: 10px;
    }
</style>

@code {
    private FloatingActionButtonHorizontalAlign HorizontalAlign { get; set; } = FloatingActionButtonHorizontalAlign.Start;
    private List<FloatingActionButtonHorizontalAlign> HorizontalAligns { get; set; } = new List<FloatingActionButtonHorizontalAlign>()
    {
        FloatingActionButtonHorizontalAlign.Start,
        FloatingActionButtonHorizontalAlign.Center,
        FloatingActionButtonHorizontalAlign.End
    };

    private FloatingActionButtonVerticalAlign VerticalAlign { get; set; } = FloatingActionButtonVerticalAlign.Top;
    private List<FloatingActionButtonVerticalAlign> VerticalAligns { get; set; } = new List<FloatingActionButtonVerticalAlign>()
    {
        FloatingActionButtonVerticalAlign.Top,
        FloatingActionButtonVerticalAlign.Middle,
        FloatingActionButtonVerticalAlign.Bottom
    };
}
````
