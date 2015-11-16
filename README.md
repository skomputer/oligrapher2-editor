# Oligarpher 2 Editor

Oligrapher 2 Editor is an editing UI for [Oligrapher 2](https://github.com/skomputer/oligrapher2/). It is built with [React](https://facebook.github.io/react/) and can be run on any web page that includes the Oligrapher JavaScript library.

Install
-------

To run the editor, include the JavaScript and CSS files (located in the project's ```build``` directory) belonging to the Editor app and Oligrapher app, along with a Bootstrap 3 CSS file, in the header of your web page, and then initialize the editor. See ```build/demo.html``` for a working example using LittleSis data.

```html
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
    <div id="graph"></div>
    <div id="editor"></div>
    <script>
      var graphDiv = document.getElementById('graph');
      var editorDiv = document.getElementById('editor');
      var data = getDataFromSomewhere();
      var config = {
        root: editorDiv,
        graphRoot: graphDiv,
        oligrapher: Oligrapher,
        data: data
      };
      var editor = OligrapherEditor.run(config);
    </script>
  </body>
</html>
```

Configuration
-------------

OligrapherEditor has one top-level method, ```run```, which accepts a configuration object with the following attributes:

- ```root:``` a DOM element to load the graph editor UI into
- ``graphRoot:``` a DOM element to load the graph into
- ```oligrapher:``` an uninitialized copy of the top-level Oligrapher object

Plus any [Oligrapher config options](https://github.com/skomputer/oligrapher2#api). The Editor instance will automatically initialize Oligarpher in editor mode and set up appropriate onSelect and onUpdate callbacks.

Data Source API
---------------

Oligrapher 2 Editor allows a user to import nodes and edges from an external data source if a data source object is provided that implements the following API. See ```build/LsDataSource.js``` for an example.

### ```findNodes(string, callback)```

Accepts a search string and callback and passes an array of matching nodes that conform to [Oligrapher's data schema](https://github.com/skomputer/oligrapher2#data-schema) to the callback.

```javascript
# LsDataSource.findNodes("Obama", function(data) { console.log(data); });

[
   {
      "id":​13503,
      "display":{
         "name":"Barack Obama",
         "image":"https://pai-littlesis.s3.amazonaws.com/images/profile/2c2e1b363acea6f97c4777ba1b1e303bb40e9662_1226040406.png",
         "url":"//littlesis.org/person/13503/Barack_Obama"
      }
   },
   {
      "id":​28864,
      "display":{
         "name":"Obama for America",
         "image":"https://pai-littlesis.s3.amazonaws.com/images/profile/a6ea3841388fa7908bdc92a5f9dceb184c6f2f4c_1229656735.png",
         "url":"//littlesis.org/org/28864/Obama_for_America"
      }
   },
   {
      "id":​33161,
      "display":{
         "name":"Obama-Biden Transition Project",
         "image":"https://pai-littlesis.s3.amazonaws.com/images/profile/49bd7c70dc456761978760dee5c95620e2474c38_1227291427.png",
         "url":"//littlesis.org/org/33161/Obama-Biden_Transition_Project"
      }
   }
]
```

### ```getNodeWithEdges(newNodeId, existingNodeIds, callback)```

Accepts the ID of a node to be added to a graph, an array of the graph's other node IDS, and a callback. Passes a data object to the callback containing the new ```node``` and an array of ```edges``` connecting the new node to existing nodes on the graph. The node and edges should conform to [Oligrapher's data schema](https://github.com/skomputer/oligrapher2#data-schema).

```javascript
# LsDataConverter.getNodeWithEdges(1164, [8, 14629, 33293], function(data) { console.log(data); });

{
   "node":{
      "id":​1164,
      "display":{
         "name":"Robert E Rubin",
         "image":"https://pai-littlesis.s3.amazonaws.com/images/profile/7b849b0b7ae17426cd4a2823be9ba2fcea730894_1364323240.png",
         "url":"//littlesis.org/person/1164/Robert_E_Rubin"
      }
   },
   "edges":[
      {
         "id":​192,
         "node1_id":​1164,
         "node2_id":​8,
         "display":{
            "label":"Director",
            "arrow":true,
            "dash":true
         }
      },
      {
         "id":​193,
         "node1_id":​1164,
         "node2_id":​8,
         "display":{
            "label":"Chairman",
            "arrow":true,
            "dash":true
         }
      },
      {
         "id":​26319,
         "node1_id":​1164,
         "node2_id":​14629,
         "display":{
            "label":"Secretary of Treasury",
            "arrow":true,
            "dash":true
         }
      },
      {
         "id":​116809,
         "node1_id":​1164,
         "node2_id":​8,
         "display":{
            "label":"Senior Counselor",
            "arrow":true,
            "dash":true
         }
      },
      {
         "id":​116810,
         "node1_id":​1164,
         "node2_id":​8,
         "display":{
            "label":"Chairman of the Executive Committee",
            "arrow":true,
            "dash":true
         }
      },
      {
         "id":​118534,
         "node1_id":​1164,
         "node2_id":​33293,
         "display":{
            "label":"Co-Founder",
            "arrow":true,
            "dash":true
         }
      },
      {
         "id":​598316,
         "node1_id":​1164,
         "node2_id":​33293,
         "display":{
            "label":"Advisory Council",
            "arrow":true,
            "dash":false
         }
      }
   ]
}
```
