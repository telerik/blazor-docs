---
title: Custom Font Icons Fail in Telerik Components (Empty Icon)
description: How to use custom font icons in telerik components and how to avoid them not rendering
type: troubleshooting
page_title: Custom font icons in Telerik components
slug: common-kb-custom-font-icons-fail
position: 
tags: 
ticketid: 1517982, 1514661
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Menu for Blazor, TreeView for Blazor, Drawer for Blazor, ContextMenu for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I would like to use the fontawesome icon library or open iconic. I'm trying to put an icon in front of the text of an menu item. As described in the help pages, this can be done by using `IconClassField` of the component. But if I use that, it will render a span with classes `k-icon k-i-fas fa-fog` instead of `fas fa-fog` (`<span class="k-icon k-i-fas fa-cog"></span>`).

The result is an item with an empty `span` and I don't see the icons.

If I use similar code with the `IconClass` of a plain component like a `TelerikButton` I can see the icons, but I can't see them in data bound components like the menu, drawer, or treeview.

## Cause\Possible Cause(s)

The most common reason for such a problem is that the model field that carries the classes for the custom font matches the default name that the Telerik component uses for the built-in [Telerik icons]({%slug general-information/font-icons%}) - `Icon`.

The databinding settings of the databound components have default field names and they look for Telerik icons in the `Icon` field of the model, unless you specify otherwise.

The built-in Telerik Icon takes precedence over custom icons and renders with the Telerik classes (`k-icon k-i-*`).

You can find the list of default values in the corresponding component's Data Binding article and Icons article.

## Steps to Reproduce

>caption The following snippet shows an attempt to use custom icons that only renders one Telerik icon

![custom font icons fail](images/custom-font-icons-fail.png)

````CSHTML
@* Just one example of including custom font icon libraries.
Make sure to use the correct way and resources for your actual project *@
<link href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css" rel="stylesheet" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
    
<TelerikMenu Data="@MenuData"
             IconClassField="@nameof(MenuModel.Icon)">
</TelerikMenu>

@code {
    public List<MenuModel> MenuData { get; set; }

    protected override void OnInitialized()
    {
        GenerateMenuData();
    }

    public void GenerateMenuData()
    {
        MenuData = new List<MenuModel>()
        {
            new MenuModel()
            {
                Text = "TelerikIcon - easy",
                Icon = "email"
            },
            new MenuModel()
            {
                Text = "TelerikIcon - like custom font",
                Icon = "k-icon k-i-email"
            },
            new MenuModel()
            {
                Text = "OpenIconic - fail",
                Icon = "oi oi-wrench",
            },
            new MenuModel()
             {
                Text = "FontAwesome - fail",
                Icon = "fas fa-cog"
             }
        };
    }

    public class MenuModel
    {
        public string Text { get; set; }
        public string Icon { get; set; }
    }
}
````



## Solution

There are two ways to solve this:

* Use a field name in your model that does not match the default field name (`Icon`) - for example, call the field `MyFontIconClasses`.

* Or, set a dummy field for the Telerik icon so that it does not look for the default name (`Icon`), leaving it free for your own settings.

>caption The examples below have the same result

![custom font icons success](images/custom-font-icons-success.png)

````DummyIconFieldName
@* Just one example of including custom font icon libraries.
Make sure to use the correct way and resources for your actual project *@
<link href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css" rel="stylesheet" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />

<TelerikMenu Data="@MenuData"
             IconClassField="@nameof(MenuModel.Icon)"
             IconField="dummy">
</TelerikMenu>

@code {
    public List<MenuModel> MenuData { get; set; }

    protected override void OnInitialized()
    {
        GenerateMenuData();
    }

    public void GenerateMenuData()
    {
        MenuData = new List<MenuModel>()
        {
            new MenuModel()
            {
                Text = "TelerikIcon - fail with custom fonts",
                Icon = "email"
            },
            new MenuModel()
            {
                Text = "TelerikIcon - success with custom fonts",
                Icon = "k-icon k-i-email"
            },
            new MenuModel()
            {
                Text = "OpenIconic - fail",
                Icon = "oi oi-wrench",
            },
            new MenuModel()
             {
                Text = "FontAwesome - fail",
                Icon = "fas fa-cog"
             }
        };
    }

    public class MenuModel
    {
        public string Text { get; set; }
        public string Icon { get; set; }
    }
}
````
````CustomFontClassFieldName
@* Just one example of including custom font icon libraries.
Make sure to use the correct way and resources for your actual project *@
<link href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css" rel="stylesheet" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />

<TelerikMenu Data="@MenuData"
             IconClassField="@nameof(MenuModel.MyFontIconClasses)">
</TelerikMenu>

@code {
    public List<MenuModel> MenuData { get; set; }

    protected override void OnInitialized()
    {
        GenerateMenuData();
    }

    public void GenerateMenuData()
    {
        MenuData = new List<MenuModel>()
        {
            new MenuModel()
            {
                Text = "TelerikIcon - fail with custom fonts",
                MyFontIconClasses = "email"
            },
            new MenuModel()
            {
                Text = "TelerikIcon - success with custom fonts",
                MyFontIconClasses = "k-icon k-i-email"
            },
            new MenuModel()
            {
                Text = "OpenIconic - fail",
                MyFontIconClasses = "oi oi-wrench",
            },
            new MenuModel()
             {
                Text = "FontAwesome - fail",
                MyFontIconClasses = "fas fa-cog"
             }
        };
    }

    public class MenuModel
    {
        public string Text { get; set; }
        public string MyFontIconClasses { get; set; }
    }
}
````

