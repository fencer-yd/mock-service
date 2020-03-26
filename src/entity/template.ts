import { mock } from 'mockjs';

module.exports = () => mock({
  id: '@id',
  name: '@cname',
  comment: '@cword(20, 100)',
  'type|1': [1, 2],
})