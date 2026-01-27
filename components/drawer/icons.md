---
title: Icons
page_title: Drawer - Icon
description: Icons and images in the Drawer for Blazor.
slug: drawer-icons
tags: telerik,blazor,drawer,icon,iconclass,image
published: True
position: 22
components: ["drawer"]
---
# Drawer Icons

You can add [Telerik Font or SVG icons](slug:common-features-icons) to the Drawer items. The component also supports custom icons.

To use Drawer item icons, define a property in the component model class and assign the property name to the `IconField` parameter of the Drawer.

@[template](/_contentTemplates/common/icons.md#icon-property-supported-types)

If the icon property name in the Drawer model is `Icon`, there is no need to set the `IconField` parameter.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use icons in the Telerik Drawer

````RAZOR
<TelerikDrawer Data="@Data"
               IconField="@nameof(DrawerItem.Icon)"
               MiniMode="true"
               @bind-Expanded="@DrawerExpanded"
               Mode="DrawerMode.Push"
               @ref="@DrawerRef"
               @bind-SelectedItem="@SelectedItem">
    <DrawerContent>
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@SvgIcon.Menu">Toggle drawer</TelerikButton>
        <div class="m-5">
            Selected Item: @SelectedItem?.Text
        </div>
    </DrawerContent>
</TelerikDrawer>

<style>
    /* Third-party icon libraries should provide these styles out-of-the-box. */

    /* base styles for all custom icons */
    .my-icon {
        /* Define size, position and font styles here to ensure icons and images will be properly visualized in all themes. */
        width: 1em;
        height: 1em;
        font-size: 16px;
    }

    /* styles for specific custom image */
    .my-image {
        /* define a background image or a font icon glyph here */
        background-image: url('https://demos.telerik.com/kendo-ui/content/shared/icons/16/star.png'); 
        flex-shrink: 0;
    }
</style>

<!-- Load this stylesheet only if using Telerik font icons -->
<link href="https://blazor.cdn.telerik.com/blazor/6.0.2/kendo-font-icons/font-icons.css" rel="stylesheet" type="text/css" />

<!-- The stylesheets for the custom FontAwesome icon -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css" rel="stylesheet" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />


@code {
    private TelerikDrawer<DrawerItem> DrawerRef { get; set; }

    private bool DrawerExpanded { get; set; } = true;

    private DrawerItem SelectedItem { get; set; }

    private IEnumerable<DrawerItem> Data { get; set; } = new List<DrawerItem>() {
        new DrawerItem { Text = "Home (SVG icon)", Icon = SvgIcon.Home },
        new DrawerItem { Text = "Navigation (Font icon)", Icon = FontIcon.Globe },
        new DrawerItem { Text = "Favorites (Image)", Icon = "my-icon my-image" },
        new DrawerItem { Text = "Settings (Custom icon)", Icon = "my-icon fa fa-cog" },
    };

    public class DrawerItem
    {
        public string Text { get; set; }
        public object Icon { get; set; }
    }
}
````

## See Also

* [Drawer Data Binding](slug:drawer-data-binding)
* [Drawer Demos](https://demos.telerik.com/blazor-ui/drawer/overview)
