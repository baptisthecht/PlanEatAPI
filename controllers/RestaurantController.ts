import { Restaurant } from "../models/Restaurant";

export const store = async (req: any, res: any) => {
    const { name, address, city, phone } = req.body;
    const restaurant = new Restaurant({
        name,
        address,
        city,
        phone,
    });
    try {
        await restaurant.save();
        res.send("Restaurant added");
    } catch (err) {
        res.status(500).send(err);
    }
};

export const getAll = async (req: any, res: any) => {
    const restaurants = await Restaurant.find();
    res.status(200).json({ success: true, restaurants });
}

export const getOne = async (req: any, res: any) => {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json({ success: true, restaurant });
}

export const update = async (req: any, res: any) => {
    const { name, address, city, phone } = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, {
        name,
        address,
        city,
        phone,
    });
    res.status(200).json({ success: true, restaurant });
}

export const destroy = async (req: any, res: any) => {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, restaurant });
}

export const cleanup = async (req: any, res: any) => {
    const restaurants = await Restaurant.deleteMany();
    res.status(200).json({ success: true, restaurants });
}

