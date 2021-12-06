---
title: Overview
page_title: TabStrip Overview
description: Overview of the TabStrip for Blazor.
slug: components/tabstrip/overview
tags: telerik,blazor,tab,strip,tabstrip,overview
published: True
position: 0
---

# TabStrip Overview

This article provides information about the <a href = "https://www.telerik.com/blazor-ui/tabstrip" target = "_blank">Blazor TabStrip component</a> and its core features.

>caption In this article:
* [Basics](#basics)
* [Features](#features)
* [Example](#example)

## Basics

To use a Telerik TabStrip for Blazor:

1. Use the `<TelerikTabStrip>` tag
1. Add a nested `<TabStripTab>` tag for each tab you want to include in the component
1. Set tab titles through the `Title` parameter of the `<TabStripTab>` tags. You can additionally configure the tabs as desired - read more in the [Tabs Configuration]({%slug tabstrip-tabs-configuration%}) article
1. Place the desired content in the tabs - it can be any content, including other components

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

![](images/tabstrip-left.png)


## Features

* `Class` - the CSS class that will be rendered on the main wrapping element of the component.
* `ActiveTabIndex` - allows you get and set the currently shown tab index through two-way binding, and also provides an event for the tab change. To deactivate all tabs, set it to `-1`.
* `TabPosition` - allows you to set the desired position of the tab headers. Read more in [Tabs - Position]({%slug tabstrip-tabs-position%}) article.
* `PersistTabContent` - defines whether the tab content will remain in the DOM when the tab is inactive (`false` by default). Read more in the [Persist Content]({%slug tabstrip-persist-content%}) article.


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
  * [Live Demo: Tab Position](https://demos.telerik.com/blazor-ui/tabstrip/tabposition)
  * [Events]({%slug tabstrip-events%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTabStrip)
