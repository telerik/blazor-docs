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

The <a href="https://www.telerik.com/blazor-ui/avatar" target="_blank">Blazor Avatar component</a> is typically used to display images, icons or initials representing people or other entities.

It also gives you the flexibility to customize its size, color, fill mode and more.

## Creating Blazor Avatar

1. Use the `TelerikAvatar` tag to add the component to your razor page.

1. Declare your desired content inside the `TelerikAvatar` tag - text, icon or image.

1. Set the [Avatar type]({%slug avatar-types%}) based on your content.

1. (Optional) Configure the [`ThemeColor`]({%slug avatar-appearance%}) of the Avatar.

>caption Basic Avatar with text and specified `ThemeColor`

````CSHTML
@*Basic Avatar configuration*@

<TelerikAvatar Type="AvatarType.Text"
               ThemeColor="@Telerik.Blazor.ThemeConstants.Avatar.ThemeColor.Info">
    JD
</TelerikAvatar>
````

## Types

The Avatar `Type` defines the type of the content that the component will display - it may be text, icon or image. [Read more about the specifics of the Avatar types...]({%slug avatar-types%})

## Appearance

The Avatar provides multiple options for configuring its look. [Explore the available appearance settings...]({%slug avatar-appearance%})

## Parameters

The Blazor Avatar provides the following parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter    | Type  | Description |
| ----------- | ----------- | -------|
| `Bordered` | `bool` | Whether the Avatar will have border. |
| `Type` | `AvatarType` <br/> (`Image`) | The type of the Avatar. Read more in the [Types article]({%slug avatar-types%}). |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Avatar:

| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the Avatar. (`<div class="k-avatar>`) Use it to [override the theme or apply custom styles]({%slug themes-override%}). |
| `Height` | `string` | The height of the Avatar. Will be applied only if you explicitly set the [`Size`]({%slug avatar-appearance%}#size) to an empty `string`. |
| `Width` | `string` | The width of the Avatar. Will be applied only if you explicitly set the  [`Size`]({%slug avatar-appearance%}#size) to an empty `string`. |

You can find more options for customizing the Avatar styling in the [Appearance article]({%slug avatar-appearance%}).

## Next Steps

* [Explore the Avatar types]({%slug avatar-types%})
* [Configure the appearance options of the Avatar]({%slug avatar-appearance%})

## See Also

  * [Live Demo: Avatar](https://demos.telerik.com/blazor-ui/avatar/overview)