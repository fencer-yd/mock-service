import { mock } from 'mockjs';

module.exports = () => mock({
  'widgets|1-20': [{
    widget_id: '@id',
    widget_name: '@cname',
    'type|1': ['USER_TAG_DISTRIBUTION', 'MEASURES_DISTRIBUTION', 'USER_PROPERTY_DISTRIBUTION'],
    request: {
      request_type: '@boolean',
      use_cache: '@boolean',
      ignore_cache_expire: '@boolean',
      handle_sampling: '@boolean',
      extend_over_end_date: '@boolean',
      rewrite_by_values: '@boolean',
      'by_fields|1-10': ['@string(16)'],
      'measures|1-10': [
        {
          aggregator: '@string(16)',
          by_session: '@boolean',
          split: '@boolean',
          number: '@boolean',
          layer_group: '@boolean',
        }
      ],
      'chart_type|1': ['interval', 'ring', 'bar'],
      remarks: '@cword(20, 100)'
    }
  }]
})