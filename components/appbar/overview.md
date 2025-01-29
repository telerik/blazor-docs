---
title: Overview
page_title: AppBar Overview
description: Discover the AppBar component for Blazor. Learn how to add the component to your app and explore its features like sections, dividers, positioning, and various styling options.
slug: appbar-overview
tags: telerik,blazor,appbar,navbar
published: True
position: 0
---

# Blazor AppBar Overview

The <a href = "https://www.telerik.com/blazor-ui/appbar" target="_blank">Blazor AppBar component</a> helps you build navigation bars for your application seamlessly. This article explains how to start using the component and describes its features.

## Creating Blazor AppBar

1. Add the `<TelerikAppBar>` tag to a Razor file.
1. Use the `<AppBarSection>` child tag to add content to the AppBar component.
1. (optional) Use [spacers or separators](#content-dividers) to add visual distinction between the sections in the AppBar.

>caption Basic configuration of the Telerik AppBar

````RAZOR
<TelerikAppBar>
    <AppBarSection>
        <span>Company Logo</span>
    </AppBarSection>

    <AppBarSpacer></AppBarSpacer>

    <AppBarSection>
        <span>Our Products</span>
    </AppBarSection>

    <AppBarSeparator></AppBarSeparator>

    <AppBarSection>
        <span>Our Mission</span>
    </AppBarSection>

    <AppBarSeparator></AppBarSeparator>

    <AppBarSection>
        <span>Contact Us</span>
    </AppBarSection>

    <AppBarSpacer></AppBarSpacer>

    <AppBarSection>
        <TelerikSvgIcon Icon="@SvgIcon.User"></TelerikSvgIcon>
    </AppBarSection>

    <AppBarSeparator></AppBarSeparator>

    <AppBarSection>
        <TelerikSvgIcon Icon="@SvgIcon.Logout"></TelerikSvgIcon>
    </AppBarSection>
</TelerikAppBar>
````

## AppBar Sections

Use the AppBar Sections to render arbitrary HTML content to match the UI and UX needs of your application. [Read more about the Blazor AppBar sections...](slug://appbar-sections)

## Content Dividers

The AppBar features separators and spacers that can visually divide the component items. [Read more about the Blazor AppBar separators and spacers.](slug://appbar-separators).

## Positioning

You can control the position of the AppBar and how the component behaves according to the flow of the page. [Read more about the Blazor AppBar positioning.](slug://appbar-position).

## AppBar Parameters

The Blazor AppBar provides parameters to configure the component. Also check the [AppBar API Reference](slug://Telerik.Blazor.Components.TelerikAppBar) for a full list of properties.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Position` | `AppBarPosition` <br /> (`None`) | The position of the AppBar on the page. [Read more about AppBar positioning.](slug://appbar-position) |
| `PositionMode` | `AppBarPosition` <br /> (`Static`) | Sets how the AppBar is positioned according to the flow of the document. [Read more about AppBar positioning.](slug://appbar-position) |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor AppBar:

| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | The CSS class to be rendered on the main wrapping element of the AppBar component, which is `<div class="k-appbar">`. Use for [styling customizations](slug://themes-override). |
| `Height` | `string` | The height of the AppBar. |
| `ThemeColor` | `Telerik.Blazor.ThemeConstants.AppBar.ThemeColor` | Adjust the color of the AppBar |
| `Width` | `string` | The width of the AppBar. |

You can find more information for customizing the AppBar appearance in the [Appearance article](slug://appbar-appearance).

## AppBar Reference and Methods

To execute AppBar methods, obtain reference to the component instance with `@ref`.

| Method  | Description |
|---------|-------------|
| `Refresh` | Use the method to programmatically re-render the AppBar. |

<div class="skip-repl"></div>

````RAZOR
<TelerikButton OnClick="@RefreshAppBar">Refresh AppBar</TelerikButton>

<TelerikAppBar @ref="AppBarRef" />

@code {
	private TelerikAppBar AppBarRef { get; set; }

	private void RefreshAppBar()
	{
		AppBarRef.Refresh();
	}
}
````

## Next Steps

* [Explore the AppBar Sections](slug://appbar-sections)
* [Use the AppBar Sections](slug://appbar-separators)
* [Customize the AppBar position](slug://appbar-position)

## See Also

* [Live AppBar Demos](https://demos.telerik.com/blazor-ui/appbar/overview)
* [AppBar API Reference](slug://Telerik.Blazor.Components.TelerikAppBar)
