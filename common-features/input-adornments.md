---
title: Input Adornments
page_title: Input Adornments
description: How to add prefix and suffix adornments in the input elements of the components.
slug: common-features/input-adornments
tags: telerik,blazor,input,adornments,prefix,suffix
published: True
position: 2
---

# Input Adornments

Telerik UI for Blazor supports adornments for some of the components that incorporate input element. This functionality allows you to add custom elements as [prefix and suffix adornments](#basics).

>caption In this article:

* [Basics](#basics)
* [Supported components](#supported-components)
* [Adding Prefix in UI for Blazor Components](#adding-prefix-in-ui-for-blazor-components)
* [Adding Suffix in UI for Blazor Components](#adding-suffix-in-ui-for-blazor-components)
* [Managing separators](#managing-separators)
* [TextArea Specifics](#textarea-specifics)

## Basics

What are prefix and suffix. Example use cases. Information about separator?

## Supported components

The prefix and suffix adornments are supported by the following components:

* Simple inputs:
    * [MaskedTextbox]({%slug maskedtextbox-overview%})
    * [NumericTextBox]({%slug components/numerictextbox/overview%})
    * [TextArea]({%slug textarea-overview%})
    * [TextBox]({%slug components/textbox/overview%})

* Selects:
    * [AutoComplete]({%slug autocomplete-overview%})
    * [ComboBox]({%slug components/combobox/overview%})
    * [MultiColumnComboBox]({%slug multicolumncombobox-overview%})
    * [MultiSelect]({%slug multiselect-overview%})

## Adding Prefix in UI for Blazor Components

To add a prefix, declare `<*ComponentName*PrefixTemplate>` tag as direct child of the `<Telerik*ComponentName*>` tag.

The `PrefixTemplate` is a `RenderFragment` which allows you to declare any desired content as a prefix - be that simple text, HTML elements or components.

> Note about prefix size

>caption Prefix in UI for Blazor inputs and selects 

````CSHTML
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
                         ClearButton="true"
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
                     ClearButton="true"
                     Width="300px">
        <ComboBoxPrefixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Search" />
        </ComboBoxPrefixTemplate>
    </TelerikComboBox>
</div>

<div class="component-container">
    <h5>MultiColumnComboBox</h5>

    <TelerikMultiColumnComboBox Data="@ProductModels"
                                @bind-Value="@SelectedProduct"
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
                        ClearButton="true"
                        Width="300px">
        <MultiSelectPrefixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Search" />
        </MultiSelectPrefixTemplate>
    </TelerikMultiSelect>
</div>

@code {
    private List<string> Products = Enumerable.Range(1, 20).Select(x => $"Product {x}").ToList();

    private List<Product> ProductModels = Enumerable.Range(1, 20).Select(x => new Product { ProductId = x, ProductName = "Product " + x }).ToList();

    private List<string> SelectedProducts { get; set; }

    private string TextValue { get; set; }
    private string SelectedProduct { get; set; }

    private int Height { get; set; }

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

## Adding Suffix in UI for Blazor Components

To add a suffix, declare `<*ComponentName*SuffixTemplate>` tag as direct child of the `<Telerik*ComponentName*>` tag.

The `SuffixTemplate` is a `RenderFragment` which allows you to declare any desired content as a prefix - be that simple text, HTML elements or components.

> Note about suffix size

>caption Suffix in UI for Blazor inputs and selects

````CSHTML
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
                         ClearButton="true"
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
                     ClearButton="true"
                     Width="300px">
        <ComboBoxSuffixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Copy" />
        </ComboBoxSuffixTemplate>
    </TelerikComboBox>
</div>

<div class="component-container">
    <h5>MultiColumnComboBox</h5>

    <TelerikMultiColumnComboBox Data="@ProductModels"
                                @bind-Value="@SelectedProduct"
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
                        ClearButton="true"
                        Width="300px">
        <MultiSelectSuffixTemplate>
            <TelerikSvgIcon Icon="@SvgIcon.Copy" />
        </MultiSelectSuffixTemplate>
    </TelerikMultiSelect>
</div>

@code {
    private List<string> Products = Enumerable.Range(1, 20).Select(x => $"Product {x}").ToList();

    private List<Product> ProductModels = Enumerable.Range(1, 20).Select(x => new Product { ProductId = x, ProductName = "Product " + x }).ToList();

    private List<string> SelectedProducts { get; set; }

    private string TextValue { get; set; }
    private string SelectedProduct { get; set; }

    private int Height { get; set; }

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

## Managing Separators

By default, the prefix and suffix are visually divided from the input element of the components by a separator. You can control whether the separator for the prefix and suffix will be visible through the following parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter    | Type  | Description |
| ----------- | ----------- | -------|
| `ShowPrefixSeparator` | `bool` <br /> (`true`) | Specifies whether the prefix separator is rendered. If a prefix template is not declared, the separator will not be rendered, regardless of the parameter value. |
| `ShowSuffixSeparator` | `bool` <br /> (`true`) | Specifies whether the suffix separator is rendered. If a prefix template is not declared, the separator will not be rendered, regardless of the parameter value |

## TextArea Specifics

In addition to the above-listed configuration settings, the TextArea exposes a couple of other options that allow you to control the position of the adornments.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter    | Type  | Description |
| ----------- | ----------- | -------|
| `AdornmentsOrientation` | `TextAreaAdornmentsOrientation` <br /> (`TextAreaAdornmentsOrientation.Vertical`) | Configures the positioning of the TextArea prefix and suffix templates. The possible values are Horizontal and Vertical. If the value is set to Horizontal, the templates will appear above (prefix) and below (suffix) the TextArea. If the value is set to Vertical, the templates will be displayed on the left (prefix) and on the right (suffix). By default, the templates are positioned vertically. |
| `AdornmentsFlow` | `TextAreaAdornmentsFlow` <br /> (`TextAreaAdornmentsFlow.Horizontal`) | Configures the flow of the elements in the TextArea prefix and suffix templates, determining whether the elements will be ordered in a row or column. The possible values are Horizontal (in a row) and Vertical (in a column). By default, the elements (adornments) within the templates are positioned horizontally. |

## See also

* [Live Demo: TextArea Adornments](https://demos.telerik.com/blazor-ui/textarea/adornments)
* [Live Demo: TextBox Adornments](https://demos.telerik.com/blazor-ui/textbox/adornments)
* [Live Demo: MaskedTextBox Adornments](https://demos.telerik.com/blazor-ui/maskedtextBox/adornments)
* [Live Demo: NumericTextBox Adornments](https://demos.telerik.com/blazor-ui/numerictextBox/adornments)
* [Live Demo: AutoComplete Adornments](https://demos.telerik.com/blazor-ui/autocomplete/adornments)
* [Live Demo: ComboBox Adornments](https://demos.telerik.com/blazor-ui/combobox/adornments)
* [Live Demo: MultiColumnComboBox Adornments](https://demos.telerik.com/blazor-ui/multicolumncombobox/adornments)
* [Live Demo: MultiSelect Adornments](https://demos.telerik.com/blazor-ui/multiselect/adornments)