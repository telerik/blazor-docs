---
title: Mark dirty fields in Telerik Form
description: Use INotifyPropertyChanged to track any changes of the form model properties.
type: how-to
page_title: Mark dirty fields in Telerik Form
slug: form-diry-fields
position: 
tags: 
ticketid: 1536031
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2.29.0</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Form for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

You could implementy dirty field tracking by implementing `INotifyPropertyChanged` interface for your model. Then, track the PropertyChanged event to store the dirty fields in a collection.

``` razor 

@using System.ComponentModel

<TelerikForm Model="@Customer">
    <FormItems>
        <FormItem Field="CustomerName" Class="@GetClass("CustomerName")"></FormItem>
        <FormItem Field="PhoneNumber" Class="@GetClass("PhoneNumber")"></FormItem>
    </FormItems>
</TelerikForm>

<style>
    .dirty .telerik-blazor {
        border: 2px solid red;
    }
</style>

@code {
    public DemoCustomer Customer { get; set; }

    public List<string> DirtyFields { get; set; } = new List<string>();

    public string GetClass(string field)
    {
        return DirtyFields.Contains(field) ? "dirty" : null;
    }

    protected override void OnInitialized()
    {
        Customer = new DemoCustomer();

        Customer.PropertyChanged += (sender, e) =>
        {
            if (!DirtyFields.Contains(e.PropertyName))
            {
                DirtyFields.Add(e.PropertyName);
            }

            StateHasChanged();
        };

        base.OnInitialized();
    }

    // copied from https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.inotifypropertychanged.propertychanged?view=net-5.0
    public class DemoCustomer : INotifyPropertyChanged
    {
        // These fields hold the values for the public properties.
        private Guid idValue = Guid.NewGuid();
        private string customerNameValue = string.Empty;
        private string phoneNumberValue = string.Empty;

        public event PropertyChangedEventHandler PropertyChanged;

        // This method is called by the Set accessor of each property.
        // The CallerMemberName attribute that is applied to the optional propertyName
        // parameter causes the property name of the caller to be substituted as an argument.
        private void NotifyPropertyChanged(string propertyName = "")
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
            }
        }

        public DemoCustomer()
        {
            customerNameValue = "Customer";
            phoneNumberValue = "(312)555-0100";
        }

        // This is the public factory method.
        public static DemoCustomer CreateNewCustomer()
        {
            return new DemoCustomer();
        }

        // This property represents an ID, suitable
        // for use as a primary key in a database.
        public Guid ID
        {
            get
            {
                return this.idValue;
            }
        }

        public string CustomerName
        {
            get
            {
                return this.customerNameValue;
            }

            set
            {
                if (value != this.customerNameValue)
                {
                    this.customerNameValue = value;
                    NotifyPropertyChanged("CustomerName");
                }
            }
        }

        public string PhoneNumber
        {
            get
            {
                return this.phoneNumberValue;
            }

            set
            {
                if (value != this.phoneNumberValue)
                {
                    this.phoneNumberValue = value;
                    NotifyPropertyChanged("PhoneNumber");
                }
            }
        }
    }
}

```
