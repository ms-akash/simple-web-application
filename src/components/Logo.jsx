import React from 'react';
import styled from 'styled-components';

function Logo() {
  return (
    <div className="ma4 mt0">
        <Theme>
          <h1>Logo</h1>
        </Theme>
    </div>
  );
}

const Theme = styled.div
`
h1{
    display : flex;
    cursor : pointer;
    color : darkorchid;
}

`

export default Logo;
