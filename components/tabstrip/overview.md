---
title: Overview
page_title: TabStrip Overview
description: Discover the Blazor TabStrip. Explore the features and examples.
slug: components/tabstrip/overview
tags: telerik,blazor,tab,strip,tabstrip,overview
published: True
position: 0
---

# Blazor TabStrip Overview

The <a href = "https://www.telerik.com/blazor-ui/tabstrip" target = "_blank">Blazor TabStrip component</a> displays a collection of tabs, containing associated content, which enable the user to switch between different views inside a single component.

## Creating Blazor TabStrip

1. Use the `<TelerikTabStrip>` tag.
1. Add a nested `<TabStripTab>` tag for each tab you want to include in the component.
1. Set tab titles through the `Title` parameter of the `<TabStripTab>` tags. You can additionally configure the tabs as desired - read more in the [Tabs Configuration]({%slug tabstrip-tabs-configuration%}) article.
1. Place the desired content in the tabs - it can be any content, including other components.

>caption TabStrip with specified tab position and a disabled tab

````CSHTML
@using Telerik.Blazor.Components

<TelerikTabStrip TabPosition="Telerik.Blazor.TabPosition.Left">
	<TabStripTab Title="First">
		First tab content.
	</TabStripTab>
	<TabStripTab Title="Second" Disabled="true">
		Second tab content. This tab is disabled and you cannot select it.
	</TabStripTab>
	<TabStripTab Title="Third">
		Third tab content.
	</TabStripTab>
</TelerikTabStrip>

@code {
	Telerik.Blazor.Components.TelerikTabStrip myTabStrip;
}
````

## Active Tab Index

By default, the initially selected tab is the first one. You can programmatically control the selected tab through the `ActiveTabIndex` parameter. [Read more about the `ActiveTabIndex`...]({%slug tabstrip-activetabindex%})

## Tabs Configuration

The Tabs are the building blocks of the TabStrip. The component allows individual configuration of the declared `<TabStripTab>` tags. [Read more about the available Tabs configuration options...]({%slug tabstrip-tabs-position%})

## Position of the Tabs

The Blazor TabStrip component allows you to control the position of the tabs. [Read more about the Tabs Position...]({%slug tabstrip-tabs-position%})

## Persist Content

The Blazor TabStrip component can persist the content of the tabs. [Read more about the Persist Content...]({%slug tabstrip-persist-content%})

## Scrollable Tabs

The Blazor TabStrip allows you to scroll only its tabs. This is useful for scenarious where a lot of tabs are defined. [Read more about the Scrollable Tabs...]({%slug tabstrip-scroll-tabs%})

## TabStrip Parameters

The TabStrip provides the following features to allow further customization of its behavior:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter        | Type  | Header 2                                 |
|------------------|-------|------------------------------------------|
| `ActiveTabIndex` | `int` | Allows you to get and set the currently shown tab index. Supports two-way binding.
|`PersistTabContent` | `bool` | whether the tabs content will be persisted when switching the tabs. See [Persist Content]({%slug tabstrip-persist-content%})
| `Scrollable` | `bool` | whether the tabs will be scrollable. See [Scrollable Tabs]({%slug tabstrip-scroll-tabs%})
| `TabPosition` | `TabPosition` enum <br/> `TabPosition.Top`| controls the position of the tabs.

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor TabStrip:.

| Parameter | Type     | Description                              |
|-----------|----------|------------------------------------------|
| `Class`   | `string` | the CSS class that will be rendered on the main wrapping element of the component. |
| `Width`   | `string` | The width of the component. You can set the Width parameter to any of the [supported units]({%slug common-features/dimensions%}). |
| `Height`  | `string` | The height of the Component. You can set the `Height` parameter to any of the [supported units]({%slug common-features/dimensions%}). |

## Next Steps

* [Configure the Tabs]({%slug tabstrip-tabs-configuration%})
* [Explore the supported Tab positions]({%slug tabstrip-tabs-position%})

## See Also

  * [Live Demo: TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/index)
  * [Live Demo: Tab Positions](https://demos.telerik.com/blazor-ui/tabstrip/tab-positions)
  * [Events]({%slug tabstrip-events%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTabStrip)
