---
title: Icons
page_title: ToggleButton - Icon
description: Icons and images in the ToggleButton for Blazor.
slug: togglebutton-icons
tags: telerik,blazor,Toggle,button,icon,sprite,image
published: True
position: 2
---


# ToggleButton Icons

You can put an image, sprite or a font icon in the toggle button to illustrate its purpose for your end users. To apply them, use the parameters below.

## Parameters

All parameters are of type `string`.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Description |
|---|---|
| `Icon` | Use it to display a [Telerik font icon]({%slug general-information/font-icons%}). |
| `IconClass` | Use it render custom font icon class(es), which apply the required styles (like font name and glyph symbol). Make sure to reference the required third-party font and stylesheets. `IconClass="foo"` will render as `<span class="foo">` inside the Toggle Button. |
| `SpriteClass` | Use it for CSS sprites. `SpriteClass="foo"` will render as `<span class="k-sprite k-icon foo">` inside the Toggle Button. |
| `ImageUrl` | Use it to render an `<img>` tag with the specified relative or absolute URL. |

The following example shows how to use an image from a URL, a sprite image, and the built-in font icons.

>caption How to use icons in the Telerik Toggle Button

````CSHTML
@* This sample shows how you can use conditional logic to show different icons in the different states.
It also shows how to use telerik icons, raster icons and sprite images*@

<TelerikToggleButton SpriteClass="@( FlagSelected ? "flag netherlands" : "flag brazil")" @bind-Selected="@FlagSelected">Sprite</TelerikToggleButton>

<TelerikToggleButton Icon="@( FontSelected ? "volume-off" : "volume-up" )" @bind-Selected="@FontSelected">Font Icon</TelerikToggleButton>

<TelerikToggleButton ImageUrl="@RasterIconUrl" @bind-Selected="@RasterSelected">Image URL</TelerikToggleButton>

<style>
    /* the sprite for the first button is defined through a CSS rule matching its Class */
    .flag {
        background-image: url("https://docs.telerik.com/blazor-ui/images/flags.png");
    }

        .flag.netherlands {
            background-position: 0 -64px;
            background-color: white;
        }

        .flag.brazil {
            background-position: 0 0;
        }
</style>

@code{
    bool FlagSelected { get; set; }
    bool FontSelected { get; set; }
    bool RasterSelected { get; set; }
    string RasterIconUrl => RasterSelected ? "https://docs.telerik.com/blazor-ui/images/snowboarding.png" : "https://docs.telerik.com/blazor-ui/images/swimming.png";
}
````

>tip You can use relative paths to your images in the `wwwroot` folder. The example above uses absolute paths to make it easy for you to see the results without preparing images.

>tip If you don't add text to the button, the button will center the icon on all sides.

## Icon Size

Images and icons should generally be small enough to fit in a line of text - the button is an inline element and is not designed for large images. If you want to use big icon buttons, consider one of the following options:

* Define a `Class` for the Toggle Button that set `height` and `width` styles. The width and height can be set in `px` sufficient to accommodate the icon or to `auto`;
* Attach an `@onclick` handler to a `span` or `img` element instead of using a button;
* Add your own HTML inside the button, something like:
    `<TelerikButton><img style="width: 400px; height: 400px;" src="my-icon.svg" />some text</TelerikButton>`

## See Also

* [ToggleButton Overview]({%slug togglebutton-overview%})
