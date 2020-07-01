---
title: RenderFragment Parameter Causes Exception
description: Having a RenderFragment Parameter used as a property causes Delegate to an instance method cannot have null 'this'.
type: troubleshooting
page_title: RenderFragment Parameter Causes Exception
slug: common-kb-render-fragment-parameter-null
position: 
tags: 
ticketid: 1449470
res_type: kb
---



## Description

When I use a `RenderFragment` that comes as a parameter (for example, because I am wrapping a component that already uses a `RenderFragment` in another component), I get an exception.


## Error Message

> Error: ArgumentException: Delegate to an instance method cannot have null 'this'.
>
>    at System.MulticastDelegate.ThrowNullThisInDelegateToInstance()
>
>    at System.MulticastDelegate.CtorClosed(Object target, IntPtr methodPtr)
>
>    at YourCustomComponentNameHere`2.BuildRenderTree(RenderTreeBuilder __builder)


## Cause\Possible Cause(s)

`RenderFragment` parameters are `null` by default and there is no really suitable place to make a check when passing the paramter as a property. You can read more here: [https://github.com/dotnet/aspnetcore/issues/10270](https://github.com/dotnet/aspnetcore/issues/10270)

So, for example, with a Telerik component such as the ComboBox, such templates (fragments) will throw exceptions if you pass them as a property.


## Steps to Reproduce

The following sample used as a component will cause exceptions:

>caption RenderFragment elements used as properties cause exceptions

````CSHTML
typeparam TItem
@typeparam TValue

<TelerikComboBox Data="@Data" Value="@Value" ValueChanged="@ValueChanged" ValueExpression="@ValueExpression" OnChange="@OnChange"
                    TItem="TItem" TValue="TValue" ValueField="@ValueField" TextField="@TextField"

                    
                    HeaderTemplate="@HeaderTemplate" FooterTemplate="@FooterTemplate" ItemTemplate="@ItemTemplate">
</TelerikComboBox>

@code {
    [Parameter] public IEnumerable<TItem> Data { get; set; }
    [Parameter] public TValue Value { get; set; }
    [Parameter] public string ValueField { get; set; }
    [Parameter] public string TextField { get; set; }
    [Parameter] public EventCallback<TValue> ValueChanged { get; set; }
    [Parameter] public System.Linq.Expressions.Expression<System.Func<TValue>> ValueExpression { get; set; }
    [Parameter] public EventCallback<Object> OnChange { get; set; }
    [Parameter] public RenderFragment FooterTemplate { get; set; }
    [Parameter] public RenderFragment HeaderTemplate { get; set; }
    [Parameter] public RenderFragment<TItem> ItemTemplate { get; set; }
}
````

>caption Simple usage of the problematic component that causes an error

````CSHTML
<CustomCombo Data="@myDdlData" TItem="@MyDdlModel" TValue="int"
                  TextField="MyTextField" ValueField="MyValueField" @bind-Value="@selectedValue">
</CustomCombo>

@* If you define the three templates, you will not get exceptions, however *@

@code {
    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    int selectedValue { get; set; } = 3;
}
````


## Solution

The solution is to implement checks in the custom component so that you can render only when something is actually present, and to render it in a tag. Here is an example:

>caption Custom Component wrapping a component that uses a RenderFragment

````CSHTML
@typeparam TItem
@typeparam TValue

@using System.Reflection

<TelerikComboBox Data="@Data" Value="@Value" ValueChanged="@ValueChanged" ValueExpression="@ValueExpression" OnChange="@OnChange"
                    TItem="TItem" TValue="TValue" ValueField="@ValueField" TextField="@TextField">
    <HeaderTemplate>
        @HeaderTemplate
    </HeaderTemplate>
    <ItemTemplate>
        @if (ItemTemplate != null)
        {
            @ItemTemplate((TItem)context)
        }
        else
        {
            object itm = context;
            string toRender = "";
            PropertyInfo propertyInfo = itm.GetType().GetProperty(TextField);

            if (propertyInfo != null)
            {
                toRender = propertyInfo.GetValue(itm).ToString();
            }
            @toRender
        }
    </ItemTemplate>
    <FooterTemplate>
        @FooterTemplate
    </FooterTemplate>
</TelerikComboBox>

@code {
    [Parameter] public IEnumerable<TItem> Data { get; set; }
    [Parameter] public TValue Value { get; set; }
    [Parameter] public string ValueField { get; set; }
    [Parameter] public string TextField { get; set; }
    [Parameter] public EventCallback<TValue> ValueChanged { get; set; }
    [Parameter] public System.Linq.Expressions.Expression<System.Func<TValue>> ValueExpression { get; set; }
    [Parameter] public EventCallback<Object> OnChange { get; set; }
    [Parameter] public RenderFragment FooterTemplate { get; set; }
    [Parameter] public RenderFragment HeaderTemplate { get; set; }
    [Parameter] public RenderFragment<TItem> ItemTemplate { get; set; }
}
````

>caption How to consume that component - like usual

````CSHTML
@selectedValue

<hr />

<CustomCombo Data="@myDdlData" TItem="@MyDdlModel" TValue="int"
                  TextField="MyTextField" ValueField="MyValueField" @bind-Value="@selectedValue">
    <HeaderTemplate>
        <h4>header stuff</h4>
    </HeaderTemplate>
    <ItemTemplate>
        <strong>test</strong>&nbsp;@( (context as MyDdlModel).MyTextField )
    </ItemTemplate>
    <FooterTemplate>
        The footer
    </FooterTemplate>
</CustomCombo>

<hr />

@* This also works now if you don not pass any templates, which would throw exceptions if the render fragments were properties *@

<CustomCombo Data="@myDdlData" TItem="@MyDdlModel" TValue="int"
                  TextField="MyTextField" ValueField="MyValueField" @bind-Value="@selectedValue">
</CustomCombo>

@code {
    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    int selectedValue { get; set; } = 3;
}
````

