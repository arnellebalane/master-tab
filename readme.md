# MasterTab

Controls which tab should be the master tab when opening a page in multiple browser tabs.


## Installation

Install via npm (or yarn):

```bash
npm install @arnellebalane/master-tab
```

Or via CDN (unpkg.com):

```html
<script src="https://unpkg.com/@arnellebalane/master-tab@1.1.1/dist/master-tab.umd.js"></script>
```


## Usage

This module exposes an event emitter object to which you can attach event
listeners to observe changes to the current tab's state.

```js
import MasterTab from '@arnellebalane/master-tab';

MasterTab.on('change', isMaster => {
    // ...
});
```

This object is exposed as `window.MasterTab` when not using AMD or CommonJS.


## Events

The `MasterTab` object emits the following events with corresponding arguments
to the callback function:

- **`change`**
  - Emitted when the current tab's master state changes.
  - The following arguments are passed to the callback function:
    - **`isMaster`**: A boolean value indicating whether the current tab is the
      master tab or not.


## License

MIT License
