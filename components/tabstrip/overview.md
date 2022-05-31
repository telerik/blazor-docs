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

This article provides information about the <a href = "https://www.telerik.com/blazor-ui/tabstrip" target = "_blank">Blazor TabStrip component</a> and its core features.

>caption In this article:
<!-- Start Document Outline -->
* [Creating Blazor TabStrip](#creating-blazor-tabstrip)
	* [Position of the Tabs](#position-of-the-tabs)
	* [Persist Content](#persist-content)
	* [Scrollable Tabs](#scrollable-tabs)
	* [Styling and Appearance](#styling-and-appearance)
* [Example](#example)
* [See Also](#see-also)

<!-- End Document Outline -->---

## Creating Blazor TabStrip

To use a Telerik TabStrip for Blazor:

1. Use the `<TelerikTabStrip>` tag.
1. Add a nested `<TabStripTab>` tag for each tab you want to include in the component.
1. Set tab titles through the `Title` parameter of the `<TabStripTab>` tags. You can additionally configure the tabs as desired - read more in the [Tabs Configuration]({%slug tabstrip-tabs-configuration%}) article.
1. Place the desired content in the tabs - it can be any content, including other components.

>caption A Telerik TabStrip with example reference, tab position and disabled tab

````CSHTML
@using Telerik.Blazor.Components

<TelerikTabStrip TabPosition="Telerik.Blazor.TabPosition.Left" @ref="myTabStrip">
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

>caption The result from the code snippet above

![Blazor Tabstrip Left](images/tabstrip-left.png)


### Position of the Tabs

The Blazor TabStrip component allows you to control the position of the tabs. [Read more about the Tabs Position...]({%slug tabstrip-tabs-position%})

### Persist Content

The Blazor TabStrip component can persist the content of the tabs. [Read more about the Persist Content...]({%slug tabstrip-persist-content%})

### Scrollable Tabs

The Blazor TabStrip allows you to scroll only its tabs. This is useful for scenarious where a lot of tabs are defined. [Read more about the Scrollable Tabs...]({%slug tabstrip-scroll-tabs%})

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter        | Type  | Header 2                                 |
|------------------|-------|------------------------------------------|
| `ActiveTabIndex` | `int` | Allows you to get and set the currently shown tab index through two-way binding, and also provides an event for the tab change (`ActiveTabIndexChanged`). To deactivate all tabs, se the `ActiveTabIndex` parameter to `-1`. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor TabStrip:.

| Parameter | Type     | Description                              |
|-----------|----------|------------------------------------------|
| `Class`   | `string` | the CSS class that will be rendered on the main wrapping element of the component. |
| `Width`   | `string` | The width of the component. You can set the Width parameter to any of the [supported units]({%slug common-features/dimensions%}). |
| `Height`  | `string` | The height of the Component. You can set the `Height` parameter to any of the [supported units]({%slug common-features/dimensions%}). |


## Example

Get and set the selected tab index

````CSHTML
Active Tab Index: @ActiveTabIndex

<TelerikTabStrip @bind-ActiveTabIndex="@ActiveTabIndex">
	<TabStripTab Title="First">
		First tab content.
	</TabStripTab>
	<TabStripTab Title="Second">
		Second tab content. I will be active initially due to the default value of the parameter.
        <br />
        <TelerikButton OnClick="@SelectThirdTab">Select Third Tab</TelerikButton>
	</TabStripTab>
	<TabStripTab Title="Third">
		Third tab content.
	</TabStripTab>
</TelerikTabStrip>

@code {
	public int ActiveTabIndex { get; set; } = 1;

    void SelectThirdTab()
    {
        ActiveTabIndex = 2;
    }
}
````

## See Also

  * [Live Demo: TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/index)
  * [Live Demo: Tab Positions](https://demos.telerik.com/blazor-ui/tabstrip/tab-positions)
  * [Events]({%slug tabstrip-events%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTabStrip)
