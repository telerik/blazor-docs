---
title: Templates
page_title: ListBox - Templates
description: Implement ListBox templates to customize the item rendering and styling. Use a custom no data template when there are no items to display.
slug: listbox-templates
tags: telerik,blazor,listbox
published: True
position: 50
---

# ListBox Templates

The ListBox features templates that allow you to customize the component rendering and styling. This article describes all available templates and explains how to use them.

* [Item Template](#item-template)
* [No Data Template](#no-data-template)


## Item Template

The ListBox `ItemTemplate` enables you to change the default HTML output and CSS styling of the data items.

The `<ItemTemplate>` tag is a Blazor `RenderFragment`. It exposes a `context` variable that is the current data item object and you can access its properties directly without casting.


## No Data Template

The ListBox shows the `NoDataTemplate` when there are no items in the component `Data`.


## Example

The following example shows how to place a Button inside the `NoDataTemplate`, which adds new items to the ListBox. Another option for such functionality is to use a [custom toolbar button](slug:listbox-toolbar#custom-tools).

Always [`Rebind()`](slug:listbox-overview#listbox-reference-and-methods) the ListBox after making programmatic changes to its `Data`.

>caption Using ListBox templates

````RAZOR
@* Add and remove ListBox items to see the item template and no-data template. *@

<TelerikListBox @ref="@ListBoxRef"
                Data="@ListBoxData"
                @bind-SelectedItems="@ListBoxSelectedItems"
                OnRemove="@( (ListBoxRemoveEventArgs<Person> args) => OnListBoxRemove(args) )"
                Width="200px">
    <ListBoxToolBarSettings>
        <ListBoxToolBar>
            <ListBoxToolBarRemoveTool />
        </ListBoxToolBar>
    </ListBoxToolBarSettings>
    <ItemTemplate>
        <TelerikSvgIcon Icon="@context.Icon" />
        @context.FirstName <strong>@context.LastName</strong>
    </ItemTemplate>
    <NoDataTemplate>
        <div>
            No items?..<br />
            <TelerikButton OnClick="@AddItems">Add Some</TelerikButton>
        </div>
    </NoDataTemplate>
</TelerikListBox>

@code {
    private TelerikListBox<Person> ListBoxRef { get; set; } = null!;

    private List<Person> ListBoxData { get; set; } = new List<Person>();

    private IEnumerable<Person> ListBoxSelectedItems { get; set; } = new List<Person>();

    private void OnListBoxRemove(ListBoxRemoveEventArgs<Person> args)
    {
        foreach (var item in args.Items)
        {
            ListBoxData.Remove(item);
        }

        ListBoxRef.Rebind();
    }

    private void AddItems()
    {
        ListBoxData.Add(new Person()
        {
            Id = 1,
            FirstName = "Celestine",
            LastName = "Riny",
            Icon = SvgIcon.User
        });
        ListBoxData.Add(new Person()
        {
            Id = 2,
            FirstName = "Liraz",
            LastName = "Sri",
            Icon = SvgIcon.Reddit
        });
        ListBoxData.Add(new Person()
        {
            Id = 3,
            FirstName = "Minh",
            LastName = "Sam",
            Icon = SvgIcon.Accessibility
        });

        ListBoxRef.Rebind();
    }

    public class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public ISvgIcon Icon { get; set; } = SvgIcon.User;
    }
}
````


## Next Steps

* [Handle ListBox events](slug:listbox-events)


## See Also

* [Live Demo: ListBox Templates](https://demos.telerik.com/blazor-ui/listbox/templates)
