---
title: Item Template
page_title: Menu - Item Template
description: Item Template in the Menu for Blazor.
slug: contextmenu-item-template
tags: telerik,blazor,context menu,templates
published: True
position: 10
---

# Context Menu Item Template

The Context Menu component allows you to define a custom template for its items. This article explains how you can use it.

The Item Template  is defined under the `<ItemTemplate>` tag of the menu.

The template receives the model to which the item is bound as its `context`. You can use it to render the desired content. The menu is a generic component, so you can use a named context variable that will be of the model type without additional casting.

You can use the template to render arbitrary content according to your application's data and logic. You can use components in it and thus provide rich content instead of plain text. You can also use it to add DOM event handlers like click, doubleclick, mouseover if you need to respond to them.

>caption Use templates to implement custom navigation between views without the UrlField feature

````CSHTML
@* Use your own link elements for navigation instead of the built-in feature of the menu, and also customize the appearance of items based on some other conditions *@

<div class="menuTarget">
    right click this context menu target
</div>

<TelerikContextMenu Data="@MenuItems" Selector=".menuTarget">
    <ItemTemplate>
        @{
            @if (!string.IsNullOrEmpty(context.Url))
            {
                <a href="@context.Url">Go to @context.Text</a>
            }
            else
            {
                <button @onclick="@( () => Console.WriteLine($"{context.Metadata} for {context.Text}") )">
                    @context.Text
                </button>
            }
        }
    </ItemTemplate>
</TelerikContextMenu>

@code {
    public List<ContextMenuItem> MenuItems { get; set; }
    TelerikContextMenu<ContextMenuItem> TheContextMenu { get; set; }
    
    // generate sample data for the listview and the menu
    protected override void OnInitialized()
    {
        MenuItems = new List<ContextMenuItem>()
        {
            new ContextMenuItem
            {
                Text = "More Info",
                Url = "about"
            },
            new ContextMenuItem
            {
                Text = "Lorem Ipsum",
                Metadata = "special"
            }
        };

        base.OnInitialized();
    }

    public class ContextMenuItem
    {
        public string Text { get; set; }
        public string Url { get; set; }
        public string Metadata { get; set; }
    }
}

<style>
    .menuTarget{
        width: 100px;
        background: yellow;
        margin: 50px;
    }
</style>
````


## See Also

  * [Data Binding a Context Menu]({%slug contextmenu-data-binding-overview%})
  * [Live Demo: Context Menu Temlate](https://demos.telerik.com/blazor-ui/contextmenu/template)

