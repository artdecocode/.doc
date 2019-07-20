The original module was edited with annotations and other changes required for it to be used in [`@goa/koa`](https://artdecocode.com/goa/): _Koa_ web server [compiled](https://compiler.page) with _Closure Compiler_ using [**Depack**](https://artdecocode.com/depack/) into a single file library (with 1 dependency such as mime-db).

<details><summary>Read more about the compilation.</summary>

All dependencies are specified as dev dependencies because they are flattened into a single JS file by the compiler, unless the special `require(/* depack ok */ 'modulejs')` was called, which will require the package at run-time, for instance this is how mime-db is required by Goa.

The package specifies the following entry points:

- <kbd>[commonjs/main](/compile/index.js)</kbd>: the _require_ entry optimised with compiler. Used for individual consumption of the package's API.
    %TREE compile%
- <kbd>[es6/module](/src/index.js)</kbd>: the source code that can be used in compilation of other packages, e.g., `@goa/goa`.
    %TREE src%

</details>