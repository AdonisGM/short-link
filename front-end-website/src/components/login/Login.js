import {
  Button,
  Card,
  Image,
  Input,
  Spacer,
  Text,
  Link as LinkNextUI,
  Loading,
} from '@nextui-org/react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/AdonisGM.png';
import classes from './Login.module.css';
import background from '../../images/background-login.jpg';
import FetchApi from '../../apis/FetchApi';
import { UserApis } from '../../apis/ListApis';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (email === '') setIsValidEmail(false);
    if (password === '') setIsValidPassword(false);

    if (email === '' || password === '') {
      return;
    }

    setIsLoading(true);
    FetchApi(
      UserApis.login,
      {
        email: email,
        password: password,
      },
      undefined,
      undefined
    )
      .then((res) => {
        setIsLoading(false);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        navigate('/');
      })
      .catch((err) => {
        setIsLoading(false);
        setIsValidEmail(false);
        setIsValidPassword(false);
      });
  };

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
                <form onSubmit={handleSubmit}>
                  <Spacer y={1} />
                  <Input
                    ref={emailRef}
                    type="email"
                    status={isValidEmail ? 'default' : 'error'}
                    css={{ width: 230 }}
                    placeholder="Email@domain.com"
                    onChange={() => setIsValidEmail(true)}
                  />
                  <Spacer y={0.6} />
                  <Input.Password
                    ref={passwordRef}
                    status={isValidPassword ? 'default' : 'error'}
                    css={{ width: 230 }}
                    placeholder="Password"
                    onChange={() => setIsValidPassword(true)}
                  />
                  <Spacer y={1.2} />
                  <div className={classes.button}>
                    <Button
                      css={{ width: 100, margin: '0 auto' }}
                      auto
                      disabled={isLoading}
                      type="submit"
                      size={'sm'}
                    >
                      {isLoading ? (
                        <Loading size="xs" color={'currentColor'} />
                      ) : (
                        'Sign in'
                      )}
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
      <div
        className={classes.divBackground}
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
};

export default Login;
