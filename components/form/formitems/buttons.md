---
title: Buttons
page_title: Form Buttons
description: Buttons in the Form
slug: form-formitems-buttons
tags: telerik,blazor,form,button,buttons
published: True
position: 3
---

# Form Buttons

The Blazor Form component adds a Submit button at the end of the form by default. You can add your own buttons through the `FormButtons` tag.

When you add that template, the form will no longer render the built-in submit button so you can choose the buttons and layout you want to achieve. We recommend that you add a Submit button in all cases so the users can save their work and fire the corresponding form [events]({%slug form-events%}).

### How to add a Reset (Clear) button to the form

You can provide a standard [TelerikButton]({%slug components/button/overview%}) to allow the user to clear the contents of the editors in the Telerik Form. See the code and its comments for some more details.

````CSHTML
@* Add a Clear Button to the Telerik Form. We also add a Submit button *@

@using System.ComponentModel.DataAnnotations

<TelerikForm EditContext="@theEditContext" OnValidSubmit="@OnValidSubmitHandler" Width="200px">

    <FormButtons>
        <TelerikButton ButtonType="@ButtonType.Submit" Primary="true">Submit</TelerikButton>
        <TelerikButton ButtonType="ButtonType.Button" OnClick="@ClearButton">Clear</TelerikButton>
    </FormButtons>

</TelerikForm>

@code {
    private void ClearButton()
    {
        person = new Person();
        CreatedEditContext(person);
    }

    void CreatedEditContext(Person model)
    {
        theEditContext = new EditContext(model);

        // we add the validation like this instead of in the markup
        // because changing the model and context does not otherwise attach the validator
        // and using the Clear button to new-up the model will leave you without validation
        theEditContext.AddDataAnnotationsValidation();
    }

    Person person { get; set; } = new Person();
    EditContext theEditContext { get; set; }

    protected override async Task OnInitializedAsync()
    {
        person = new Person()
        {
            FirstName = "John",
            DOB = DateTime.Now.AddYears(-37)
        };

        CreatedEditContext(person);
    }

    async Task OnValidSubmitHandler()
    {
        Console.WriteLine($"SAVING {person.FirstName} {person.LastName} who was born on {person.DOB}");
    }

    public class Person
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
    }
}
````

## See Also

  * [Form Overview]({%slug form-overview%})
  * [Form Items]({%slug form-formitems%})
  * [Form Groups]({%slug form-formgroups%})
  * [Orientation]({%slug form-orientation%})
  * [Events]({%slug form-events%})
   
