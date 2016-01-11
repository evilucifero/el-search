import BaseCtrl from './base';
import Forward from '../models/inverted';

export default class InvertedCtrl extends BaseCtrl {
  constructor() {
    super(Forward);
  }
}
