# How to write article

It is possible to add new article in section _More Tutorials_.

## New article

Article can be added as a standard _.md_ file in _tutorial/md/more-tutorials_. Just follow naming format with order number and start with heading level 2.

## Tools

All tools are located in _tutorial/tools/dist_.

### Code Example

Example projects are located in _tutorial/examples_. Inner scripts can be used to automatic update of code examples in your article. Just add

````markdown
<!-- # from-file: ../examples/todo/components/list.tsx -->

```tsx
```
````

To update your markdowns run:

```bash
node update-sources
```

### Parsing content

The content of your markdown article can be parsed to result bobril-page content with following command:

```bash
node parse
```

### Project preview

If you have a project with code example, you can provide a preview of built dist with following syntax:

```markdown
[Preview example](../examples/todo/dist/index.html)
```

Path of _index.html_ has to be relative to parsed _.md_ file. Then run again

```bash
node parse
```

This command will parse relative paths to your dist, copy the dist content to bobril-page resource folder and use it in generated content of page.
