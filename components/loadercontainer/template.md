---
title: Template
page_title: LoaderContainer Template
description: Template in the LoaderContainer for Blazor.
slug: loadercontainer-template
tags: telerik,blazor,loader,container,loadercontainer,templates
published: True
position: 10
---

# LoaderContainer Template

The `Template` allows you to control the rendering of the LoaderContainer. When you are using the `Template` there will be no panel rendered by default.

This article provides examples that show how to:

* [Create a Custom LoaderContainer](#create-a-custom-loader-container)
* [Implement a Custom Panel](#implement-a-custom-panel)


### Create a Custom LoaderContainer

This example shows how to change the contents of the loading text and animation that are shown by default. Once you set the template up, the default white background of that container will be gone so you can have full control over its appearance.

````CSHTML
@* Customize the LoaderContainer content using its Template *@

<TelerikLoaderContainer Visible="@true">
    <Template>
        <TelerikLoader></TelerikLoader>
        <div>
            <span><TelerikIcon Icon="information"></TelerikIcon></span>
            <span>Please wait, the application is loading...</span>
        </div>
    </Template>
</TelerikLoaderContainer>

<TelerikGrid Data="@GridData" AutoGenerateColumns="true"
             Pageable="true" PageSize="4" Width="700px">
</TelerikGrid>

@code {
    public List<GridDataModel> GridData { get; set; }
    public class GridDataModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string EmailAddress { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public DateTime? LocalTime { get; set; }
    }

    public List<GridDataModel> GenerateGridData()
    {
        var data = Enumerable.Range(1, 15).Select(i => new GridDataModel()
        {
            Id = i,
            Username = $"Username {i}",
            EmailAddress = $"user{i}@mail.com",
            RegistrationDate = DateTime.Now.AddDays(-2),
            LocalTime = DateTime.Now
        }).ToList();

        return data;
    }

    protected override async Task OnInitializedAsync()
    {
        await Task.Delay(6000);
        GridData = GenerateGridData();
    }
}
````

>caption The result from the code snippet above

![](images/loadercontainer-template-basic.png)

### Implement a Custom Panel

You can use CSS to target the DOM elements that create the Panel around the template so you can style them as required. By default, the Panel is white to contrast with the default dark overlay. This example shows how you can customize its color and content.


````CSHTML
@*Create a custom panel to highlight the custom loading indicator and loading text*@

<style>
    .my-loader-container .k-loader-container-inner{
        background-color: indianred;
        padding: 80px;
    }
</style>

<TelerikLoaderContainer Class="my-loader-container" Visible="@true">
    <Template>
        <TelerikLoader ThemeColor="light"></TelerikLoader>
        <div>
            <span><TelerikIcon Icon="information"></TelerikIcon></span>
            <span style="color:white">Loading...</span>
        </div>
    </Template>
</TelerikLoaderContainer>

<TelerikGrid Data="@GridData" AutoGenerateColumns="true"
             Pageable="true" PageSize="4" Width="700px">
</TelerikGrid>

@code {
    public List<GridDataModel> GridData { get; set; }
    public class GridDataModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string EmailAddress { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public DateTime? LocalTime { get; set; }
    }

    public List<GridDataModel> GenerateGridData()
    {
        var data = Enumerable.Range(1, 15).Select(i => new GridDataModel()
        {
            Id = i,
            Username = $"Username {i}",
            EmailAddress = $"user{i}@mail.com",
            RegistrationDate = DateTime.Now.AddDays(-2),
            LocalTime = DateTime.Now
        }).ToList();

        return data;
    }

    protected override async Task OnInitializedAsync()
    {
        await Task.Delay(6000);
        GridData = GenerateGridData();
    }
}
````

>caption The result from the code snippet above

![](images/loadercontainer-template-custom-panel.png)

## See Also

  * [Live Demo: LoaderContainer](https://demos.telerik.com/blazor-ui/loadercontainer/overview)
  * [Appearance Settings]({%slug loadercontainer-appearance%})
   
