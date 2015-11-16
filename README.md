Oligrapher 2 Editor is an editing UI for [Oligrapher 2](https://github.com/skomputer/oligrapher2/). It is built with [React](https://facebook.github.io/react/) and can be run on any web page that includes the Oligrapher JavaScript library.

# Install

To run the editor, include the JavaScript and CSS files (located in the project's ```build``` directory) belonging to the Editor app and Oligrapher app, along with a Bootstrap 3 CSS file, in the header of your web page, and then initialize the editor. See ```build/demo.html``` for a working example using LittleSis data.

```
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/><meta charset="UTF-8">
    <title>Oligrapher 2 Editor</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="oligrapher.css" rel="stylesheet"/>
    <link href="oligrapher.editor.css" rel="stylesheet"/>
    <script src="oligrapher.min.js"></script>
    <script src="oligrapher.editor.min.js"></script>
    <script src="LsDataConverter.js"></script>
    <script src="LsDataSource.js"></script>
    <style>
    </style>
  </head>
  <body>
    <div id="oligrapher"></div>
    <div id="editor"></div>
    <script>
      var oligrapherDiv = document.getElementById('oligrapher');
      var editorDiv = document.getElementById('editor');
      var data = getDataFromSomewhere();
      var config = {
        root: editorDiv,
        oligrapherRoot: oligrapherDiv,
        oligrapher: Oligrapher,
        data: data
      };
      var editor = OligrapherEditor.run(config);
    </script>
  </body>
</html>
```
