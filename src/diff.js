import _ from 'lodash';

const diff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  const text = keys.flatMap((key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] !== data2[key]) {
        return (`  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`);
      }
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return (`  - ${key}: ${data1[key]}`);
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return (`  + ${key}: ${data2[key]}`);
    }
    return (`    ${key}: ${data1[key]}`);
  });

  const result = _.concat('{', text, '}');
  return _.join(result, '\n');
};

export default diff;
