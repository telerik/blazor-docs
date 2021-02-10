---
title: Unit Testing With JustMock
page_title: Unit Testing With JustMock
description: Unit Test your Blazor apps by isolating the tested code from its dependencies with a mocking tool like JustMock. 
tags: unit test, JustMock, mock, mocking, mocking tool, mocking solution, mocking software, mocking framework, Blazor
slug: unit-test-with-justmock
position: 3
---

# Unit Testing with JustMock

<a href="https://www.telerik.com/products/mocking.aspx" target="_blank">Telerik JustMock is an easy to use mocking tool</a> designed to help you create better unit tests, faster than ever. JustMock makes it easier for you to create mock objects and set expectations independently of external dependencies like databases, web service calls, or proprietary code.

To read more please visit the <a href="https://www.telerik.com/products/mocking.aspx" target="_blank">Telerik JustMock</a> product overview page.

## What Is Mocking and Why Do I Need It?

Mocking is a concept in unit testing where real objects are substituted with fake objects that simulate the behavior of the real ones. Mocking is done so that a test can focus on the code being tested and not on the behavior or state of external dependencies.

Here is a good example of where you could use mocking:

If you have a data repository class that runs business logic and then saves information to a database, you want your unit test to focus on the business logic and not on the database. Mocking the “save” calls to your database ensures your tests run quickly and do not depend on the availability or state of your database. When you’re ready to make sure the “save” calls are working, then you’re moving on to integration testing. Unit tests should not cross system boundaries, but integration tests are allowed to cross boundaries and make sure everything works together (your code, your database, your web services, etc.).

## How is JustMock Useful for Me?

You could create and maintain the mock objects by yourself, but this is time consuming and unproductive approach. A mocking tool like Telerik JustMock allows you to focus on the logic that matters and needs to be verified and lets you forget about the mocking details. The mock objects will be created automatically in memory when the tests run based on few lines of code in the unit test. There are no “physical” mock objects that have to be maintained as your project changes.

## What Can Be Mocked?

JustMock allows you to mock literally everything from `interfaces`, `virtual` and `abstract methods` and `properties` to `sealed classes`, `non-virtual methods` and `properties`, `static` (`classes`, `methods` and `properties`), `extension methods`,  `LINQ queries`, `Delegates`, `Generics`, `Local Functions`, `Database calls`, even members from `mscorlib` like `DateTime`, `File`, `FileInfo`, and many more. All these can be mocked without a single change of your production code.

For the full list of what is supported please visit the <a href="https://www.telerik.com/products/mocking.aspx" target="_blank">Telerik JustMock</a> product overview page.

## How Can I Use JustMock in Blazor application?

As you are already guessing, JustMock is especially useful when unit testing your business logic. But it is beneficial for unit testing Blazor application by mocking different services that your application requires. Consider the scenario where at least one of your services is making calls to a database to obtain data that could be different for each time it is obtained. Writing a unit test that depends on that data won’t be stable and could randomly fail. By mocking the service and provide specific data in your unit test you will isolate the test logic from the dependency of connecting to the database and stabilize it. 

Here is example of how this looks:

````
[Fact]
public void TestFetchData_PredefinedForecast()
{
    // Arrange
    var forecasts = new[] { new WeatherForecast { Date = DateTime.Now, Summary = "Testy", TemperatureC = 42 } };
 
    var weatherForecastServiceMock = Mock.Create<IWeatherForecastService>();
    Mock.Arrange(() => weatherForecastServiceMock.GetForecastAsync(Arg.IsAny<DateTime>()))
        .Returns(Task.FromResult<WeatherForecast[]>(forecasts));
 
    Services.AddSingleton<IWeatherForecastService>(weatherForecastServiceMock);
 
    // Act - render the FetchData component
    var cut = RenderComponent<FetchData>();
    var actualForcastDataTable = cut.FindComponent<ForecastDataTable>(); // find the component
 
    // Assert
    var expectedDataTable = RenderComponent<ForecastDataTable>((nameof(ForecastDataTable.Forecasts), forecasts));
    actualForcastDataTable.MarkupMatches(expectedDataTable.Markup);
}
````

## Additional Resources

You can find a sample project about unit testing the UI of a Blazor app that contains Telerik UI for Blazor components in the following sample projects that also utilize bUnit:

* <a href="https://github.com/telerik/blazor-ui/tree/master/testing" target="_blank">https://github.com/telerik/blazor-ui/tree/master/testing</a>.

You can also visit the <a href="https://www.telerik.com/blogs/unit-testing-blazor-components-bunit-justmock" target="_blank">Unit Testing Blazor Components with bUnit and JustMock</a> blog post.



