---
title: Multiselect editor in a grid column
description: How to use multiselect in a grid editor.
type: how-to
page_title: Multiselect column in grid
slug: grid-kb-multiselect-editor
position: 
tags: 
ticketid: 
res_type: kb
---

## Description

I want to use a MultiSelect for a column editor in the Grid to let the user select and edit multiple values from a list in a single column. I want a multiselect column.

## Solution

Add the [Multi Select component]({%slug multiselect-overview%}) to the [EditorTemplate]({%slug grid-templates-editor%}) of the desired column.

>caption MultiSelect column editor in the grid

````CSHTML
@* Use a MultiSelect in the grid to edit multiple values in a column *@

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Inline" Pageable="true" Groupable="true" PageSize="5"
             FilterMode="@GridFilterMode.FilterRow" Sortable="true" OnUpdate="@UpdateHandler" Width="900px">
    <GridColumns>
        <GridColumn Field=@nameof(Team.ID) Editable="false" Title="ID" Groupable="false" Width="150px" />
        <GridColumn Field=@nameof(Team.Name) Title="Team Name" Width="250px" />
        <GridColumn Title="Open Positions">
            <EditorTemplate>
                @{
                    CurrentlyEditedTeam = context as Team;
                    <TelerikMultiSelect Data="@Roles" Placeholder="Select job to add" AutoClose="false"
                                         @bind-Value="@CurrentlyEditedTeam.VacantPositions"
                                         TextField="@nameof(Role.RoleName)" ValueField="@nameof(Role.RoleId)"
                                         Width="100%" PopupHeight="auto">
                    </TelerikMultiSelect>
                }
            </EditorTemplate>
            <Template>
                @{
                    var pos = (context as Team).VacantPositions;
                    if(pos != null && pos.Count > 0)
                    {
                        foreach (var item in pos)
                        {
                            <span>@GetRoleNameFromId(item), &nbsp;</span>
                        }
                    }
                    else
                    {
                        <span style="font-style:italic">No open positions in this team.</span>
                    }
                }
            </Template>
        </GridColumn>
        <GridCommandColumn Width="150px">
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    List<Team> MyData { get; set; }
    List<Role> Roles { get; set; } = new List<Role>();
    Team CurrentlyEditedTeam { get; set; }

    async Task UpdateHandler(GridCommandEventArgs args)
    {
        Team item = (Team)args.Item;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetGridData();
    }

    public class Team
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public List<int> VacantPositions { get; set; }
    }

    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }

    async Task GetGridData()
    {
        MyData = await MyService.Read();
        Roles = await MyService.GetRoles();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    // a helper method to extract the foreign key data that we want to render
    // this needs to be fast and synchronous because each render needs it many times
    string GetRoleNameFromId(int roleId)
    {
        Role matchingPos = Roles.FirstOrDefault(r => r.RoleId == roleId);
        return matchingPos != null ? matchingPos.RoleName : "Unknown";
    }


    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<Team> _data { get; set; } = new List<Team>();

        public static async Task<List<Team>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 0; i < 13; i++)
                {
                    _data.Add(new Team()
                    {
                        ID = i,
                        Name = "Team " + i,
                        VacantPositions = GetVacantRoles(i)
                    });
                }
            }

            return await Task.FromResult(_data);
        }

        private static List<int> GetVacantRoles(int x)
        {
            switch (x % 3)
            {
                case 0: return null;
                case 1: return new List<int> { 1 };
                case 2: return new List<int> { 1, 2 };
                default:
                    return null;
            }
        }

        public static async Task<List<Role>> GetRoles()
        {
            var data = new List<Role>
            {
                new Role { RoleId = 1, RoleName = "Manager" },
                new Role { RoleId = 2, RoleName = "QA" },
                new Role { RoleId = 3, RoleName = "Developer" },
                new Role { RoleId = 4, RoleName = "Designer" },
                new Role { RoleId = 5, RoleName = "Support" },
            };

            return await Task.FromResult(data);
        }

        public static async Task Update(Team itemToUpdate)
        {
            var index = _data.FindIndex(i => i.ID == itemToUpdate.ID);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
        }
    }
}
````


## Notes

* See the [Grid Bound Column Notes]({%slug components/grid/columns/bound%}#notes) for important information on how the grid can work with models. The key points are:
    * A grid column cannot use a collection for its `Field`.
    * The built-in grid operations (such as filtering and sorting) are avaialble only for columns with a defined `Field`.
* This example uses an approach where a foreign key denotes the actual data, but the MultiSelet editor uses a collection of specific data to presentit to users in a meaningful way. You can find more detailed examples of handling that in the  [ForeignKey column]({%slug grids-foreign-key%}) article.
    * The MultiSelect works with certain value types only, and not with entire models, see more in the [MultiSelect - Data Binding]({%slug multiselect-databind%}) article and in the [MultiSelect - Overview - Features]({%slug multiselect-overview%}#features) section (see the `TValue` notes).

