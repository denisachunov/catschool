import React from 'react';
import Button from '@material-ui/core/Button';
import images from '../images';

export default () => {

  return (
    <>
        <div className="App-logo">
            <img src={images.logo} alt="" />
        </div>
        <Button className="home-btn abc" href="/abc">
            Алфавит
        </Button>
        <Button className="home-btn math" href="/math">
            Арифметика
        </Button>
    </>
  );
}