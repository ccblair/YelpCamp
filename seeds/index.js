const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const priceRand = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: "61ba4521bd148660c86303b5",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      images: [
        {
          url: "https://res.cloudinary.com/dkd3xyhyw/image/upload/v1643317051/YelpCamp/sad6r6lx5jjs9mqzrlic.jpg",
          filename: "YelpCamp/sad6r6lx5jjs9mqzrlic",
        },
      ],
      description:
        "Mauris sagittis, nunc in eleifend luctus, dolor urna consectetur mauris, a dapibus nisl mauris in dolor. Maecenas eu orci venenatis, convallis justo dignissim, interdum felis. Maecenas facilisis placerat ante, vel imperdiet orci congue eget. Fusce hendrerit pharetra eros vel molestie. Aenean fermentum risus at elit mollis commodo non sit amet eros. Vestibulum facilisis nunc ut ultricies hendrerit. Quisque vulputate velit ligula, a pellentesque tortor maximus eu. Pellentesque odio diam, dignissim eget fringilla ut, fermentum at eros. Quisque ultrices, diam vel suscipit congue, tellus urna cursus erat, in aliquam nunc ex vitae velit. Vivamus vitae vestibulum felis, vel eleifend urna.",
      price: priceRand,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
