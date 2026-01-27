---
title: Templates
page_title: Rating Templates
description: Learn how to use the ItemTemplate to customize the styling and appearance of your Rating component for Blazor. 
slug: rating-templates
tags: telerik,blazor,rating,templates
published: True
position: 11
components: ["rating"]
---
# Templates

The Rating features templates that allow you to customize the component rendering and styling. This article describes all available templates and explains how to use them.

* [Item Template](#item-template)

## Item Template

The Rating `ItemTemplate` enables you to change the default HTML output and CSS styling of the items (icons).

The `<ItemTemplate>` tag is a Blazor `RenderFragment`. It exposes a `context` variable that is the current data item object and you can access its properties directly without casting.

````RAZOR
<TelerikRating @bind-Value="@Value"
               Max="5"
               Label="@Label">
    <ItemTemplate>
        @{
            if (context.Index + 1 > 3)
            {
                if (context.Selected || context.Highlighted)
                {
                    <TelerikSvgIcon Icon="@SvgIcon.Heart" Size="@ThemeConstants.SvgIcon.Size.ExtraLarge"></TelerikSvgIcon>
                }
                else
                {
                    <TelerikSvgIcon Icon="@SvgIcon.HeartOutline" Size="@ThemeConstants.SvgIcon.Size.ExtraLarge"></TelerikSvgIcon>
                }
            }
            else
            {
                if (context.Selected || context.Highlighted)
                {
                    <TelerikSvgIcon Icon="@SvgIcon.Star" Size="@ThemeConstants.SvgIcon.Size.ExtraLarge"></TelerikSvgIcon>
                }
                else
                {
                    <TelerikSvgIcon Icon="@SvgIcon.StarOutline" Size="@ThemeConstants.SvgIcon.Size.ExtraLarge"></TelerikSvgIcon>
                }
            }
        }
    </ItemTemplate>
</TelerikRating>

@code {
    private double Value { get; set; } = 1;
    private string Label => $"{Value} out of 5";
}
````

## See Also

* [Live Demo: Rating Templates](https://demos.telerik.com/blazor-ui/rating/templates)