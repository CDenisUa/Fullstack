// Models
import Notification from '#models/notification.model.js'

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user['_id'];
        const notifications = await Notification.find({to: userId})
            .populate({
                path: 'from',
                select: 'userName profileImg',
            });

        await Notification.updateMany({ to: userId }, {read: true});
        res.status(200).json(notifications);

    } catch (error) {
        console.log('Error in getNotifications: ', error.message);
        res.status(500).json({ error: error.message || 'Error in getNotifications' });
    }
}

export const deleteNotifications = async (req, res) => {

}