#number-of-requests
A Telerik [Subscription license](https://www.telerik.com/purchase/faq/licensing-purchasing) is recommended in order to use the Telerik Blazor AI Coding Assistant without restrictions. Perpetual license holders and trial users can make a [limited number of requests per year](slug:ai-overview#usage-limits).
#end

#vs-intro
provides automated configuration commands for the Telerik AI-powered development tools. These commands help you quickly set up the [Telerik MCP server](slug:ai-mcp-server) for enhanced developer productivity with Telerik UI for Blazor components.
#end

#prerequisites
* Check the tool-specific prerequisites for the [Telerik Blazor MCP Server](slug:ai-mcp-server#prerequisites).
#end

#verify-license-key
file to verify that the `TELERIK_LICENSE_PATH` value matches your actual [Telerik license file location](slug:installation-license-key). Alternatively, replace `TELERIK_LICENSE_PATH` with `TELERIK_LICENSE` and set your license key directly. Using `TELERIK_LICENSE_PATH` is recommended.
#end

#command-github-app
command opens the [TelerikBlazor GitHub App installation page](https://github.com/apps/telerikblazor/installations/select_target) in your default browser.
#end

#copilot-instructions
command generates a `copilot-instructions.md` file in the `.github` folder under the solution. This file contains custom instructions that help GitHub Copilot provide better assistance when working with Telerik UI for Blazor components. The generated file includes the following default instructions:

* Guidance to use the Telerik MCP Server whenever applicable
* Guidance to prioritize the usage of Telerik UI components
* Guidance to use best coding practices related to Telerik UI for Blazor
#end

#see-also
* [Telerik AI Tooling Overview](slug:ai-overview)
* [Telerik Blazor MCP Server](slug:ai-mcp-server)
#end
