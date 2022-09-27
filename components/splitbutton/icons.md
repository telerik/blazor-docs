---
title: Icons
page_title: SplitButton Icons
description: How to use icons with the SplitButton for Blazor.
slug: splitbutton-icons
tags: telerik,blazor,splitbutton,icons
published: True
position: 5
---

# SplitButton Icons

This article describes how to use icons inside the SplitButton component.


## Icon Parameters

The SplitButton provides four parameters and five different ways to add an icon to its main button and all secondary action items:

The `string` parameters below exist for both `TelerikSplitButton` and `SplitButtonItem`.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Intended Usage |
| --- | --- |
| `Icon` | Use with the [**built-in Telerik icons**]({%slug general-information/font-icons%}#icons-list). |
| `IconClass` | Use with **third-party font icons**, which rely only on CSS classes for their rendering, and not on text content (see the tip after this table). |
| `SpriteClass` | Use with **image sprites**. Apply `background-image` and `background-position` styles to the set CSS class. |
| `ImageUrl` | Use with **images**, which are not sprites or font icons. The SplitButton will render an HTML `<img>` tag with the set URL. |

>tip It is also possible to define **any icon or image** with custom HTML markup inside the `<SplitButtonContent>` and `<SplitButtonItem>` tags. Use this aproach for images and font icons that rely on specific rendering. One such example is the Google Material Icons library.


## Example

>caption Using icons in the Blazor SplitButton

````HTML
<TelerikSplitButton Icon="sln">
    <SplitButtonContent>Telerik Icon</SplitButtonContent>
    <SplitButtonItems>
        <SplitButtonItem IconClass="bi-bluetooth">IconClass (Bootstrap)</SplitButtonItem>
        <SplitButtonItem SpriteClass="flag-netherlands">SpriteClass</SplitButtonItem>
        <SplitButtonItem ImageUrl="https://docs.telerik.com/blazor-ui/images/snowboarding.png">ImageUrl</SplitButtonItem>
        <SplitButtonItem> <TelerikLoader /> Custom markup </SplitButtonItem>
    </SplitButtonItems>
</TelerikSplitButton>

@* Bootstrap Icons stylesheet for the IconClass *@
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
      integrity="sha384-ejwKkLla8gPP8t2u0eQyL0Q/4ItcnyveF505U0NIobD/SMsNyXrLti6CWaD0L52l" crossorigin="anonymous" />

@* CSS styles for the SpriteClass *@
<style>
    .flag-netherlands {
        background-image: url("https://docs.telerik.com/blazor-ui/images/flags.png");
        background-position: 0 -64px;
    }
</style>
````


## Next Steps

* [Configure the SplitButton appearance]({%slug splitbutton-appearance%})
* [Handle SplitButton Events]({%slug splitbutton-events%})


## See Also

* [Live Demo: SplitButton Icons](https://demos.telerik.com/blazor-ui/splitbutton/overview)
* [SplitButton API](/blazor-ui/api/Telerik.Blazor.Components.TelerikSplitButton)
