import { mock } from 'mockjs';

module.exports = () => mock({
  'user_tags|1-20': [
    {
      'tag_id': '@id',
      'cname': '@ctitle(3, 6)'
    }
  ],
});