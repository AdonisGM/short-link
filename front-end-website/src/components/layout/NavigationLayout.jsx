import { Outlet } from 'react-router-dom';
import classes from './NavigationLayout.module.css';
import { Text, Link as LinkNextUI } from '@nextui-org/react';

const NavigationLayout = () => {
  return (
    <div className={classes.main}>
      <div className={classes.nav}></div>
      <div className={classes.body}>
        <div>{/* <Outlet/> */}
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
        <div className={classes.footer}>
          <Text size={10}>
            Copyright © {new Date().getFullYear()}{' '}
            <LinkNextUI
              target={'_blank'}
              href="https://github.com/AdonisGM"
              color={'text'}
            >
              <strong>AdonisGM</strong>
            </LinkNextUI>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default NavigationLayout;
