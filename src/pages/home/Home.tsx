import React, { useEffect, useState, useRef } from 'react';
import { Spin, Row, Col } from 'antd';
import VideoCard from '../../components/video-card/VideoCard';

interface VideoData {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
}

const Home: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchVideos = async (page: number) => {
    setLoading(true);
    const newVideos = Array.from({ length: 1 }, (_, idx) => ({
      id: idx + (page - 1) * 10,
      title: `Video ${idx + page * 10}`,
      thumbnail: 'https://via.placeholder.com/240',
      duration: `${Math.floor(Math.random() * 10)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    }));
    setVideos((prev) => [...prev, ...newVideos]);
    setLoading(false);
  };

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver);
    const element = document.querySelector('#load-more-trigger');
    if (element) {
      observerRef.current.observe(element);
    }
    return () => {
      if (element) {
        observerRef.current?.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]} justify={'center'}>
        {videos.map((video) => (
          <Col key={video.id} xs={24} sm={24} md={24} lg={24}
            style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <VideoCard title={video.title} thumbnail={video.thumbnail} duration={video.duration} />
          </Col>
        ))}
      </Row>
      {loading && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <Spin tip="Loading..." />
        </div>
      )}
      <div id="load-more-trigger" style={{ height: '1px' }}></div>
    </div>
  );
};

export default Home;
