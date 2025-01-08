---
title:  Hiding or Removing the Empty Popup Footer when Using the Popup Form Template
description: Learn how to either hide the empty footer in the edit popup of the Grid for Blazor or use it to display custom Form buttons.
type: how-to
page_title: How to handle the empty popup footer when using the Popup Form Template
slug: grid-kb-handle-empty-popup-footer
tags: grid, blazor, edit form, popup form template, footer, custom buttons, empty
res_type: kb
ticketid: 1665785
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

When I am using the [Popup Form Template](slug://grid-templates-popup-form) in the Grid for Blazor, the [default Update and Cancel buttons are removed](slug://grid-templates-popup-form#specifics). I am not using the [`ButtonsTemplate`](slug://grid-templates-popup-buttons) and the footer remains empty. This takes unnecessary space and affects the UI's aesthetics. 

The requirement is to either hide this empty footer or utilize it by placing the custom form buttons within. 

This KB article also answers the following questions:

- How to hide the empty footer in the edit popup of the Grid for Blazor?
- How to display custom buttons in the footer of the edit popup?
- How to manage form submission with custom buttons in the Grid for Blazor?

## Solution

There are two approaches to address this requirement:

* [Option 1: Display Custom Buttons in the Footer](#option-1-display-custom-buttons-in-the-footer)
* [Option 2: Remove the Footer and Keep the Buttons in the FormTemplate](#option-2-remove-the-footer-and-keep-the-buttons-in-the-formtemplate)

### Option 1: Display Custom Buttons in the Footer

To display custom buttons in the footer and handle form submission, follow these steps:

1. Declare a [`<FormButtons>`](slug://form-formitems-buttons) tag inside the custom Form and leave it empty, so the Form does not render its default buttons.
2. Declare custom buttons in the [`<ButtonsTemplate>`](slug://grid-templates-popup-buttons) and handle their `OnClick` events to manage the Form submission.

>caption Displaying custom buttons in the popup footer

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             EditMode="@GridEditMode.Popup"
             Pageable="true"
             PageSize="5"
             OnDelete="@DeleteItem">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
    <GridSettings>
        <GridPopupEditSettings Width="550px" MaxHeight="95vh" MaxWidth="95vw"></GridPopupEditSettings>
        <GridPopupEditFormSettings ButtonsLayout="@FormButtonsLayout.Stretch" Context="FormContext">
            <FormTemplate>
                @{
                    EditItem = FormContext.Item as Person;

                    <TelerikForm Model="@EditItem"
                                 ColumnSpacing="20px"
                                 Columns="2"
                                 ButtonsLayout="@FormButtonsLayout.Stretch">
                        <FormItems>
                            <FormItem Field="EmployeeId" Enabled="false"></FormItem>
                            <FormItem Field="Name">
                            </FormItem>
                            <FormItem Field="HireDate" LabelText="Custom Hire Date Label"></FormItem>
                            <FormItem>
                                <Template>
                                    <label for="position">Custom Position Label</label>
                                    <TelerikDropDownList Data="@PositionsData"
                                                         @bind-Value="@EditItem.Position"
                                                         Id="position">
                                    </TelerikDropDownList>
                                </Template>
                            </FormItem>
                        </FormItems>
                        <FormButtons>
                            @*remove the deafult buttons from the Form*@
                        </FormButtons>
                    </TelerikForm>
                }
            </FormTemplate>
            <ButtonsTemplate>
                <TelerikButton Icon="@nameof(SvgIcon.Save)" OnClick="@OnSubmit">Save</TelerikButton>
                <TelerikButton Icon="@nameof(SvgIcon.Cancel)" ButtonType="@ButtonType.Button" OnClick="@OnCancel">Cancel</TelerikButton>
            </ButtonsTemplate>
        </GridPopupEditFormSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field=@nameof(Person.EmployeeId) Editable="false" />
        <GridColumn Field=@nameof(Person.Name) />
        <GridColumn Field=@nameof(Person.HireDate) Title="Hire Date" />
        <GridColumn Field=@nameof(Person.Position) Title="Position" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<string> PositionsData { get; set; } = new List<string>()
    {
        "Manager", "Developer", "QA"
    };

    private TelerikGrid<Person> GridRef { get; set; }
    private List<Person> GridData { get; set; }
    private Person EditItem { get; set; }
    private List<Person> _people;

    public class Person
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
        public string Position { get; set; }
    }

    public List<Person> People
    {
        get
        {
            if (_people == null)
            {
                _people = GeneratePeople(30);
            }

            return _people;
        }
    }

    protected override void OnInitialized()
    {
        LoadData();
    }

    private void LoadData()
    {
        GridData = GetPeople();
    }

    private void DeleteItem(GridCommandEventArgs args)
    {
        DeletePerson(args.Item as Person);

        LoadData();
    }

    private async Task OnSubmit()
    {

        if (EditItem.EmployeeId != default)
        {
            UpdatePerson(EditItem);
        }
        else
        {
            CreatePerson(EditItem);
        }

        await ExitEditAsync();

        LoadData();
    }

    private async Task OnCancel()
    {
        await ExitEditAsync();
    }

    private async Task ExitEditAsync()
    {
        var state = GridRef?.GetState();
        state.OriginalEditItem = null;
        state.EditItem = null;
        state.InsertedItem = null;

        await GridRef?.SetStateAsync(state);
    }

    #region Service Methods
    private List<Person> GetPeople()
    {
        return People;
    }

    private DataSourceResult GetPeople(DataSourceRequest request)
    {
        return People.ToDataSourceResult(request);
    }

    private void DeletePerson(Person person)
    {
        People.Remove(person);
    }

    private void UpdatePerson(Person person)
    {
        var index = People.FindIndex(i => i.EmployeeId == person.EmployeeId);
        if (index != -1)
        {
            People[index] = person;
        }
    }

    private void CreatePerson(Person person)
    {
        person.EmployeeId = People.Max(x => x.EmployeeId) + 1;

        People.Insert(0, person);
    }

    private List<Person> GeneratePeople(int count, int startIndex = 0)
    {
        List<Person> result = new List<Person>();

        for (int i = startIndex; i < startIndex + count; i++)
        {
            result.Add(new Person()
                {
                    EmployeeId = i,
                    Name = "Employee " + i.ToString(),
                    HireDate = new DateTime(2020, 6, 1).Date.AddDays(count - (i % 7)),
                    Position = i % 3 <= 2 ? PositionsData[i % 3] : PositionsData.FirstOrDefault()

                });
        }

        return result;
    }
    #endregion
}
````

### Option 2: Remove the Footer and Keep the Buttons in the FormTemplate

This approach relies on using CSS to hide the empty footer. Add your custom class to the edit popup of the Grid to override its default styling.

>caption Hiding the empty popup footer

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<style>
    .custom-form .k-actions {
        display: none;
    }
</style>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             EditMode="@GridEditMode.Popup"
             Pageable="true"
             PageSize="5"
             OnDelete="@DeleteItem">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
    <GridSettings>
        <GridPopupEditSettings Class="custom-form" Width="550px" MaxHeight="95vh" MaxWidth="95vw"></GridPopupEditSettings>
        <GridPopupEditFormSettings Context="FormContext">
            <FormTemplate>
                @{
                    EditItem = FormContext.Item as Person;

                    <TelerikForm Model="@EditItem"
                                 ColumnSpacing="20px"
                                 Columns="2"
                                 ButtonsLayout="@FormButtonsLayout.Stretch"
                                 OnValidSubmit="@OnValidSubmit">
                        <FormItems>
                            <FormItem Field="EmployeeId" Enabled="false"></FormItem>
                            <FormItem Field="Name">
                            </FormItem>
                            <FormItem Field="HireDate" LabelText="Custom Hire Date Label"></FormItem>
                            <FormItem>
                                <Template>
                                    <label for="position">Custom Position Label</label>
                                    <TelerikDropDownList Data="@PositionsData"
                                                         @bind-Value="@EditItem.Position"
                                                         Id="position">
                                    </TelerikDropDownList>
                                </Template>
                            </FormItem>
                        </FormItems>
                        <FormButtons>
                            <TelerikButton Icon="@nameof(SvgIcon.Save)">Save</TelerikButton>
                            <TelerikButton Icon="@nameof(SvgIcon.Cancel)" ButtonType="@ButtonType.Button" OnClick="@OnCancel">Cancel</TelerikButton>
                        </FormButtons>
                    </TelerikForm>
                }
            </FormTemplate>
        </GridPopupEditFormSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field=@nameof(Person.EmployeeId) Editable="false" />
        <GridColumn Field=@nameof(Person.Name) />
        <GridColumn Field=@nameof(Person.HireDate) Title="Hire Date" />
        <GridColumn Field=@nameof(Person.Position) Title="Position" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<string> PositionsData { get; set; } = new List<string>()
    {
        "Manager", "Developer", "QA"
    };

    private TelerikGrid<Person> GridRef { get; set; }
    private List<Person> GridData { get; set; }
    private Person EditItem { get; set; }
    private List<Person> _people;

    public class Person
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
        public string Position { get; set; }
    }

    public List<Person> People
    {
        get
        {
            if (_people == null)
            {
                _people = GeneratePeople(30);
            }

            return _people;
        }
    }

    protected override void OnInitialized()
    {
        LoadData();
    }

    private void LoadData()
    {
        GridData = GetPeople();
    }

    private void DeleteItem(GridCommandEventArgs args)
    {
        DeletePerson(args.Item as Person);

        LoadData();
    }

    private async Task OnValidSubmit()
    {

        if (EditItem.EmployeeId != default)
        {
            UpdatePerson(EditItem);
        }
        else
        {
            CreatePerson(EditItem);
        }

        await ExitEditAsync();

        LoadData();
    }

    private async Task OnCancel()
    {
        await ExitEditAsync();
    }

    private async Task ExitEditAsync()
    {
        var state = GridRef?.GetState();
        state.OriginalEditItem = null;
        state.EditItem = null;
        state.InsertedItem = null;

        await GridRef?.SetStateAsync(state);
    }

    #region Service Methods
    private List<Person> GetPeople()
    {
        return People;
    }

    private DataSourceResult GetPeople(DataSourceRequest request)
    {
        return People.ToDataSourceResult(request);
    }

    private void DeletePerson(Person person)
    {
        People.Remove(person);
    }

    private void UpdatePerson(Person person)
    {
        var index = People.FindIndex(i => i.EmployeeId == person.EmployeeId);
        if (index != -1)
        {
            People[index] = person;
        }
    }

    private void CreatePerson(Person person)
    {
        person.EmployeeId = People.Max(x => x.EmployeeId) + 1;

        People.Insert(0, person);
    }

    private List<Person> GeneratePeople(int count, int startIndex = 0)
    {
        List<Person> result = new List<Person>();

        for (int i = startIndex; i < startIndex + count; i++)
        {
            result.Add(new Person()
                {
                    EmployeeId = i,
                    Name = "Employee " + i.ToString(),
                    HireDate = new DateTime(2020, 6, 1).Date.AddDays(count - (i % 7)),
                    Position = i % 3 <= 2 ? PositionsData[i % 3] : PositionsData.FirstOrDefault()

                });
        }

        return result;
    }
    #endregion
}
````

## See Also

- [Grid Popup Editing - Documentation](slug://components/grid/editing/popup)
- [Customizing the Grid's Edit Form](slug://grid-templates-popup-form)
