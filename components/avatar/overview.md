---
title: Overview
page_title: Avatar Overview
description: Discover the Blazor Avatar and explore the examples.
slug: avatar-overview
tags: telerik,blazor,avatar,overview
published: True
position: 0
---

# Blazor Avatar Overview

The <a href="https://www.telerik.com/blazor-ui/avatar" target="_blank">Blazor Avatar component</a> ...

## Creating Avatar

1. Use the `TelerikAvatar` tag to add the component to your razor page.

1. Set the desired [Avatar type]({%slug avatar-types})

1. (Optional) Configure the [`ThemeColor`]({%slug avatar-appearance%}) of the Avatar

>caption Avatar ...

````CSHTML
@*Basic Avatar configuration*@

<TelerikAvatar Type="AvatarType.Text"
               ThemeColor="@Telerik.Blazor.ThemeConstants.Avatar.ThemeColor.Info">
    JD
</TelerikAvatar>
````

## Types

The avatar type defines what content the component will display - it may be text, icon or image. Read more about the specifics of the [Avatar types...]({%slug avatar-types})

## Appearance

The Avatar provides multiple options for configuring its look. Explore the available [Appearance settings...]({%slug avatar-appearance%})

## Parameters

The Blazor Avatar provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter    | Type  | Description |
| ----------- | ----------- | -------|
| `Bordered` | `bool` | Whether the Avatar will have border. |
| `Type` | `AvatarType` <br/> (`null`) | The type of the Avatar. Read more in the [Types article]({%slug avatar-types}).

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Avatar:

| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the Avatar. (`<div class="k-avatar>`) Use it to [override the theme or apply custom styles]({%slug themes-override%}). |
| `Height` | `string` | The height of the Avatar.
| `Width` | `string` | The width of the Avatar.

You can find more options for customizing the Avatar styling in the [Appearance article]({%slug avatar-appearance%}).


## Next Steps

* [Explore the Avatar types]({%slug avatar-types%})
* [Configure the appearance options of the Avatar]({%slug avatar-appearance%})

## See Also

  * [Live Demo: Avatar](https://demos.telerik.com/blazor-ui/avatar/overview)