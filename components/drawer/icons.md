---
title: Icons
page_title: Drawer for Blazor | Icon
description: Icons and images in the Drawer for Blazor
slug: drawer-icons
tags: telerik,blazor,drawer,icon,iconclass,image
published: True
position: 15
---

# Drawer Icons

You can put an image, an icon class or a font icon for each item in the Drawer to illustrate its purpose for your end users. To apply them, use the following properties:

* for a font icon, populate the `IconField` parameter of the component or provide an `Icon` property in the data model.
* for an image, populate the `ImageUrlField` parameter of the component or provide an `ImageUrl` property in the data model. This is rendered as `<img src="" />` tag.
* for a icon class, populate the `IconClassField` parameter of the component or provide an `IconClass` property in the data model.

You can see how to use the built-in icons in the [Font Icons]({%slug  general-information/font-icons%}) article.

For a custom font icon, define the font and glyph in your `Icon` CSS class.

>caption How to use icons in Telerik Menu

````CSHTML
@* This example shows how to add icons or images to the Drawer's items properties of the model *@

<TelerikDrawer Data="@Data"
               MiniMode="true"
               @bind-Expanded="@DrawerExpanded"
               Mode="DrawerMode.Push"
               @ref="@DrawerRef"
               @bind-SelectedItem="@SelectedItem">
    <Content>
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@IconName.Menu">Toggle drawer</TelerikButton>
        <div class="m-5">
            Selected Item: @SelectedItem?.Text
        </div>
    </Content>
</TelerikDrawer>

@code {
    bool DrawerExpanded { get; set; } = true;
    TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    DrawerItem SelectedItem { get; set; }
    IEnumerable<DrawerItem> Data { get; set; } = new List<DrawerItem>()
{
            new DrawerItem { Text = "Current Location", Icon = IconName.Pin},
            new DrawerItem { Text = "Navigation", IconClass = "oi oi-globe"},
            new DrawerItem { Text = "Favourite Locations", ImageUrl = "https://demos.telerik.com/kendo-ui/content/shared/icons/16/star.png"},
    };

    public class DrawerItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
        public string ImageUrl { get; set; }
        public string IconClass { get; set; }
    }
}
````

>caption The result from the code snippet above

>note The `IconField` and `IconClassField` are rendered as `<span class="" />`, whereas the `ImageUrlField` is rendered as `<img src="" />`

## See Also

  * [Menu Overview]({%slug components/menu/overview%})
