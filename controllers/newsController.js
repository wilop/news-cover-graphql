import { newsModel } from '../models/newsModel.js';

export const getNews = async function (email, order = '') {
  //get all news
  try {
    const order_ = order === 'ASC' ? 'date' : order === 'DESC' ? '-date' : '';
    const news = await newsModel.find({ "user.email": email }).sort(order_);
    if (news) {
      return news;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const filterNewsByCategory = async function (email, category, order = '') {
 
  //get news by category
  try {
    const order_ = order === 'ASC' ? 'date' : order === 'DESC' ? '-date' : '';
    const new_ = await newsModel.find({ "user.email": email, "category.name": category })
      .sort(order_);
    if (new_) {
      return new_;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const filterNewsByKeyword = async function (email, keyword, order = '') {
  //get news by keyword
  try {
    const order_ = order === 'ASC' ? 'date' : order === 'DESC' ? '-date' : '';
    const new_ = await newsModel.find({ "user.email": email, $or:[{"title": { $regex: '.*' + keyword + '.*', $options: 'i' }},{"short_description": { $regex: '.*' + keyword + '.*', $options: 'i' }} ]})
      .sort(order_);
    if (new_) {
      return new_;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const filterNewsByTags = async function (email, tags, order = '') {
  //get news by tags
  try {
    const order_ = order === 'ASC' ? 'date' : order === 'DESC' ? '-date' : '';
    const new_ = await newsModel.find({ "user.email": email, "tags": { $in:  tags  } })
      .sort(order_);
    if (new_) {
      return new_;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
