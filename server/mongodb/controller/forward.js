import BaseCtrl from './base';
import Forward from '../models/forward';

export default class ForwardCtrl extends BaseCtrl {
  constructor() {
    super(Forward);
  }

  creatAll(documents) {
    Forward.create(documents, (err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log('create finish');
      }
    });
  }
}
