/**@jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

import withAuth from 'components/withAuth';

const Message = ({ owner, message, user }) => {
  return (
    <div css={css`
      border-radius: 5px;
      background: ${owner === user._id ? 'rgba(97,166,51, .5)' : 'rgba(121,177,236, .5)'};
      display: flex;
      margin: 5px ${owner === user._id ? '5px' : '55px'} 5px ${owner === user._id ? '55px' : '5px'};
      padding: 10px;
    `}>
    {message}
    </div>
  )
}

export default withAuth(Message);