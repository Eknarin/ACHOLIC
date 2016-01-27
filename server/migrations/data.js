var data = [
    { 
        'model': 'PackageItem',
        'documents': [
            {
                "name": "THE ULTIMATE JUMPING",
                "description": "ร่วมกระโดบนลานแทรมโพลีนขนาดใหญ่ใจกลางกรุงเทพฯ",
                "rating": "8",
                "price": "170",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "11:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "test1@homtail.com",
                        "phone_number": "081-111-1111"
                    }
                ,
                "people":{
                    "min": "1",
                    "max": "15"
                },
                "availability": "true",
                "tag": ["กระโดด","กิจกรรมในร่ม"],
                "location":"กรุงเทพฯ"
                
            },
            {
                "name": "Surfing",
                "description": "แหล่งรวมผู้ที่หลงรักการโต้คลื่นแห่งแรกในเมืองไทย ณ ใจกลางกรุงเทพฯ อย่างสุขุมวิท26 โดยที่นี่จะทำการจำลองคลื่นด้วยกระแสน้ำที่ไหลแรงกว่า32กม./ชั่วโมง",
                "rating": "10",
                "price": "750",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "10:00 AM",
                        "close_time": "00:00 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "flowhouse@homtail.com",
                        "phone_number": "081-111-1112"
                    }
                ,
                "people": "1-5",
                "availability": "true",
                "tag": ["โต้คลื่น","กิจกรรมกลางแจ้ง"],
                "location":"กรุงเทพฯ"

            },
            {
                "name": "มาวันเดียว เที่ยวสุดคุ้ม",
                "description": "ล่องแก่งเรือยาง , ขับรถ ATV , นั่งเรือชมทิวทัศน์แก่งกระจาน ",
                "rating": "9",
                "price": "850",
                "contact": "http://www.kaengkrachanbansoun.com/",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "11:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "baan@homtail.com",
                        "phone_number": "081-111-1113"
                    }
                ,
                "people": "20-25",
                "availability": "true",
                "tag": ["ล่องแก่ง","ATV"],
                "location":"นครนายก"
            },
            {
                "name": "กิจกรรมเพ้นท์บอล",
                "description": "ตื่นเต้น  เร้าใจ สนุกสนาน จัดเป็นกรุ๊ปคณะ  ขณะนี้เปิดบริการแล้วทั้ง 2 สนาม โดยสนามเพ้นท์บอล  ตั้งอยู่บริเวณใกล้เขื่อนขุนด่านปราการชล",
                "rating": "10",
                "price": "450",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "06:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "Sarikatour@hotmail.co.th",
                        "phone_number": "085-3742496"
                    } 
                ,
                "people": "6",
                "availability": "false",
                "tag": ["เพ้นท์บอล"],
                "location":"นครนายก"          
            },
            {
                "name": "ล่องแก่งเรือยาง",
                "description": "การท่องเที่ยวผจญภัยเชิงนิเวศน์ อีกรูปแบบหนึ่งคือการล่องแก่งเรือยาง ในแม่น้ำนครนายก ที่ถือว่าเป็นปฐมบทของการเรียนรู้ เรื่องราวกระแสน้ำและธรรมชาติที่รอบตัวเรา กิจกรรมล่องแก่งเรือยางโดยภาพรวมทั้งหมดแล้วถือว่าเป็นกิจกรรมที่ ปลอดภัยที่สุดอีกกิจกรรมหนึ่ง",
                "rating": "7",
                "price": "850",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "06:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "Sarikatour@hotmail.co.th",
                        "phone_number": "085-3742496"
                    }
                ,
                "people": "5-10",
                "availability": "true",
                "tag": ["ล่องแก่ง"],
                "location":"นครนายก"
            },
            {//6
                "name": "ล่องแก่งคายัค",
                "description": "ในปัจจุบันนครนายกกลายเป็นแหล่งผลิตคายัคเกอร์ ทั้งมืออาชีพและสมัครเล่นมากมาย พร้อมกับมีโรงเรียนที่รับเปิดสอนหลักสูตรพายเรือคายัคขึ้นที่นี่ด้วย แต่การให้บริการนักท่องเที่ยวยังคงใช้เรืออีกรูปแบบหนึ่งคือ เรือคายัค แบบนั่งด้านบน(Sit-on)ที่นั่งได้ 2 ท่านเดิมใช้งานพายทางทะเล แต่นครนายกใช้กับการล่องแก่งได้แบบสนุกที่เดียว ขณะที่กระแสร์น้ำก็ไม่รุนแรงจนเกินไปนัก",
                "rating": "8",
                "price": "450",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "06:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "Sarikatour@hotmail.co.th",
                        "phone_number": "085-3742496"
                    }
                ,
                "people": "2",
                "availability": "false",
                "tag": ["ล่องแก่ง","คายัค"],
                "location":"นครนายก"
            },
            {//7
                "name": "ศูนย์ผจญภัยเขาหล่น",
                "description": "ศูนย์ผจญภัยเขาหล่น ต.สาริกา อ.เมือง จ.นครนายก กิจกรรมท่องเที่ยวผจญภัย ที่คุณๆหรือใครก็ทำได้เช่นกัน",
                "rating": "7",
                "price": "600",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "06:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "Sarikatour@hotmail.co.th",
                        "phone_number": "085-3742496"
                    }
                ,
                "people": "10+",
                "availability": "true",
                "tag":["ผจญภัย"],
                "location":"นครนายก"
            },
            {//8
                "name": "ล่องเรือ และ Adventure",
                "description": "เดินทางสู่ศูนย์ผจญภัยเขาหล่น มันส์ๆกับโรยตัวหน้าผาจริง+จิ้งจอกเวหา และ นั่งเรือชมวิวรอบๆเขื่อนขุนด่านและแวะชม 3น้ำตกในเขื่อน (พร้อมอาหารว่าง)",
                "rating": "7.5",
                "price": "2500",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "06:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "Sarikatour@hotmail.co.th",
                        "phone_number": "085-3742496"
                    }
                ,
                "people": "8+",
                "availability": "true",
                "tag":["ผจญภัย","ล่องเรือ","โรยตัว"],
                "location":"นครนายก"
            },
            {//9
                "name": "One Day : นครนายก",
                "description": "อาหาร 1 มื้อ-กิจกรรมล่องแก่ง,เพ้นบอล,โรยตัว,จิ้งจอกเวหา , ATV ",
                "rating": "9",
                "price": "1700",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "06:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "Sarikatour@hotmail.co.th",
                        "phone_number": "085-3742496"
                    }
                ,
                "people": "8+",
                "availability": "true",
                "tag":["ล่องแก่ง","เพ้นท์บอล","โรยตัว", "ATV"],
                "location":"นครนายก"
            },
            {//10
                "name": "ล่องแก่ง เพนท์บอล",
                "description": "กิจกรรม ศูนย์ผจญภัยเขาหล่น , นั่งเรือชมวิวเขื่อนฯ , ยิงปืนเพนท์บอล , ล่องแก่งเรือยาง รวมค่าประกันภัยอุบัติเหตุ  พร้อมน้ำดื่มและรถรับส่งขณะทำกิจกรรมทุกกิจกรรม ",
                "rating": "9",
                "price": "850",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "06:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "Sarikatour@hotmail.co.th",
                        "phone_number": "085-3742496"
                    }
                ,
                "people": "5-10",
                "availability": "true",
                "tag":["ล่องแก่ง","เพ้นท์บอล","ล่องเรือ"],
                "location":"นครนายก"
            },
            {
                "name": "ล่องเรือ และ Adventure 2 วัน",
                "description": "เดินทางสู่ศูนย์ผจญภัยเขาหล่น มันส์ๆกับโรยตัวหน้าผาจริง+จิ้งจอกเวหา และ นั่งเรือชมวิวรอบๆเขื่อนขุนด่านและแวะชม 3น้ำตกในเขื่อน (พร้อมอาหารว่าง)",
                "rating": "7",
                "price": "2000",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "06:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "Sarikatour@hotmail.co.th",
                        "phone_number": "085-3742496"
                    }
                ,
                "people": "8+",
                "availability": "true",
                "tag":["ผจญภัย","โรยตัว","ล่องเรือ"],
                "location":"นครนายก"
            },
            {//12
                "name": "2วัน 1คืน Walk Rally",
                "description": "ล่องแก่งเรือยางหา RC , เข้าฐานกิจกรรมกลุ่มสัมพันธ์",
                "rating": "6.5",
                "price": "1500",
                "contact": "http://www.kaengkrachanbansoun.com",
                "office_time": 
                    {
                        "open_time": "6:00 AM",
                        "close_time": "06:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "-",
                        "phone_number": "081-274-5389"
                    }
                ,
                "people": "30+",
                "availability": "true",
                "tag":["Walk Rally","ล่องแก่ง"],
                "location":"นครนายก"
            },
            {//13
                "name": "2วัน 1คืน ชมทะเลหมอก",
                "description": "ล่องแก่งเรือยาง , ขับรถ ATV , เที่ยวชมทะเลหมอก",
                "rating": "7",
                "price": "1700",
                "contact": "http://www.kaengkrachanbansoun.com",
                "office_time": 
                    {
                        "open_time": "6:00 AM",
                        "close_time": "06:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "-",
                        "phone_number": "081-274-5389"
                    }
                ,
                "people": "8+",
                "availability": "true",
                "tag":["ผจญภัย","ล่องแก่ง","ATV"],
                "location":"นครนายก"
            },
            {//14
                "name": "นครนายก โกคาร์ท",
                "description": "รถโกคาร์ท Go-Kartเครื่องยนต์ HONDA GX200 ขนาดเครื่อง 200cc บนถนนปูนขัดมัน กันเส้นทั้งทางตรง ทางโค้ง ทางยูเทรน และทางซิกแซก ทำให้คุณได้ อารมณ์ความสนุก และดริฟท์ได้ตลอดเส้นทาง",
                "rating": "8",
                "price": "350",
                "contact": "www.นครนายกผจญภัย.com",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "06:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "nyk.adventure@gmail.com ",
                        "phone_number": "081- 695-3355, 095 -740-3782"
                    }
                ,
                "people": "1",
                "availability": "true",
                "tag":["โกคาร์ท"],
                "location":"นครนายก"
            },
            {//15
                "name": "ขี่รถ เอทีวี ATV-Adventure",
                "description": "ATV หนึ่งในอีกกิจกรรมที่ไม่ควรพลาดหากมีโอกาสได้แวะมาจังหวัดนครนายก กับเส้นทางธรรมชาติ ที่เราภูมิใจเสนอ ฝ่าตะลุดงโคลน  เส้นทางยังตัดผ่านลำธารเล็กๆที่ไหลมาจากภูเขา น้ำใสๆ  นอกจากนี้ ยังมี หลุม บ่อ และอุปสรรค อื่นๆ รับรองว่าคุณจะได้รับประสบการณ์ที่น่าจดจำไปอีกนาน",
                "rating": "9.7",
                "price": "500",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "06:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "nyk.adventure@gmail.com ",
                        "phone_number": "081- 695-3355, 095 -740-3782"
                    }
                ,
                "people": "1",
                "availability": "true",
                "tag":["ผจญภัย","ATV"],
                "location":"นครนายก"
            },
            {//16
                "name": "ยิงปืนเพ้นบอล Paintball",
                "description": "Paintball (เพ้นบอล) แปลตรงตัวก็คือ ลูกบอลระบายสี นั่นเอง ด้วยสนามขนาดประมาณ 40 X 80 เมตร พร้อมที่กำบังจำลอง หน้ากากป้องกันกระสุนแบบเต็มหน้า และปิดหูสำหรับ ชุดสำหรับใส่ลงสนาม เกราะอ่อน, รองเท้า และกระสุนเกรดแข่งขัน (แตกง่าย ไม่คม)",
                "rating": "9",
                "price": "350",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "06:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "nyk.adventure@gmail.com ",
                        "phone_number": "081- 695-3355, 095 -740-3782"
                    }
                ,
                "people": "1",
                "availability": "true",
                "tag":["เพ้นท์บอล"],
                "location":"นครนายก"
            },
        ]
    },
    { 
        'model': 'Role',
        'documents': [
            {
                "role": "Admin"
            },
            {
                "role": "Vendor"
            },
            {
                "name": "Customer"
            }
        ]
    },
    { 
        'model': 'Tag',
        'documents': [
            {
                "tag": "Adventure",
                "description": "-"
            },
            {
                "tag": "Romantic",
                "description": "-"
            },
            {
                "tag": "Chill",
                "description": "-"
            },
            {
                "tag": "Explorations",
                "description": "-"
            }
        ]
    }
];  
module.exports = data;