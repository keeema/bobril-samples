# bobril
# 11.1.2 => 11.3.0
## 11.3.0

New component lifecycle method `postRenderDom` which combines `postInitDom` and `postUpdateDom`

Allow to define keyframes animations:

```ts
let red2green = b.keyframesDef({ from: { color: "red" }, to: { color: "green" } });
b.init(() => <div style={{ animation: red2green("2s") }}>Hello</div>);
```

## 11.2.0

New features: shouldChange in Component, PureComponent, useMemo


