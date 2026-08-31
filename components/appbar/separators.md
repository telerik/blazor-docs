---
title: Separators
page_title: AppBar - Separators
description: Separate items in the Telerik AppBar for Blazor
slug: appbar-separators
tags: telerik,blazor,appbar,navbar,separator,spacer
published: True
position: 5
components: ["appbar"]
---

# Separators

You can visually separate the items in the Telerik AppBar for Blazor. Depending on the needs of your application you can use of the following, or a combination of them.

## AppBar Separator

To separate two items with a solid line, add the `<AppBarSeparator>` tag between them.

### AppBar Separator Parameters

The nested `AppBarSeparator` tag exposes the following parameters:

| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the AppBar separator. Use that class to cascade styles. |
| `Visible` | `bool` <br /> `true` | Specifies if the separator will be visible in the AppBar. |

## AppBar Spacer

To separate two items with a solid line, add the `<AppBarSeparator>` tag between them.

Use the `<AppBarSpacer>` to define empty space in the AppBar which separates the items.

### AppBar Spacer Parameters

The nested `AppBarSpacer` tag exposes the following parameters:

| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the AppBar spacer. Use that class to cascade styles. |
| `Size` | `string` | The width of the spacer. All `AppBarSpacer` tags without Size will take up the same amount of the remaining space between the [Sections](slug:appbar-sections). |
| `Visible` | `bool` <br /> `true` | Specifies if the spacer will be visible in the AppBar. |

>caption The AppBar separators

<demo metaUrl="client/appbar/separators/" height="300"></demo>


## See Also

* [Live Demo: AppBar Overview](https://demos.telerik.com/blazor-ui/appbar/overview)
* [AppBar Overview](slug:appbar-overview)
