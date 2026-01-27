---
title: Popup Form Template
page_title: Gantt Tree - Gantt Popup Form Template
description: Learn how to define a custom create or edit popup template in the Blazor Gantt. The template allows you to customize the layout and the content of the create/edit popup.
slug: gantt-templates-popup-form
tags: telerik,blazor,gantt,ganttchart,templates,popup,edit,create
published: True
position: 50
components: ["gantt"]
---
# Popup Form Template

With the `FormTemplate` feature, you can customize the appearance and content of the create/edit Popup window of the Gantt. Declare the desired custom content inside the `<FormTemplate>` inner tag of the `<GanttPopupEditFormSettings>`.

You can use the `Context` attribute of the `<FormTemplate>` tag to set the name of the context variable. The context variable is of type `object` and can be cast to the model type to which the Gantt is bound.


>caption Using a `FormTemplate` to modify the Edit/Create Popup window.

````RAZOR
@using System.Collections.Generic
@using System.ComponentModel.DataAnnotations;

<TelerikGantt @ref="@GanttRef"
              Data="@Data"
              Width="100%"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              TreeListEditMode="@GanttTreeListEditMode.Popup"
              OnDelete="@DeleteItem"
              Sortable="true"
              SortMode="@SortMode.Multiple"
              FilterMode="@GanttFilterMode.FilterMenu"
              FilterMenuType="@FilterMenuType.Menu">
    <GanttSettings>
        <GanttPopupEditFormSettings>
            <FormTemplate>
                @{
                    EditItem = context.Item as FlatModel;

                    <TelerikForm Model="@EditItem" OnValidSubmit="@OnValidSubmit">
                        <FormItems>
                            <FormItem Field="@(nameof(FlatModel.Title))" />
                            <FormItem Field="@(nameof(FlatModel.Start))" />
                            <FormItem Field="@(nameof(FlatModel.End))" />
                            <FormItem Field="@(nameof(FlatModel.PercentComplete))" LabelText="Complete">
                                <Template>
                                    <label for="complete" class="k-label k-form-label">Complete</label>
                                    <TelerikNumericTextBox Id="complete" @bind-Value="@EditItem.PercentComplete" Format="P2" />
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
        </GanttPopupEditFormSettings>
    </GanttSettings>
    <GanttToolBarTemplate>
        <GanttCommandButton Command="Add" Icon="@SvgIcon.Plus">Add</GanttCommandButton>
    </GanttToolBarTemplate>
    <GanttViews>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
        <GanttYearView></GanttYearView>
    </GanttViews>
    <GanttDependenciesSettings>
        <GanttDependencies Data="@Dependencies"
                           PredecessorIdField="PredecessorId"
                           SuccessorIdField="SuccessorId"
                           TypeField="Type"
                           OnCreate="@CreateDependency"
                           OnDelete="@DeleteDependency">
        </GanttDependencies>
    </GanttDependenciesSettings>
    <GanttColumns>
        <GanttCommandColumn Width="120px">
            <GanttCommandButton Command="Add" Icon="@SvgIcon.Plus"></GanttCommandButton>
            <GanttCommandButton Command="Edit" Icon="@SvgIcon.Pencil"></GanttCommandButton>
            <GanttCommandButton Command="Delete" Icon="@SvgIcon.Trash"></GanttCommandButton>
        </GanttCommandColumn>
        <GanttColumn Field="@nameof(FlatModel.Id)"
                     Editable="false"
                     Width="40px">
        </GanttColumn>
        <GanttColumn Field="@nameof(FlatModel.Title)"
                     Expandable="true"
                     Width="160px">
        </GanttColumn>
        <GanttColumn Field="@nameof(FlatModel.PercentComplete)"
                     Title="Status"
                     DisplayFormat="{0:P2}"
                     Width="100px">
        </GanttColumn>
        <GanttColumn Field="@nameof(FlatModel.Start)"
                     Width="100px">
        </GanttColumn>
        <GanttColumn Field="@nameof(FlatModel.End)"
                     Width="100px">
        </GanttColumn>
    </GanttColumns>
</TelerikGantt>

@code {
    private TelerikGantt<FlatModel> GanttRef;
    private FlatModel EditItem { get; set; }
    public DateTime SelectedDate { get; set; } = new DateTime(2019, 11, 11, 6, 0, 0);

    class FlatModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        [Required]
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    class DependencyModel
    {
        public int Id { get; set; }
        public int PredecessorId { get; set; }
        public int SuccessorId { get; set; }
        public int Type { get; set; }
    }

    public int LastId { get; set; } = 1;
    public int LastDependencyId { get; set; } = 1;
    List<FlatModel> Data { get; set; }
    List<DependencyModel> Dependencies { get; set; } = new List<DependencyModel>();

    protected override void OnInitialized()
    {
        Data = new List<FlatModel>();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new FlatModel()
                {
                    Id = LastId,
                    Title = "Employee  " + i.ToString(),
                    Start = new DateTime(2020, 12, 6 + i),
                    End = new DateTime(2020, 12, 11 + i),
                    PercentComplete = i * 0.125
                };

            Data.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                Data.Add(new FlatModel()
                    {
                        Id = LastId,
                        ParentId = parentId,
                        Title = "    Employee " + i + " : " + j.ToString(),
                        Start = new DateTime(2020, 12, 6 + i + j),
                        End = new DateTime(2020, 12, 7 + i + j),
                        PercentComplete = j * 0.225
                    });

                LastId++;
            }
        }

        Dependencies.Add(new DependencyModel()
            {
                Id = LastDependencyId++,
                PredecessorId = 3,
                SuccessorId = 4,
                Type = 0
            });

        Dependencies.Add(new DependencyModel()
            {
                Id = LastDependencyId++,
                PredecessorId = 2,
                SuccessorId = 5,
                Type = 2
            });

        base.OnInitialized();
    }

    private void CreateDependency(GanttDependencyCreateEventArgs args)
    {
        var dependency = new DependencyModel()
            {
                Id = LastDependencyId++,
                PredecessorId = (int)args.PredecessorId,
                SuccessorId = (int)args.SuccessorId,
                Type = (int)args.Type
            };

        Dependencies.Add(dependency);
    }

    private void DeleteDependency(GanttDependencyDeleteEventArgs args)
    {
        Dependencies.RemoveAll(d => d.Id.Equals((args.Item as DependencyModel).Id));
    }

    private void CreateItem(FlatModel item)
    {
        item.Id = LastId++;

        Data.Insert(0, item);

        CalculateParentPercentRecursive(item);
        CalculateParentRangeRecursive(item);
    }

    private void UpdateItem(FlatModel item)
    {
        var foundItem = Data.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            var startOffset = item.Start - foundItem.Start;
            if (startOffset != TimeSpan.Zero)
            {
                MoveChildrenRecursive(foundItem, startOffset);
            }

            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }

        CalculateParentPercentRecursive(foundItem);
        CalculateParentRangeRecursive(foundItem);
    }

    private void DeleteItem(GanttDeleteEventArgs args)
    {
        var item = Data.FirstOrDefault(i => i.Id.Equals((args.Item as FlatModel).Id));

        RemoveChildRecursive(item);

        CalculateParentPercentRecursive(item);
        CalculateParentRangeRecursive(item);
    }

    private void RemoveChildRecursive(FlatModel item)
    {
        var children = GetChildren(item).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        Data.Remove(item);
    }

    private void CalculateParentPercentRecursive(FlatModel item)
    {
        if (item.ParentId != null)
        {
            var parent = GetParent(item);

            var children = GetChildren(parent);

            if (children.Any())
            {
                parent.PercentComplete = children.Average(i => i.PercentComplete);

                CalculateParentPercentRecursive(parent);
            }
        }
    }

    private void CalculateParentRangeRecursive(FlatModel item)
    {
        if (item.ParentId != null)
        {
            var parent = GetParent(item);

            var children = GetChildren(parent);

            if (children.Any())
            {
                parent.Start = children.Min(i => i.Start);
                parent.End = children.Max(i => i.End);

                CalculateParentRangeRecursive(parent);
            }
        }
    }

    private void MoveChildrenRecursive(FlatModel item, TimeSpan offset)
    {
        var children = GetChildren(item);

        foreach (var child in children)
        {
            child.Start = child.Start.Add(offset);
            child.End = child.End.Add(offset);

            MoveChildrenRecursive(child, offset);
        }
    }

    private FlatModel GetParent(FlatModel item)
    {
        return Data.FirstOrDefault(i => i.Id.Equals(item.ParentId));
    }

    private IEnumerable<FlatModel> GetChildren(FlatModel item)
    {
        return Data.Where(i => item.Id.Equals(i.ParentId));
    }

    private async Task OnValidSubmit()
    {
        if (EditItem.Id != default)
        {
            UpdateItem(EditItem);
        }
        else
        {
            CreateItem(EditItem);
        }

        await ExitEditAsync();
    }

    private async Task OnCancel()
    {
        await ExitEditAsync();
    }

    private async Task ExitEditAsync()
    {
        var state = GanttRef?.GetState();
        state.OriginalEditItem = null;
        state.EditItem = null;
        state.InsertedItem = null;

        await GanttRef?.SetStateAsync(state);
    }
}

<style>
    .k-window-actions {
        display: none !important;
    }
</style>
````