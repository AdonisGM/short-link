import {
  Button,
  Card,
  Image,
  Input,
  Spacer,
  Text,
  Link as LinkNextUI,
} from '@nextui-org/react';
import logo from '../../images/AdonisGM.png';
import classes from './Login.module.css';

const Login = () => {
  return (
    <div className={classes.main}>
      <div className={classes.divLogin}>
        <div></div>
        <div>
          <div className={classes.logo}>
            <Image
              src={logo}
              height={50}
              width={50}
              alt="Logo AdonisGM"
              objectFit="cover"
            />
            <Text h1 size={18}>
              Short Link
            </Text>
          </div>
          <Spacer y={3} />
          <div className={classes.form}>
            <Card css={{ width: 340 }} variant="bordered">
              <Card.Body css={{ textAlign: 'center' }}>
                <Text h2 size={22}>
                  Sign in
                </Text>
                <form>
                  <Spacer y={1} />
                  <Input css={{ width: 230 }} placeholder="Email@domain.com" />
                  <Spacer y={0.6} />
                  <Input.Password css={{ width: 230 }} placeholder="Password" />
                  <Spacer y={0.8} />
                  <div className={classes.button}>
                    <Button
                      css={{ width: 100, margin: '0 auto' }}
                      auto
                      size={'sm'}
                    >
                      Sign in
                    </Button>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className={classes.copyRight}>
          <Spacer y={3} />
          <Text size={8}>
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
      <div className={classes.divBackground}></div>
    </div>
  );
};

export default Login;
