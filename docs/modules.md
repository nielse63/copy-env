[@nielse63/copy-env](README.md) / Exports

# @nielse63/copy-env

## Table of contents

### Type Aliases

- [CopyEnvOptions](modules.md#copyenvoptions)
- [CopyEnvReturnObject](modules.md#copyenvreturnobject)

### Functions

- [copyEnv](modules.md#copyenv)

## Type Aliases

### CopyEnvOptions

Ƭ **CopyEnvOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :-- | :-- | :-- |
| `cwd?` | `string` | current working directory **`Defult Value`** `process.cwd()` |
| `dest?` | `string` | output file name **`Defult Value`** `.env.sample` |
| `gitAdd?` | `boolean` | whether to check-in to git or not **`Defult Value`** `false` |
| `ignoreRegex?` | `RegExp` \| `string` | regex of lines to ignore **`Defult Value`** `/^#/` |
| `src?` | `string` | input file name **`Defult Value`** `.env` |

#### Defined in

[src/copy-env.ts:6](https://github.com/nielse63/copy-env/blob/7ec94d5/src/copy-env.ts#L6)

---

### CopyEnvReturnObject

Ƭ **CopyEnvReturnObject**: `Object`

#### Type declaration

| Name           | Type                                       |
| :------------- | :----------------------------------------- |
| `dest`         | { `content`: `string` ; `path`: `string` } |
| `dest.content` | `string`                                   |
| `dest.path`    | `string`                                   |
| `src`          | { `content`: `string` ; `path`: `string` } |
| `src.content`  | `string`                                   |
| `src.path`     | `string`                                   |

#### Defined in

[src/copy-env.ts:39](https://github.com/nielse63/copy-env/blob/7ec94d5/src/copy-env.ts#L39)

## Functions

### copyEnv

▸ **copyEnv**(`options?`): `Promise`<[`CopyEnvReturnObject`](modules.md#copyenvreturnobject)\>

Generates a public example environment file from a given `.env` file. Can exclude specific lines from the file and check in to git.

**`Example`**

```ts
import copyEnv from 'copy-env';

const output = await copyEnv({
  cwd: process.cwd(),
  src: '.env',
  dest: '.env.sample',
  gitAdd: false,
  ignoreRegex: /^#/,
});

// return object
// {
//   src: {
//     path: string,
//     content: string,
//   },
//   dest: {
//     path: string,
//     content: string,
//   },
// }
```

#### Parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `options` | `Object` | optional options object |
| `options.cwd?` | `string` | current working directory **`Defult Value`** `process.cwd()` |
| `options.dest?` | `string` | output file name **`Defult Value`** `.env.sample` |
| `options.gitAdd?` | `boolean` | whether to check-in to git or not **`Defult Value`** `false` |
| `options.ignoreRegex?` | `string` \| `RegExp` | regex of lines to ignore **`Defult Value`** `/^#/` |
| `options.src?` | `string` | input file name **`Defult Value`** `.env` |

#### Returns

`Promise`<[`CopyEnvReturnObject`](modules.md#copyenvreturnobject)\>

- object containing the paths and content of the input and output files

#### Defined in

[src/copy-env.ts:91](https://github.com/nielse63/copy-env/blob/7ec94d5/src/copy-env.ts#L91)
