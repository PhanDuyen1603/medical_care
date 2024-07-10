import { Flex } from 'antd';
import { FaStar } from "react-icons/fa";

const RatingStars = ({
  rating = 3
}) => {
  const stars = Array.from({ length: 5 }, (_, index) => <FaStar size="20px" key={index} color={index + 1 <= +rating ? '#F6BA27' : '#ddd'} />);
  return (
    <Flex gap="small" align='center'>
      {stars}
    </Flex>
  )
}

export default RatingStars