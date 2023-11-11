import React from 'react'
import Slider from "react-slick";
import Image from 'next/image';

const reviews = [
    {
        name: "คุณ'เอญ่า",
        // avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profession: "Busniness",
        comment:
            " ขอบคุณความรู้วันนี้ที่ได้รับจากครูเป็นประสบการณ์ใหม่ที่บอกได้เลยว่ามันสุดยอดมากๆ เชื่อมั่นว่าที่ไหนไม่มีให้นอกจากที่นี่ที่เดียวเท่านั้น ขอบคุณความรักการเเบ่งปันที่ไม่มีกั๊ก ได้วยตลอดเวลาการเรียนสนุกมากๆ "
    },
    {
        name: "คุณ'kanokwan",
        // avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        profession: "Real asset | Quarter ltd.",
        comment:
            "วันนี้ได้รับความรู้เเละเทคนิคต่างๆจากครูเยอะมาก ได้นำความรู้ไปหารายได้เพิ่มจากช่องทางต่างๆ การสอนที่มีประสิทธิภาพ ขนาดเราไม่มีความรู้มาเลยยังสามารถเข้าใจ  เเละนำไปประยุกต์ใช้ได้ ขอบคุณครูเเละทีมงานมากๆที่คอยช่วยเหลือ เเละคอยตอบข้อสงสัยตลอดเวลา อยากเเนะนำให้คนที่สนใจที่ยังลังเลอยู่ให้สมัครเรียนไปเลยค่ะ"
    },
    {
        name: "คุณ'kiky",
        // avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        profession: "real asset buisiness ",
        comment:
            "อย่างเเรกเลยต้องขอบคุณครูมากสำหรับความรู้ในวันนี้ สำหรับคอร์สอบรมในวันนี้ถือว่าคุ้มมากๆ จนรู้สึกว่าเวลาผ่านไปรวดเร็วมาก ความรู้ที่ได้รับเป็นความรู้ราคาเเพงมากซึ่งมั่นใจได้เลยว่าถ้าศึกษาเองไม่มีทางเข้าใจได้ในระยะเวลาอันสั้น"
    },
    {
        name: "คุณ'Sairung",
        // avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "real asset business",
        comment:
            "ขอบคุณครูมากๆ สำหรับความรู้ในวันนี้ มาจากเเหล่งต่างๆ การวิเคราะห์ที่สามารถทำกำไรได้ง่าย พร้อมทั้ง mindset สำหรับการเป็นเทรดเดอร์",
    },
    {
        name: "Kru'kung",
        // avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        profession: "real asset business",
        comment:
            "ขอบคุณครูนิดที่ได้รู้จักกับอาชีพหนึ่งซึ่งไม่มีความรู้อะไรเลย เป็นอะไรที่ถ่ายทอดจากใจเต็มเเม็ก ขอบคุณมากๆค่ะ",
    },
    {
        name: "K Mayfc",
        // avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        profession: "real asset business",
        comment:
            "ขอบคุณครูเเละทีมงานมากค่ะ ข้อมูลดี จะรีบนำข้อมูลไปใช้ให้เกิดประโยชน์สูงสุดค่ะ",
    },
];


const settingPeopleSay = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    // className: 'notes-slider',
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 1,
            },
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
            },
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
            },
        },
    ]
}



const PeopleReview = () => {
    return (
        <>
            <div className="w-full bg-[#f7f6ed] p-10 pb-20">
                <div className="w-full">
                    <p className="text-[#2b2631] text-center font-bold text-[30px] mt-10" data-aos="fade-down" >What People Say</p>
                    <p className="text-[#2b2631] text-center text-sm mb-16" data-aos="fade-down" >Lorem ipsum dolor sit amet, consectetur.</p>
                </div>
                <div className="w-full flex gap-3 justify-center" data-aos="fade-down" >
                    <div className="max-w-[90%] m-auto">
                        <Slider {...settingPeopleSay}>
                            {
                                reviews.map(({ name, profession, comment }) => <PeopleReviewCard {...({ name, profession, comment })} />)
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}


function PeopleReviewCard({ name, profession, comment }: any) {
    return (
        <div className="relative min-h-[380px] md:max-w-[376px] md:min-h-[330px] bg-[#fff] rounded-xl p-8 drop-shadow-md ">
            {/* <div className="text-[20px] font-bold text-[#6440FB] mb-8 ">Perfect Job</div> */}
            <div className="text-black font-Poppins">
                {comment}
            </div>
                <div className='absolute bottom-3 w-[70%]'>
                    <hr className="mt-5 w-[100%]" />
                    <div className="flex mt-3 items-center w-[100%]">
                        <div>
                            <Image
                                src={'/assests/avatar.png'}
                                width={60}
                                height={60}
                                alt=""
                                className="object-contain "
                            />
                        </div>
                        <div className="pl-7">
                            <div className="text-md font-semibold text-black">{name}</div>
                            <div className="text-xs text-black">{profession}</div>
                        </div>
                    </div>
                </div>


        </div>
    )
}


export default PeopleReview