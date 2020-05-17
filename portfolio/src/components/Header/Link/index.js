import React from 'react';
import { string } from 'prop-types';
import './Link .scss';

const Link = ({ label, url }) => (
  <li>
    <a href={url}>{label}</a>
  </li>
);

Link.propTypes = {
  label: string.isRequired,
  url: string.isRequired,
};

export default Link;