---
title: Separators
page_title: AppBar - Separators
description: Separate items in the Telerik AppBar for Blazor
slug: appbar-separators
tags: telerik,blazor,appbar,navbar,separator,spacer
published: True
position: 5
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
| `Size` | `string` | The width of the spacer. All `AppBarSpacer` tags without Size will take up the same amount of the remaining space between the [Sections](slug://appbar-sections). |
| `Visible` | `bool` <br /> `true` | Specifies if the spacer will be visible in the AppBar. |

>caption The AppBar separators

````RAZOR
@* The AppBar content dividers with some of their parameters and values *@

<style>
    .k-appbar .k-appbar-separator.thick-separator {
        border-width: 0 0 0 20px;
    }
</style>

<TelerikAppBar>
    <AppBarSection>
        <span>Our Logo</span>
    </AppBarSection>

    <AppBarSpacer Size="25%"></AppBarSpacer>

    <AppBarSection>
        <span>Our Products</span>
    </AppBarSection>

    <AppBarSpacer Size="50px"></AppBarSpacer>

    <AppBarSection>
        <span>Our Mission</span>
    </AppBarSection>

    <AppBarSpacer></AppBarSpacer>

    <AppBarSection>
        <TelerikSvgIcon Icon="@SvgIcon.User"></TelerikSvgIcon>
    </AppBarSection>

    <AppBarSeparator Class="thick-separator"></AppBarSeparator>

    <AppBarSection>
        <TelerikSvgIcon Icon="@SvgIcon.Logout"></TelerikSvgIcon>
    </AppBarSection>
</TelerikAppBar>
````


## See Also

  * [Live Demo: AppBar Overview](https://demos.telerik.com/blazor-ui/appbar/overview)
  * [AppBar Overview](slug://appbar-overview)
