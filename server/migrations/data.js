var data = [
    { 
        'model': 'PackageItem',
        'documents': [
            {
                "name": "Package1",
                "description": "Des pack 1",
                "rating": "8",
                "price": "3999",
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
                "people": "10-15",
                "availability": "true"
                
            },
            {
                "name": "Package2",
                "description": "Des pack 2",
                "rating": "10",
                "price": "490",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "11:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "test2@homtail.com",
                        "phone_number": "081-111-1112"
                    }
                ,
                "people": "1-5",
                "availability": "true"

            },
            {
                "name": "Package3",
                "description": "Des pack 3",
                "rating": "9",
                "price": "1999",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "11:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "test3@homtail.com",
                        "phone_number": "081-111-1113"
                    }
                ,
                "people": "20-25",
                "availability": "true"
            },
            {
                "name": "Package4",
                "description": "Des pack 4",
                "rating": "10",
                "price": "9999",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "11:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "test4@homtail.com",
                        "phone_number": "081-111-1114"
                    } 
                ,
                "people": "30+",
                "availability": "false"           
            },
            {
                "name": "Package5",
                "description": "Des pack 4",
                "rating": "6",
                "price": "199",
                "contact": "-",
                "office_time": 
                    {
                        "open_time": "7:00 AM",
                        "close_time": "11:30 PM"
                    }
                ,
                "contact": 
                    {
                        "email": "test5@homtail.com",
                        "phone_number": "081-111-1115"
                    }
                ,
                "people": "5-10",
                "availability": "true"
            }
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