import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CourseCard from '../Card/CoruseCard';
import leftImg from '../../img/leftImg.png';
import rightImg from '../../img/rightImg.png';
import useAxios from '../../util/useAxios';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const BgImgBox = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${({ bg }) => bg});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-position: center center;
`;

const Title = styled.div`
  width: 1200px;
  text-align: center;
  margin-bottom: 50px;
  font-weight: 400;
  font-size: 40px;
  line-height: 100%;
  color: #c8c8c8;
`;

const CardBox = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 90px;

  @media screen and (max-width: 500px) {
    width: 375px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  right: 0;
  margin-bottom: 40px;
  justify-content: center;

  @media screen and (max-width: 500px) {
    margin-bottom: 10px;
  }
`;

const Button = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  margin-right: 15px;
  background-color: white;
`;

const ArrowImg = styled.img`
  width: 20px;
`;

const bgLink = [
  { id: 0, region: '서울', imgLink: '/img/seoulBg.jpg' },
  { id: 1, region: '부산', imgLink: '/img/busanBg.jpg' },
  { id: 2, region: '경상도', imgLink: '/img/jirisanBg.jpg' },
  { id: 3, region: '경기도', imgLink: '/img/geonggidoBg.jgp' },
  { id: 4, region: '강원도', imgLink: '/img/naksansaBg.jpg' },
];

function RegionSection({ region }) {
  const ref = useRef();
  const [location, setLocation] = useState(0);
  const locationData = useAxios(`${process.env.REACT_APP_API_URL}/course`);
  let filteredData = null;

  const rightHandler = () => {
    setLocation(prev => prev + 1000);
  };

  const leftHandler = () => {
    setLocation(prev => prev - 1000);
  };

  useEffect(() => {
    if (locationData !== null) {
      if (location < 0) {
        setLocation(0);
      } else if (location > 290 * locationData.length) {
        setLocation(290 * locationData.length);
      }
    }
    ref.current.scrollTo({ left: location, behavior: 'smooth' });
  }, [location]);

  if (locationData !== null) {
    filteredData = locationData.filter(ele => {
      return ele.location === region;
    });
  }

  return (
    <Container>
      {bgLink.map(el =>
        region === el.region ? (
          <BgImgBox key={el.id} bg={el.imgLink}>
            <Title>{region}</Title>
            <ButtonBox>
              <Button>
                <ArrowImg src={leftImg} onClick={leftHandler} />
              </Button>
              <Button>
                <ArrowImg src={rightImg} onClick={rightHandler} />
              </Button>
            </ButtonBox>
            <CardBox ref={ref}>
              {filteredData === null ? (
                <div />
              ) : (
                filteredData.map(ele => {
                  return <CourseCard key={ele.courseId} ele={ele} />;
                })
              )}
            </CardBox>
          </BgImgBox>
        ) : null,
      )}
    </Container>
  );
}

export default RegionSection;
