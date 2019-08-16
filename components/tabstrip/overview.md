---
title: Overview
page_title: Tab Strip for Blazor Overview
description: Overview of the Tab Strip for Blazor
slug: components/tabstrip/overview
tags: telerik,blazor,tab strip,overview
published: True
position: 0
---

# Tab Strip Overview

This article provides information about the Tab Strip component and its core features.

The Tab Strip is defined through the `<TelerikTabStrip>` tag that accepts children of type `<TelerikTab>`. Inside the tabs you can add content like in any other container, including other components.

The tab exposes a `Title` attribute that is the text rendered in the heading. It also offers the `Disabled` attribute that allows you to disable its selection.

To control the position of the tab titles, the main tab strip tag exposes the optional `TabPosition` attribute that takes a member of the `Telerik.Blazor.Components.TabStrip.TabPosition` enumeration:

* `Top` (default)
* `Left`
* `Right`
* `Bottom`

>caption A Telerik Tab Strip with example reference, tab position and disabled tab

````CSHTML
@using Telerik.Blazor.Components.TabStrip

<TelerikTabStrip TabPosition="Telerik.Blazor.Components.TabStrip.TabPosition.Left" @ref:suppressField @ref="myTabStrip">
	<TelerikTab Title="First">
		First tab content.
	</TelerikTab>
	<TelerikTab Title="Second" Disabled="true">
		Second tab content. This tab is disabled and you cannot select it.
	</TelerikTab>
	<TelerikTab Title="Third">
		Third tab content.
	</TelerikTab>
</TelerikTabStrip>

@code {
	Telerik.Blazor.Components.TabStrip.TelerikTabStrip myTabStrip;
}
````

>caption The result from the code snippet above

![](images/tabstrip-left.png)

>caption Get selected tab

````CSHTML
@using Telerik.Blazor.Components.TabStrip
@using Telerik.Blazor.Components.Button

<TelerikButton OnClick="@WriteActiveTab">Get Active Tab</TelerikButton>

<TelerikTabStrip TabPosition="Telerik.Blazor.Components.TabStrip.TabPosition.Left" @ref:suppressField @ref="myTabStrip">
	<TelerikTab Title="First">
		First tab content.
	</TelerikTab>
	<TelerikTab Title="Second">
		Second tab content.
	</TelerikTab>
	<TelerikTab Title="Third">
		Third tab content.
	</TelerikTab>
</TelerikTabStrip>

@code {
	Telerik.Blazor.Components.TabStrip.TelerikTabStrip myTabStrip;

	protected void WriteActiveTab()
	{
		Console.WriteLine(myTabStrip.ActiveTab.Title);
		//the .ActiveTab field of the TabStrip reference exposes the information about the current tab
	}
}
````

>caption Select Tab programmatically

````CSHTML
@using Telerik.Blazor.Components.TabStrip
@using Telerik.Blazor.Components.Button

<TelerikTabStrip @ref:suppressField @ref="myTabStrip">
	<TelerikTab Title="First">
		First tab content.
		<br />
		<TelerikButton OnClick="@SelectSecondTab">Select the second tab</TelerikButton>
	</TelerikTab>
	<TelerikTab Title="Second" @ref:suppressField @ref="chosenTab">
		Second tab content.
	</TelerikTab>
	<TelerikTab Title="Third">
		Third tab content.
	</TelerikTab>
</TelerikTabStrip>

@code {
	Telerik.Blazor.Components.TabStrip.TelerikTabStrip myTabStrip;
	Telerik.Blazor.Components.TabStrip.TelerikTab chosenTab;

	void SelectSecondTab()
	{
		myTabStrip.SetActiveTab(chosenTab);
	}
}
````

## See Also

  * [Live Demo: TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/index)
  * [Live Demo: Tab Position](https://demos.telerik.com/blazor-ui/tabstrip/tabposition)
