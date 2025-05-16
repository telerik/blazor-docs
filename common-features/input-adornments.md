---
title: Input Adornments
page_title: Input Adornments
description: How to add prefix and suffix adornments in the input elements of the components.
slug: common-features/input-adornments
tags: telerik,blazor,input,adornments,prefix,suffix
published: True
position: 30
---

# Input Adornments

Telerik UI for Blazor supports adornments for some of the components that incorporate input element. Using adornments allows you to enhance the Telerik UI for Blazor components by adding custom prefix and suffix elements.

A prefix input adornment refers to an element placed before the user input field. You may use it to provide clarity on the expected data in the input such as currency symbols or unit indicators. Conversely, a suffix input adornment is an element positioned after the user input field. It often serves to provide direct functionality for the entered data like password visibility toggles, formatting or clearing the input.

>caption In this article:

* [Supported Components](#supported-components)
* [Adding a Prefix Adornment](#adding-a-prefix-adornment)
* [Adding a Suffix Adornment](#adding-a-suffix-adornment)
* [Using Separators](#using-separators)
* [TextArea Specifics](#textarea-specifics)
* [FloatingLabel Specifics](#floatinglabel-specifics)
* [DropDowns Specifics](#dropdowns-specifics)


## Supported Components

The following input components support prefix and suffix adornments:

* [AutoComplete](slug:autocomplete-overview)
* [ComboBox](slug:components/combobox/overview)
* [MaskedTextbox](slug:maskedtextbox-overview)
* [MultiColumnComboBox](slug:multicolumncombobox-overview)
* [MultiSelect](slug:multiselect-overview)
* [NumericTextBox](slug:components/numerictextbox/overview)
* [TextArea](slug:textarea-overview)
* [TextBox](slug:components/textbox/overview)

## Adding a Prefix Adornment

To add a prefix, declare a `<*ComponentName*PrefixTemplate>` tag as a direct child of the `<Telerik*ComponentName*>` tag. The `PrefixTemplate` is a `RenderFragment`, which allows you to declare any desired content as a prefix—simple text, HTML elements, or components.


>caption Adding a prefix adornment in UI for Blazor

````RAZOR
<div class="component-container">
    <h5>TextArea</h5>

    <TelerikTextArea @bind-Value="@TextValue"
                     Placeholder="Add comment..."
                     Width="300px">
        <TextAreaPrefixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Comment" />
        </TextAreaPrefixTemplate>
    </TelerikTextArea>
</div>

<div class="component-container">
    <h5>TextBox</h5>

    <TelerikTextBox @bind-Value="@TextValue"
                    Placeholder="Enter email..."
                    Width="300px">
        <TextBoxPrefixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Envelop" />
        </TextBoxPrefixTemplate>
    </TelerikTextBox>
</div>

<div class="component-container">
    <h5>MaskedTextBox</h5>

    <TelerikMaskedTextBox @bind-Value="@TextValue"
                          Mask="0000-0000-0000-0000"
                          Width="300px">
        <MaskedTextBoxPrefixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Barcode" />
        </MaskedTextBoxPrefixTemplate>
    </TelerikMaskedTextBox>
</div>

<div class="component-container">
    <h5>NumericTextBox</h5>

    <TelerikNumericTextBox @bind-Value="@Height"
                           Width="300px">
        <NumericTextBoxPrefixTemplate>
            <span style="padding:3px">m</span>
        </NumericTextBoxPrefixTemplate>
    </TelerikNumericTextBox>
</div>

<div class="component-container">
    <h5>AutoComplete</h5>

    <TelerikAutoComplete Data="@Products"
                         @bind-Value="@SelectedProduct"
                         Placeholder="Search a product..."
                         ShowClearButton="true"
                         Width="300px">
        <AutoCompletePrefixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Search" />
        </AutoCompletePrefixTemplate>
    </TelerikAutoComplete>
</div>

<div class="component-container">
    <h5>ComboBox</h5>

    <TelerikComboBox Data="@Products"
                     @bind-Value="@SelectedProduct"
                     Placeholder="Search a product..."
                     ShowClearButton="true"
                     Width="300px">
        <ComboBoxPrefixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Search" />
        </ComboBoxPrefixTemplate>
    </TelerikComboBox>
</div>

<div class="component-container">
    <h5>MultiColumnComboBox</h5>

    <TelerikMultiColumnComboBox Data="@ProductModels"
                                @bind-Value="@SelectedProductId"
                                ValueField="@nameof(Product.ProductId)"
                                TextField="@nameof(Product.ProductName)"
                                Placeholder="Search a product..."
                                Width="300px">
        <MultiColumnComboBoxPrefixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Search" />
        </MultiColumnComboBoxPrefixTemplate>
        <MultiColumnComboBoxColumns>
            <MultiColumnComboBoxColumn Field="@nameof(Product.ProductId)" Title="Product Id"></MultiColumnComboBoxColumn>
            <MultiColumnComboBoxColumn Field="@nameof(Product.ProductName)" Title="Product Name"></MultiColumnComboBoxColumn>
        </MultiColumnComboBoxColumns>
    </TelerikMultiColumnComboBox>
</div>

<div class="component-container">
    <h5>MultiSelect</h5>

    <TelerikMultiSelect Data="@Products"
                        @bind-Value="@SelectedProducts"
                        Placeholder="Search products..."
                        ShowClearButton="true"
                        Width="300px">
        <MultiSelectPrefixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Search" />
        </MultiSelectPrefixTemplate>
    </TelerikMultiSelect>
</div>

@code {
    private string TextValue { get; set; }
    private string SelectedProduct { get; set; }
    private int SelectedProductId { get; set; }
    private int Height { get; set; }

    private List<string> Products = Enumerable.Range(1, 20).Select(x => $"Product {x}").ToList();

    private List<Product> ProductModels = Enumerable.Range(1, 20).Select(x => new Product { ProductId = x, ProductName = "Product " + x }).ToList();

    private List<string> SelectedProducts { get; set; }

    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
    }
}

<style>
    .component-container {
        border-bottom: 1px dashed black;
        padding-bottom: 10px;
        margin-bottom: 10px;
        width: 300px
    }
</style>
````

## Adding a Suffix Adornment

To add a suffix, declare a `<*ComponentName*SuffixTemplate>` tag as a direct child of the `<Telerik*ComponentName*>` tag. The `SuffixTemplate` is a `RenderFragment`, which allows you to declare any desired content as a prefix—a simple text, HTML elements, or components.

>caption Adding a suffix adornment in UI for Blazor

````RAZOR
<div class="component-container">
    <h5>TextArea</h5>

    <TelerikTextArea @bind-Value="@TextValue"
                     Placeholder="Add comment..."
                     Width="300px">
        <TextAreaSuffixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.VolumeUp" />
        </TextAreaSuffixTemplate>
    </TelerikTextArea>
</div>

<div class="component-container">
    <h5>TextBox</h5>

    <TelerikTextBox @bind-Value="@TextValue"
                    Placeholder="Enter email..."
                    Width="300px">
        <TextBoxSuffixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.X" />
        </TextBoxSuffixTemplate>
    </TelerikTextBox>
</div>

<div class="component-container">
    <h5>MaskedTextBox</h5>

    <TelerikMaskedTextBox @bind-Value="@TextValue"
                          Mask="0000-0000-0000-0000"
                          Width="300px">
        <MaskedTextBoxSuffixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Eye" />
        </MaskedTextBoxSuffixTemplate>
    </TelerikMaskedTextBox>
</div>

<div class="component-container">
    <h5>NumericTextBox</h5>

    <TelerikNumericTextBox @bind-Value="@Height"
                           Width="300px">
        <NumericTextBoxSuffixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.X" />
        </NumericTextBoxSuffixTemplate>
    </TelerikNumericTextBox>
</div>

<div class="component-container">
    <h5>AutoComplete</h5>

    <TelerikAutoComplete Data="@Products"
                         @bind-Value="@SelectedProduct"
                         Placeholder="Search a product..."
                         ShowClearButton="true"
                         Width="300px">
        <AutoCompleteSuffixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Copy" />
        </AutoCompleteSuffixTemplate>
    </TelerikAutoComplete>
</div>

<div class="component-container">
    <h5>ComboBox</h5>

    <TelerikComboBox Data="@Products"
                     @bind-Value="@SelectedProduct"
                     Placeholder="Search a product..."
                     ShowClearButton="true"
                     Width="300px">
        <ComboBoxSuffixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Copy" />
        </ComboBoxSuffixTemplate>
    </TelerikComboBox>
</div>

<div class="component-container">
    <h5>MultiColumnComboBox</h5>

    <TelerikMultiColumnComboBox Data="@ProductModels"
                                @bind-Value="@SelectedProductId"
                                ValueField="@nameof(Product.ProductId)"
                                TextField="@nameof(Product.ProductName)"
                                Placeholder="Search a product..."
                                Width="300px">
        <MultiColumnComboBoxSuffixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Copy" />
        </MultiColumnComboBoxSuffixTemplate>
        <MultiColumnComboBoxColumns>
            <MultiColumnComboBoxColumn Field="@nameof(Product.ProductId)" Title="Product Id"></MultiColumnComboBoxColumn>
            <MultiColumnComboBoxColumn Field="@nameof(Product.ProductName)" Title="Product Name"></MultiColumnComboBoxColumn>
        </MultiColumnComboBoxColumns>
    </TelerikMultiColumnComboBox>
</div>

<div class="component-container">
    <h5>MultiSelect</h5>

    <TelerikMultiSelect Data="@Products"
                        @bind-Value="@SelectedProducts"
                        Placeholder="Search products..."
                        ShowClearButton="true"
                        Width="300px">
        <MultiSelectSuffixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Copy" />
        </MultiSelectSuffixTemplate>
    </TelerikMultiSelect>
</div>

@code {
    private string TextValue { get; set; }
    private string SelectedProduct { get; set; }
    private int SelectedProductId { get; set; }
    private int Height { get; set; }

    private List<string> Products = Enumerable.Range(1, 20).Select(x => $"Product {x}").ToList();

    private List<Product> ProductModels = Enumerable.Range(1, 20).Select(x => new Product { ProductId = x, ProductName = "Product " + x }).ToList();

    private List<string> SelectedProducts { get; set; }

    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
    }
}

<style>
    .component-container {
        border-bottom: 1px dashed black;
        padding-bottom: 10px;
        margin-bottom: 10px;
        width: 300px
    }
</style>
````

## Using Separators

By default, the prefix and suffix are visually divided from the input element of the components by a separator. You can control whether the prefix and suffix separator will be visible through the following parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter   | Type and Default Value | Description |
| ----------- | ----------- | -------|
| `ShowPrefixSeparator` | `bool` <br /> (`true`) | Specifies whether the prefix separator is rendered. If a prefix template is not declared, the separator will not be rendered, regardless of the parameter value. |
| `ShowSuffixSeparator` | `bool` <br /> (`true`) | Specifies whether the suffix separator is rendered. If a prefix template is not declared, the separator will not be rendered, regardless of the parameter value |

## TextArea Specifics

In addition to the common configuration settings listed in this article, the TextArea exposes a couple of additional options that allow you to control the position of the adornments.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter   | Type and Default Value | Description |
| ----------- | ----------- | -------|
| `AdornmentsOrientation` | `TextAreaAdornmentsOrientation` <br /> (`TextAreaAdornmentsOrientation.Vertical`) | Configures the positioning of the TextArea prefix and suffix templates. The possible values are `Horizontal` and `Vertical`. If the value is set to `Horizontal`, the templates will appear above (prefix) and below (suffix) the TextArea. If the value is set to `Vertical`, the templates will be displayed on the left (prefix) and on the right (suffix). By default, the templates are positioned vertically. |
| `AdornmentsFlow` | `TextAreaAdornmentsFlow` <br /> (`TextAreaAdornmentsFlow.Horizontal`) | Configures the flow of the elements in the TextArea prefix and suffix templates, determining whether the elements will be ordered in a row or column. The possible values are `Horizontal` (in a row) and `Vertical` (in a column). By default, the elements (adornments) within the templates are positioned horizontally. |

## FloatingLabel Specifics

@[template](/_contentTemplates/common/inputs.md#floating-label-and-preffix)

## DropDowns Specifics

This section applies to the components that incorporate popup element:

* [AutoComplete](slug:autocomplete-overview)
* [ComboBox](slug:components/combobox/overview)
* [MultiColumnComboBox](slug:multicolumncombobox-overview)
* [MultiSelect](slug:multiselect-overview)

By design, `Alt` + `Down` key combination opens the popup element when the component is focused. If you have added another dropdown component as a prefix or suffix adornment, focusing that component and pressing `Alt` + `Down` keys will open both popup elements - the one that belongs to the main component and the other associated with the dropdown in the prefix/suffix template.

To prevent that behavior, you may wrap the content of the prefix/suffix template and stop the `keydown` event propagation.

>caption Stop the `keydown` event propagation

````RAZOR
<TelerikAutoComplete Data="@Roles"
                     @bind-Value="@SelectedRole"
                     Placeholder="Enter your role (can be free text)"
                     ShowClearButton="true">
    <AutoCompletePrefixTemplate>
        <div class="test" onkeydown="event.stopPropagation()">
            <TelerikDropDownList Data="@Teams"
                                 @bind-Value="SelectedTeam">
            </TelerikDropDownList>
        </div>
    </AutoCompletePrefixTemplate>
    <AutoCompleteSuffixTemplate>
        <div class="test" onkeydown="event.stopPropagation()">
            <TelerikDropDownList Data="@Teams"
                                 @bind-Value="SelectedTeam">
            </TelerikDropDownList>
        </div>
    </AutoCompleteSuffixTemplate>
</TelerikAutoComplete>

@code {
    private string SelectedTeam { get; set; } = "Team 1";

    private string SelectedRole { get; set; }

    private List<string> Roles { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };

    private List<string> Teams { get; set; } = new List<string> {
        "Team 1", "Team 2", "Team 3"
    };
}
````

## See also

* [Live Demo: AutoComplete Adornments](https://demos.telerik.com/blazor-ui/autocomplete/adornments)
* [Live Demo: ComboBox Adornments](https://demos.telerik.com/blazor-ui/combobox/adornments)
* [Live Demo: MaskedTextBox Adornments](https://demos.telerik.com/blazor-ui/maskedtextbox/adornments)
* [Live Demo: MultiColumnComboBox Adornments](https://demos.telerik.com/blazor-ui/multicolumncombobox/adornments)
* [Live Demo: MultiSelect Adornments](https://demos.telerik.com/blazor-ui/multiselect/adornments)
* [Live Demo: NumericTextBox Adornments](https://demos.telerik.com/blazor-ui/numerictextbox/adornments)
* [Live Demo: TextArea Adornments](https://demos.telerik.com/blazor-ui/textarea/adornments)
* [Live Demo: TextBox Adornments](https://demos.telerik.com/blazor-ui/textbox/adornments)
