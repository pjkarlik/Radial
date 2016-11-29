import { Howl } from 'howler';

import al01 from '../../resources/sounds/airlock01.mp3';
import al02 from '../../resources/sounds/airlock02.mp3';
import al03 from '../../resources/sounds/airlock03.mp3';
import hit01 from '../../resources/sounds/hit01.mp3';
import hit02 from '../../resources/sounds/hit02.mp3';
import airloop1 from '../../resources/sounds/airlockloop.mp3';
import airloop2 from '../../resources/sounds/ambientloop.mp3';

import phasleloop from '../../resources/sounds/phasleloop.mp3';
import egyptloop from '../../resources/sounds/egyptloop.mp3';
import musicloop from '../../resources/sounds/egyptloop.mp3';

// import danceloop01 from '../../resources/sounds/danceloop01.mp3';
// import danceloop02 from '../../resources/sounds/danceloop02.mp3';

export const soundAssets = {
  // dloop1: {
  //   src: danceloop01,
  //   type: 'sound',
  //   volume: 0.8,
  //   options: {
  //     loop: true,
  //   },
  //   data: null,
  // },
  // dloop2: {
  //   src: danceloop02,
  //   type: 'sound',
  //   volume: 0.8,
  //   options: {
  //     loop: true,
  //   },
  //   data: null,
  // },
  ambient1: {
    src: airloop1,
    type: 'sound',
    volume: 0.5,
    options: {
      loop: true,
    },
    data: null,
  },
  ambient2: {
    src: airloop2,
    type: 'sound',
    volume: 0.5,
    options: {},
    data: null,
  },
  egyptloop: {
    src: egyptloop,
    type: 'sound',
    volume: 0.5,
    options: {
      loop: true,
    },
    data: null,
  },
  hit01: {
    src: hit01,
    type: 'sound',
    volume: 0.4,
    options: {},
    data: null,
  },
  hit02: {
    src: hit02,
    type: 'sound',
    volume: 0.4,
    options: {},
    data: null,
  },
  al01: {
    src: al01,
    type: 'sound',
    volume: 0.1,
    options: {},
    data: null,
  },
  al02: {
    src: al02,
    type: 'sound',
    volume: 0.1,
    options: {},
    data: null,
  },
  al03: {
    src: al03,
    type: 'sound',
    volume: 0.3,
    options: {},
    data: null,
  },
  drums: {
    src: phasleloop,
    type: 'sound',
    volume: 0.3,
    options: {
      loop: true,
    },
    data: null,
  },
  music: {
    src: musicloop,
    type: 'sound',
    volume: 0.3,
    options: {
      loop: true,
    },
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
