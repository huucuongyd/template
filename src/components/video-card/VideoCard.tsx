import React from 'react';
import { Card } from 'antd';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnail, duration }) => {
  return (
    <Card hoverable className='video-card' cover={<img alt={title} src={thumbnail} />}>
      <Card.Meta title={title} description={`Duration: ${duration}`} />
    </Card>
  );
};

export default VideoCard;
