---
title: Overview
page_title: Avatar Overview
description: Discover the Blazor Avatar and explore the examples.
slug: avatar-overview
tags: telerik,blazor,avatar,overview
published: True
position: 0
components: ["avatar"]
---
# Blazor Avatar Overview

The <a href="https://www.telerik.com/blazor-ui/avatar" target="_blank">Blazor Avatar component</a> is typically used to display images, icons or initials representing people or other entities.

You can set different [Avatar types](slug:avatar-types) and customize its [size](slug:avatar-appearance#size), [fill mode](slug:avatar-appearance#fillmode) and more.

## Creating Blazor Avatar

1. Use the `TelerikAvatar` tag to add the component to your razor page.

1. Declare your desired content (as `ChildContent`) inside the `TelerikAvatar` tag - text, icon or image. This example demonstrates Avatar with initials (text).

1. Set the [Avatar `Type`](slug:avatar-types), depending on the displayed content. In this case, we are using `Text`.

1. (Optional) Configure the [`ThemeColor`](slug:avatar-appearance) of the Avatar.

>caption Basic Avatar with text and specified `ThemeColor`

````RAZOR
@*Basic Avatar configuration*@

<TelerikAvatar Type="AvatarType.Text"
               ThemeColor="@Telerik.Blazor.ThemeConstants.Avatar.ThemeColor.Info">
    JD
</TelerikAvatar>
````

## Types

The Avatar `Type` defines the type of the content that the component will display - it may be text, icon or image. [Read more about the specifics of the Avatar types...](slug:avatar-types)

## Appearance

The Avatar provides multiple options for configuring its look - `ThemeColor`, `Rounded` and more. [Explore the available appearance settings...](slug:avatar-appearance)

## Avatar Parameters

The Blazor Avatar provides the following parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter    | Type  | Description |
| ----------- | ----------- | -------|
| `Bordered` | `bool` | Whether the Avatar will have border. |
| `Class` | `string` | A custom CSS class that will be rendered on the main wrapping element of the Avatar. (`<div class="k-avatar>`) Use it to [override the theme or apply custom styles](slug:themes-override). |
| `Height` | `string` | The height of the Avatar. Takes precedence over the [`Size`](slug:avatar-appearance#size) parameter. |
| `Width` | `string` | The width of the Avatar. Takes precedence over the [`Size`](slug:avatar-appearance#size) parameter. |
| `Type` | `AvatarType` <br/> (`Image`) | The type of the Avatar. Read more in the [Types article]. |

You can find more options for customizing the Avatar styling in the [Appearance article](slug:avatar-appearance).

## Next Steps

* [Explore the Avatar types](slug:avatar-types)
* [Configure the appearance options of the Avatar](slug:avatar-appearance)

## See Also

  * [Live Demo: Avatar](https://demos.telerik.com/blazor-ui/avatar/overview)