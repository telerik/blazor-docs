---
title: Overview
page_title: Floating Action Button Overview
description: Discover the FloatingActionButton component for Blazor. Learn how to add the component to your app and explore its configuration options, such as positioning and alignment.
slug: fab-overview
tags: telerik,blazor,floating action button
published: True
position: 0
---

# Blazor Floating Action Button Overview

The <a href="https://www.telerik.com/blazor-ui/floating-action-button" target="_blank">Blazor Floating Action Button</a> is a UI component that shows over the other page content and may not move during scrolling. The component can perform the most logical action expected from a user looking at a particular screen. You can configure the FloatingActionButton to display:

* A single button with a single action
* Additional related actions
* Speed dial actions

The Floating Action Button comes with built-in customization features that lets you fine-tune the [positioning and alignment](slug://fab-positions) of the component, customize its [appearance](slug://fab-appearance), use icons, and attach click [events](slug://fab-events).

## Creating Blazor Floating Action Button

1. Use the `<TelerikFloatingActionButton>` tag to add the component to your razor page.
2. (optional) Customize the [appearance](slug://fab-appearance) of the Telerik Blazor Floating Action Button.

>caption Basic Blazor Floating Action Button

````RAZOR
<TelerikFloatingActionButton Size="@ThemeConstants.Button.Size.Large"
                             VerticalAlign="@FloatingActionButtonVerticalAlign.Middle" 
                             Icon="@SvgIcon.InfoCircle"/>
````

## Position and Alignment

You can control how the Floating Action Button is positioned relative to its associated container. Read more about the [Blazor Floating Action Button positioning...](slug://fab-positions)

## Events

The Blazor Floating Action Button fires events that you can handle and respond to user actions. [Read more about the Blazor Floating Action Button events...](slug://fab-events).

## Floating Action Button Parameters

The Blazor Floating Action Button provides various parameters that allow you to configure the component. Also check the [Floating Action Button public API](slug:Telerik.Blazor.Components.TelerikFloatingActionButton).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Enabled` | `bool` <br /> (`true`) | Whether the Floating Action Button is enabled. |
| `Id` | `string` | The `id` attribute of the Floating Action Button. |
| `Icon` | `object` | The icon rendered in the Floating Action Button. Can be set to a predefined Telerik icon or a custom one. | 
| `Title` | `string` | The `title` attribute of the Floating Action Button. |
| `PositionMode` | `FloatingActionButtonPositionMode ` <br /> (`Fixed`) | The position of the Floating Action Button relative to the container. |
| `HorizontalAlign` | `FloatingActionButtonHorizontalAlign` <br /> (`End`) | Determines if the left or the right side of the Floating Action Button will touch its parent container. [Read more about Floating Action Button positioning.](slug://fab-positions) |
| `VerticalAlign` | `FloatingActionButtonVerticalAlign` <br /> (`Bottom`) | Determines if the Floating Action Button will touch the parent container with its top or bottom side. |
| `HorizontalOffset` | `string` <br /> (`16px`) | The horizontal offset value added to the button position, creating a blank space between the button and the parent. |
| `VerticalOffset` | `string` <br /> (`16px`) | The vertical offset value added to the button position, creating a blank space between the button and the parent. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Floating Action Button:

| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | Defines the `<div class="k-badge">` CSS class rendered on the main wrapping element of the Floating Action Button component. Use it for [styling customizations](slug://themes-override). |
| `Rounded` | `Telerik.Blazor.ThemeConstants.Badge.Rounded.Full` | Defines how rounded the borders of the Floating Action Button are. |
| `Size` | `Telerik.Blazor.ThemeConstants.Badge.Size.Medium` | Sets the size of the Floating Action Button. |
| `ThemeColor` | `Telerik.Blazor.ThemeConstants.Badge.ThemeColor.Primary` | Adjusts the background color of the Floating Action Button. |


## Next Steps

* [Explore the Floating Action Button Positioning and Alignment Settings](slug://fab-positions)
* [Customize the Floating Action Button Appearance](slug://fab-appearance)

## See Also

* [Live Demo: Floating Action Button](https://demos.telerik.com/blazor-ui/floatingactionbutton/overview)
* [Floating Action Button Events](slug://fab-events)
* [Floating Action Button API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikFloatingActionButton)