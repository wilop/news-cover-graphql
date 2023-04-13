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

export const filterNewsByKeyword = async function (email, keyword, limit = 5, order = '') {
  //get news by keyword
  try {
    const order_ = order === 'ASC' ? 'date' : order === 'DESC' ? '-date' : '';
    const new_ = await newsModel.find({ "user.email": email, "short_description": { $regex: '.*' + keyword + '.*', $options: 'i' } })
      .limit(limit).sort(order_);
    if (new_) {
      return new_;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
