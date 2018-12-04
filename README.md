# prettieslint

you need prettier in your life. you also need eslint because reasons.

```
npx prettieslint
```

now your codebase will be pretty and make eslint not cry.

## Default rules

Note that there are no default rules enabled other than the three Prettier-related ones (`semi`, `singleQuote`, `trailingComma`). You can easily enable the default eslint [rules](https://eslint.org/docs/rules/) by adding `eslint:recommended` to the `extends` array in your `.eslintrc.js`:

```
extends: ['prettier', 'eslint:recommended']
```

This does not require any additional dependencies.