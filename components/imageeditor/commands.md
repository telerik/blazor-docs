---
title: Commands
page_title: ImageEditor - Commands
description: Learn how to edit an image programmatically with the ExecuteAsync method of the Telerik Blazor ImageEditor and explore all available commands and their arguments.
slug: imageeditor-commands
tags: telerik,blazor,imageeditor,commands,execute,api
published: True
position: 15
components: ["imageeditor"]
---

# Blazor ImageEditor Commands

The [ImageEditor](slug:imageeditor-overview) exposes an `ExecuteAsync` method that applies an edit from the application code. The method runs the same commands that the built-in [tools](slug:imageeditor-tools) run, and adds the result to the undo history.

Use `ExecuteAsync` to apply presets, to build a custom toolbar outside the component, or to repeat an edit across several images.

## Execute a Command

The `ExecuteAsync` method has two overloads:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Method | Description |
| --- | --- |
| `ExecuteAsync(ImageEditorCommand command, ImageEditorCommandArgs args)` | Runs a command that requires arguments. The method throws an `ArgumentException` when the arguments class does not match the command. |
| `ExecuteAsync(ImageEditorCommand command)` | Runs a command that does not require arguments, for example, `ResetCrop`. |

To call the method, [obtain a reference to the component instance](slug:imageeditor-overview#imageeditor-reference-and-methods) with the `@ref` directive attribute.

>caption Apply a filter programmatically

````RAZOR.skip-repl
<TelerikButton OnClick="@OnSepiaButtonClick">Apply Sepia</TelerikButton>

<TelerikImageEditor @ref="@ImageEditorRef" ImageUrl="images/sample-photo.jpg" />

@code {
    private TelerikImageEditor? ImageEditorRef { get; set; }

    private async Task OnSepiaButtonClick()
    {
        await ImageEditorRef!.ExecuteAsync(ImageEditorCommand.ApplyFilter,
            new ImageEditorFilterArgs() { Filter = ImageEditorFilter.Sepia });
    }
}
````

## Command Reference

All commands are members of the `ImageEditorCommand` enum. Each command uses one arguments class that inherits the abstract `ImageEditorCommandArgs` class. The [`OnExecute` event](slug:imageeditor-events#onexecute) reports the same commands and arguments when the user edits the image through the UI.

The `X`, `Y`, `Width`, and `Height` values in `ImageEditorRect` and the `X` and `Y` values in `ImageEditorPoint` are relative to the image and range from `0` to `1`.

### Crop and Resize Commands

| Command | Arguments Class | Arguments Properties |
| --- | --- | --- |
| `Crop` | `ImageEditorCropArgs` | `Area` |
| `CropToAspectRatio` | `ImageEditorCropToAspectRatioArgs` | `AspectRatio` (`null` for the original ratio), `Orientation`, `Area` |
| `SetCropSize` | `ImageEditorSizeArgs` | `Width`, `Height`, `LockAspectRatio` |
| `Resize` | `ImageEditorSizeArgs` | `Width`, `Height`, `Unit`, `LockAspectRatio` |
| `ResetCrop` | None | Not applicable |
| `ResetSize` | None | Not applicable |

### Transform Commands

| Command | Arguments Class | Arguments Properties |
| --- | --- | --- |
| `Rotate` | `ImageEditorAngleArgs` | `Angle` |
| `SetRotation` | `ImageEditorAngleArgs` | `Angle` |
| `Straighten` | `ImageEditorAngleArgs` | `Angle` |
| `SetTransform` | `ImageEditorTransformArgs` | `Rotation`, `Straighten`, `FlipHorizontal`, `FlipVertical` |
| `Flip` | `ImageEditorFlipArgs` | `Direction` |
| `Scale` | `ImageEditorScaleArgs` | `Factor` |
| `ResetTransform` | None | Not applicable |

### Color Commands

| Command | Arguments Class | Arguments Properties |
| --- | --- | --- |
| `ApplyFilter` | `ImageEditorFilterArgs` | `Filter` |
| `Adjust` | `ImageEditorAdjustArgs` | `Adjustment`, `Value` |
| `AdjustMany` | `ImageEditorAdjustmentsArgs` | `Brightness`, `Exposure`, `Contrast`, `Saturation`, `Hue`, `Blur`, `Opacity` |
| `ResetAdjustments` | None | Not applicable |
| `ResetColor` | None | Not applicable |

### Blur Commands

| Command | Arguments Class | Arguments Properties |
| --- | --- | --- |
| `AddBlur` | `ImageEditorBlurArgs` | `Id`, `Area`, `Mode`, `Shape`, `Intensity` |
| `AddBlurs` | `ImageEditorBlursArgs` | `Blurs` |
| `UpdateBlur` | `ImageEditorBlurArgs` | `Id`, `Area`, `Mode`, `Shape`, `Intensity` |
| `DeleteBlur` | `ImageEditorObjectArgs` | `Id` |
| `ClearBlurs` | None | Not applicable |

### Object Commands

The following commands manage the text boxes and shapes on the canvas. See also [Objects](slug:imageeditor-tools#objects).

| Command | Arguments Class | Arguments Properties |
| --- | --- | --- |
| `AddShape` | `ImageEditorShapeArgs` | `Id`, `Shape`, `Area`, `From`, `To`, `Stroke`, `Fill`, `LineStart`, `LineEnd`, `Rotation` |
| `AddText` | `ImageEditorTextArgs` | `Id`, `Text`, `Area`, `Style`, `Rotation` |
| `UpdateObject` | `ImageEditorUpdateObjectArgs` | `Id`, plus any property to change |
| `AlignObject` | `ImageEditorAlignObjectArgs` | `Id`, `Horizontal`, `Vertical`, `Target` |
| `MoveObject` | `ImageEditorMoveObjectArgs` | `Id`, `DeltaX`, `DeltaY` |
| `ReorderObject` | `ImageEditorReorderObjectArgs` | `Id`, `Index` |
| `DuplicateObject` | `ImageEditorObjectArgs` | `Id` |
| `FlipObject` | `ImageEditorObjectArgs` | `Id` |
| `DeleteObject` | `ImageEditorObjectArgs` | `Id` |
| `ClearObjects` | None | Not applicable |

### Frame and Shadow Commands

| Command | Arguments Class | Arguments Properties |
| --- | --- | --- |
| `SetFrame` | `ImageEditorFrameArgs` | `Type`, `Count`, `Thickness`, `Roundness`, `Offset`, `Position`, `StrokeType`, `Color`, `ImageCornerRadius` |
| `SetFrameSide` | `ImageEditorFrameArgs` | `Type`, `Count`, `Thickness`, `Roundness`, `Offset`, `Position`, `StrokeType`, `Color`, `ImageCornerRadius` |
| `SetCornerRadius` | `ImageEditorCornerRadiusArgs` | `Radius` |
| `SetShadow` | `ImageEditorShadowArgs` | `Enabled`, `OffsetX`, `OffsetY`, `Blur`, `Spread`, `Color`, `Opacity` |
| `RemoveFrame` | None | Not applicable |
| `RemoveShadow` | None | Not applicable |

### Export Commands

The following commands configure the [export settings](slug:imageeditor-export).

| Command | Arguments Class | Arguments Properties |
| --- | --- | --- |
| `SetExportFormat` | `ImageEditorExportSettingsArgs` | `Format` |
| `SetExportQuality` | `ImageEditorExportSettingsArgs` | `Quality` |
| `SetFileName` | `ImageEditorExportSettingsArgs` | `FileName` |
| `SetExportSettings` | `ImageEditorExportSettingsArgs` | `Format`, `Quality`, `FileName` |

## Shared Types

The command arguments classes use the following types:

| Type | Properties |
| --- | --- |
| `ImageEditorRect` | `X`, `Y`, `Width`, `Height` |
| `ImageEditorPoint` | `X`, `Y` |
| `ImageEditorStroke` | `Color`, `Width`, `Opacity`, `StrokeType` |
| `ImageEditorFill` | `Color`, `Opacity` |
| `ImageEditorTextStyle` | `FontFamily`, `FontSize`, `Bold`, `Italic`, `Underline`, `Strikethrough`, `AllCaps`, `Align`, `Color`, `Opacity` |

## Enums

The command arguments use the following enums:

| Enum | Members |
| --- | --- |
| `ImageEditorFilter` | `None`, `Grayscale`, `BlackAndWhite`, `Sepia`, `Invert`, `Chrome`, `Cold`, `Warm` |
| `ImageEditorAdjustment` | `Brightness`, `Exposure`, `Contrast`, `Saturation`, `Hue`, `Blur`, `Opacity` |
| `ImageEditorFlipDirection` | `Horizontal`, `Vertical` |
| `ImageEditorCropOrientation` | `Portrait`, `Landscape` |
| `ImageEditorResizeUnit` | `Pixel`, `Percentage` |
| `ImageEditorBlurMode` | `Blur`, `Pixelate` |
| `ImageEditorBlurShape` | `Rectangle`, `Ellipse` |
| `ImageEditorExportFormat` | `Png`, `Jpeg`, `Webp` |
| `ImageEditorShapeType` | `Square`, `Rectangle`, `Circle`, `Ellipse`, `Triangle`, `Star`, `Heart`, `Diamond`, `Hexagon`, `Pentagon`, `Arrow`, `Line` |
| `ImageEditorLineEnd` | `None`, `Circle`, `Diamond`, `Arrow`, `Rectangle` |
| `ImageEditorStrokeType` | `Solid`, `Dashed`, `Dotted` |
| `ImageEditorTextAlign` | `Left`, `Center`, `Right` |
| `ImageEditorHorizontalAlign` | `Left`, `Center`, `Right` |
| `ImageEditorVerticalAlign` | `Top`, `Middle`, `Bottom` |
| `ImageEditorAlignTarget` | `Crop`, `Image` |
| `ImageEditorFrameType` | `None`, `Single`, `Multiple` |
| `ImageEditorFramePosition` | `Center`, `Inside`, `Outside` |

## Example

The following example applies a watermark preset with a single button. It crops the image to a 16:9 ratio, adds a text object in the bottom right corner, and warms up the colors.

>caption Run several ImageEditor commands from code

````RAZOR.skip-repl
<TelerikButton OnClick="@OnPresetButtonClick" ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">
    Apply Preset
</TelerikButton>

<TelerikImageEditor @ref="@ImageEditorRef"
                    ImageUrl="images/sample-photo.jpg"
                    Width="100%"
                    Height="600px" />

@code {
    private TelerikImageEditor? ImageEditorRef { get; set; }

    private async Task OnPresetButtonClick()
    {
        await ImageEditorRef!.ExecuteAsync(ImageEditorCommand.CropToAspectRatio,
            new ImageEditorCropToAspectRatioArgs()
            {
                AspectRatio = 16d / 9d,
                Orientation = ImageEditorCropOrientation.Landscape
            });

        await ImageEditorRef.ExecuteAsync(ImageEditorCommand.ApplyFilter,
            new ImageEditorFilterArgs() { Filter = ImageEditorFilter.Warm });

        await ImageEditorRef.ExecuteAsync(ImageEditorCommand.AddText,
            new ImageEditorTextArgs()
            {
                Id = "watermark",
                Text = "Telerik UI for Blazor",
                Area = new ImageEditorRect() { X = 0.6, Y = 0.85, Width = 0.35, Height = 0.1 },
                Style = new ImageEditorTextStyle()
                {
                    FontFamily = "Arial",
                    FontSize = 24,
                    Bold = true,
                    Align = ImageEditorTextAlign.Right,
                    Color = "#ffffff",
                    Opacity = 0.8
                }
            });
    }
}
````

## Next Steps

* [Export the edited image](slug:imageeditor-export)
* [Handle the ImageEditor events](slug:imageeditor-events)

## See Also

* [Live Demo: ImageEditor](https://demos.telerik.com/blazor-ui/imageeditor/overview)
* [ImageEditor API Reference](slug:Telerik.Blazor.Components.TelerikImageEditor)
