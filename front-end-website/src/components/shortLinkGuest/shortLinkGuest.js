import {
  Card,
  Text,
  Image,
  Link as LinkNextUI,
  Input,
  Button,
  Spacer,
  Loading,
} from '@nextui-org/react';
import logo from '../../images/AdonisGM.png';
import { IoMdLock } from 'react-icons/io';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './shortLinkGuest.module.css';
import { Fragment, useEffect, useRef, useState } from 'react';
import FetchApi from '../../apis/FetchApi';
import { LinkApis } from '../../apis/ListApis';
import { HiLink, HiEye } from 'react-icons/hi';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaInfo } from 'react-icons/fa';

const ShortLinkGuest = () => {
  const [isGetInformation, setIsGetInformation] = useState(true);
  const [isLoadingSubmitPassword, setIsLoadingSubmitPassword] = useState(false);
  const [informationLink, setInformationLink] = useState(undefined);
  const [hasPassword, setHasPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const password = useRef();

  const { idShortLink } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getInformationLink();
  }, []);

  const getInformationLink = () => {
    setIsGetInformation(true);
    FetchApi(LinkApis.getInfomationLink, undefined, undefined, [idShortLink])
      .then((res) => {
        setIsGetInformation(false);
        setHasPassword(false);
        setInformationLink(res.data);
      })
      .catch((err) => {
        if (err.errorCode === 'mongoose-error-00005') {
          navigate('/404');
        } else if (err.errorCode === 'short-link-error-00002') {
          setIsGetInformation(false);
          setHasPassword(true);
        } else {
          navigate('/404');
        }
      });
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();

    const valuePassword = password.current.value.trim();
    if (valuePassword === '') {
      setIsValidPassword(false);
      return;
    }

    setIsLoadingSubmitPassword(true);
    FetchApi(
      LinkApis.getInfomationLink,
      { password: valuePassword },
      undefined,
      [idShortLink]
    )
      .then((res) => {
        setIsLoadingSubmitPassword(false);
        setIsGetInformation(false);
        setHasPassword(false);
        setInformationLink(res.data);
      })
      .catch((err) => {
        if (err.errorCode === 'mongoose-error-00005') {
          navigate('/404');
        } else if (err.errorCode === 'short-link-error-00003') {
          setIsLoadingSubmitPassword(false);
          setIsValidPassword(false);
        } else {
          navigate('/404');
        }
      });
  };

  const handleBtnVisitClick = () => {
    window.open(informationLink.originalLink, '_blank');
  };

  return (
    <div className={classes.main}>
      <div>
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
      <Card
        css={{
          width: '300px',
        }}
      >
        <Card.Body>
          {isGetInformation && (
            <Fragment>
              <Loading color={'primary'} size={'sm'}>
                Getting information
              </Loading>
            </Fragment>
          )}
          {!isGetInformation && !hasPassword && informationLink && (
            <Fragment>
              <Text
                css={{
                  textAlign: 'center',
                }}
              >
                Information short link
              </Text>
              <Spacer y={1.3} />
              <div className={classes.itemInfo}>
                <FaInfo size={16} className={classes.itemInfoLogo} />
                <Text css={{ margin: 0 }}>{informationLink.name}</Text>
              </div>
              <Spacer y={0.3} />
              <div className={classes.itemInfo}>
                <HiLink size={16} className={classes.itemInfoLogo} />
                <Text css={{ margin: 0 }}>{informationLink.shortLink}</Text>
              </div>
              <Spacer y={0.3} />
              <div className={classes.itemInfo}>
                <BsFillPersonFill size={16} className={classes.itemInfoLogo} />
                <Text css={{ margin: 0 }}>{informationLink.owner.name}</Text>
              </div>
              <Spacer y={0.3} />
              <div className={classes.itemInfo}>
                <HiEye size={16} className={classes.itemInfoLogo} />
                <Text css={{ margin: 0 }}>
                  {informationLink.clicks} (Views)
                </Text>
              </div>
              <Spacer y={1.3} />
              <Button
                css={{ margin: '0 auto' }}
                size={'sm'}
                auto
                onPress={handleBtnVisitClick}
              >
                Open link
              </Button>
            </Fragment>
          )}
          {!isGetInformation && hasPassword && (
            <Fragment>
              <Text
                css={{
                  textAlign: 'center',
                }}
              >
                Protected with password
              </Text>
              <form onSubmit={handleSubmitPassword}>
                <Spacer y={1.5} />
                <Input.Password
                  onChange={() => {
                    setIsValidPassword(true);
                  }}
                  css={{
                    width: '100%',
                  }}
                  labelLeft={<IoMdLock />}
                  placeholder="Password"
                  status={isValidPassword ? 'default' : 'error'}
                  clearable
                  ref={password}
                />
                <Spacer y={0.4} />
                <Button
                  css={{ margin: '0 auto', width: "100px" }}
                  size={'sm'}
                  disabled={isLoadingSubmitPassword}
                  auto
                  type="submit"
                >
                  {isLoadingSubmitPassword && (<Fragment><Loading size='xs' color={'currentColor'}/></Fragment>)}
                  {!isLoadingSubmitPassword && (<Fragment>Submit</Fragment>)}
                </Button>
                <Spacer y={0.4} />
              </form>
            </Fragment>
          )}
        </Card.Body>
      </Card>
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
  );
};

export default ShortLinkGuest;
