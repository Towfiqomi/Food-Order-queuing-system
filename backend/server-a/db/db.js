const mongoose = require('mongoose');
let Sandwich = require('../service/SandwichService');

module.exports = function () {
    const db = 'mongodb://database:27017/sandwich_order';
    mongoose.connect(db)
        .then(() => {
            console.log(`Connected to ${db}...`);
            // let preDefinedToppingsList = [
            //     "Sliced egg",
            //     "Beef",
            //     "Ham, grain mustard",
            //     "Turkey",
            //     "peas & mint",
            //     "lettuce",
            //     "spinach",
            //     "Tuna fish",
            //     "mushrooms",
            //     "Cheese",
            //     "Beacon",
            //     "Chicken"
            // ];

            let preDefinedSandwichList = [
                {
                    name: "Beacon sandwich",
                    toppings: [
                        {
                            name: "Beacon",
                        },
                        {
                            name: "lettuce",
                        },
                    ],
                    breadType: "oat"
                },
                {
                    "name": "Beef sandwich",
                    "toppings": [
                        {
                            "name": "Beef",
                            "order_id": 3
                        },
                        {
                            "name": "peas & mint",
                            "order_id": 4
                        },
                    ],
                    "breadType": "wheat"
                },
                {
                    "name": "Cheese sandwich",
                    "toppings": [
                        {
                            "name": "Cheese",
                            "order_id": 5
                        }
                    ],
                    "breadType": "rye"
                },
                {
                    "name": "Chicken sandwich",
                    "toppings": [
                        {
                            "name": "Chicken",
                            "order_id": 6
                        },
                        {
                            "name": "spinach",
                            "order_id": 7
                        }
                    ],
                    "breadType": "oat"
                },
                {
                    "name": "Ham sandwich",
                    "toppings": [
                        {
                            "name": "Ham, grain mustard",
                            "order_id": 8
                        },
                    ],
                    "breadType": "wheat"
                }
            ];

            // Get all toppings from db
            Sandwich.getSandwiches().then((sandwiches) => {
                let sandwich_list = sandwiches.map(function(item) {
                    return item.name;
                });

                preDefinedSandwichList.forEach((name) => {
                    let temp_name = name.name;
                    if(!sandwich_list.includes(temp_name)){
                        Sandwich.addSandwich(name)
                        .then((i) => {
                            console.log('sandwich saved');
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                });
            }).catch();
        }).catch(err => console.log('Could not connect to MongooDB...', err));
};