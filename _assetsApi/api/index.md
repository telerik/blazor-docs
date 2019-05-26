<style>
article {
  background: transparent !important;
}

div.contribution-panel {
  display: none;
}

blockquote {
  border: 0;
  margin: 20px 0;
  min-height: 70px;
  padding: 24px 80px;
  background-color: #f9edc6;
  background-image: url("/blazor-ui/assets/important-icon.svg");
  color: #fff;
  background-repeat: no-repeat;
  background-size: 48px;
  background-position: center;
  background-position-x: 16px;
  background-position-y: 50%;
  color: #000000; }
  blockquote:not(.alert-note) a, blockquote:not(.alert-note) a:link {
    color: #000000;
    text-decoration: underline; }
    blockquote:not(.alert-note) a:hover, blockquote:not(.alert-note) a:active, blockquote:not(.alert-note) a:focus, blockquote:not(.alert-note) a:link:hover, blockquote:not(.alert-note) a:link:active, blockquote:not(.alert-note) a:link:focus {
      color: #000000;
      text-decoration: none !important; }
  blockquote p:first-child,
  blockquote ul:first-child,
  blockquote ol:first-child {
    margin-top: 0; }
  blockquote p:last-child,
  blockquote ul:last-child,
  blockquote ol:last-child {
    margin-bottom: 0; }
  blockquote.disclaimer {
    background-color: #eaebec;
    color: #4f5d6c; }
    blockquote.disclaimer p:first-child {
      color: #36393f; }
  blockquote.alert-note {
    margin-top: 2em;
    margin-bottom: 2em;
    background-color: #eaebec;
    color: #4f5d6c; }
  blockquote.important {
    background-color: #f9edc6;
    background-image: url("/blazor-ui/assets/important-icon.svg"); }
  blockquote.caution {
    background-color: #f7e1df;
    background-image: url("/blazor-ui/assets/caution-icon.svg"); }
  blockquote.tip {
    background-color: #e4f1df;
    background-image: url("/blazor-ui/assets/tip-icon.svg"); }


article:not(.api-reference)>p:first-child, article:not(.api-reference) h1+p {
  font-size: 18px;
  font-weight: 300;
  line-height: 24px;
  margin-top: 15px;
  margin-bottom: 20px;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  color: #8a959f;
}

@media (min-width: 768px) {
  article:not(.api-reference)>p:first-child, article:not(.api-reference) h1+p {
    font-size: 22px;
    line-height: 28px;
  }
}

@media (min-width: 1025px) {
  article:not(.api-reference)>p:first-child, article:not(.api-reference) h1+p {
    font-size: 26px;
    line-height: 32px;
  }
}

</style>

# Telerik UI for Blazor API Reference

The API reference section of the documentation contains a list and descriptions of all public available classes, methods and properties of the Telerik UI for Blazor product.


> If you are looking for a particular component, look for the `<ComponentName>Base` class. This is where its actual properties and methods reside, due to the specifics of the Blazor Comopnent class library structure.
>
> For example, if you are looking for details on the `TelerikWindow` component, look for the `TelerikWindowBase` class.


This documentation refers to the latest version of Telerik UI for Blazor.