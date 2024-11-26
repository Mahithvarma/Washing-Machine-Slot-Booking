const Booking = require("../models/bookingModel.js");

const getBookings = async (req, res, next) => {
    //   fs.readFile(bookingsFilePath, "utf8", (err, data) => {
    //     if (err) {
    //       return res.status(500).send("Error reading bookings file");
    //     }
    //     const bookings = JSON.parse(data);
    //     res.json(bookings);
    //   });

    try {
        const { startDate, endDate } = req.query;
        const bookings = await Booking.find({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        });
        // console.log("mahith: ", bookings);
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
};

const addBooking = async (req, res, next) => {
    //   const { name, time, date } = req.body;
    //   fs.readFile(bookingsFilePath, "utf8", (err, data) => {
    //     if (err) {
    //       return res.send({
    //         status: false,
    //         message: "Error reading bookings file",
    //       });
    //     }
    //     const bookings = JSON.parse(data);
    //     const existingBookingSameDay = bookings.find(
    //       (booking) => booking.name === name && booking.date === date
    //     );
    //     if (existingBookingSameDay) {
    //       return res.send({
    //         status: false,
    //         message: `You have already booked a slot on SAME DATE`,
    //       });
    //     }
    //     const existingBooking = bookings.find(
    //       (booking) => booking.time === time && booking.date === date
    //     );
    //     if (existingBooking) {
    //       return res.send({
    //         status: false,
    //         message: `Not Available: ${existingBooking.name} booked that slot.`,
    //       });
    //       // return res.send({status: false, message:`${existingBooking.name} Booked at ${existingBooking.time} on ${existingBooking.date}`});
    //     }
    //     const newBooking = { name, time, date };
    //     bookings.push(newBooking);
    //     fs.writeFile(
    //       bookingsFilePath,
    //       JSON.stringify(bookings, null, 2),
    //       "utf8",
    //       (err) => {
    //         if (err) {
    //           return res.send({
    //             status: false,
    //             message: "Error writing to bookings file",
    //           });
    //         }
    //         res.json({ status: true });
    //       }
    //     );
    //   });
    try {
        const { name, time, date } = req.body;
        const existingBookingSameDay = await Booking.findOne({ name, date });
        if (existingBookingSameDay) {
            return res.status(400).send({
                status: false,
                message: `You have already booked a slot on the same date`,
            });
        }
        const existingBooking = await Booking.findOne({ time, date });
        if (existingBooking) {
            return res.status(400).send({
                status: false,
                message: `Not Available: ${existingBooking.name} booked that slot.`,
            });
        }
        const newBooking = new Booking({ name, time, date });
        await newBooking.save();
        res.status(201).json({ status: true });
    } catch (err) {
        next(err);
    }
};

const deleteBooking = async (req, res, next) => {
    try {
        const { name, date, time } = req.body;
        console.log("mahith: ", name, date, time);
        const BookingFound = await Booking.findOne({ name, date, time });
        if (BookingFound) {
            const deleteBooking = await Booking.deleteOne({ name, time, date });
            if (deleteBooking.deletedCount > 0) {
                return res.status(200).send({
                    status: true,
                    message: `Cancelled successfully`,
                });
            } else {
                return res.status(400).send({
                    status: false,
                    message: `Something went wrong! please try again later.`,
                });
            }
        }

        return res.status(404).send({
            status: false,
            message: `No booking found for that Slot`,
        });
    } catch (err) {
        next(err);
    }
};

const updateBooking = async (req, res, next) => {
    try {
        const { name, currdate, currtime, newtime, newdate } = req.body;
        // console.log(name, currdate, currtime);
        const BookingFound = await Booking.findOne({ name, date: currdate, time: currtime });
        if (BookingFound) {
            const existingBooking = await Booking.findOne({ time: newtime, date: newdate });
            if (existingBooking) {
                return res.status(400).send({
                    status: false,
                    message: `Not Available: ${existingBooking.name} booked that slot.`,
                });
            }

            const existingBookingSameDay = await Booking.findOne({ name, date: newdate });
            if (currdate !== newdate && existingBookingSameDay) {
                return res.status(400).send({
                    status: false,
                    message: `You have already booked a slot on the same date`,
                });
            }

            const updateBooking = await Booking.updateOne(
                { name, time: currtime, date: currdate },
                { date: newdate, time: newtime }
            );
            if (updateBooking.modifiedCount > 0) {
                return res.status(200).send({
                    status: true,
                    message: `Changed Successfully`,
                });
            } else {
                return res.status(400).send({
                    status: false,
                    message: `Something went wrong! please try again later.`,
                });
            }
        }

        return res.status(404).send({
            status: false,
            message: `No booking found for that Slot`,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getBookings, addBooking, deleteBooking, updateBooking };
