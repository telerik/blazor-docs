---
title: Overview
page_title: Chip Overview
description: Overview of the Chip for Blazor.
slug: chip-overview
tags: telerik,blazor,chip,overview
published: True
position: 0
---

# Blazor Chip Overview

The <a href="https://www.telerik.com/blazor-ui/chip" target="_blank">Blazor Chip component</a> shows a piece of information in a compact form. The chip can be selected, removed or disabled. You can respond to various user interactions through the exposed [events](slug://chip-events), and customize the [appearance](slug://chip-appearance) of the Telerik Chip for Blazor.

## Creating Blazor Chip

To use a Telerik Chip for Blazor:

1. Add the `TelerikChip` tag.
1. Set the `Selected` parameter to a `boolean`. It supports one-way and two-way binding.
1. Set the `Text` and `Icon` parameters, or define arbitrary `ChildContent` inside the `TelerikChip` tag. 

>caption Basic Chip for Blazor

````RAZOR
<TelerikChip @bind-Selected="@Chip1Selected"
             Text="Audio"
             Icon="@SvgIcon.FileAudio">
</TelerikChip>

<TelerikChip @bind-Selected="@Chip2Selected">
    <TelerikSvgIcon Icon="@SvgIcon.Gear" />
    Chip ChildContent
</TelerikChip>


@code {
    private bool Chip1Selected { get; set; } = true;

    private bool Chip2Selected { get; set; }
}
````

## Events

[The Chip component fires events for clicks, selection and removal. Read more about them here.](slug://chip-events)

## Appearance

You can customize the appearance of the Blazor Chip via a variety of built-in customization options. [Read more about the Chip appearance settings...](slug://chip-appearance)

>tip To learn more about the appearance, anatomy, and accessibility of the Chip, visit the [Progress Design System Kit documentation](https://www.telerik.com/design-system/docs/components/chip/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Chip Parameters

The table below lists the Chip parameters. Also check the [Chip API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikChip) for all parameters, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AriaLabel` | `string` | Maps to the `aria-label` attribute of the `<div class="k-chip">` element. Use this parameter if the text that labels the component is not visible. |
| `Class` | `string` | An additional CSS class for the `<div class="k-chip">` element. Use it to [customize the component styles and override the theme](slug://themes-override). |
| `Disabled` | `bool` | Specifies if the Chip is disabled. |
| `Icon` | `object` | Use this parameter to render an icon in the chip. |
| `Id` | `string` | Renders as the `id` attribute on the `<select />` element, so you can attach a `<label for="">` to it. |
| `Removable` | `bool` | Specifies if the chip can be removed by the user. If set to `true` a remove icon will be rendered on each available chip. |
| `RemoveIcon` | `object` | Defines the icon that will be rendered if the `Removable` parameter is set to `true`. |
| `Selectable` | `bool` <br/> (`true`) | Specifies if the Chip can be selected. Overrides the `Selected` parameter value.|
| `Selected` | `bool` | Controls the selected state of the Chip. |
| `TabIndex` | `int` | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |
| `Text` | `string` | The string that is rendered in the Chip. You can set the `Text` parameter even when [using a `RenderFragment` as a `ChildContent` of the Chip](#creating-blazor-chip). Otherwise `ChipRemoveEventArgs.Text` will be `null` in the [`OnRemove` handler](slug://chip-events)#onremove. |

## Next Steps

* [Customize the Chip appearance](slug://chip-appearance)
* [Handle Chip events](slug://chip-events)


## See Also

* [Live Demo: Chip Overview](https://demos.telerik.com/blazor-ui/chip/overview)
* [Chip API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikChip)
