---
title: Overview
page_title: ProgressBar Overview
description: Overview of the ProgressBar component for Blazor.
slug: progressbar-overview
tags: telerik,blazor,progress,bar,progressbar,overview
published: True
position: 0
---

# Blazor ProgressBar Overview

The <a href = "https://www.telerik.com/blazor-ui/progressbar" target = "_blank">Blazor ProgressBar component</a> tracks the execution of operations and displays what portion of it is completed. For very long tasks, you can also make it [indeterminate]({%slug progressbar-indeterminate-state%}).

## Creating Blazor ProgressBar

1. Use the `<TelerikProgressBar>` tag.
1. Set its `Value` parameter to a `double` to denote how much is completed.

>caption ProgressBar with maximum and initial values

````CSHTML
@*Set the maximum and the current values of the ProgressBar*@

<TelerikProgressBar Max="@MaxValue" Value="@PBValue" />

@code {
    public double MaxValue { get; set; } = 100;
    public double PBValue { get; set; } = 10;
}
````

## Label

The label is a text representation of the current progress. It is rendered inside the ProgressBar and by default shows the component value in percent. The ProgressBar allows customization of the label position and content. [Read more about the ProgressBar Label...]({%slug progressbar-label%})

## Indeterminate State

In some scenarios the estimated time of completion is unknown or the progress cannot be strictly measured. The ProgressBar supports continuous animation that can cover these cases. [Read more about the ProgressBar Indeterminate State...]({%slug progressbar-indeterminate-state%})

## Responsive ProgressBar

The ProgressBar will resize with the parent element dimensions when you set its width to 100%:

````CSHTML
<div style="width: 50%; border: 1px solid red;">

    <style>
        .width-100 {
            width: 100%;
        }
    </style>

    <TelerikProgressBar Class="width-100" Value="44" />
</div>
````

## ProgressBar Parameters

The ProgressBar provides the following features to further customize its behavior:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element. You can use it to cascade styles more easily.
| `Max` | `double` <br/> 100 | The maximum value of the ProgressBar. It must be greater than `0`.
| `Value` | `double` | The value of the ProgressBar. This value indicates the progress of the tracked process. It is a fraction of the `Max`.
| `Orientation` | `ProgressBarOrientation` enum <br/> (`ProgressBarOrientation.Horizontal`) | The orientation of the ProgressBar. Takes a member of the `ProgressBarOrientation` enum - `Horizontal` or `Vertical`.

## Next Steps

* [Customize the ProgressBar Label]({%slug progressbar-label%})

## See Also

  * [Live Demo: ProgressBar](https://demos.telerik.com/blazor-ui/progressbar/overview)
  * [Label]({%slug progressbar-label%})
  * [Indeterminate state]({%slug progressbar-indeterminate-state%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikProgressBar)
   
