---
title: Popup Buttons Template
page_title: Grid Popup Buttons Template
description: The button template allows you to customize the buttons in the create or edit Popup window of the Blazor Grid component.
slug: grid-templates-popup-buttons
tags: telerik,blazor,grid,templates,popup,buttons
published: True
position: 50
components: ["grid"]
---

# Popup Buttons Template

With the `ButtonsTemplate`, you can personalize the appearance and behavior of the buttons in the create/edit Popup window of the Grid component.

>caption Modifying the buttons in the create/edit Popup by using a `ButtonsTemplate`.

<demo metaUrl="client/grid/templates-popup-buttons/" height="600"></demo>
    public List<SampleData> MyData { get; set; }

    async Task GetGridData()
    {
        MyData = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    public static class MyService
    {
        private static List<SampleData> _data { get; set; } = new List<SampleData>();

        public static async Task Create(SampleData itemToInsert)
        {
            itemToInsert.ID = _data.Count + 1;
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<SampleData>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 50; i++)
                {
                    _data.Add(new SampleData()
                    {
                        ID = i,
                        Name = "Name " + i.ToString()
                    });
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(SampleData itemToUpdate)
        {
            var index = _data.FindIndex(i => i.ID == itemToUpdate.ID);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
        }

        public static async Task Delete(SampleData itemToDelete)
        {
            _data.Remove(itemToDelete);
        }
    }
}
````

## See Also

* [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
* [Live Demo: Grid Popup Edit Form Template](https://demos.telerik.com/blazor-ui/grid/popup-edit-form-template)
* [Blazor Grid](slug:grid-overview)
