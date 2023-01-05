import _ from 'lodash';

const getDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const diff = keys.flatMap((key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], state: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: data1[key], state: 'removed' };
    }
    if (data1[key] === data2[key]) {
      return { key, value: data1[key], state: 'unchanged' };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, value: getDiff(data1[key], data2[key]), state: 'complex' };
    }
    return { key, value: { oldValue: data1[key], newValue: data2[key] }, state: 'updated' };
  });

  return diff;
};

export default getDiff;
