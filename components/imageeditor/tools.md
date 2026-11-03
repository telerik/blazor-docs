---
title: Tools
page_title: ImageEditor - Tools
description: Learn about the built-in tools of the Telerik Blazor ImageEditor - crop, resize, rotate, text, shapes, blur, adjustments, filters, frame, and shadow.
slug: imageeditor-tools
tags: telerik,blazor,imageeditor,tools,crop,resize,rotate,filters,blur
published: True
position: 10
components: ["imageeditor"]
---

# Blazor ImageEditor Tools

The [ImageEditor](slug:imageeditor-overview) UI consists of a toolbar, a sidebar with the editing tools, a tool pane with the options of the selected tool, and a canvas. This article describes the built-in tools and the options that each tool provides.

Every tool action is part of the undo history and fires the [`OnExecute` event](slug:imageeditor-events#onexecute). The application can also run each tool action from code with the [ImageEditor commands](slug:imageeditor-commands).

>caption In this article:

* [Toolbar](#toolbar)
* [Sidebar tools](#sidebar-tools)
* [Objects](#objects)
* [Undo and redo](#undo-and-redo)
* [Adaptive rendering](#adaptive-rendering)

## Toolbar

The toolbar sits above the canvas and provides the following tools:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool | Description |
| --- | --- |
| Open | Opens a file dialog, so that the user can [load another image](slug:imageeditor-loading-images#let-users-open-a-file). |
| Undo | Reverts the last edit. |
| Redo | Reapplies the last reverted edit. |
| Zoom | Sets the canvas zoom level to Fit, Fill, 25%, 50%, 100%, or 200%. Zoom and pan change the view only and do not fire [`OnExecute`](slug:imageeditor-events#onexecute). |
| Download | Opens the [Export Image dialog](slug:imageeditor-export#export-dialog). |

## Sidebar Tools

The sidebar lists the editing tools. Selecting a tool opens its pane with the related options.

### Resize

Changes the pixel dimensions of the image. The pane provides:

* Width and height in pixels or percentage.
* A lock that preserves the aspect ratio.
* Resize handles on the canvas.

### Crop

Removes the areas outside the crop rectangle. The pane provides:

* Free crop with handles on the canvas.
* Aspect ratio presets&mdash;Original, 1:1, 3:2, 4:3, 5:4, 7:5, 16:9, and Custom.
* Landscape or portrait orientation.
* Explicit crop width and height.

### Rotate

Changes the image orientation. The pane provides:

* Rotation by 90 degrees to the left and to the right.
* Straightening between -45 and 45 degrees.
* Horizontal and vertical flip.

### Text

Adds text boxes that the user can edit directly on the canvas. The pane provides font family, font size, bold, italic, underline, strikethrough, all caps, alignment, color, and opacity.

### Shapes

Adds a shape to the canvas. The available shapes are Square, Rectangle, Circle, Oval, Triangle, Star, Heart, Diamond, Hexagon, Pentagon, Arrow, and Line. The pane provides:

* End points for lines&mdash;None, Arrow, Circle, and Diamond.
* Stroke type&mdash;Solid, Dashed, and Dotted.
* Stroke color, stroke width, fill color, and opacity.

### Blur

Hides sensitive parts of the image. The pane provides:

* Blur or pixelate mode.
* Rectangular or elliptical area.
* Adjustable intensity.

### Adjustments

Changes the image tone with a live preview while the user drags a slider. The available adjustments are Brightness, Exposure, Contrast, Saturation, Hue, Blur, and Opacity.

### Filters

Applies a preset color treatment. Each filter displays a thumbnail preview of the current image. The available filters are None, Black and White, Grayscale, Sepia, Warm, Cold, Chrome, and Invert.

### Frame

Draws a frame around the image. The pane provides a None, Single, or Multiple frame type, together with thickness, offset, roundness, stroke type, and color.

### Shadow

Draws a shadow around the image. The pane provides position, blur, spread, color, and opacity.

## Objects

Text boxes, shapes, and blur areas are objects on the canvas. Users can:

* Select an object with a click.
* Move an object by dragging it or by pressing the arrow keys.
* Resize an object with its handles.
* Duplicate, flip, align, and reorder shapes and text boxes.
* Delete an object with the `Delete` key. The component requests confirmation before it deletes the object.

Each object has an `Id`. Use the `Id` to [update, move, align, reorder, or delete an object programmatically](slug:imageeditor-commands#object-commands).

## Undo and Redo

The ImageEditor maintains a full history of the edits. Users can revert and reapply any edit from the toolbar or with the `Ctrl` + `Z` and `Ctrl` + `Y` [keyboard shortcuts](slug:imageeditor-keyboard-navigation).

A slider drag or a canvas gesture produces a single history entry, so one undo reverts the complete interaction instead of each intermediate value.

Undo and redo fire the [`OnExecute` event](slug:imageeditor-events#onexecute) with a `Reason` of `Undo` or `Redo`.

## Adaptive Rendering

Set the `AdaptiveMode` parameter to `AdaptiveMode.Auto` to enable the mobile layout. On small screens the canvas renders first, and the tool pane and the sidebar dock at the bottom of the component. The default parameter value is `AdaptiveMode.None`. Read more about [adaptive rendering in Telerik UI for Blazor](slug:adaptive-rendering).

>caption Enable adaptive rendering in the ImageEditor

````RAZOR.skip-repl
<TelerikImageEditor ImageUrl="images/sample-photo.jpg"
                    AdaptiveMode="@AdaptiveMode.Auto"
                    Width="100%"
                    Height="600px" />
````

## Next Steps

* [Edit images programmatically](slug:imageeditor-commands)
* [Export the edited image](slug:imageeditor-export)
* [Handle the ImageEditor events](slug:imageeditor-events)

## See Also

* [Live Demo: ImageEditor](https://demos.telerik.com/blazor-ui/imageeditor/overview)
* [ImageEditor API Reference](slug:Telerik.Blazor.Components.TelerikImageEditor)
