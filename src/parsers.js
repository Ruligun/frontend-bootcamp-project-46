import yaml from 'js-yaml';

const getParse = (data, format) => {
  const parsers = { yml: yaml.load, json: JSON.parse };
  return parsers[format](data);
};

export default getParse;
