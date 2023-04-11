---
title: Popup Form Template
page_title: Grid Popup Form Template
description: Learn how to define a custom popup create/edit template in the Blazor Data Grid. The template allows you to customize the layout and the content of the create/edit popup.
slug: grid-templates-popup-form
tags: telerik,blazor,grid,templates,popup,edit,create
published: True
position: 50
---


# Popup Form Template

With the `FormTemplate` feature, you can customize the appearance and content of the create/edit Popup window of the Grid.

>caption Using a `FormTemplate` to modify the Edit/Create Popup window.

````CSHTML
@using System.Collections.Generic;

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             EditMode="@GridEditMode.Popup"
             Pageable="true"
             Width="950px"
             PageSize="5"
             OnDelete="@DeleteItem">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@FontIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
    <GridSettings>
        <GridPopupEditSettings MaxHeight="95vh" MaxWidth="95vw"></GridPopupEditSettings>
        <GridPopupEditFormSettings ColumnSpacing="20px" Orientation="@FormOrientation.Horizontal" Columns="2">
            <FormTemplate>
                @{
                    EditItem = context.Item as Person;

                    <TelerikForm Model="@EditItem" OnValidSubmit="@OnValidSubmit">
                        <FormItems>
                            <FormItem Field="EmployeeId" Enabled="false"></FormItem>
                            <FormItem Field="Name"></FormItem>
                            <FormItem Field="AgeInYears" LabelText="Custom Age Label:"></FormItem>
                            <FormItem Field="HireDate" LabelText="Custom Hire Date Label:"></FormItem>
                        </FormItems>
                        <FormButtons>
                            <TelerikButton Icon="@nameof(FontIcon.Save)">Save</TelerikButton>
                            <TelerikButton Icon="@nameof(FontIcon.Cancel)" ButtonType="@ButtonType.Button" OnClick="@OnCancel">Cancel</TelerikButton>
                        </FormButtons>
                    </TelerikForm>
                }
            </FormTemplate>
        </GridPopupEditFormSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field=@nameof(Person.EmployeeId) Editable="false" />
        <GridColumn Field=@nameof(Person.Name) />
        <GridColumn Field=@nameof(Person.AgeInYears) Title="Age" />
        <GridColumn Field=@nameof(Person.HireDate) Title="Hire Date" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="@FontIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@FontIcon.Trash">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public TelerikGrid<Person> GridRef { get; set; }
    public List<Person> GridData { get; set; }
    public Person EditItem { get; set; }
    private List<Person> _people;

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
        public List<Person> GetPeople()
        {
            return People;
        }

        public DataSourceResult GetPeople(DataSourceRequest request)
        {
            return People.ToDataSourceResult(request);
        }

        public void DeletePerson(Person person)
        {
            People.Remove(person);
        }

        public void UpdatePerson(Person person)
        {
            var index = People.FindIndex(i => i.EmployeeId == person.EmployeeId);
            if (index != -1)
            {
                People[index] = person;
            }
        }

        public void CreatePerson(Person person)
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
                        AgeInYears = i,
                        GraduateGrade = (i % 6) + 1,
                        HireDate = new DateTime(2020, 6, 1).Date.AddDays(count - (i % 7)),
                        MeetingDate = new DateTime(2020, 6, 1).Date.AddDays((i % 4)),
                        IsOutOfOffice = i % 3 == 0 ? true : false
                    });
            }

            return result;
        }
    #endregion
}
````

## See Also

 * [Grid Popup Buttons Template]({%slug grid-templates-popup-buttons%})
 * [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
 * [Live Demo: Grid Popup Edit Form Template](https://demos.telerik.com/blazor-ui/grid/popup-edit-form-template)