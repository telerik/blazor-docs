---
title: Appearance
page_title: Form Appearance
description: Appearance settings of the Form for Blazor.
slug: form-appearance
tags: telerik,blazor,form,appearance
published: True
position: 35
components: ["form"]
---
# Appearance Settings

This article outlines the available Form parameters, which control its appearance.

## Size

You can increase or decrease the size of the Form by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Form.Size` class:

>The `Size` configuration of the Form affects the padding of all the editors and buttons.

| Class members | Manual declarations |
|---------------|--------|
| `Small`   |`sm`|
| `Medium`<br /> default value   |`md`|
| `Large`   |`lg`|

>caption The built-in sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Form.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikForm Model="@TestUser"
                         Size="@size">
                <FormItems>
                    <FormItem Field="@nameof(User.FirstName)"></FormItem>
                    <FormItem Field="@nameof(User.LastName)"></FormItem>
                </FormItems>
            </TelerikForm>
        </div>
    }

    @code {

        public User TestUser { get; set; } = new User() {
            FirstName = "Johny",
            LastName = "Doe"
        };

        public class User
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
        }
    }
}
````

## See Also

  * [Live Demo: Form Appearance](https://demos.telerik.com/blazor-ui/form/appearance)

