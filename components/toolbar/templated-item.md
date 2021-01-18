---
title: Templated Item
page_title: ToolBar - Templated Item
description: Templated Item in the Telerik ToolBar for Blazor
slug: toolbar-templated-item
tags: telerik,blazor,toolbar,template,item,templateditem
published: True
position: 10
---

# Templated (Custom) Item

The Telerik ToolBar for Blazor allows you to add a custom element. To use it, add the `<ToolBarTemplateItem>` inside the `<TelerikToolBar>`. In it, you can add HTML and components according to your application needs.

You can use that item to add complex toolbars to your application, which have dropdowns, inputs and other components. You can handle any events and use any API they expose to built your business logic.

You cannot add those Templated items to a `ToolBarButtonGroup`.

>caption Add a Telerik DropDownList to the ToolBar

![templated item for the ToolBar](images/toolbar-templated-item.png)

````CSHTML
@*Use the templated item to add a Telerik DropDownList to the ToolBar*@

<TelerikToolBar>
    <ToolBarButtonGroup>
        <ToolBarButton Icon="bold">Bold</ToolBarButton>
        <ToolBarButton Icon="italic">Italic</ToolBarButton>
        <ToolBarButton Icon="underline">Underline</ToolBarButton>
    </ToolBarButtonGroup>
    <ToolBarSeparator />

    <ToolBarTemplateItem>
        <TelerikDropDownList Data="@Roles" Value="@SelectedRole" ValueChanged="@( (string v) => RoleChange(v) )"></TelerikDropDownList>
    </ToolBarTemplateItem>
</TelerikToolBar>


@code {
    public bool Selected { get; set; } = true;

    public string SelectedRole { get; set; }

    public List<string> Roles { get; set; } = new List<string>()
    {
         "Manager", "QA", "Developer", "Support"
    };

    protected override void OnInitialized()
    {
        SelectedRole = Roles.FirstOrDefault();
    }

    void RoleChange(string newRole)
    {
        // use the argument, or use the Value with two-way binding and other events like OnChange
        SelectedRole = newRole;
        Console.WriteLine($"The user is now in the {SelectedRole} role");
    }
}
````


## See Also

  * [Live Demo: ToolBar Overview](https://demos.telerik.com/blazor-ui/toolbar/overview)
