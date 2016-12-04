import { Howl } from 'howler';

import theme0action from '../../resources/sounds/theme0action.mp3';
import theme0loop from '../../resources/sounds/theme0loop.mp3';

import theme1action from '../../resources/sounds/theme1action.mp3';
import theme1loop from '../../resources/sounds/theme1loop.mp3';
import theme1close from '../../resources/sounds/theme1close.mp3';
import theme1open from '../../resources/sounds/theme1open.mp3';
import theme1hover from '../../resources/sounds/theme1hover.mp3';

import theme2action from '../../resources/sounds/theme2action.mp3';
import theme2loop from '../../resources/sounds/theme2loop.mp3';

export const soundAssets = {
  theme0loop: {
    src: theme0loop,
    type: 'sound',
    volume: 0.5,
    options: {
      loop: true,
    },
    data: null,
  },
  theme0action: {
    src: theme0action,
    type: 'sound',
    volume: 0.5,
    options: {
      loop: true,
    },
    data: null,
  },
  theme0open: {
    src: theme1open,
    type: 'sound',
    volume: 0.2,
    options: {},
    data: null,
  },
  theme0close: {
    src: theme1close,
    type: 'sound',
    volume: 0.2,
    options: {},
    data: null,
  },
  theme0hover: {
    src: theme1hover,
    type: 'sound',
    volume: 0.5,
    options: {},
    data: null,
  },

  theme1loop: {
    src: theme1loop,
    type: 'sound',
    volume: 0.5,
    options: {},
    data: null,
  },
  theme1action: {
    src: theme1action,
    type: 'sound',
    volume: 0.5,
    options: {
      loop: true,
    },
    data: null,
  },
  theme1open: {
    src: theme1open,
    type: 'sound',
    volume: 0.2,
    options: {},
    data: null,
  },
  theme1close: {
    src: theme1close,
    type: 'sound',
    volume: 0.2,
    options: {},
    data: null,
  },
  theme1hover: {
    src: theme1hover,
    type: 'sound',
    volume: 0.5,
    options: {},
    data: null,
  },

  theme2loop: {
    src: theme2loop,
    type: 'sound',
    volume: 0.5,
    options: {
      loop: true,
    },
    data: null,
  },
  theme2action: {
    src: theme2action,
    type: 'sound',
    volume: 0.5,
    options: {
      loop: true,
    },
    data: null,
  },
  theme2open: {
    src: theme1open,
    type: 'sound',
    volume: 0.2,
    options: {},
    data: null,
  },
  theme2close: {
    src: theme1close,
    type: 'sound',
    volume: 0.2,
    options: {},
    data: null,
  },
  theme2hover: {
    src: theme1hover,
    type: 'sound',
    volume: 0.5,
    options: {},
    data: null,
  },
};

export default class AssetManager {

  constructor(assets = soundAssets) {
    this.assets = assets;
  }

  getSoundLoader(id, asset) {
    return new Promise((resolve, reject) => {
      const sound = new Howl({
        src: [asset.src],
        volume: asset.volume,
        ...asset.options,
        onload: () => {
          this.assets[id].data = sound;
          resolve(sound);
        },
        onloaderror: (e) => { reject(e); },
      });
    });
  }

  downloadAll() {
    return Promise.all(
      Object.keys(this.assets)
      .map((id) => (this.getSoundLoader(id, this.assets[id]))));
  }

  getAsset(id) {
    return this.assets[id].data;
  }
}
