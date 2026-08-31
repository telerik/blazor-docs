---
title: Sections
page_title: AppBar - Sections
description: Add Content in the AppBar Component
slug: appbar-sections
tags: telerik,blazor,appbar,sections,section,content
published: True
position: 1
components: ["appbar"]
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

>caption Using Telerik AppBar Section Parameters

<demo metaUrl="client/appbar/sections/" height="300"></demo>

## See Also

* [Live Demo: AppBar Overview](https://demos.telerik.com/blazor-ui/appbar/overview)
* [AppBar Overview](slug:appbar-overview)
