[//]: # "bobrilComIgnoreStart"

# Bobril-build

[//]: # "bobrilComIgnoreEnd"

### Introduction

[//]: # "bobrilComIgnoreStart"

In previous articles we were using some basic operations from bobril-build. This article describes bobril-build's possibilities in more detail.

- [Bobril - I - Getting Started](https://github.com/keeema/bobril-samples/blob/master/articles/01_bobril-getting-started.md)
- [Bobril - II - Bobflux Application Architecture](https://github.com/keeema/bobril-samples/blob/master/articles/02_bobril-bobflux.md)
- [Bobril - III - Localizations and Formatting](https://github.com/keeema/bobril-samples/blob/master/articles/03_bobril-localizations.md)
- [Bobril - IV - Routing](https://github.com/keeema/bobril-samples/blob/master/articles/04_bobril-routing.md)
- [Bobril - V - Bobril-build](https://github.com/keeema/bobril-samples/blob/master/articles/05_bobril-bobril-build.md)
- [Bobril - VI - BobX Application Store Management](https://github.com/keeema/bobril-samples/blob/master/articles/06_bobril-bobx.md)

[//]: # "bobrilComIgnoreEnd"

Bobril-build is .NET Core based build system created for building single-page applications written in Typescript and with lot of optimizations for bobril and bobril-g11n. It is designed for bobril applications but it can be used for all Typescript applications in general. It is written by Boris Letocha (software architect and developer in GMC Software Technology). Package **bobril-build** is just a wrapper which downloads specific version of builder (latest if not defined) and runs a build of your application.

Bobril-build should be installed globally by command:

```bash
npm i bobril-build -g
```

It requires node.js >= 8.x.x and npm >=5.x.x.

It can use optionally yarn package manager. If yarn is not available, npm is used instead.

Bobril-build does lot for the best Developer Experience. In general, to start development you need only to install global **bobril-build** (only once), initialize npm package, create *index.ts* file and start the bb command. It starts self-hosting server with distribution stored in memory (good for SSD drives), watches files for changes, runs tests, provides sourcemaps and so on.

But bobril-build offers much more. It can perform:

1. Run self-hosting server for distribution. It serves application from main file (*index.ts* by default) or the example (*example.ts* by default) files when it is provided. Example is mainly used for components.
2. Watch for changes
3. Run tests and optionally generate JUnit XMLs with results for additional integration on build server
4. Compile typescript
5. Install external dependencies
6. Resolve internal/external dependencies (imports)
7. Transpilation
8. Manage translations
9. Minification
10. Create sprites
11. Manage assets
12. Manage and run external bobril plugins

### Basic commands

bb - Runs build in interactive mode. Distribution is available on self-hosting server on http://localhost:8080. Files are served from memory. Build information are available on [http://localhost:8080/bb](http://localhost:8080/bb). It also runs tests. To start another testing agent point any browser to [http://localhost:8080/bb/test](http://localhost:8080/bb/test). If you want to debug tests open [http://localhost:8080/test.html](http://localhost:8080/test.html), any failed asserts throws exceptions so it is easy to stop on them.

bb -h, --help - Basic bobril-build help

bb <command> -h - Help for specific command

### Tests

Bobril-build runs test files with suffix *spec.ts*. It automatically provides jasmine.d.ts to these spec files.

bb test [options] - Just runs test once in chrome.

#### Options

-o, --out <name> - Defines filename for test result as JUnit XML. You can use such file for integration on your build server such Jenkins

### Translations

Bobril-build provides set of tools for managing translations.

bb translation|t [options] - Translations management.

#### Options

-a, --addlang <lang>    - Adds new language definition to translations folder.

-r, --removelang <lang> - Removes language.

---e, --export <fileName> - Export untranslated languages to specific file.

Mainly used for translation agencies. Use with -l option. Each item is listed in format

```json
S:Original message
I:Hint
T:Translated message
```

-i, --import <fileName> - Imports translated languages from specific file. File name must be in format language-Name.txt

-p, --specificPath <path> - Specifies path for export from / import to.

-l, --lang <lang> - Specifies language for export.

-u, --union <sourcePath1,sourcePath2,destinationPath>  - Makes union from paths.

-s, --subtract <sourcePath1,sourcePath2,destinationPath> - Makes subtract of paths.

To update items in .json file in translations according to your code you must use command

bb b -u 1 (more in chapter *Build commands*)

### Build commands

Bobril builds allows to manage build process by parameters.

bb build|b [options] Full build including all mentioned operations. Builds just once, serves generated files to dist folder and stops.

#### Options

-?|-h|-help|--help Help

-d|--dir <value> [default value: <./dist>] Defines where to put build result.

-f|--fast <true|True|1|t|T|y|Y|false|False|0|f|F|n|N> [default value: <False>] Quick debuggable bundling.

It simply does not minify.

-c|--compress <true|True|1|t|T|y|Y|false|False|0|f|F|n|N> [default value: <True>] Remove dead code.

-m|--mangle <true|True|1|t|T|y|Y|false|False|0|f|F|n|N> [default value: <True>] Minify names.

-b|--beautify <true|True|1|t|T|y|Y|false|False|0|f|F|n|N> [default value: <False>] Readable formatting.

-s|--style <0|1|2> Override styleDef className preservation level.

-p|--sprite <true|True|1|t|T|y|Y|false|False|0|f|F|n|N> [default value: <True>] enable/disable creation of sprites. It searches for usage of `b.sprite` in the code.

-l|--localize <true|True|1|t|T|y|Y|false|False|0|f|F|n|N> Create localized resources (default: auto-detect).

-u|--updateTranslations <true|True|1|t|T|y|Y|false|False|0|f|F|n|N> [default value: <False>] Update translations. It searches for usage of t function from **bobril-g11n** in the code and updates *language.json* files in translations folder in format:

```json
["cs-CZ", ["Original {text}!", null, 1, "Translated {text}!"]]
```

-v|--versiondir <value> Store all resources except index.html in this directory. It stores generated files to specific folder and links *index.html* into these files. Used for preventing cache.

-n|--noupdate Do not install dependencies at start.

--verbose Enable spamming console output.

--nocache (Forbid using Build Cache.

<!--### Plugins

Bobril-build allows you to use external plugins (e.g. [bb-tslint-plugin](https://github.com/saryn/bb-tslint-plugin)) which runs in the final part of bobril-build process. To manage such plugins use following commands:

bb plugins [options]

#### Options

-l, --list - Lists all installed plugins.

-i, --install <pluginName> - Installs new plugin.

-u, --uninstall <pluginName> - Uninstalls specific plugin.

-s, --link - Links plugin to workspace.
-->

### Configuration

Bobril-build can be configured by options defined in *package.json*:

```json
{
  "typescript": {
    "main": "pathToMain.ts" // index.ts by default
  },
  "bobril": {
    "bbVersion": "0.45.0", // version of bobril-build use for building
    "tsVersion": "3.0.1", // version of TS use for build
    "dir": "name of directory where to place release default is dist",
    "resourcesAreRelativeToProjectDir": false, // this is default
    "additionalResourcesDirectory": "path to folder with files, these files will be added to dist",
    "example": "pathToExample.ts", // sample application entry point - if main is index.ts than example.ts is searched for default
    "title": "index.html Title",
    "head": "additional tags to head section of index.hml, e.g. <meta>",
    "compilerOptions": {
      "declaration": true,
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true
    },
    "prefixStyleDefs": undefined, // prefix for generated styles
    "constantOverrides": {
      "module_name": {
        "export_name": "New value, it supports also number and boolean values" // allows to override constants exported from npm packages
      }
    },
    "dependencies": "install", // "disable" = no yarn at start "install" = yarn install, "upgrade" = yarn upgrade
    "plugins": {
      "pluginName": {
        "configKey": "configValue" // provides configuration for installed bobril plugins
      }
    }
  }
}
```

### Debug mode

You can run some code conditionally based on _DEBUG _flag directly in the code.

Just add following code to your module:

```javascript
declare let DEBUG: boolean;
```

and bobril-build will assign such variable with value saying you are in debug mode (bb) or in production code (bb b).

## GitHub

You can find more info or source codes on [bbcore github pages](https://github.com/bobril/bbcore).
