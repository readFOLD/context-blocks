var path = Npm.require('path');
var fs = Npm.require('fs');

Package.describe({
  "summary": "Search APIs and add context",
  "version": "0.1.0",
  "git": "https://github.com/readFOLD/context-blocks",
  "name": "fold:context-blocks"
});

var packagesJsonFile = path.resolve('./packages.json');
try {
  var fileContent = fs.readFileSync(packagesJsonFile);
  var packages = JSON.parse(fileContent.toString());
  Npm.depends(packages);
} catch (ex) {
  console.error('ERROR: packages.json parsing error [ ' + ex.message + ' ]');
}

Package.onUse(function (api) {
  configure(api);
  api.export('ContextBlock', ['client', 'server']);
  api.export('VideoBlock', ['client', 'server']);
  api.export('TextBlock', ['client', 'server']);
  api.export('MapBlock', ['client', 'server']);
  api.export('ImageBlock', ['client', 'server']);
  api.export('GifBlock', ['client', 'server']);
  api.export('AudioBlock', ['client', 'server']);
  api.export('VizBlock', ['client', 'server']);
  api.export('TwitterBlock', ['client', 'server']);
  api.export('LinkBlock', ['client', 'server']);
  api.export('newTypeSpecificContextBlock', ['client', 'server']);
  api.export('Schema', ['client', 'server']);
  api.export('ContextBlocks', ['client', 'server']);
});

function configure(api) {
  api.versionsFrom('METEOR@1.1.0.1');
  api.use('aldeed:autoform@5.1.0');
  api.use('aldeed:collection2@2.3.0')
  api.use('chaosbohne:twitter-text@0.1.0');
  api.use('lepozepo:cloudinary@3.0.0');
  //meteorhacks:npm                    1.3.0  Use npm modules with your Meteor App
  //mystor:device-detection            0.2.0  Client-Side Device Type Detection & Template Switching with Opti...
  //npm-container                      1.0.0+ Contains all your npm dependencies
  //percolatestudio:segment.io         1.1.1_1* Segment.io integration for Meteor (works on both client and se...
  api.use('reactive-dict@1.1.0');
  api.use('reactive-var@1.0.5');
  //service-configuration              1.0.4  Manage the configuration for third-party services
  api.use('underscore@1.0.3');
  api.use('wizonesolutions:underscore-string@1.0.0');


  api.addFiles([
    'lib/models.js',
    'lib/collections.js'
  ], ['client', 'server']);

  api.addFiles([
    'server/methods.js'
  ], ['server']);
}
