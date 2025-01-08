---
title: Sections
page_title: AppBar - Sections
description: Add Content in the AppBar Component
slug: appbar-sections
tags: telerik,blazor,appbar,sections,section,content
published: True
position: 1
---

# Sections

The `<AppBarSection>` is a template-based component that allows you to render HTML content or Razor components in the AppBar component.

>note Render content only inside the `<AppBarSection>` tag, otherwise it will display outside the AppBar component.

## AppBar Section Parameters

The nested `AppBarSection` tag exposes parameters:

| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the AppBar section. You could use that class to cascade styles. |
| `Visible` | `bool` <br /> (`true`) | Specifies if the section will be visible in the AppBar. |

>caption The Telerik AppBar sections with its parameter

````RAZOR
@* The AppBar sections with its parameters *@

<style>
    .products-section-class {
        font-weight: bolder;
    }
</style>

<TelerikButton OnClick="@(() => isSectionVisible = !isSectionVisible)">Toggle the visibility of the Our Mission section</TelerikButton>

<br />

<TelerikAppBar>
    <AppBarSection Class="products-section-class">
        <span>Our Products</span>
    </AppBarSection>

    <AppBarSection Visible="@isSectionVisible">
        <span>Our Mission</span>
    </AppBarSection>
</TelerikAppBar>

@code{
    private bool isSectionVisible { get; set; } = true;
}
````

## See Also

  * [Live Demo: AppBar Overview](https://demos.telerik.com/blazor-ui/appbar/overview)
  * [AppBar Overview](slug://appbar-overview)
