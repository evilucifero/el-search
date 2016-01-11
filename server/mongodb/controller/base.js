import mongoose from 'mongoose';

export default class BaseCtrl {

  /**
   * 构造函数
   * @param  {Object} Model - 从子类传入Model
   */
  constructor(Model) {
    this.Model = Model; 
  }

  /**
   * 查询数据库
   * @param  {Object} filter - 过滤器
   * @return {Array} 返回文档数组
   */
  * find(filter) {
    let query = this.Model.find(filter.where || {});
    if (filter.select) query.select(filter.select);
    if (filter.skip) query.skip(filter.skip);
    if (filter.limit) query.limit(filter.limit);
    if (filter.sort) query.sort(filter.sort);
    let data = yield query.exec();
    return data;
  }

  /**
   * 在数据库插入一个文档
   * @param  {Object} body - 文档的内容
   * @return {Object} 插入数据库后的文档，可以从这里得到id
   */
  * create(body) {
    let document = new this.Model(body);
    let data = yield document.save();
    return data;
  }

  /**
   * 更新文档，如果不存在，则插入这一条文档
   * @param  {Object} body - 文档的内容
   * @return {Object} 更新以后的文档
   */
  * upsert(body) {
    if (!body._id) {
      body._id = new mongoose.mongo.ObjectId();
    }
    let query = this.Model.findOneAndUpdate({_id: body._id}, body, {
      new: true,
      upsert: true
    });
    let data = yield query.exec();
    return data;
  }

  /**
   * 删除一个文档
   * @param  {String} id - 文档的id
   * @return {Object} 被删除的文档
   */
  * delete(id) {
    let data = yield this.Model.findOneAndRemove({_id: id}).exec();
    return data;
  }

  /**
   * 统计文档数量
   * @param  {Object}  where - 查询条件
   * @return {Number}  文档数量
   */
  * count(where) {
    let query = this.Model.count(where || {});
    let number = yield query.exec();
    return number;
  }
}
