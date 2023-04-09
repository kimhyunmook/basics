import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./custom.css";

export default function SliderCover (props) {
    const setting = props.setting

    return (
        <Slider {...setting}>
            {props.children}
        </Slider>
    )
}